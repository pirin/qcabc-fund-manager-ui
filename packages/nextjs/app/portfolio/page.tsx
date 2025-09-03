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
import { useDeployedContractInfo, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const PortfolioPage: NextPage = () => {
  const { address } = useAccount();
  const [loadingAgg, setLoadingAgg] = useState<boolean>(true);
  const [errorAgg, setErrorAgg] = useState<any>(null);
  const [totalDeposits, setTotalDeposits] = useState<bigint>(0n);
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

  // Aggregate deposits across all shareholders via subgraph
  useEffect(() => {
    const fetchAggregates = async () => {
      if (!hasValidMembershipBadge) return; // only after membership confirmed
      try {
        setLoadingAgg(true);
        const { data } = await execute(GetShareholdersDocument, {} as any);
        if (data?.shareholders) {
          let sum: bigint = 0n;
          for (const sh of data.shareholders) {
            for (const dep of sh.deposits || []) {
              try {
                sum += BigInt(dep.depositAmount);
              } catch {
                // ignore malformed
              }
            }
          }
          setTotalDeposits(sum);
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

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 p-4">
      <div className="stats w-full mb-6 ">
        <div className="stat">
          <div className="stat-title">Total Deposits</div>
          <div className="stat-value text-lg">
            {loadingAgg ? (
              <span className="loading loading-spinner loading-xs" />
            ) : errorAgg ? (
              "—"
            ) : (
              formatAsCurrency(totalDeposits, 6, symbol || "")
            )}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Current Portfolio Value</div>
          <div className="stat-value text-lg">
            {fundValue !== undefined ? formatAsCurrency(portfolioValue, 6, symbol || "") : "—"}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Return</div>
          <div className="stat-value text-lg">
            {loadingAgg || fundValue === undefined ? (
              <span className="loading loading-spinner loading-xs" />
            ) : haveDeposits ? (
              <span className={returnPct.startsWith("-") ? "text-red-600" : "text-green-600"}>{returnPct}%</span>
            ) : (
              "0.00%"
            )}
          </div>
        </div>
      </div>
      <div className="bg-base-100 rounded-md p-4 shadow">
        <PortfolioValueChart />
      </div>
      <div className="mt-6">
        {holdingsLoading ? (
          <div className="flex items-center gap-2">
            <span className="loading loading-spinner loading-sm" /> Loading holdings...
          </div>
        ) : holdingsError ? (
          <div className="text-error">{holdingsError}</div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <PortfolioHoldings holdings={holdings} />
            </div>
            <div className="md:w-1/3 bg-base-100 rounded-md p-4 shadow h-fit">
              <PortfolioAllocationChart holdings={holdings} height={320} />
            </div>
          </div>
        )}
      </div>
      <div className="mt-6">
        <FundStatistics />
      </div>
    </div>
  );
};

export default PortfolioPage;
