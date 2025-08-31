"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount, useReadContract } from "wagmi";
import PortfolioChart from "~~/components/PortfolioChart";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const PortfolioPage: NextPage = () => {
  const { address } = useAccount();

  const { data: membershipBadgeContract } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "membershipBadge",
  });

  const { data: hasValidMembershipBadge } = useReadContract({
    address: membershipBadgeContract || "",
    abi: DeployedContracts[84532].MembershipBadge.abi,
    functionName: "isMembershipValid",
    args: [address || ""],
  });

  if (!address) {
    return (
      <div className="flex flex-col items-center mt-10 gap-4">
        <p className="text-lg">Please connect your wallet to view portfolio performance.</p>
      </div>
    );
  }

  if (!hasValidMembershipBadge) {
    return (
      <div className="flex flex-col items-center mt-10 gap-4">
        <p className="text-lg">You need a valid membership badge to view the portfolio.</p>
        <Link href="/" className="btn btn-secondary btn-sm">
          Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 p-4">
      <h1 className="text-2xl font-semibold mb-4">Portfolio Performance</h1>
      <div className="bg-base-100 rounded-md p-4 shadow">
        <PortfolioChart />
      </div>
    </div>
  );
};

export default PortfolioPage;
