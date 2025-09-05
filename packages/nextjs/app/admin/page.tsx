"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ADMIN_BUTTON, ADMIN_LABEL, ADMIN_ROW, ADMIN_SECTION_HEADER } from "./adminUiConstants";
import { formatDistanceToNow } from "date-fns";
import type { NextPage } from "next";
import { formatUnits, parseUnits } from "viem";
import { useReadContract } from "wagmi";
import { NotificationBubble } from "~~/components/NotificationBubble";
import { AddressInput, InputBase, IntegerVariant, isValidInteger } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { formatAsCurrency } from "~~/components/scaffold-eth";
import { Card } from "~~/components/ui/Card";
import {
  useDeployedContractInfo,
  useScaffoldReadContract,
  useScaffoldWriteContract,
  useSiteAdmins,
} from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";
import { isZeroAddress } from "~~/utils/scaffold-eth/common";

const Admin: NextPage = () => {
  const router = useRouter();

  const { data: shareTokenVersion } = useScaffoldReadContract({
    contractName: "ShareToken",
    functionName: "VERSION",
  });

  const [updaterWhitelistAddress, setUpdaterWhitelistAddress] = useState<string>("");
  const [treasuryToAmount, setTreasuryToAmount] = useState<string>("");

  // Treasury Wallet
  const { data: treasuryWallet, refetch: refetchTreasuryWallet } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "managementFeeRecipient",
  });

  const [newTreasuryWallet, setTreasuryWallet] = useState<string>("");
  const [editingTreasuryWallet, setEditingTreasuryWallet] = useState(false);

  // Management Fee
  const { data: managementFee, refetch: refetchManagementFee } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "managementFee",
  });

  const [newMgmtFee, setNewMgmtFee] = useState<string>("");

  // Membership Badge
  const { data: membershipBadge } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "membershipBadge",
  });

  const [newMembershipBadge, setNewMembershipBadge] = useState<string>("");
  const [editingMembershipBadge, setEditingMembershipBadge] = useState(false);

  // Portfolio Value
  const { data: portfolioValue } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "portfolioValue",
  });

  const [newPortfolioValue, setNewPortfolioValue] = useState<string>("");

  // Last Portfolio Update
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

  const { data: redemptionsAllowed, refetch: refetchRedemptions } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "redemptionsAllowed",
  });

  const { data: fundManagerVersion } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "VERSION",
  });

  const { data: investmentWallet } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "owner",
  });

  const { data: sharePrice } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "sharePrice",
  });

  const { data: depositBalance, refetch: refetchDepositBalance } = useScaffoldReadContract({
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

  const formattedDepositBalance = formatAsCurrency(depositBalance);

  const { data: depositToken } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "depositToken",
  });

  const { data: deployedContractData } = useDeployedContractInfo({ contractName: "FundManager" });
  const fundManagerAddress = deployedContractData?.address;

  const { writeContractAsync: writeFundManager } = useScaffoldWriteContract({ contractName: "FundManager" });

  const { data: MockUSDC } = useDeployedContractInfo({ contractName: "MockUSDC" });

  const { data: depositTokenName } = useReadContract({
    address: depositToken || "",
    abi: MockUSDC?.abi, //reuse the MockUSDC contract
    functionName: "name",
  });

  const { data: depositTokenSymbol } = useReadContract({
    address: depositToken || "",
    abi: MockUSDC?.abi, //reuse the MockUSDC contract
    functionName: "symbol",
  });

  const { data: badgeTokenName } = useReadContract({
    address: membershipBadge || "",
    abi: MockUSDC?.abi, //reuse the MockUSDC contract
    functionName: "name",
  });

  const { data: treasuryWalletBalance } = useReadContract({
    address: depositToken || "",
    abi: MockUSDC?.abi, //reuse the MockUSDC contract
    functionName: "balanceOf",
    args: [treasuryWallet],
  });

  const { data: investmentWalletBalance } = useReadContract({
    address: depositToken || "",
    abi: MockUSDC?.abi, //reuse the MockUSDC contract
    functionName: "balanceOf",
    args: [investmentWallet],
  });

  const [portfolioUpdating, setPortfolioUpdating] = useState(false);

  const { allowAdmin } = useSiteAdmins();

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

  //console.log(`= Loaded values => Contract Fee: ${managementFee}, UI Fee: ${Number(parseUnits(newMgmtFee, 2))}`);

  const sectionHeader = ADMIN_SECTION_HEADER;
  const settingsRow = ADMIN_ROW;
  const settingsLabel = ADMIN_LABEL;
  const settingsButton = ADMIN_BUTTON;

  // Derived / formatted metrics for top grid
  const sharePriceFormatted = sharePrice ? parseFloat(formatUnits(sharePrice, 6)).toFixed(2) : "0.00";
  const fundValueFormatted = formatAsCurrency(fundValue, 6, String(depositTokenSymbol || ""));
  const depositBalanceFormatted = formattedDepositBalance + " " + String(depositTokenSymbol || "");
  const portfolioValueFormatted = formatAsCurrency(portfolioValue, 6, String(depositTokenSymbol || ""));
  const totalSharesFormatted = formatAsCurrency(totalShares, 6, "Shares", 0);
  const treasuryWalletBalanceFormatted = formatAsCurrency(
    treasuryWalletBalance as bigint | undefined,
    6,
    String(depositTokenSymbol || ""),
  );
  const investmentWalletBalanceFormatted = formatAsCurrency(
    investmentWalletBalance as bigint | undefined,
    6,
    String(depositTokenSymbol || ""),
  );

  const metrics = [
    { label: "Fund Value", value: fundValueFormatted },
    { label: "Deposit Balance", value: depositBalanceFormatted },
    { label: "Portfolio Value", value: portfolioValueFormatted },
    { label: "Treasury Balance", value: treasuryWalletBalanceFormatted },
    { label: "Investment Balance", value: investmentWalletBalanceFormatted },
    { label: "Share Price", value: `${sharePriceFormatted} ${String(depositTokenSymbol || "")}` },
  ];
  return (
    <>
      {allowAdmin ? (
        <div className="flex flex-col max-w-[1400px] mx-auto gap-6 mt-6 px-6">
          {/* Top Metrics */}
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {metrics.map((m, i) => (
              <Card key={i} className="!p-4 gap-1">
                <span className="text-[10px] font-medium uppercase tracking-wide opacity-60">{m.label}</span>
                <span className={`text-sm font-semibold tabular-nums`}>{m.value}</span>
              </Card>
            ))}
          </div>

          {/* Fund Valuation / Portfolio Management */}
          <Card className="w-full !p-4 gap-4">
            <p className={sectionHeader}>Fund Valuation</p>

            {/* Set portfolio value */}
            <div className={settingsRow}>
              <p className={settingsLabel}>Set portfolio Value</p>

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

                {String(depositTokenSymbol || "")}
                <button
                  className={settingsButton}
                  disabled={!newPortfolioValue}
                  onClick={async () => {
                    try {
                      await writeFundManager({
                        functionName: "setPortfolioValue",
                        args: [parseUnits(newPortfolioValue, 6)],
                      });
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
              <p className={settingsLabel}>
                Last update: {portfolioUpdating ? "Refreshing..." : formattedLastPortfolioUpdate}
              </p>
              <button className={settingsButton} onClick={refreshPortfolio} disabled={portfolioUpdating}>
                {!portfolioUpdating ? "Refresh" : <span className="loading loading-spinner loading-xs"></span>}
              </button>
            </div>
          </Card>

          {/* Deposits & Redemptions */}
          <Card className="w-full !p-4 gap-4">
            <p className={sectionHeader}>Deposits & Redemptions</p>

            {/* Transfer funds to the Investment Wallet */}
            <div className={settingsRow}>
              <p className={settingsLabel}>Transfer Deposit funds to the Investment Wallet</p>

              <div className="flex flex-row gap-4 items-center justify-end">
                <span className="w-36">
                  <InputBase
                    value={treasuryToAmount}
                    onChange={value => {
                      if (!isValidInteger(IntegerVariant.UINT256, value)) return;
                      setTreasuryToAmount(value);
                    }}
                    placeholder={formattedDepositBalance}
                  />
                </span>
                <button
                  disabled={!depositBalance}
                  className="btn btn-secondary text-xs h-6 min-h-6"
                  onClick={() => {
                    if (depositBalance) {
                      setTreasuryToAmount(formatUnits(depositBalance, 6));
                    }
                  }}
                >
                  Max
                </button>
                {String(depositTokenSymbol || "")}
                <button
                  className={settingsButton}
                  disabled={!treasuryToAmount}
                  onClick={async () => {
                    try {
                      await writeFundManager({
                        functionName: "investFunds",
                        args: [investmentWallet, parseUnits(treasuryToAmount, 6)],
                      });
                      await refetchDepositBalance();
                      setTreasuryToAmount("");
                    } catch (e) {
                      console.error("Error while sending treasury funds", e);
                    }
                  }}
                >
                  Transfer
                </button>
              </div>
            </div>

            {/* Pause resume Redemptions Section */}
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

            {/* Management Fee Section */}
            <div className={settingsRow}>
              <p className={settingsLabel}>Management Fee (0 to 10%) </p>
              <div className="flex flex-row gap-4 items-center justify-end">
                {!isZeroAddress(treasuryWallet || "") ? (
                  <>
                    <span className="w-36">
                      <InputBase
                        value={newMgmtFee}
                        onChange={value => {
                          if (!isValidInteger(IntegerVariant.UINT16, value) || parseFloat(value) > 10) return;
                          setNewMgmtFee(value);
                        }}
                        placeholder={managementFee ? (Number(managementFee) / 100).toFixed(2) : "0.00"}
                      />
                    </span>
                    %
                    <button
                      className={settingsButton}
                      disabled={!newMgmtFee}
                      onClick={async () => {
                        try {
                          await writeFundManager({
                            functionName: "setManagementFee",
                            args: [Number(parseUnits(newMgmtFee, 2))],
                          });
                          refetchManagementFee();
                        } catch (e) {
                          console.error("Error while setting Management Fee", e);
                        }
                      }}
                    >
                      Set
                    </button>
                  </>
                ) : (
                  <p className="text-sm">To enable fees, please set the Treasury Wallet Address below</p>
                )}
              </div>
            </div>

            <div className={settingsRow}>
              <p className={settingsLabel}>Management Fee Details</p>
              <button className={settingsButton} onClick={() => router.push("/admin/management-fees")}>
                View Fees
              </button>{" "}
            </div>
          </Card>

          {/* Shareholders */}
          <Card className="w-full !p-4 gap-4">
            <p className={sectionHeader}>Shareholders</p>
            <div className={settingsRow}>
              <p className={settingsLabel}>Manage fund shareholders and membership badges</p>
              {totalSharesFormatted}
              <button className={settingsButton} onClick={() => router.push("/admin/shareholders")}>
                View Shareholders
              </button>
            </div>
          </Card>

          {/* Contracts */}
          <Card className="w-full !p-4 gap-4">
            <p className={sectionHeader}>Contracts</p>
            <div className={settingsRow}>
              <p className={settingsLabel}>Fund Manager Contract</p>
              <p className="flex-1 text-right">v{fundManagerVersion}</p>
              <Address address={fundManagerAddress} />
            </div>
            <div className={settingsRow}>
              <p className={settingsLabel}>Investment Wallet</p>
              {investmentWalletBalanceFormatted}
              <Address address={investmentWallet} />
            </div>

            <div className={settingsRow}>
              <p className={settingsLabel}>Treasury Wallet</p>
              {editingTreasuryWallet ? (
                <span className="flex flex-row gap-4 items-center">
                  <span className="w-96">
                    <AddressInput value={newTreasuryWallet} onChange={setTreasuryWallet} placeholder={treasuryWallet} />
                  </span>
                  <button
                    className={settingsButton}
                    disabled={!newTreasuryWallet}
                    onClick={async () => {
                      try {
                        await writeFundManager({
                          functionName: "setManagementFeeRecipient",
                          args: [newTreasuryWallet],
                        });
                        await refetchTreasuryWallet();
                        setEditingTreasuryWallet(false);
                        router.refresh();
                      } catch (e) {
                        console.error("Error while setting management fee wallet", e);
                      }
                    }}
                  >
                    Set
                  </button>
                  <button className={settingsButton} onClick={() => setEditingTreasuryWallet(false)}>
                    Cancel
                  </button>
                </span>
              ) : (
                <span className="flex flex-row gap-4 items-center">
                  <button className={settingsButton} onClick={() => setEditingTreasuryWallet(true)}>
                    {isZeroAddress(treasuryWallet || "") ? "Set" : "Edit"}
                  </button>
                  <Address address={treasuryWallet} />
                </span>
              )}
            </div>

            <div className={settingsRow}>
              <p className={settingsLabel}>Membership Badge NFT</p>
              <p className="flex-1 text-right">{String(badgeTokenName || "")}</p>
              {editingMembershipBadge ? (
                <span className="flex flex-row gap-4 items-center">
                  <span className="w-96">
                    <AddressInput
                      value={newMembershipBadge}
                      onChange={setNewMembershipBadge}
                      placeholder={membershipBadge}
                    />
                  </span>
                  <button
                    className={settingsButton}
                    disabled={!newMembershipBadge}
                    onClick={async () => {
                      try {
                        await writeFundManager({
                          functionName: "setMembershipBadge",
                          args: [newMembershipBadge],
                        });
                        setEditingMembershipBadge(false);
                        router.refresh();
                      } catch (e) {
                        console.error("Error while setting membership badge", e);
                      }
                    }}
                  >
                    Set
                  </button>
                  <button className={settingsButton} onClick={() => setEditingMembershipBadge(false)}>
                    Cancel
                  </button>
                </span>
              ) : (
                <span className="flex flex-row gap-4 items-center">
                  <button className={settingsButton} onClick={() => setEditingMembershipBadge(true)}>
                    {isZeroAddress(membershipBadge || "") ? "Set" : "Edit"}
                  </button>
                  <Address address={membershipBadge} />
                </span>
              )}
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
                {String(depositTokenName || "")} ({String(depositTokenSymbol || "")})
              </p>
              <Address address={depositToken} />
            </div>
          </Card>

          {/* Oracles */}
          <Card className="w-full !p-4 gap-4">
            <p className={sectionHeader}>Oracles</p>

            <div className={settingsRow}>
              <p className={settingsLabel}>Reject Oracle update if it is older than</p>
              <p className="flex-1 text-right">
                {process.env.NEXT_PUBLIC_ORACLE_STALE_THRESHOLD_HOURS
                  ? process.env.NEXT_PUBLIC_ORACLE_STALE_THRESHOLD_HOURS + " hours"
                  : "Not Configured"}
              </p>
            </div>

            <div className={settingsRow}>
              <p className={settingsLabel}>Reject if Oracles diagree on price by more than</p>
              <p className="flex-1 text-right">
                {process.env.NEXT_PUBLIC_ORACLE_DEVIATION_THRESHOLD_PCT
                  ? process.env.NEXT_PUBLIC_ORACLE_DEVIATION_THRESHOLD_PCT + "%"
                  : "Not Configured"}
              </p>
            </div>

            <div className={settingsRow}>
              <p className={settingsLabel}>Add Oracle</p>
              <span className="flex flex-row gap-4 items-center">
                <span className="w-96">
                  <AddressInput
                    value={updaterWhitelistAddress}
                    onChange={setUpdaterWhitelistAddress}
                    placeholder="Oracle Address to Whitelist"
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
                  Add
                </button>
              </span>
            </div>
          </Card>
        </div>
      ) : (
        <div className="flex flex-col max-w-[1400px] mx-auto gap-4 mt-6 px-6">
          <p className="text-2xl text-center font-bold">Sorry, you are not an admin!</p>
        </div>
      )}
    </>
  );
};

export default Admin;
