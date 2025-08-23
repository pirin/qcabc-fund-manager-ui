import TransactionComp from "../_components/TransactionComp";
import type { NextPage } from "next";
import { Hash } from "viem";
import { isZeroAddress } from "~~/utils/scaffold-eth/common";

type PageProps = {
  params: Promise<{ txHash?: Hash }>;
};

export function generateStaticParams() {
  // An workaround to enable static exports in Next.js, generating single dummy page.
  return [{ txHash: "0x0000000000000000000000000000000000000000" }];
}
const TransactionPage: NextPage<PageProps> = async ({ params }: PageProps) => {
  const { txHash } = await params;

  if (!txHash || isZeroAddress(txHash)) return null;

  return <TransactionComp txHash={txHash} />;
};

export default TransactionPage;
