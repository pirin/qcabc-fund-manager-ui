"use client";

import { useState } from "react";
import { baseSepolia, hardhat } from "viem/chains";
import { useAccount } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

/**
 * FaucetButton button which lets you grab eth.
 */
export const DepositTokenFaucetButton = () => {
  const { address, chain: ConnectedChain } = useAccount();

  const [loading, setLoading] = useState(false);

  const { writeContractAsync: writeMockUSDC } = useScaffoldWriteContract({ contractName: "MockUSDC" });

  const sendUSDC = async () => {
    if (!address) return;
    try {
      setLoading(true);
      await writeMockUSDC({ functionName: "mint", args: [address, 1000000000n] });
      setLoading(false);
    } catch (error) {
      console.error("⚡️ ~ file: FaucetButton.tsx:sendETH ~ error", error);
      setLoading(false);
    }
  };

  // Render only on local chain
  if (ConnectedChain?.id !== hardhat.id && ConnectedChain?.id !== baseSepolia.id) {
    return null;
  }

  return (
    <div className="ml-1">
      <button className="btn btn-secondary btn-sm px-2 rounded-full" onClick={sendUSDC} disabled={loading}>
        {!loading ? (
          <BanknotesIcon className="h-4 w-4 text-green-500" />
        ) : (
          <span className="loading loading-spinner loading-xs text-green-500"></span>
        )}
      </button>
    </div>
  );
};
