"use client";

import React from "react";
import type { PortfolioWallet } from "../app/api/portfolio/PortfolioOracle";

interface Props {
  holdings: PortfolioWallet[];
  lastUpdated?: string;
}

const PortfolioHoldings: React.FC<Props> = ({ holdings }) => {
  // Filter out zero balances (treat undefined as zero)
  const nonZero = holdings.filter(h => (h.chainBalance ?? 0) > 0);
  // sort descending by valueSynced
  const sorted = [...nonZero].sort((a, b) => (b.valueSynced || 0) - (a.valueSynced || 0));
  const fmtUSD = (n: number) =>
    n.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Holdings</h2>
      </div>
      <div className="overflow-x-auto rounded-md border border-base-300">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Wallet</th>
              <th>Symbol</th>
              <th className="text-right">Balance</th>
              <th className="text-right">Spot</th>
              <th className="text-right">Value</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((h, i) => (
              <tr key={i}>
                <td className="max-w-[160px] truncate" title={h.wallet}>
                  {h.wallet}
                </td>
                <td>{h.symbol}</td>
                <td className="text-right">
                  {(h.chainBalance ?? 0).toLocaleString(undefined, {
                    minimumFractionDigits: 4,
                    maximumFractionDigits: 4,
                  })}
                </td>
                <td className="text-right">{fmtUSD(h.spot ?? 0)}</td>
                <td className="text-right">{fmtUSD(h.valueSynced ?? 0)}</td>
              </tr>
            ))}
            {sorted.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 opacity-70">
                  No holdings
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortfolioHoldings;
