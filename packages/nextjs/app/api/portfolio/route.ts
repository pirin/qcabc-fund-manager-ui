import { NextRequest, NextResponse } from "next/server";
import { PortfolioOracle } from "./PortfolioOracle";
import { formatDistanceToNow } from "date-fns";
import { createPublicClient, createWalletClient, http, parseEventLogs } from "viem";
import { formatUnits } from "viem";
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

const publicClient = createPublicClient({
  chain: chain,
  transport: http(),
});

export async function GET(req: NextRequest) {
  try {
    const referer = req.headers?.get("referer");
    console.info(`Asking Oracles to provide current Portfolio Value ${referer ? "from: " + referer : ""}...`);
    //console.info(req);

    // Fetch portfolio value from the Oracle
    const oracle = new PortfolioOracle(fundManagerAddress);
    const value: any = await oracle.getPortfolioValue();

    console.info(
      `Oracles reported Portfolio Value as: ${value.portfolioValue} (${value.formattedValue}). Source: ${value.source}, Last updated: ${value.lastUpdated?.toISOString()} (${formatDistanceToNow(value.lastUpdated)} ago), Oracle Value Deviation: ${
        value.priceDeviation ? value.priceDeviation.toFixed(2) + "%" : "N/A"
      }`,
    );

    //throw an exception if the portfolio is stale
    if (process.env.NEXT_PUBLIC_ORACLE_STALE_THRESHOLD_HOURS) {
      const hourThreshold = parseInt(process.env.NEXT_PUBLIC_ORACLE_STALE_THRESHOLD_HOURS);
      console.info(`Oracle stale threshold: ${hourThreshold} hours`);
      if (value.lastUpdated && Date.now() - value.lastUpdated.getTime() > hourThreshold * 1000 * 60 * 60) {
        const error = `Oracle provided portfolio value is STALE and was IGNORED! Rported Update: ${value.lastUpdated.toISOString()} (${formatDistanceToNow(value.lastUpdated)} ago (max threshold is ${hourThreshold} hours)`;
        console.error(error);
        throw new Error(error);
      }
    }

    //throw an exception if oracles report differences in portfolio value
    if (value.priceDeviation && process.env.NEXT_PUBLIC_ORACLE_DEVIATION_THRESHOLD_PCT) {
      const deviationThreshold = parseInt(process.env.NEXT_PUBLIC_ORACLE_DEVIATION_THRESHOLD_PCT);
      console.info(`Oracle value deviation threshold: ${deviationThreshold}%`);
      if (value.priceDeviation > deviationThreshold) {
        const error = `Oracles disagree on the portfolio value by ${value.priceDeviation.toFixed(2)} % (max threshold is ${deviationThreshold}%)`;
        console.error(error);
        throw new Error(error);
      }
    }

    const url = new URL(req.url);
    if (url.searchParams.has("holdings")) {
      console.info(`Oracle value is good! Request is just for the portfolio holdings. Returning portfolio holdings...`);
      return NextResponse.json({
        portfolioValue: value.portfolioValue,
        lastUpdated: value.lastUpdated.toISOString(),
        oraclePortfolioValueDeviation: value.priceDeviation ? value.priceDeviation.toFixed(2) + "%" : "N/A",
        source: value.source,
        holdings: value.holdings,
      });
    }

    console.info(`Oracle value is good! Publishing to ${chainName}...`);

    // Only try to update the contract if we have valid contract info
    let txHash = null;
    let logs = null;
    let balance = null;
    if (fundManagerAddress && fundManagerAbi) {
      // Send transaction to update portfolio value on-chain
      txHash = await walletClient.writeContract({
        address: fundManagerAddress,
        abi: fundManagerAbi,
        functionName: "setPortfolioValue",
        args: [value.formattedValue],
      });

      // Wait for transaction receipt and extract logs
      console.info(`Waiting for transaction receipt...`);
      const receipt = await publicClient.waitForTransactionReceipt({ hash: txHash });

      logs = parseEventLogs({
        abi: fundManagerAbi,
        logs: receipt.logs,
      }).map(log => {
        return {
          event: log.eventName,
          args: log.args,
        };
      });

      console.info(`Transaction confirmed with ${logs.length} logs`);

      // Retrieve the native balance of the wallet client
      balance = await publicClient.getBalance({
        address: account.address,
      });

      console.info(`Remaining oracle balance: ${balance}`);
      //console.info(logs);
    }

    console.info(`Published!`);

    const timestamp = Date.now().toString();

    return NextResponse.json({
      portfolioValue: value.portfolioValue,
      lastUpdated: value.lastUpdated.toISOString(),
      oraclePortfolioValueDeviation: value.priceDeviation ? value.priceDeviation.toFixed(2) + "%" : "N/A",
      source: value.source,
      txTimestamp: new Date(parseInt(timestamp)).toISOString(),
      txHash,
      onChainUpdateSuccess: !!txHash,
      oracleBalance: balance ? parseFloat(formatUnits(balance, 18)).toFixed(4) : "N/A",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: (error as Error).message,
        onChainUpdateSuccess: false,
      },
      { status: 500 },
    );
  }
}
