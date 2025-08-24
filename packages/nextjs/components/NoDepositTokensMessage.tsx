"use client";

import { useState } from "react";
import { baseSepolia, hardhat } from "viem/chains";
import { useAccount, useReadContract } from "wagmi";
import { useDeployedContractInfo, useScaffoldWriteContract, useTargetNetwork } from "~~/hooks/scaffold-eth";

interface NoTokensMessageProps {
  depositToken: string;
  onDepositTokensMinted?: () => void;
}

/**
 * FaucetButton button which lets you grab eth.
 */
export const DepositTokenFaucetButton = () => {
  return <div className="ml-1"></div>;
};

/**
 * Component displayed when the user has no deposit tokens available
 */
const NoDepositTokensMessage: React.FC<NoTokensMessageProps> = ({ depositToken, onDepositTokensMinted }) => {
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id || targetNetwork.id === baseSepolia.id;

  const { address, chain: ConnectedChain } = useAccount();

  const [loading, setLoading] = useState(false);

  const { writeContractAsync: writeMockUSDC } = useScaffoldWriteContract({ contractName: "MockUSDC" });

  const { data: MockUSDC } = useDeployedContractInfo({ contractName: "MockUSDC" });

  const { data: depositTokenSymbol } = useReadContract({
    address: depositToken || "",
    abi: MockUSDC?.abi,
    functionName: "symbol",
  });

  const sendUSDC = async () => {
    if (!address) return;
    try {
      setLoading(true);
      await writeMockUSDC({ functionName: "mint", args: [address, 1000000000n] });
      setLoading(false);
      onDepositTokensMinted?.();
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
    <div className="flex flex-col items-center justify-center p-6 mt-4">
      <div className="text-amber-600 text-5xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <p className="text-lg mb-2 font-medium">{`No ${depositTokenSymbol}`} Available</p>
      <p className="text-sm text-gray-500 mb-6 max-w-xs">
        {`You need to acquire some ${depositTokenSymbol} tokens before you can invest in the fund.`}
      </p>
      {!isLocalNetwork ? (
        <a
          href="https://app.uniswap.org/swap?chain=base&inputCurrency=NATIVE&outputCurrency=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-sm"
        >
          Get {String(depositTokenSymbol || "")} Tokens
        </a>
      ) : (
        <button className="btn btn-primary btn-sm" onClick={sendUSDC} disabled={loading}>
          {`Get ${depositTokenSymbol} Tokens`}
        </button>
      )}
    </div>
  );
};

export default NoDepositTokensMessage;
