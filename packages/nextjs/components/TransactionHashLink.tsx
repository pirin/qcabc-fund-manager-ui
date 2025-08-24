"use client";

import Link from "next/link";
import { AddressCopyIcon } from "./scaffold-eth/Address/AddressCopyIcon";
import { useTargetNetwork } from "~~/hooks/scaffold-eth";
import { getBlockExplorerTxLink } from "~~/utils/scaffold-eth";

interface TransactionHashLinkProps {
  txHash: string;
}

export const TransactionHashLink = ({ txHash }: TransactionHashLinkProps) => {
  const { targetNetwork } = useTargetNetwork();
  const blockExplorerLink = getBlockExplorerTxLink(targetNetwork.id, txHash);

  const formattedTxHash = txHash ? txHash.slice(0, 6) + "..." + txHash.slice(-4) : "";

  return (
    <div className="flex items-center">
      {blockExplorerLink ? (
        <Link
          href={blockExplorerLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline whitespace-nowrap"
        >
          Txn Details
        </Link>
      ) : (
        <span>{formattedTxHash}</span>
      )}{" "}
      <AddressCopyIcon className="ml-1 h-4 w-4 cursor-pointer" address={txHash} />
    </div>
  );
};
