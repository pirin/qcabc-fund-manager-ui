"use client";

import { useState } from "react";
import { ADMIN_BUTTON, ADMIN_LABEL, ADMIN_ROW } from "../adminUiConstants";
import type { NextPage } from "next";
import { usePublicClient } from "wagmi";
import ShareholderTable from "~~/components/ShareholdersTable";
import { AddressInput } from "~~/components/scaffold-eth";
import {
  useDeployedContractInfo,
  useScaffoldReadContract,
  useScaffoldWriteContract,
  useSiteAdmins,
} from "~~/hooks/scaffold-eth";
import { isZeroAddress } from "~~/utils/scaffold-eth/common";

const Shareholders: NextPage = () => {
  const [mintMembershipTo, setMintMembershipTo] = useState<string>("");
  const [checkingMembershipBadge, setCheckingMembershipBadge] = useState<string>("");

  // Membership Badge
  const { data: membershipBadge } = useScaffoldReadContract({
    contractName: "FundManager",
    functionName: "membershipBadge",
  });

  const { data: MembershipBadge } = useDeployedContractInfo({ contractName: "MembershipBadge" });

  const { writeContractAsync: writeMembershipBadge } = useScaffoldWriteContract({ contractName: "MembershipBadge" });

  const { allowAdmin } = useSiteAdmins();
  const publicClient = usePublicClient();

  const settingsRow = ADMIN_ROW;
  const settingsLabel = ADMIN_LABEL;
  const settingsButton = ADMIN_BUTTON;

  return (
    <>
      {allowAdmin ? (
        <div className="flex flex-col w-2/3 mx-auto gap-4 mt-4">
          {/* Shareholders Section */}
          <div className="mb-6">
            <ShareholderTable />

            {/* Minting, Activating and Deactivating of Membership Badges */}
            <div className={settingsRow}>
              <p className={settingsLabel}>Membership Badge Management</p>
              {!isZeroAddress(membershipBadge || "") ? (
                <span className="flex flex-row gap-4 items-center">
                  <span className="w-96">
                    <AddressInput value={mintMembershipTo} onChange={setMintMembershipTo} placeholder="Member Wallet" />
                  </span>
                  <p className="text-sm">{checkingMembershipBadge}</p>
                  {checkingMembershipBadge === "" && (
                    <button
                      className={settingsButton}
                      disabled={!mintMembershipTo}
                      onClick={async () => {
                        try {
                          console.log("Checking membership for", mintMembershipTo);

                          if (!MembershipBadge) {
                            console.error("MembershipBadge contract info not loaded");
                            return;
                          }

                          const hasValidBadge = await publicClient?.readContract({
                            address: membershipBadge as `0x${string}`,
                            abi: MembershipBadge.abi,
                            functionName: "isMembershipValid",
                            args: [mintMembershipTo as `0x${string}`],
                          });

                          if (hasValidBadge) {
                            setCheckingMembershipBadge("Active");
                            return;
                          }

                          const hasToken = await publicClient?.readContract({
                            address: membershipBadge as `0x${string}`,
                            abi: MembershipBadge.abi,
                            functionName: "balanceOf",
                            args: [mintMembershipTo as `0x${string}`],
                          });
                          setCheckingMembershipBadge(hasToken && hasToken > 0 ? "Inactive" : "None");
                        } catch (e) {
                          console.error("Error while checking membership badge", e);
                        }
                      }}
                    >
                      Check
                    </button>
                  )}

                  {checkingMembershipBadge === "Active" && (
                    <button
                      className={settingsButton}
                      disabled={!mintMembershipTo}
                      onClick={async () => {
                        try {
                          console.log("Deactivate membership for", mintMembershipTo);
                          await (writeMembershipBadge as any)({
                            address: membershipBadge as `0x${string}`,
                            functionName: "setTokenValidity",
                            args: [mintMembershipTo as `0x${string}`, false],
                          });
                          setCheckingMembershipBadge("");
                        } catch (e) {
                          console.error("Error while deactivating membership badge", e);
                        }
                      }}
                    >
                      Deactivate
                    </button>
                  )}

                  {checkingMembershipBadge === "Inactive" && (
                    <button
                      className={settingsButton}
                      disabled={!mintMembershipTo}
                      onClick={async () => {
                        try {
                          console.log("Activating membership for", mintMembershipTo);
                          await (writeMembershipBadge as any)({
                            address: membershipBadge as `0x${string}`,
                            functionName: "setTokenValidity",
                            args: [mintMembershipTo as `0x${string}`, true],
                          });
                          setCheckingMembershipBadge("");
                        } catch (e) {
                          console.error("Error while activating membership badge", e);
                        }
                      }}
                    >
                      Activate
                    </button>
                  )}

                  {checkingMembershipBadge === "None" && (
                    <button
                      className={settingsButton}
                      disabled={!mintMembershipTo}
                      onClick={async () => {
                        try {
                          console.log("Mint membership badge for", mintMembershipTo);
                          await (writeMembershipBadge as any)({
                            address: membershipBadge as `0x${string}`,
                            functionName: "mint",
                            args: [mintMembershipTo as `0x${string}`],
                          });
                          setCheckingMembershipBadge("");
                        } catch (e) {
                          console.error("Error while minting membership badge", e);
                        }
                      }}
                    >
                      Mint Badge
                    </button>
                  )}
                  {checkingMembershipBadge && (
                    <button
                      className={settingsButton}
                      onClick={async () => {
                        setCheckingMembershipBadge("");
                        setMintMembershipTo("");
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </span>
              ) : (
                <p className="text-sm">Please set the Membership Badge NFT in the admin settings first</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-2/3 mx-auto gap-4 mt-4">
          <p className="text-2xl text-center font-bold">Sorry, you are not an admin!</p>
        </div>
      )}
    </>
  );
};

export default Shareholders;
