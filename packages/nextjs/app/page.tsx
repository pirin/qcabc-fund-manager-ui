"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { type Abi, encodeFunctionData, formatUnits, parseUnits } from "viem";
import { useAccount, useCapabilities, useReadContract, useSendCalls, useWriteContract } from "wagmi";
import ConnectWalletMessage from "~~/components/ConnectWalletMessage";
import { EIP5972TxNotification } from "~~/components/EIP5792TxNotification";
import NoDepositTokensMessage from "~~/components/NoDepositTokensMessage";
import ShareholderTransactions from "~~/components/ShareholderTransactions";
import { IntegerInput, IntegerVariant, formatAsCurrency, isValidInteger } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { getParsedError, notification } from "~~/utils/scaffold-eth";

enum ApprovalStatus {
  Idle = 0,
  Pending = 1,
  Approved = 2,
  Rejected = -2,
}

const Home: NextPage = () => {
  const { address: connectedAddress, chainId } = useAccount();

  // wagmi hook to batch write to multiple contracts (EIP-5792 specific)
  const { sendCallsAsync, isPending: isBatchContractInteractionPending } = useSendCalls();

  const [depositAmount, setDepositAmount] = useState<string>("");
  const [sharesToRedeem, setSharesToredeem] = useState<string>("");
  const [approvalStatus, setApprovalStatus] = useState<ApprovalStatus>(ApprovalStatus.Idle);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [depositError, setDepositError] = useState<string>("");
  const [redeemError, setRedeemError] = useState<string>("");

  const { data: sharesOwned, refetch: refetchSharesOwned } = useScaffoldReadContract({
    contractName: "ShareToken",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: depositBalance, refetch: refetchBalance } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: membershipBadgeContract } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "membershipBadge",
  });

  const { data: MembershipBadge } = useDeployedContractInfo({ contractName: "MembershipBadge" });

  const { data: hasValidMembershipBadge } = useReadContract({
    address: membershipBadgeContract || "",
    abi: MembershipBadge?.abi as Abi,
    functionName: "isMembershipValid",
    args: [connectedAddress || ""],
  });

  const { data: hasMemebershipBadge } = useReadContract({
    address: membershipBadgeContract || "",
    abi: MembershipBadge?.abi as Abi,
    functionName: "balanceOf",
    args: [connectedAddress || ""],
  });

  const { data: redemtionsAllowed } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "redemptionsAllowed",
  });

  const { data: fundManagerContract } = useDeployedContractInfo({ contractName: "FundManager" });
  const fundManagerAddress = fundManagerContract?.address;

  const { data: allowance, refetch: refetchAllowence } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "allowance",
    args: [connectedAddress, fundManagerAddress],
  });

  const { writeContractAsync: writeFundManager, isPending: isFundManagerTxnPending } = useScaffoldWriteContract({
    contractName: "FundManager",
  });

  const isLoading = isFundManagerTxnPending || isBatchContractInteractionPending;

  //  isSuccess is true if the wallet is EIP-5792 compliant
  const { isSuccess: isEIP5792Wallet, data: walletCapabilites } = useCapabilities({ account: connectedAddress });

  const { data: depositToken } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "depositToken",
  });

  const { data: MockUSDC } = useDeployedContractInfo({ contractName: "MockUSDC" });

  const { data: depositTokenSymbol } = useReadContract({
    address: depositToken || "",
    abi: MockUSDC?.abi as Abi, //reuse the MockUSDC contract
    functionName: "symbol",
  });

  //Dynamcally construct the approval transaction based on the current deposit token from the FundManager contract
  const { writeContractAsync, isPending: isApprovalTxnPending } = useWriteContract();

  const writeContractApprovalAsyncWithParams = () =>
    writeContractAsync({
      address: depositToken || "",
      abi: MockUSDC?.abi as Abi, //reuse the approve method from the MockUSDC contract
      functionName: "approve",
      args: [fundManagerAddress || "", parseUnits(depositAmount, 6)],
    });

  const writeTx = useTransactor();

  const mustApprove = parseUnits(depositAmount, 6) > (allowance || 0);

  const handleRefetchBalance = async () => {
    try {
      await refetchBalance();
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("Error refetching data:", error);
    }
  };

  const batchAproveAndDeposit = async () => {
    try {
      if (!fundManagerContract || !walletCapabilites || !chainId) return;

      const isPaymasterSupported = walletCapabilites?.[chainId]?.paymasterService?.supported;
      // (OPTIONAL) An ERC-7677 paymaster service URL if you want to sponsor gas fee
      const paymasterURL = "";
      const txnId = await sendCallsAsync({
        calls: [
          {
            to: depositToken || "",
            data: encodeFunctionData({
              abi: MockUSDC?.abi as Abi,
              functionName: "approve",
              args: [fundManagerAddress || "", parseUnits(depositAmount, 6)],
            }),
          },
          {
            to: fundManagerContract.address,
            data: encodeFunctionData({
              abi: fundManagerContract.abi,
              functionName: "depositFunds",
              args: [parseUnits(depositAmount, 6)],
            }),
          },
        ],
        capabilities:
          isPaymasterSupported && Boolean(paymasterURL)
            ? {
                paymasterService: {
                  url: paymasterURL,
                },
              }
            : undefined,
      });

      notification.success(
        <EIP5972TxNotification
          message="Transaction completed successfully and your balances will update shortly."
          statusId={txnId.id}
        />,
        {
          duration: 10_000,
        },
      );
    } catch (error) {
      const parsedError = getParsedError(error);
      notification.error(parsedError);
    }

    //Refresh shares Owned
    try {
      await refetchSharesOwned();
    } catch (error) {
      console.error("Error refetching shares:", error);
    }

    //Refresh wallet balance
    await handleRefetchBalance();
    try {
      await refetchAllowence();
    } catch (e) {
      console.error("Error refetching allowance:", e);
    }
  };

  // Gate entire UI if wallet connected but membership invalid
  if (connectedAddress && hasValidMembershipBadge === false) {
    return (
      <div className="flex items-center flex-col flex-grow">
        <span className="text-center mt-16 max-w-xl">
          {typeof hasMemebershipBadge === "bigint" && hasMemebershipBadge > 0n
            ? "Your membership has been temporarily deactivated. Please contact the QCABC Fund team to resolve this issue."
            : "You need to be a member of the QCABC Fund to access this site."}
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center flex-col flex-grow">
        {connectedAddress ? (
          /* Wallet is connected - show regular UI */
          <>
            {/* Info Message */}
            {!redemtionsAllowed && sharesOwned ? (
              <span className="text-accent-content text-center mt-8">
                You will be able to redeem your <strong>{formatAsCurrency(sharesOwned)}</strong> shares during the next{" "}
                <a href="/help#redemption-periods" target="_blank" className="underline">
                  quarterly redemption period
                </a>
              </span>
            ) : null}

            {/* Share Balance */}
            {/* Deposit and Redeem Shares */}
            <div className="flex flex-col md:flex-row justify-center items-center  flex-grow gap-12 mt-12 mb-4">
              {/* Deposit Funds */}
              <div className="flex flex-col bg-base-100 h-auto p-10 text-center items-center w-96 rounded-xl ">
                <h3 className="text-2xl font-bold">Deposit Funds</h3>

                {depositBalance && parseFloat(formatUnits(depositBalance, 6)) > 0 ? (
                  // User has deposit tokens - show deposit form
                  <>
                    <div className="flex flex-col items-center justify-between w-full lg:w-3/5 p-2 mt-4">
                      <div className="py-4">Amount to Deposit</div>
                      <div className="flex gap-2 mb-2 items-center">
                        <span className="w-40">
                          <IntegerInput
                            disableMultiplyBy1e18={true}
                            value={depositAmount}
                            onChange={value => {
                              if (!isValidInteger(IntegerVariant.UINT256, value)) return;
                              setDepositAmount(value);
                              if (depositBalance && parseFloat(value) > parseFloat(formatUnits(depositBalance, 6))) {
                                setDepositError(`Amount exceeds your ${depositTokenSymbol} balance`);
                              } else if (value && parseFloat(value) < 1) {
                                setDepositError(`Minimum deposit is 1 ${depositTokenSymbol}`);
                              } else {
                                setDepositError("");
                              }
                            }}
                            placeholder="100"
                          />
                        </span>
                        {depositTokenSymbol as string}
                        <button
                          disabled={!depositBalance}
                          className="btn btn-secondary text-xs h-6 min-h-6"
                          onClick={() => {
                            if (depositBalance) {
                              setDepositAmount(formatUnits(depositBalance, 6));
                            }
                          }}
                        >
                          Max
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2 mb-2">
                      {!isEIP5792Wallet ? (
                        <button
                          className="btn btn-primary text-lg px-12 mt-2"
                          disabled={
                            !hasValidMembershipBadge ||
                            !depositAmount ||
                            parseFloat(depositAmount) < 1 ||
                            !!depositError ||
                            isApprovalTxnPending ||
                            approvalStatus == ApprovalStatus.Pending ||
                            isFundManagerTxnPending ||
                            !isValidInteger(IntegerVariant.UINT256, depositAmount)
                          }
                          onClick={async () => {
                            if (mustApprove) {
                              try {
                                setApprovalStatus(ApprovalStatus.Pending);
                                await writeTx(writeContractApprovalAsyncWithParams, { blockConfirmations: 1 });
                                try {
                                  await refetchAllowence();
                                  setApprovalStatus(ApprovalStatus.Approved);
                                } catch (error) {
                                  setApprovalStatus(ApprovalStatus.Idle);
                                  console.error("Error refetching data:", error);
                                }
                              } catch (e) {
                                setApprovalStatus(ApprovalStatus.Rejected);
                                console.error("Error approving funds deposit", e);
                              }
                            } else {
                              try {
                                setApprovalStatus(ApprovalStatus.Idle);
                                await writeFundManager({
                                  functionName: "depositFunds",
                                  args: [parseUnits(depositAmount, 6)],
                                });
                                setDepositAmount("");
                                try {
                                  await refetchSharesOwned();
                                } catch (error) {
                                  console.error("Error refetching data:", error);
                                }
                                await handleRefetchBalance();
                              } catch (e) {
                                console.error("Error while depositing funds", e);
                              }
                            }
                          }}
                        >
                          {mustApprove ? "Approve" : "Deposit"}
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary text-lg px-12 mt-2"
                          disabled={
                            !hasValidMembershipBadge ||
                            !depositAmount ||
                            parseFloat(depositAmount) < 1 ||
                            !!depositError ||
                            isLoading ||
                            !isValidInteger(IntegerVariant.UINT256, depositAmount)
                          }
                          onClick={async () => {
                            try {
                              await batchAproveAndDeposit();
                              setApprovalStatus(ApprovalStatus.Idle);
                              setDepositAmount("");
                            } catch (e) {
                              console.error("Error in batch approve & deposit", e);
                            }
                          }}
                        >
                          Deposit Funds
                        </button>
                      )}
                    </div>

                    <div className="text-xs opacity-50 mt-8">
                      {depositError ? (
                        <span className="text-red-500">{depositError}</span>
                      ) : approvalStatus == ApprovalStatus.Approved ? (
                        "Approved! Press 'Deposit' to complete your deposit"
                      ) : !isEIP5792Wallet && mustApprove ? (
                        "Before depositing, you need to first 'Approve' your deposit"
                      ) : (
                        <span>{`${formatAsCurrency(depositBalance, 6, depositTokenSymbol as string, 0)} is available for deposit`}</span>
                      )}
                    </div>
                  </>
                ) : (
                  // User doesn't have deposit tokens - show message
                  <NoDepositTokensMessage
                    depositToken={depositToken || ""}
                    onDepositTokensMinted={handleRefetchBalance}
                  />
                )}
              </div>
              {/* Redeem Shares */}
              {redemtionsAllowed && sharesOwned && parseFloat(formatUnits(sharesOwned, 6)) > 0 && (
                <div className="flex flex-col bg-base-100 h-auto p-10 text-center items-center w-96 rounded-xl">
                  <h3 className="text-2xl font-bold">Redeem Shares</h3>

                  <div className="flex flex-col items-center justify-between w-full lg:w-3/5 p-2 mt-4">
                    <div className="py-4">Shares to redeem</div>
                    <div className="flex gap-2 mb-2 items-center">
                      <span className="w-40">
                        <IntegerInput
                          disableMultiplyBy1e18={true}
                          value={sharesToRedeem}
                          onChange={value => {
                            if (!isValidInteger(IntegerVariant.UINT256, value)) return;
                            setSharesToredeem(value);
                            if (sharesOwned && parseFloat(value) > parseFloat(formatUnits(sharesOwned, 6))) {
                              setRedeemError(`Amount exceeds your shares`);
                            } else {
                              setRedeemError("");
                            }
                          }}
                          placeholder="0"
                        />
                      </span>
                      <button
                        disabled={!sharesOwned}
                        className="btn btn-secondary text-xs h-6 min-h-6"
                        onClick={() => {
                          if (sharesOwned) {
                            setSharesToredeem(formatUnits(sharesOwned, 6));
                          }
                        }}
                      >
                        Max
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <button
                      className="btn btn-primary text-lg px-12 mt-2"
                      disabled={
                        !hasValidMembershipBadge ||
                        !sharesToRedeem ||
                        !!redeemError ||
                        !redemtionsAllowed ||
                        isFundManagerTxnPending ||
                        !isValidInteger(IntegerVariant.UINT256, sharesToRedeem)
                      }
                      onClick={async () => {
                        try {
                          await writeFundManager({
                            functionName: "redeemShares",
                            args: [parseUnits(sharesToRedeem, 6)],
                          });
                          setSharesToredeem("");
                          try {
                            await refetchSharesOwned();
                          } catch (error) {
                            console.error("Error refetching data:", error);
                          }
                          await handleRefetchBalance();
                        } catch (e) {
                          console.error("Error while redeeming funds", e);
                        }
                      }}
                    >
                      {redemtionsAllowed ? "Redeem Shares" : "Redemptions are Paused"}
                    </button>
                  </div>
                  <div className="text-xs opacity-50 mt-8">
                    {redeemError ? (
                      <span className=" text-red-500">{redeemError}</span>
                    ) : (
                      <span>
                        {`${formatAsCurrency(sharesOwned)}  shares are available for
                        redemption`}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Shareholder Transactions */}
            <div className="mb-8 w-1/2 flex-grow">
              <ShareholderTransactions refresh={refresh} shareholderAddress={connectedAddress} />
            </div>

            {/* Fund statistics moved to Portfolio page */}
          </>
        ) : (
          /* No wallet connected - show connection message */
          <ConnectWalletMessage />
        )}
      </div>
    </>
  );
};

export default Home;
