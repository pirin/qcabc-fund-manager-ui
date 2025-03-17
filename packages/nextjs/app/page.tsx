"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import ConnectWalletMessage from "~~/components/ConnectWalletMessage";
import FundStatistics from "~~/components/FundStatistics";
import NoDepositTokensMessage from "~~/components/NoDepositTokensMessage";
import ShareholderTransactions from "~~/components/ShareholderTransactions";
import { IntegerInput, IntegerVariant, isValidInteger } from "~~/components/scaffold-eth";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

enum ApprovalStatus {
  Idle = 0,
  Pending = 1,
  Approved = 2,
  Rejected = -2,
}

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

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

  const { data: redemtionsAllowed } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "redemptionsAllowed",
  });

  const { data: deployedContractData } = useDeployedContractInfo({ contractName: "FundManager" });
  const fundManagerAddress = deployedContractData?.address;

  const { data: allowance, refetch: refetchAllowence } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "allowance",
    args: [connectedAddress, fundManagerAddress],
  });

  const { writeContractAsync: writeFundManager, isPending: isFundManagerTxnPending } = useScaffoldWriteContract({
    contractName: "FundManager",
  });

  const { data: depositToken } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "depositToken",
  });

  const { data: depositTokenSymbol } = useReadContract({
    address: depositToken || "",
    abi: DeployedContracts[31337].MockUSDC.abi, //reuse the MockUSDC contract
    functionName: "symbol",
  });

  //Dynamcally construct the approval transaction based on the current deposit token from the FundManager contract
  const { writeContractAsync, isPending: isApprovalTxnPending } = useWriteContract();

  const writeContractApprovalAsyncWithParams = () =>
    writeContractAsync({
      address: depositToken || "",
      abi: DeployedContracts[31337].MockUSDC.abi, //reuse the approve method from the MockUSDC contract
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

  return (
    <>
      <div className="flex items-center flex-col flex-grow bg-base-300">
        {connectedAddress ? (
          /* Wallet is connected - show regular UI */
          <>
            {/* Deposit and Redeem Shares */}
            <div className="flex justify-center items-center w-full flex-row flex-grow gap-12 py-16">
              {/* Deposit Funds */}
              <div className="flex flex-col bg-base-100 h-auto px-10 py-10 text-center items-center w-full md:w-1/3 rounded-xl ">
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
                        {depositTokenSymbol}
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
                      <button
                        className="btn btn-primary text-lg px-12 mt-2"
                        disabled={
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
                    </div>
                    <div className="text-xs opacity-50 mt-8">
                      {depositError ? (
                        <span className="text-red-500">{depositError}</span>
                      ) : approvalStatus == ApprovalStatus.Approved ? (
                        "Approved! Press 'Deposit' to complete your deposit"
                      ) : mustApprove ? (
                        "Before depositing, you need to first 'Approve' your deposit"
                      ) : (
                        <span>
                          {depositBalance ? parseFloat(formatUnits(depositBalance, 6)).toFixed(2) : 0.0}{" "}
                          {depositTokenSymbol} is available for deposit
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  // User doesn't have deposit tokens - show message
                  <NoDepositTokensMessage depositToken={depositToken || ""} />
                )}
              </div>
              {/* Redeem Shares */}
              {redemtionsAllowed && sharesOwned && parseFloat(formatUnits(sharesOwned, 6)) > 0 && (
                <div className="flex flex-col bg-base-100 h-auto px-10 py-10 text-center items-center w-full md:w-1/3 rounded-xl">
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
                        {sharesOwned ? parseFloat(formatUnits(sharesOwned, 6)).toFixed(2) : 0} shares available for
                        redemption
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Shareholder Transactions */}
            <div className="mt-4 mb-8 h-1/4 overflow-y-auto w-2/3">
              <ShareholderTransactions refresh={refresh} shareholderAddress={connectedAddress} />
            </div>

            {/* Fund Statistics - Always show regardless of wallet connection */}
            <FundStatistics refresh={refresh} />
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
