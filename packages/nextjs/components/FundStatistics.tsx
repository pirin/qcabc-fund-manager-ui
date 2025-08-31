import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useReadContract } from "wagmi";
import { formatAsCurrency } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type FundStatisticsProps = {
  refresh?: boolean;
};

const FundStatistics = ({ refresh }: FundStatisticsProps) => {
  const { data: depositToken, refetch: refetchDepositToken } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "depositToken",
  });

  const { data: totalSupply, refetch: refetchTotalSupply } = useScaffoldReadContract({
    contractName: "ShareToken",
    functionName: "totalSupply",
  });

  const { data: portfolioValue, refetch: refetchPortfolioValue } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "portfolioValue",
  });

  const { data: lastPortfolioUpdate, refetch: refetchLastPortfolioUpdate } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "lastPortfolioValueUpdated",
  });

  const formattedLastPortfolioUpdate = lastPortfolioUpdate
    ? formatDistanceToNow(new Date(Number(lastPortfolioUpdate) * 1000), { addSuffix: true })
    : "N/A";

  const { data: fundValue, refetch: refetchFundValue } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "totalFundValue",
  });

  const { data: sharePrice, refetch: refetchSharePrice } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "sharePrice",
  });

  const { data: treasuryBalance, refetch: refetchTreasuryBalance } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "treasuryBalance",
  });

  const { data: MockUSDC } = useDeployedContractInfo({ contractName: "MockUSDC" });

  const { data: depositTokenSymbol, refetch: refetchDepositTokenSymbol } = useReadContract({
    address: depositToken || "",
    abi: MockUSDC?.abi,
    functionName: "symbol",
  });

  // Effect to refresh all data when the refresh prop changes
  useEffect(() => {
    const refreshAllData = async () => {
      try {
        await Promise.all([
          refetchTotalSupply(),
          refetchPortfolioValue(),
          refetchLastPortfolioUpdate(),
          refetchFundValue(),
          refetchSharePrice(),
          refetchTreasuryBalance(),
          refetchDepositToken(),
          refetchDepositTokenSymbol(),
        ]);
      } catch (error) {
        console.error("Error refreshing fund statistics:", error);
      }
    };

    refreshAllData();
  }, [
    refresh,
    refetchTotalSupply,
    refetchPortfolioValue,
    refetchLastPortfolioUpdate,
    refetchFundValue,
    refetchSharePrice,
    refetchTreasuryBalance,
    refetchDepositToken,
    refetchDepositTokenSymbol,
  ]);

  return (
    <div className="py-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase opacity-70">Share Price</span>
          <span className="mt-1 text-sm font-semibold">
            {formatAsCurrency(sharePrice, 6, String(depositTokenSymbol || ""))}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase opacity-70 text-center">Total Shares</span>
          <span className="mt-1 text-sm font-semibold">{formatAsCurrency(totalSupply, 6, "", 0)}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase opacity-70">Fund Total</span>
          <span className="mt-1 text-sm font-semibold">
            {formatAsCurrency(fundValue, 6, String(depositTokenSymbol || ""), 0)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase opacity-70">Portfolio</span>
          <span className="mt-1 text-sm font-semibold">
            {formatAsCurrency(portfolioValue, 6, String(depositTokenSymbol || ""), 0)}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase opacity-70">Treasury</span>
          <span className="mt-1 text-sm font-semibold">
            {formatAsCurrency(treasuryBalance, 6, String(depositTokenSymbol || ""), 0)}
          </span>
        </div>
      </div>
      <div className="text-xs opacity-50 text-center mt-4">
        Portfolio updated{" "}
        <span title={lastPortfolioUpdate ? new Date(Number(lastPortfolioUpdate) * 1000).toUTCString() : "N/A"}>
          {formattedLastPortfolioUpdate}
        </span>
      </div>
    </div>
  );
};

export default FundStatistics;
