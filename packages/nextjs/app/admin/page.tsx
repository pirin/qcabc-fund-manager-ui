"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import type { NextPage } from "next";
import { formatUnits, parseUnits } from "viem";
import { AddressInput, InputBase } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Admin: NextPage = () => {
  const { data: shareTokenVersion } = useScaffoldReadContract({
    contractName: "ShareToken",
    functionName: "VERSION",
  });

  const [updaterWhitelistAddress, setUpdaterWhitelistAddress] = useState<string>("");
  const [treasuryToAmount, setTreasuryToAmount] = useState<string>("");

  const { data: portfolioValue } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "portfolioValue",
  });

  const formattedPortfolioValue = (
    portfolioValue ? parseFloat(formatUnits(portfolioValue, 6)).toFixed(2) : 0
  ).toString();
  const [newPortfolioValue, setPortfolioValue] = useState<string>(formattedPortfolioValue.toString());

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

  const { data: totalShares } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "totalShares",
  });

  const { data: shareToken } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "shareToken",
  });

  const { data: redemptionsAllowed } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "redemptionsAllowed",
  });

  const { data: fundManagerVersion } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "VERSION",
  });

  const { data: owner } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "owner",
  });

  const { data: sharePrice } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "sharePrice",
  });

  const { data: treasuryBalance } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "treasuryBalance",
  });

  const { data: shareTokenName } = useScaffoldReadContract({
    contractName: "ShareToken",
    functionName: "name",
  });

  const { data: shareTokenSymbol } = useScaffoldReadContract({
    contractName: "ShareToken",
    functionName: "symbol",
  });

  const formattedTreasuryBalance = (
    treasuryBalance ? parseFloat(formatUnits(treasuryBalance, 6)).toFixed(2) : 0
  ).toString();

  const { data: depositToken } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "depositToken",
  });

  const { data: deployedContractData } = useDeployedContractInfo({ contractName: "FundManager" });
  const fundManagerAddress = deployedContractData?.address;

  const { writeContractAsync: writeFundManager } = useScaffoldWriteContract({ contractName: "FundManager" });

  return (
    <>
      <div className="flex flex-col w-2/3 mx-auto gap-4 mt-4">
        <div className="flex flex-col mx-auto bg-base-100 w-full rounded-md px-8">
          <p className="text-2xl font-bold">Fund Valuation</p>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Share Price</p>
            <p className="flex-1 text-right">
              {sharePrice ? parseFloat(formatUnits(sharePrice, 6)).toFixed(2) : 0} USDC
            </p>
          </div>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Portfolio Value</p>
            <div className="flex flex-row gap-4 items-center justify-end">
              <span className="w-36">
                <InputBase
                  value={newPortfolioValue}
                  onChange={setPortfolioValue}
                  placeholder={formattedPortfolioValue}
                />
              </span>
              USDC
              <button
                className="btn btn-primary text-lg px-6"
                disabled={!newPortfolioValue}
                onClick={async () => {
                  try {
                    await writeFundManager({
                      functionName: "setPortfolioValue",
                      args: [parseUnits(newPortfolioValue, 6)],
                    });
                    setPortfolioValue(formattedPortfolioValue);
                  } catch (e) {
                    console.error("Error while updating portfolio value", e);
                  }
                }}
              >
                Update
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Last portfolio value updated</p>
            <p className="flex-1 text-right">{formattedLastPortfolioUpdate}</p>
          </div>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Treasury Balance</p>
            <p className="flex-1 text-right">{formattedTreasuryBalance} USDC</p>
          </div>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Fund Value</p>
            <p className="flex-1 text-right">{fundValue ? parseFloat(formatUnits(fundValue, 6)).toFixed(2) : 0} USDC</p>
          </div>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Total Shares</p>
            <p className="flex-1 text-right">{totalShares ? parseFloat(formatUnits(totalShares, 6)).toFixed(2) : 0}</p>
          </div>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Redemptions</p>
            <span className={redemptionsAllowed ? "text-green-500" : "text-red-500"}>
              {redemptionsAllowed ? "ALLOWED" : "PAUSED"}
            </span>
            <button
              className="btn btn-primary text-lg px-6"
              disabled={!newPortfolioValue}
              onClick={async () => {
                try {
                  await writeFundManager({
                    functionName: redemptionsAllowed ? "pauseRedemptions" : "resumeRedemptions",
                  });
                } catch (e) {
                  console.error("Error while pausing/resuming redemptions", e);
                }
              }}
            >
              {redemptionsAllowed ? "Pause Redemptions" : "Resume  Redemptions"}
            </button>
          </div>
        </div>
        <div className="flex flex-col mx-auto bg-base-100 w-full rounded-md px-8">
          <p className="text-2xl font-bold">Contract Info</p>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Fund Manager Contract</p>
            <p className="flex-1 text-right">v{fundManagerVersion}</p>
            <Address address={fundManagerAddress} />
          </div>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Owner</p>
            <Address address={owner} />
          </div>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Share Token</p>
            <p className="flex-1 text-right">
              {shareTokenName} ({shareTokenSymbol}) v{shareTokenVersion}
            </p>
            <Address address={shareToken} />
          </div>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Deposit Token</p>
            <Address address={depositToken} />
          </div>
        </div>
        <div className="flex flex-col mx-auto bg-base-100 w-full rounded-md px-8">
          <p className="text-2xl font-bold">Deposit Transfer</p>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Transfer deposited funds to the Fund Multisig Wallet</p>
            <div className="flex flex-row gap-4 items-center justify-end">
              <span className="w-36">
                <InputBase
                  value={treasuryToAmount}
                  onChange={setTreasuryToAmount}
                  placeholder={formattedTreasuryBalance}
                />
              </span>
              <button
                disabled={!treasuryBalance}
                className="btn btn-secondary text-xs h-6 min-h-6"
                onClick={() => {
                  if (treasuryBalance) {
                    setTreasuryToAmount(formatUnits(treasuryBalance, 6));
                  }
                }}
              >
                Max
              </button>
              USDC
              <button
                className="btn btn-primary text-lg px-6"
                disabled={!newPortfolioValue}
                onClick={async () => {
                  try {
                    await writeFundManager({
                      functionName: "investFunds",
                      args: [owner, parseUnits(treasuryToAmount, 6)],
                    });
                    setTreasuryToAmount("");
                  } catch (e) {
                    console.error("Error while sending treasury funds", e);
                  }
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-auto bg-base-100 w-full rounded-md px-8 pb-4">
          <p className="text-2xl font-bold">Portfolio Fund Value Updater Whitelisting</p>
          <div className="flex justify-between items-center space-x-2 flex-col sm:flex-row gap-12">
            <p className="flex-1 text-left">Address to Whitelist</p>
            <span className="flex flex-row gap-4 items-center">
              <span className="w-96">
                <AddressInput
                  value={updaterWhitelistAddress}
                  onChange={setUpdaterWhitelistAddress}
                  placeholder="Address to Whitelist"
                />
              </span>
              <button
                className="btn btn-primary text-lg px-6"
                disabled={!newPortfolioValue}
                onClick={async () => {
                  try {
                    await writeFundManager({
                      functionName: "addToPortfolioUpdatersWhitelist",
                      args: [updaterWhitelistAddress],
                    });
                    setTreasuryToAmount("");
                  } catch (e) {
                    console.error("Error while sending treasury funds", e);
                  }
                }}
              >
                Whitelist
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
