import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import * as chains from "viem/chains";
import deployedContracts from "~~/contracts/deployedContracts";

// Disable caching
export const revalidate = 0;

// Get account from private key
const PRIVATE_KEY = process.env.PORTFOLIO_UPDATER_PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error("PORTFOLIO_UPDATER_PRIVATE_KEY environment variable is required");
}
const account = privateKeyToAccount(PRIVATE_KEY as `0x${string}`);

// Determine chain ID and RPC URL based on environment
const rpcUrl = process.env.CHAIN_RPC_URL;
if (!rpcUrl) {
  throw new Error("CHAIN_RPC_URL environment variable is required");
}

const chainName = process.env.CHAIN_NAME;
if (!chainName) {
  throw new Error("CHAIN_NAME environment variable is required");
}

const chain =
  process.env.CHAIN_NAME && process.env.CHAIN_NAME in chains
    ? chains[chainName as keyof typeof chains]
    : chains.baseSepolia;

const chainId = chain.id;

// Get contract info
const fundManagerAddress = deployedContracts[chainId as keyof typeof deployedContracts]?.FundManager?.address;
const fundManagerAbi = deployedContracts[chainId as keyof typeof deployedContracts]?.FundManager?.abi;

// Create wallet client
const walletClient = createWalletClient({
  account,
  chain: chain,
  transport: http(rpcUrl),
});

export async function GET(req: NextRequest) {
  try {
    console.info(`Starting Portfolio Update from ${req.ip}...`);

    // Generate random portfolio value (for simulation)
    const { formattedValue, portfolioValue } = getPortfolioValue();

    console.info(`Portfolio Value is: ${portfolioValue}`);

    console.info(`Publishing to ${chainName}...`);

    // Only try to update the contract if we have valid contract info
    let txHash = null;
    if (fundManagerAddress && fundManagerAbi) {
      // Send transaction to update portfolio value on-chain
      txHash = await walletClient.writeContract({
        address: fundManagerAddress,
        abi: fundManagerAbi,
        functionName: "setPortfolioValue",
        args: [formattedValue],
      });
    }

    console.info(`Published!`);

    const timestamp = Date.now().toString();

    return NextResponse.json({
      portfolioValue,
      timestamp,
      txHash,
      onChainUpdateSuccess: !!txHash,
    });
  } catch (error) {
    console.error("Error updating portfolio value:", error);

    return NextResponse.json(
      {
        error: (error as Error).message,
        onChainUpdateSuccess: false,
      },
      { status: 500 },
    );
  }
}

function getPortfolioValue() {
  const min = 10000;
  const max = 100000;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  const portfolioValue = randomNumber * 1000000;

  // Format value with proper decimals (USDC has 6 decimals)
  const formattedValue = BigInt(portfolioValue);
  return { formattedValue, portfolioValue };
}
