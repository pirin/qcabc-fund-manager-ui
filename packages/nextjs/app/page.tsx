"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import type { NextPage } from "next";
import { formatUnits, parseUnits } from "viem";
import { useAccount } from "wagmi";
import { InputBase } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  const [depositAmount, setDepositAmount] = useState<string>("");

  const [sharesToRedeem, setSharesToredeem] = useState<string>("");

  const { data: sharesOwned } = useScaffoldReadContract({
    contractName: "ShareToken",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "ShareToken",
    functionName: "totalSupply",
  });

  const { data: depositBalance } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const { data: portfolioValue } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "portfolioValue",
  });

  const { data: lastPortfolioUpdate } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "lastPortfolioValueUpdated",
  });

  //format lastPortfolioUpdate as a relative time from now e.g. 2 hours ago
  const formattedLastPortfolioUpdate = lastPortfolioUpdate
    ? formatDistanceToNow(new Date(Number(lastPortfolioUpdate) * 1000), { addSuffix: true })
    : "N/A";

  const { data: fundValue } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "totalFundValue",
  });

  const { data: sharePrice } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "sharePrice",
  });

  const { data: treasuryBalance } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "treasuryBalance",
  });

  const { data: redemtionsAllowed } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "redemptionsAllowed",
  });

  const { data: deployedContractData } = useDeployedContractInfo({ contractName: "FundManager" });
  const fundManagerAddress = deployedContractData?.address;

  const { data: allowance } = useScaffoldReadContract({
    contractName: "MockUSDC",
    functionName: "allowance",
    args: [connectedAddress, fundManagerAddress],
  });

  const { writeContractAsync: writeFundManager } = useScaffoldWriteContract({ contractName: "FundManager" });
  const { writeContractAsync: writeMockUsdc } = useScaffoldWriteContract({ contractName: "MockUSDC" });

  const mustApprove = parseUnits(depositAmount, 6) > (allowance || 0);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="text-sm">
              Shares Owned: <strong>{sharesOwned ? parseFloat(formatUnits(sharesOwned, 6)).toFixed(2) : 0}</strong>
            </p>
            <p className={"text-red-500"}>{redemtionsAllowed ? "" : "Redemptions are temporary PAUSED!"}</p>
            <p className="text-sm">
              Available to invest:
              <strong>{depositBalance ? parseFloat(formatUnits(depositBalance, 6)).toFixed(2) : 0} USDC</strong>
            </p>
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full">
          <div className="flex justify-center items-center w-full flex-row flex-grow gap-12 pt-10">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center w-full md:w-1/3 rounded-3xl mt-10">
              <h3 className="text-2xl font-bold">Make a Deposit</h3>
              <div className="flex flex-col items-center justify-between w-full lg:w-3/5 p-2 mt-4">
                {/* <div className="py-4">Allowance: {allowance ? parseFloat(formatUnits(allowance, 6)).toFixed(2) : 0} USDC. Approve: {mustApprove ? "yes" : "no"} </div> */}
                <div className="py-4">USDC Amount to Deposit</div>
                <div className="flex gap-2 mb-2 items-center">
                  <InputBase value={depositAmount} onChange={setDepositAmount} placeholder="100" />
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
                  disabled={!depositAmount}
                  onClick={async () => {
                    if (mustApprove) {
                      try {
                        await writeMockUsdc({
                          functionName: "approve",
                          args: [fundManagerAddress, parseUnits(depositAmount, 6)],
                        });
                      } catch (e) {
                        console.error("Error approving funds deposit", e);
                      }
                    } else {
                      try {
                        await writeFundManager({ functionName: "depositFunds", args: [parseUnits(depositAmount, 6)] });
                        setDepositAmount("");
                      } catch (e) {
                        console.error("Error while depositing funds", e);
                      }
                    }
                  }}
                >
                  {mustApprove ? "Approve" : "Deposit"}
                </button>
              </div>
            </div>
            {redemtionsAllowed && sharesOwned && parseFloat(formatUnits(sharesOwned, 6)) > 0 && (
              <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center w-full md:w-1/3 rounded-3xl mt-10">
                <h3 className="text-2xl font-bold">Redeem Shares</h3>
                <div className="flex flex-col items-center justify-between w-full lg:w-3/5 p-2 mt-4">
                  <div className="py-4">Shares to redeem</div>
                  <div className="flex gap-2 mb-2 items-center">
                    <InputBase value={sharesToRedeem} onChange={setSharesToredeem} placeholder="0" />

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
                    disabled={!sharesToRedeem || !redemtionsAllowed}
                    onClick={async () => {
                      try {
                        await writeFundManager({ functionName: "redeemShares", args: [parseUnits(sharesToRedeem, 6)] });
                        setSharesToredeem("");
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
        </div>

        <div className="px-5">
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="text-sm">
              Total Shares: <strong>{totalSupply ? parseFloat(formatUnits(totalSupply, 6)).toFixed(2) : 0}</strong>
            </p>
            <p className="text-sm">
              Share price: <strong>{sharePrice ? parseFloat(formatUnits(sharePrice, 6)).toFixed(2) : 0}</strong> USDC
            </p>
            <p className="text-sm">
              Treasury Balance:{" "}
              <strong>{treasuryBalance ? parseFloat(formatUnits(treasuryBalance, 6)).toFixed(2) : 0}</strong> USDC
            </p>
            <p className="text-sm">
              Total Fund Value: <strong>{fundValue ? parseFloat(formatUnits(fundValue, 6)).toFixed(2) : 0}</strong> USDC
            </p>
            <p className="text-sm">
              Portfolio Value:{" "}
              <strong>{portfolioValue ? parseFloat(formatUnits(portfolioValue, 6)).toFixed(2) : 0}</strong> USDC
            </p>
          </div>
          <div className="text-xs opacity-50">Portfolio Value as of: {formattedLastPortfolioUpdate}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
