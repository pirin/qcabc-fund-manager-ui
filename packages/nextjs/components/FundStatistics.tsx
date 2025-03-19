import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

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

  const { data: depositTokenSymbol, refetch: refetchDepositTokenSymbol } = useReadContract({
    address: depositToken || "",
    abi: DeployedContracts[31337].MockUSDC.abi,
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
    <div>
      <div className="flex justify-center items-center flex-col py-2 sm:flex-row gap-12">
        <span className="text-sm">
          Share price: <strong>{sharePrice ? parseFloat(formatUnits(sharePrice, 6)).toFixed(2) : 0}</strong>{" "}
          {depositTokenSymbol}
        </span>
        <span className="text-sm">
          Fund Total Shares: <strong>{totalSupply ? parseFloat(formatUnits(totalSupply, 6)).toFixed(2) : 0}</strong>
        </span>
        <span className="text-sm">
          Fund Total: <strong>{fundValue ? parseFloat(formatUnits(fundValue, 6)).toFixed(2) : 0}</strong>{" "}
          {depositTokenSymbol}
        </span>
        <span className="text-sm">
          Fund Portfolio: <strong>{portfolioValue ? parseFloat(formatUnits(portfolioValue, 6)).toFixed(2) : 0}</strong>{" "}
          {depositTokenSymbol}
        </span>
        <span className="text-sm">
          Fund Treasury: <strong>{treasuryBalance ? parseFloat(formatUnits(treasuryBalance, 6)).toFixed(2) : 0}</strong>{" "}
          {depositTokenSymbol}
        </span>
      </div>
      <div className="text-xs opacity-50 text-center pb-2">
        Portfolio updated{" "}
        <span title={lastPortfolioUpdate ? new Date(Number(lastPortfolioUpdate) * 1000).toLocaleString() : "N/A"}>
          {formattedLastPortfolioUpdate}
        </span>
      </div>
    </div>
  );
};

export default FundStatistics;
