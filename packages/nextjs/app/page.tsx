"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { formatUnits, parseUnits } from "viem";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import FundStatistics from "~~/components/FundStatistics";
import ShareholderTransactions from "~~/components/ShareholderTransactions";
import { InputBase } from "~~/components/scaffold-eth";
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
        {/* Shares Owned Header */}
        <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row gap-24">
          <p className="text-sm">
            Shares Owned: <strong>{sharesOwned ? parseFloat(formatUnits(sharesOwned, 6)).toFixed(2) : 0}</strong>
          </p>
          <p className={"text-red-500"}>{redemtionsAllowed ? "" : "Redemptions are temporary PAUSED!"}</p>
          <p className="text-sm">
            Available to invest:{" "}
            <strong>
              {depositBalance ? parseFloat(formatUnits(depositBalance, 6)).toFixed(2) : 0.0} {depositTokenSymbol}
            </strong>
          </p>
        </div>
        {/* Deposit and Redeem Shares */}
        <div className="flex justify-center items-center w-full flex-row flex-grow gap-12">
          {/* Deposit Funds */}
          <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center w-full md:w-1/3 rounded-xl ">
            <h3 className="text-2xl font-bold">Deposit Funds</h3>
            <div className="flex flex-col items-center justify-between w-full lg:w-3/5 p-2 mt-4">
              {/* <div className="py-4">Allowance: {allowance ? parseFloat(formatUnits(allowance, 6)).toFixed(2) : 0} USDC. Approve: {mustApprove ? "yes" : "no"} </div> */}
              <div className="py-4">Amount to Deposit</div>
              <div className="flex gap-2 mb-2 items-center">
                <span className="w-40">
                  <InputBase value={depositAmount} onChange={setDepositAmount} placeholder="100" />
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
                  isApprovalTxnPending ||
                  approvalStatus == ApprovalStatus.Pending ||
                  isFundManagerTxnPending
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
                      await writeFundManager({ functionName: "depositFunds", args: [parseUnits(depositAmount, 6)] });
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
            <div className="text-xs opacity-50">
              {approvalStatus == ApprovalStatus.Approved
                ? "Approved! Press 'Deposit' to complete your deposit"
                : mustApprove
                  ? "Before depositing, you need to first 'Approve' your deposit"
                  : ""}
            </div>
          </div>
          {/* Redeem Shares */}
          {redemtionsAllowed && sharesOwned && parseFloat(formatUnits(sharesOwned, 6)) > 0 && (
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center w-full md:w-1/3 rounded-xl">
              <h3 className="text-2xl font-bold">Redeem Shares</h3>
              <div className="flex flex-col items-center justify-between w-full lg:w-3/5 p-2 mt-4">
                <div className="py-4">Shares to redeem</div>
                <div className="flex gap-2 mb-2 items-center">
                  <span className="w-40">
                    <InputBase value={sharesToRedeem} onChange={setSharesToredeem} placeholder="0" />
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
              <div>
                <button
                  className="btn btn-primary text-lg px-12 mt-2"
                  disabled={!sharesToRedeem || !redemtionsAllowed || isFundManagerTxnPending}
                  onClick={async () => {
                    try {
                      await writeFundManager({ functionName: "redeemShares", args: [parseUnits(sharesToRedeem, 6)] });
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
            </div>
          )}
        </div>

        {/* Shareholder Transactions */}
        <div className="mt-4 mb-8 h-1/4 overflow-y-auto w-2/3">
          <ShareholderTransactions refresh={refresh} shareholderAddress={connectedAddress || ""} />
        </div>
        <FundStatistics refresh={refresh} />
      </div>
    </>
  );
};

export default Home;
