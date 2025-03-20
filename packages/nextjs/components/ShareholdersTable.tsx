"use client";

import { useEffect, useState } from "react";
import { GetShareholdersDocument, execute } from "~~/.graphclient";
import { Address } from "~~/components/scaffold-eth";
import { formatAsCurrency } from "~~/components/scaffold-eth";
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
    <div className="flex justify-center bg-neutral-800 rounded-s-md p-4 w-full">
      <table className="table-sm w-full">
        <thead>
          <tr className="text-sm text-center border-b border-base-content">
            <th></th>
            <th></th>
            <th className="text-right">Shares</th>
          </tr>
        </thead>
        <tbody>
          {ShareholdersData?.shareholders?.map((shareholder: any, index: number) => (
            <tr key={shareholder.account}>
              <th>{index + 1}</th>
              <td>
                <Address address={shareholder?.account} format="long" />
              </td>
              <td className="text-right">{formatAsCurrency(shareholder?.shares)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td className="text-right">Total Shares:</td>
            <td className="text-right border-t-2 border-base-content">{formatAsCurrency(totalShares)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ShareholdersTable;
