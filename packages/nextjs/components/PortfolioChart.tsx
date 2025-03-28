"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { GetPortfolioUpdatesDocument, execute } from "~~/.graphclient";
import { formatAsCurrency } from "~~/components/scaffold-eth";

// Define the types for the portfolio update data
type PortfolioUpdate = {
  blockTimestamp: string;
  id: string;
  newPortfolioValue: string;
  newSharePrice: string;
  timestamp: string;
  transactionHash: string;
};

type ChartDataPoint = {
  timestamp: number;
  date: string;
  portfolioValue: number;
  sharePrice: number;
};

type PortfolioChartProps = {
  refresh?: boolean;
};

// Function to normalize values by dividing by 1,000,000
const normalizeValue = (value: string): number => {
  return Number(value) / 1000000;
};

const PortfolioChart = ({ refresh }: PortfolioChartProps) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch portfolio updates data using GraphClient
  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!execute || !GetPortfolioUpdatesDocument) {
        return;
      }

      try {
        setIsLoading(true);
        const { data: result } = await execute(GetPortfolioUpdatesDocument, {});

        if (result?.portfolioUpdates) {
          // Process the data for the chart
          const processedData = result.portfolioUpdates
            .map((update: PortfolioUpdate) => ({
              timestamp: Number(update.timestamp) * 1000, // Convert to milliseconds
              date: format(Number(update.timestamp) * 1000, "MMM dd, yyyy"),
              portfolioValue: normalizeValue(update.newPortfolioValue),
              sharePrice: normalizeValue(update.newSharePrice),
            }))
            .filter((data: any) => data.timestamp > new Date().getTime() - 4 * 24 * 60 * 60 * 1000); // Filter data for the last 30 days
          setChartData(processedData);
        }
      } catch (err) {
        console.error("Error fetching portfolio data:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch portfolio data"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, [refresh]); // Re-fetch when refresh changes

  const msgFormat = "w-full h-14 opacity-30 text-xs flex items-center justify-center";

  if (isLoading) {
    return <div className={msgFormat}>.</div>;
  }

  if (error) {
    return <div className={msgFormat}>Error loading portfolio data</div>;
  }

  if (!chartData.length) {
    return <div className={msgFormat}>No portfolio data available</div>;
  }

  // The formatAsCurrency function expects a bigint, but we're working with numbers
  // Using type assertion to avoid TypeScript errors
  const formatTooltipValue = (value: number) => {
    const valueAsBigInt = BigInt(Math.floor(value * 1000000));

    return [formatAsCurrency(valueAsBigInt, 6, "USDC", 0), "Value"];
  };

  return (
    <div className="h-14 w-full">
      {/* @ts-ignore - Ignoring type issues with Recharts components */}
      <ResponsiveContainer width="100%" height="100%">
        {/* @ts-ignore */}
        <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          {/* @ts-ignore */}
          <XAxis dataKey="date" textAnchor="end" height={0} axisLine={false} tick={false} />
          {/* @ts-ignore */}
          <YAxis
            yAxisId="left"
            tickCount={3}
            tick={false}
            axisLine={false}
            width={0}
            tickFormatter={value => formatAsCurrency(BigInt(Math.floor(Number(value) * 1000000)), 6, "USDC", 0)}
          />
          {/* @ts-ignore */}
          <Tooltip
            formatter={formatTooltipValue}
            labelFormatter={label => `${label}`}
            contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.0)", border: "0px", fontSize: "0.7rem" }}
          />
          {/* @ts-ignore */}
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="portfolioValue"
            name="Portfolio"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
            strokeWidth={2}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
