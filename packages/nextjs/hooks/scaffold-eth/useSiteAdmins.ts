import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

export const useSiteAdmins = () => {
  const { address: connectedAddress } = useAccount();

  const { data: owner } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "owner",
  });

  const admins = owner ? [owner] : [];
  admins.push(...(process.env.NEXT_PUBLIC_MANAGER_KEYS?.split(",") || []));
  const allowAdmin = !!admins.find(admin => admin === connectedAddress);

  return { allowAdmin, admins };
};
