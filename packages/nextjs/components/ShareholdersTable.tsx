"use client";

import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { GetShareholdersDocument, execute } from "~~/.graphclient";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const ShareholdersTable = () => {
  const [ShareholdersData, setShareholdersData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const { data: totalShares } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "totalShares",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!execute || !GetShareholdersDocument) {
        return;
      }
      try {
        const { data: result } = await execute(GetShareholdersDocument, {});
        setShareholdersData(result);
        console.log(result);
      } catch (err) {
        setError(err);
      } finally {
      }
    };

    fetchData();
  }, []);

  if (error) {
    return null;
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="overflow-x-auto rounded-md w-fill">
        <table className="table bg-base-100 table-zebra">
          <thead>
            <tr className="rounded-md text-base">
              <th className="bg-primary"></th>
              <th className="bg-primary">Shareholder</th>
              <th className="bg-primary">Shares</th>
            </tr>
          </thead>
          <tbody>
            {ShareholdersData?.shareholders?.map((shareholder: any, index: number) => (
              <tr key={shareholder.account}>
                <th>{index + 1}</th>
                <td>
                  <Address address={shareholder?.account} format="long" />
                </td>
                <td className="text-right">{parseFloat(formatUnits(shareholder?.shares, 6)).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="rounded-md text-base">
              <th className="bg-primary"></th>
              <th className="bg-primary text-right">Total Shares:</th>
              <th className="bg-primary text-right">
                {totalShares ? parseFloat(formatUnits(totalShares, 6)).toFixed(2) : 0}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ShareholdersTable;
