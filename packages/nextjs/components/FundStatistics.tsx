import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { useReadContract } from "wagmi";
import { formatAsCurrency } from "~~/components/scaffold-eth";
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
          Share price: <strong>{formatAsCurrency(sharePrice, 6, depositTokenSymbol)}</strong>
        </span>
        <span className="text-sm">
          Fund Total Shares: <strong>{formatAsCurrency(totalSupply, 6, "", 0)}</strong>
        </span>
        <span className="text-sm">
          Fund Total: <strong>{formatAsCurrency(fundValue, 6, depositTokenSymbol, 0)}</strong>
        </span>
        <span className="text-sm">
          Fund Portfolio: <strong>{formatAsCurrency(portfolioValue, 6, depositTokenSymbol, 0)}</strong>
        </span>
        <span className="text-sm">
          Fund Treasury: <strong>{formatAsCurrency(treasuryBalance, 6, depositTokenSymbol, 0)}</strong>{" "}
        </span>
      </div>
      <div className="text-xs opacity-50 text-center pb-2">
        Portfolio updated{" "}
        <span title={lastPortfolioUpdate ? new Date(Number(lastPortfolioUpdate) * 1000).toUTCString() : "N/A"}>
          {formattedLastPortfolioUpdate}
        </span>
      </div>
    </div>
  );
};

export default FundStatistics;
