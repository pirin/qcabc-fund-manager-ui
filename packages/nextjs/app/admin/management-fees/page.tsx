"use client";

import { useEffect, useState } from "react";
import { ADMIN_SECTION_HEADER } from "../adminUiConstants";
import type { NextPage } from "next";
import { useReadContract } from "wagmi";
import { GetManagementFeesDocument, execute } from "~~/.graphclient";
import { TransactionHashLink } from "~~/components/TransactionHashLink";
import { formatAsCurrency } from "~~/components/scaffold-eth";
import { Address } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useSiteAdmins } from "~~/hooks/scaffold-eth";

type ManagementFeeRecord = {
  id: string;
  feeAmount: string;
  depositor: string;
  depositAmount: string;
  blockTimestamp: number;
  transactionHash: string;
};

const ManagementFees: NextPage = () => {
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [managementFees, setManagementFees] = useState<ManagementFeeRecord[]>([]);

  // Deposit token + Treasury (management fee recipient) info
  const { data: MockUSDC } = useDeployedContractInfo({ contractName: "MockUSDC" });

  const { data: depositToken } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "depositToken",
  });

  const { data: treasuryWallet } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "managementFeeRecipient",
  });

  const { data: depositTokenSymbol } = useReadContract({
    address: depositToken || "",
    abi: MockUSDC?.abi,
    functionName: "symbol",
  });

  const { data: treasuryWalletBalance } = useReadContract({
    address: depositToken || "",
    abi: MockUSDC?.abi,
    functionName: "balanceOf",
    args: [treasuryWallet || "0x0000000000000000000000000000000000000000"],
  });

  const { allowAdmin } = useSiteAdmins();

  useEffect(() => {
    const fetchManagementFees = async () => {
      if (!execute || !GetManagementFeesDocument) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { data: result } = await execute(GetManagementFeesDocument, {});

        if (result?.managementFeeCollecteds) {
          setManagementFees(result.managementFeeCollecteds);
        }
      } catch (err) {
        console.error("Error fetching management fees:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchManagementFees();
  }, []);

  const sectionHeader = ADMIN_SECTION_HEADER;

  return (
    <>
      {allowAdmin ? (
        <div className="flex flex-col w-4/5 mx-auto gap-4 mt-4">
          <div className="mb-6">
            <p className={sectionHeader}>Management Fees Collected</p>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <span className="loading loading-spinner loading-md"></span>
                <span className="ml-2">Loading management fees...</span>
              </div>
            ) : error ? (
              <div className="alert alert-error">
                <span>Error loading management fees: {error.message || "Unknown error"}</span>
              </div>
            ) : managementFees.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No management fees have been collected yet.</div>
            ) : (
              <div className="overflow-x-auto">
                {/* Summary */}
                <div className="stats bg-base-200 shadow w-full mt-6 rounded-md">
                  {/* Treasury Balance */}
                  <div className="stat">
                    <div className="stat-title">Treasury Wallet Balance</div>
                    <div className="stat-value text-lg">
                      {treasuryWalletBalance !== undefined
                        ? formatAsCurrency(treasuryWalletBalance as any, 6, String(depositTokenSymbol || "USDC"))
                        : "—"}
                    </div>
                  </div>
                  {/* Total Volume */}
                  <div className="stat">
                    <div className="stat-title">Total Volume</div>
                    <div className="stat-value text-lg">
                      {formatAsCurrency(
                        BigInt(Math.floor(managementFees.reduce((sum, fee) => sum + parseFloat(fee.depositAmount), 0))),
                        6,
                        String(depositTokenSymbol || "USDC"),
                      )}
                    </div>
                  </div>
                  {/* Average Fee % */}
                  <div className="stat">
                    <div className="stat-title">Average Fee %</div>
                    <div className="stat-value text-lg text-blue-600">
                      {managementFees.length > 0
                        ? (
                            managementFees.reduce(
                              (sum, fee) => sum + (parseFloat(fee.feeAmount) / parseFloat(fee.depositAmount)) * 100,
                              0,
                            ) / managementFees.length
                          ).toFixed(2)
                        : "0.00"}
                      %
                    </div>
                  </div>
                  {/* Total Fees Collected */}
                  <div className="stat">
                    <div className="stat-title">Total Fees Collected</div>
                    <div className="stat-value text-lg text-green-600">
                      {formatAsCurrency(
                        BigInt(Math.floor(managementFees.reduce((sum, fee) => sum + parseFloat(fee.feeAmount), 0))),
                        6,
                        String(depositTokenSymbol || "USDC"),
                      )}
                    </div>
                  </div>
                </div>

                <table className="table table-sm w-full mt-8">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Depositor</th>
                      <th>Deposit Amount</th>
                      <th>Fee Amount</th>
                      <th>Fee %</th>
                      <th>Transaction</th>
                    </tr>
                  </thead>
                  <tbody>
                    {managementFees.map(fee => (
                      <tr key={fee.id} className="hover">
                        <td className="whitespace-nowrap">
                          {new Date(fee.blockTimestamp * 1000).toLocaleString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </td>
                        <td>
                          <Address address={fee.depositor} />
                        </td>
                        <td>{formatAsCurrency(BigInt(fee.depositAmount), 6, String(depositTokenSymbol || "USDC"))}</td>
                        <td>
                          <span className="text-green-600 font-medium">
                            {formatAsCurrency(BigInt(fee.feeAmount), 6, String(depositTokenSymbol || "USDC"))}
                          </span>
                        </td>
                        <td>
                          <span className="text-blue-600 font-medium">
                            {((parseFloat(fee.feeAmount) / parseFloat(fee.depositAmount)) * 100).toFixed(2)}%
                          </span>
                        </td>
                        <td>
                          <TransactionHashLink txHash={fee.transactionHash} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-2/3 mx-auto gap-4 mt-4">
          <p className="text-2xl text-center font-bold">Sorry, you are not an admin!</p>
        </div>
      )}
    </>
  );
};

export default ManagementFees;
