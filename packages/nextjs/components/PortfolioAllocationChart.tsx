"use client";

import React, { useMemo } from "react";
import type { PortfolioWallet } from "../app/api/portfolio/PortfolioOracle";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  holdings: PortfolioWallet[];
  height?: number | string;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57", "#8dd1e1", "#ffbb28", "#00c49f"];

const PortfolioAllocationChart: React.FC<Props> = ({ holdings, height = 300 }) => {
  const data = useMemo(() => {
    const map: Record<string, number> = {};
    holdings.forEach(h => {
      const val = h.valueSynced ?? 0;
      if (val > 0) {
        map[h.symbol || "UNK"] = (map[h.symbol || "UNK"] || 0) + val;
      }
    });
    return Object.entries(map)
      .map(([symbol, value]) => ({ symbol, value }))
      .sort((a, b) => b.value - a.value);
  }, [holdings]);

  if (!data.length) {
    return <div className="w-full h-full flex items-center justify-center text-xs opacity-60">No allocation data</div>;
  }

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {/* @ts-ignore */}
        <PieChart>
          {/* @ts-ignore */}
          <Pie
            data={data}
            dataKey="value"
            nameKey="symbol"
            outerRadius={90}
            innerRadius={40}
            paddingAngle={2}
            strokeWidth={1}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* @ts-ignore */}
          <Tooltip
            formatter={(value: any, name: any) => {
              const num = Number(value);
              const formatted = num.toLocaleString(undefined, {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              // Show underlying symbol (name) in tooltip
              return [formatted, name];
            }}
            contentStyle={{ backgroundColor: "rgba(255,255,255,0.0)", border: "0px", fontSize: "0.7rem" }}
            labelFormatter={(label: any) => `${label}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioAllocationChart;
