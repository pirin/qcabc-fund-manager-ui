"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import type { NextPage } from "next";
import { formatUnits, parseUnits } from "viem";
import { useReadContract } from "wagmi";
import { NotificationBubble } from "~~/components/NotificationBubble";
import ShareholderTable from "~~/components/ShareholdersTable";
import { AddressInput, InputBase, IntegerVariant, isValidInteger } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { formatAsCurrency } from "~~/components/scaffold-eth";
import DeployedContracts from "~~/contracts/deployedContracts";
import {
  useDeployedContractInfo,
  useScaffoldReadContract,
  useScaffoldWriteContract,
  useSiteAdmins,
} from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

const Admin: NextPage = () => {
  const { data: shareTokenVersion } = useScaffoldReadContract({
    contractName: "ShareToken",
    functionName: "VERSION",
  });

  const [updaterWhitelistAddress, setUpdaterWhitelistAddress] = useState<string>("");
  const [treasuryToAmount, setTreasuryToAmount] = useState<string>("");

  const { data: portfolioValue, refetch: refetchPortfolioValue } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "portfolioValue",
  });

  const [newPortfolioValue, setNewPortfolioValue] = useState<string>("");

  const { data: lastPortfolioUpdate, refetch: refetchLastPortfolioUpdate } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "lastPortfolioValueUpdated",
  });

  //format lastPortfolioUpdate as a relative time from now e.g. 2 hours ago
  const formattedLastPortfolioUpdate = lastPortfolioUpdate
    ? formatDistanceToNow(new Date(Number(lastPortfolioUpdate) * 1000), { addSuffix: true })
    : "N/A";

  const { data: fundValue, refetch: refetchFundValue } = useScaffoldReadContract({
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

  const { data: redemptionsAllowed, refetch: refetchRedemptions } = useScaffoldReadContract({
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

  const { data: sharePrice, refetch: refetchSharePrice } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "sharePrice",
  });

  const { data: treasuryBalance, refetch: refetchBalance } = useScaffoldReadContract({
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

  const formattedTreasuryBalance = formatAsCurrency(treasuryBalance);

  const { data: depositToken } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "depositToken",
  });

  const { data: deployedContractData } = useDeployedContractInfo({ contractName: "FundManager" });
  const fundManagerAddress = deployedContractData?.address;

  const { writeContractAsync: writeFundManager } = useScaffoldWriteContract({ contractName: "FundManager" });

  const { data: depositTokenName } = useReadContract({
    address: depositToken || "",
    abi: DeployedContracts[31337].MockUSDC.abi, //reuse the MockUSDC contract
    functionName: "name",
  });

  const { data: depositTokenSymbol } = useReadContract({
    address: depositToken || "",
    abi: DeployedContracts[31337].MockUSDC.abi, //reuse the MockUSDC contract
    functionName: "symbol",
  });

  const [portfolioUpdating, setPortfolioUpdating] = useState(false);

  const { allowAdmin } = useSiteAdmins();

  function refetchFundValuations() {
    try {
      refetchPortfolioValue();
      refetchLastPortfolioUpdate();
      refetchFundValue();
      refetchSharePrice();
      refetchBalance();
    } catch (e) {
      console.error("Error while refreshing data after updating portfolio value", e);
    }
  }

  const refreshPortfolio = async () => {
    let notificationId = null;

    try {
      console.log("Starting portfolio refresh...");
      notificationId = notification.loading(<NotificationBubble message="Refreshig portfolio value..." details="" />);
      setPortfolioUpdating(true);
      const result = await fetch("/api/portfolio", {
        method: "GET",
      });
      if (result.ok) {
        const data = await result.json();
        console.log("Portfolio updated successfully", data);

        notification.remove(notificationId);
        notification.success(
          <NotificationBubble
            message="Portfolio updated successfully!"
            details={`Oracle: ${data.source}, Value Deviation: ${data.oraclePortfolioValueDeviation}, Balance: ${data.oracleBalance} ETH`}
          />,
        );
        setNewPortfolioValue("");
        refetchFundValuations();
      } else {
        if (result.status === 500) {
          const data = await result.json();
          throw data.error;
        }
        throw `Reason: ${result.statusText}`;
      }
      setPortfolioUpdating(false);
    } catch (error) {
      if (notificationId) notification.remove(notificationId);

      notification.error(<NotificationBubble message="Refresh Failed!" details={`${error}`} />);
      console.error("Failed to refresh portfolio!", error);
      setPortfolioUpdating(false);
    }
  };

  const settingsSection = "flex flex-col mx-auto bg-base-100 w-full rounded-md px-4 pb-4";
  const sectionHeader = "text-xl text-accent";
  const settingsRow = "flex justify-between items-center px-4 flex-col sm:flex-row gap-12";
  const settingsLabel = "flex-1 text-left text opacity-70";
  const settingsButton = "btn btn-secondary btn-sm";
  return (
    <>
      {allowAdmin ? (
        <div className="flex flex-col w-2/3 mx-auto gap-4 mt-4">
          {/* Fund Valuation Section */}
          <div className={settingsSection}>
            <p className={sectionHeader}>Fund Valuation</p>

            <div className={settingsRow}>
              <p className={settingsLabel}>Total Fund Value (Deposits Balance + Porfolio Value)</p>
              <p className="flex-1 text-right">{formatAsCurrency(fundValue, 6, "USDC")}</p>
            </div>

            <div className={settingsRow}>
              <p className={settingsLabel}>Deposits Balance</p>
              <p className="flex-1 text-right">
                {formattedTreasuryBalance} {depositTokenSymbol}
              </p>
            </div>

            <div className={settingsRow}>
              <p className={settingsLabel}>Portfolio Value</p>
              <div className="flex flex-row gap-4 items-center justify-end">
                <span className="w-36">
                  <InputBase
                    value={newPortfolioValue}
                    onChange={value => {
                      if (!isValidInteger(IntegerVariant.UINT256, value)) return;
                      setNewPortfolioValue(value);
                    }}
                    placeholder={formatAsCurrency(portfolioValue)}
                  />
                </span>
                USDC
                <button
                  className={settingsButton}
                  disabled={!newPortfolioValue}
                  onClick={async () => {
                    try {
                      await writeFundManager({
                        functionName: "setPortfolioValue",
                        args: [parseUnits(newPortfolioValue, 6)],
                      });
                      setNewPortfolioValue("");
                      refetchFundValuations();
                    } catch (e) {
                      console.error("Error while updating portfolio value", e);
                    }
                  }}
                >
                  Update
                </button>
              </div>
            </div>
            <div className={settingsRow}>
              <p className={settingsLabel}>Last portfolio value updated</p>
              <p className="flex-1 text-right"> {portfolioUpdating ? "Refreshing..." : formattedLastPortfolioUpdate}</p>
              <button className={settingsButton} onClick={refreshPortfolio} disabled={portfolioUpdating}>
                {!portfolioUpdating ? "Refresh" : <span className="loading loading-spinner loading-xs"></span>}
              </button>
            </div>
          </div>

          {/* Deposits Section */}
          <div className={settingsSection}>
            <p className={sectionHeader}>Deposits and Redemptions</p>

            <div className={settingsRow}>
              <p className={settingsLabel}>Transfer deposits to the Fund Investment Wallet</p>
              <div className="flex flex-row gap-4 items-center justify-end">
                <span className="w-36">
                  <InputBase
                    value={treasuryToAmount}
                    onChange={value => {
                      if (!isValidInteger(IntegerVariant.UINT256, value)) return;
                      setTreasuryToAmount(value);
                    }}
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
                {depositTokenSymbol}
                <button
                  className={settingsButton}
                  disabled={!treasuryToAmount}
                  onClick={async () => {
                    try {
                      await writeFundManager({
                        functionName: "investFunds",
                        args: [owner, parseUnits(treasuryToAmount, 6)],
                      });
                      setTreasuryToAmount("");
                      refetchFundValuations();
                    } catch (e) {
                      console.error("Error while sending treasury funds", e);
                    }
                  }}
                >
                  Transfer
                </button>
              </div>
            </div>

            <div className={settingsRow}>
              <p className={settingsLabel}>Redemptions</p>
              <span className={redemptionsAllowed ? "text-green-500" : "text-red-500"}>
                {redemptionsAllowed ? "ALLOWED" : "PAUSED"}
              </span>
              <button
                className={settingsButton}
                onClick={async () => {
                  try {
                    await writeFundManager({
                      functionName: redemptionsAllowed ? "pauseRedemptions" : "resumeRedemptions",
                    });
                    try {
                      refetchRedemptions(); // refresh the redemptionsAllowed state
                    } catch (e) {
                      console.error("Error while refreshing redemptions state", e);
                    }
                  } catch (e) {
                    console.error("Error while pausing/resuming redemptions", e);
                  }
                }}
              >
                {redemptionsAllowed ? "Pause Redemptions" : "Resume  Redemptions"}
              </button>
            </div>
          </div>

          {/* Fund Shares Section */}
          <div className={settingsSection}>
            <p className={sectionHeader}>Fund Shares</p>

            <div className={settingsRow}>
              <p className={settingsLabel}>Total Shares</p>
              <p className="flex-1 text-right">{formatAsCurrency(totalShares)}</p>
            </div>

            <div className={settingsRow}>
              <p className={settingsLabel}>Share Price</p>
              <p className="flex-1 text-right">
                {sharePrice ? parseFloat(formatUnits(sharePrice, 6)).toFixed(2) : 0} USDC
              </p>
            </div>
          </div>

          {/* Shareholders Section */}
          <div className={settingsSection}>
            <ShareholderTable />
          </div>

          {/* Portfolio Fund Value Updater Section */}
          <div className={settingsSection}>
            <p className={sectionHeader}>Portfolio Fund Value Updater Whitelisting</p>
            <div className={settingsRow}>
              <p className={settingsLabel}>Address to Whitelist</p>
              <span className="flex flex-row gap-4 items-center">
                <span className="w-96">
                  <AddressInput
                    value={updaterWhitelistAddress}
                    onChange={setUpdaterWhitelistAddress}
                    placeholder="Address to Whitelist"
                  />
                </span>
                <button
                  className={settingsButton}
                  disabled={!updaterWhitelistAddress}
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

          {/* Contract Info Section */}
          <div className={settingsSection}>
            <p className={sectionHeader}>Contract Info</p>
            <div className={settingsRow}>
              <p className={settingsLabel}>Fund Manager Contract</p>
              <p className="flex-1 text-right">v{fundManagerVersion}</p>
              <Address address={fundManagerAddress} />
            </div>
            <div className={settingsRow}>
              <p className={settingsLabel}>Owner</p>
              <Address address={owner} />
            </div>
            <div className={settingsRow}>
              <p className={settingsLabel}>Share Token</p>
              <p className="flex-1 text-right">
                {shareTokenName} ({shareTokenSymbol}) v{shareTokenVersion}
              </p>
              <Address address={shareToken} />
            </div>
            <div className={settingsRow}>
              <p className={settingsLabel}>Deposit Token</p>
              <p className="flex-1 text-right">
                {depositTokenName} ({depositTokenSymbol})
              </p>
              <Address address={depositToken} />
            </div>
          </div>

          {/* Oracle Settings Section */}
          <div className={settingsSection}>
            <p className={sectionHeader}>Oracle Thresholds</p>
            <div className={settingsRow}>
              <p className={settingsLabel}>Reject if update is older than</p>
              <p className="flex-1 text-right">
                {process.env.NEXT_PUBLIC_ORACLE_STALE_THRESHOLD_HOURS
                  ? process.env.NEXT_PUBLIC_ORACLE_STALE_THRESHOLD_HOURS + " hours"
                  : "Not Configured"}
              </p>
            </div>
            <div className={settingsRow}>
              <p className={settingsLabel}>Reject if Oracles diagree on price more than</p>
              <p className="flex-1 text-right">
                {process.env.NEXT_PUBLIC_ORACLE_DEVIATION_THRESHOLD_PCT
                  ? process.env.NEXT_PUBLIC_ORACLE_DEVIATION_THRESHOLD_PCT + "%"
                  : "Not Configured"}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-2/3 mx-auto gap-4 mt-4">
          <p className="text-2xl text-center font-bold">Sorry, you are not an admin!</p>
        </div>
      )}
    </>
  );
};

export default Admin;
