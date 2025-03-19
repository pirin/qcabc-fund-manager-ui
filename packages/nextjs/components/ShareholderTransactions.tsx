"use client";

import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useReadContract } from "wagmi";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { GetShareholderDocument, execute } from "~~/.graphclient";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

type TransactionRecord = {
  timestamp: string;
  type: "deposit" | "redemption";
  from: string;
  to: string;
  id: string;
};

const ShareholderTransactions = ({ refresh, shareholderAddress }: { refresh: boolean; shareholderAddress: string }) => {
  const [error, setError] = useState<any>(null);

  const [txnHistory, setTxnHistory] = useState<TransactionRecord[]>([]);

  const { data: depositToken } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "depositToken",
  });

  const { data: depositTokenSymbol } = useReadContract({
    address: depositToken || "",
    abi: DeployedContracts[31337].MockUSDC.abi, //reuse the MockUSDC contract
    functionName: "symbol",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!execute || !GetShareholderDocument) {
        return;
      }
      try {
        const { data: result } = await execute(GetShareholderDocument, { user: shareholderAddress });

        const sortedTransactionRecords = [
          ...(result?.shareholder?.deposits || []).map((txn: any) => ({
            timestamp: new Date(txn.blockTimestamp * 1000), // Convert Unix timestamp to local datetime
            type: "deposit",
            from: parseFloat(formatUnits(txn.depositAmount, 6)).toFixed(2),
            to: parseFloat(formatUnits(txn.shareTokensMinted, 6)).toFixed(2),
            id: txn.transactionHash,
          })),
          ...(result?.shareholder?.redemptions || []).map((txn: any) => ({
            timestamp: new Date(txn.blockTimestamp * 1000), // Convert Unix timestamp to local datetime
            type: "redemption",
            from: parseFloat(formatUnits(txn.shareTokensRedeemed, 6)).toFixed(2),
            to: parseFloat(formatUnits(txn.depositAmount, 6)).toFixed(2),
            id: txn.transactionHash,
          })),
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        setTxnHistory(sortedTransactionRecords);
      } catch (err) {
        setError(err);
      } finally {
      }
    };

    if (shareholderAddress) {
      fetchData();
    }
  }, [refresh, shareholderAddress]);

  if (!shareholderAddress) {
    return null;
  }

  if (txnHistory.length === 0) {
    console.log("No transactions found");
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="overflow-y-auto w-full rounded-lg">
        <table className="table-sm text-gray-400 w-full border-base-100">
          <tbody>
            {txnHistory.map((txn: any) => (
              <tr key={txn.id} className="hover:bg-base-200">
                <td className="text-right p-2 pr-6 w-1/2">
                  {txn.timestamp.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </td>
                <td className="w-min">
                  {txn.type === "deposit" ? (
                    <ArrowUpCircleIcon className="h-6 w-6 text-sky-400" />
                  ) : (
                    <ArrowDownCircleIcon className="h-6 w-6 text-violet-400" />
                  )}
                </td>
                <td className="text-left p-2 pl-6 w-1/2">
                  {txn.type === "deposit"
                    ? `Deposited ${txn.from} ${depositTokenSymbol} for 
                    ${txn.to} shares`
                    : `Redeemed ${txn.to} shares for ${txn.from} ${depositTokenSymbol}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShareholderTransactions;
