"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { PortfolioWallet } from "../api/portfolio/PortfolioOracle";
import type { NextPage } from "next";
import { useAccount, useReadContract } from "wagmi";
import { GetShareholdersDocument, execute } from "~~/.graphclient";
import FundStatistics from "~~/components/FundStatistics";
import PortfolioAllocationChart from "~~/components/PortfolioAllocationChart";
import PortfolioHoldings from "~~/components/PortfolioHoldings";
import PortfolioValueChart from "~~/components/PortfolioValueChart";
import { formatAsCurrency } from "~~/components/scaffold-eth";
import { Card } from "~~/components/ui/Card";
import { useDeployedContractInfo, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const PortfolioPage: NextPage = () => {
  const { address } = useAccount();
  const [loadingAgg, setLoadingAgg] = useState<boolean>(true);
  const [errorAgg, setErrorAgg] = useState<any>(null);
  const [totalDeposits, setTotalDeposits] = useState<bigint>(0n);
  const [lifespanDays, setLifespanDays] = useState<number | null>(null); // days since first deposit
  // holdings state
  const [holdings, setHoldings] = useState<PortfolioWallet[]>([]);
  const [holdingsLoading, setHoldingsLoading] = useState<boolean>(true);
  const [holdingsError, setHoldingsError] = useState<string | null>(null);

  // Fund value (current portfolio value)
  const { data: fundValue } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "totalFundValue",
  });

  // Deposit token + symbol for formatting
  const { data: depositToken } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "depositToken",
  });
  const { data: MockUSDC } = useDeployedContractInfo({ contractName: "MockUSDC" });
  const { data: depositTokenSymbol } = useReadContract({
    address: depositToken || "",
    abi: MockUSDC?.abi,
    functionName: "symbol",
  });

  const { data: membershipBadgeContract } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "membershipBadge",
  });

  const { data: MembershipBadge } = useDeployedContractInfo({ contractName: "MembershipBadge" });

  const { data: hasValidMembershipBadge } = useReadContract({
    address: membershipBadgeContract || "",
    abi: MembershipBadge?.abi,
    functionName: "isMembershipValid",
    args: [address || ""],
  });

  // Using global baseCardClass via Card component

  // Aggregate deposits across all shareholders via subgraph
  useEffect(() => {
    const fetchAggregates = async () => {
      if (!hasValidMembershipBadge) return; // only after membership confirmed
      try {
        setLoadingAgg(true);
        const { data } = await execute(GetShareholdersDocument, {} as any);
        if (data?.shareholders) {
          let sum: bigint = 0n;
          let earliest: number | null = null;
          for (const sh of data.shareholders) {
            for (const dep of sh.deposits || []) {
              try {
                sum += BigInt(dep.depositAmount);
                const ts = Number(dep.blockTimestamp);
                if (!earliest || ts < earliest) earliest = ts;
              } catch {
                // ignore malformed deposit entries
              }
            }
          }
          setTotalDeposits(sum);
          if (earliest) {
            const nowSec = Math.floor(Date.now() / 1000);
            const diffDays = Math.max(0, Math.floor((nowSec - earliest) / 86400));
            setLifespanDays(diffDays);
          }
        }
      } catch (e) {
        setErrorAgg(e);
      } finally {
        setLoadingAgg(false);
      }
    };
    fetchAggregates();
  }, [hasValidMembershipBadge]);

  useEffect(() => {
    const fetchHoldings = async () => {
      if (!hasValidMembershipBadge) return;
      try {
        setHoldingsLoading(true);
        const res = await fetch(`/api/portfolio?holdings=1`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`Failed to fetch holdings: ${res.status}`);
        }
        const json = await res.json();
        setHoldings(json.holdings || []);
      } catch (e: any) {
        setHoldingsError(e.message || "Unknown error");
      } finally {
        setHoldingsLoading(false);
      }
    };
    fetchHoldings();
  }, [hasValidMembershipBadge]);

  if (!address) {
    return (
      <div className="flex flex-col items-center mt-10 gap-4">
        <p className="text-lg">Please connect your wallet to view portfolio performance.</p>
      </div>
    );
  }

  if (!hasValidMembershipBadge) {
    return (
      <div className="flex flex-col items-center mt-10 gap-4">
        <p className="text-lg">You need a valid membership badge to view the portfolio.</p>
        <Link href="/" className="btn btn-secondary btn-sm">
          Back Home
        </Link>
      </div>
    );
  }

  // Compute return %
  const symbol = String(depositTokenSymbol || "");
  const haveDeposits = totalDeposits > 0n;
  const portfolioValue = fundValue ? (fundValue as bigint) : 0n;
  let returnPct: string = "0.00";
  if (haveDeposits && portfolioValue > 0n) {
    const diff = Number(portfolioValue - totalDeposits) / 1e6; // scale for percentage calc using decimals (assumes 6)
    const base = Number(totalDeposits) / 1e6;
    if (base > 0) {
      returnPct = ((diff / base) * 100).toFixed(2);
    }
  }
  const profitLoss = haveDeposits ? portfolioValue - totalDeposits : 0n;
  const profitLossAbs = profitLoss < 0n ? -profitLoss : profitLoss;
  const profitLossSignedFormatted = (profitLoss >= 0n ? "" : "-") + formatAsCurrency(profitLossAbs, 6, symbol || "");

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
      {/* Top Metrics */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card>
          <span className="text-xs font-medium uppercase tracking-wide text-base-content/60">Total Deposits</span>
          <span className="text-2xl font-semibold tabular-nums">
            {loadingAgg ? (
              <span className="loading loading-spinner loading-xs" />
            ) : errorAgg ? (
              "—"
            ) : (
              formatAsCurrency(totalDeposits, 6, symbol || "")
            )}
          </span>
        </Card>
        <Card>
          <span className="text-xs font-medium uppercase tracking-wide text-base-content/60">Portfolio Value</span>
          <span className="text-2xl font-semibold tabular-nums">
            {fundValue !== undefined ? formatAsCurrency(portfolioValue, 6, symbol || "") : "—"}
          </span>
        </Card>
        <Card className="hidden xl:flex">
          <span className="text-xs font-medium uppercase tracking-wide text-base-content/60">Profit / Loss</span>
          <span
            className={`text-2xl font-semibold tabular-nums ${profitLoss === 0n ? "" : profitLoss > 0n ? "text-success" : "text-error"}`}
          >
            {loadingAgg || fundValue === undefined ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              profitLossSignedFormatted
            )}
          </span>
          <span className="text-xs opacity-60">{haveDeposits ? returnPct + "%" : "0.00%"}</span>
        </Card>
        <Card>
          <span className="text-xs font-medium uppercase tracking-wide text-base-content/60">Fund Lifespan</span>
          <span className="text-2xl font-semibold tabular-nums">
            {loadingAgg ? (
              <span className="loading loading-spinner loading-xs" />
            ) : lifespanDays !== null ? (
              lifespanDays
            ) : (
              "—"
            )}
          </span>
          <span className="text-xs opacity-60">days since first deposit</span>
        </Card>
      </div>

      {/* Value + Allocation Charts */}
      <div className="grid gap-5 md:grid-cols-3">
        <Card className="md:col-span-2">
          <span className="text-xs font-medium uppercase tracking-wide text-base-content/60">
            Portfolio Value (Last 30d)
          </span>
          <div className="mt-2">
            <PortfolioValueChart height={260} />
          </div>
        </Card>
        <Card>
          <span className="text-xs font-medium uppercase tracking-wide text-base-content/60">Allocation</span>
          <div className="mt-2">
            <PortfolioAllocationChart holdings={holdings} height={260} />
          </div>
        </Card>
      </div>

      {/* Holdings */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-medium uppercase tracking-wide text-base-content/60">Holdings</h2>
        </div>
        {holdingsLoading ? (
          <div className="flex items-center gap-2 min-h-[120px] justify-center">
            <span className="loading loading-spinner loading-sm" />
            <span className="text-sm">Loading holdings...</span>
          </div>
        ) : holdingsError ? (
          <div className="text-error">{holdingsError}</div>
        ) : (
          <PortfolioHoldings holdings={holdings} />
        )}
      </Card>

      {/* Fund Stats (no card wrapper as requested) */}
      <div className="pt-2">
        <FundStatistics />
      </div>
    </div>
  );
};

export default PortfolioPage;
