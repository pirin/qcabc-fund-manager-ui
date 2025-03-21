"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PortfolioChart from "./PortfolioChart";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { useSiteAdmins } from "~~/hooks/scaffold-eth";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  type: number;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
    type: 0,
  },
  {
    label: "Administration",
    href: "/admin",
    type: 1,
  },
  // {
  //   label: "Debug Contracts",
  //   href: "/debug",
  //   icon: <BugAntIcon className="h-4 w-4" />,
  //   type: 1,
  // },
];

export const HeaderMenuLinks = (allowAdmin: boolean): JSX.Element => {
  const pathname = usePathname();

  return (
    <>
      {menuLinks
        .filter(link => allowAdmin || link.type < 1)
        .map(({ label, href, icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                passHref
                className={`${
                  isActive ? "bg-secondary shadow-md" : ""
                } hover:bg-secondary hover:shadow-md focus:!bg-secondary active:!text-neutral py-1.5 px-3 text-sm rounded-full gap-2 grid grid-flow-col`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  //const { targetNetwork } = useTargetNetwork();
  //const isLocalNetwork = targetNetwork.id === hardhat.id || targetNetwork.id === baseSepolia.id;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  const { allowAdmin } = useSiteAdmins();

  return (
    <div className="sticky lg:static top-0 navbar bg-base-100 py-0 min-h-0 flex-shrink-0 justify-between z-20 shadow-sm shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden dropdown" ref={burgerMenuRef}>
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDrawerOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDrawerOpen(prevIsOpenState => !prevIsOpenState);
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {isDrawerOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            >
              {HeaderMenuLinks(allowAdmin)}
            </ul>
          )}
        </div>
        <Link href="/" passHref className="hidden lg:flex items-center gap-2 ml-4 mr-6 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">QCABC</span>
            <span className="text-xs">Fund Manager</span>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{HeaderMenuLinks(allowAdmin)}</ul>
      </div>
      <div className="navbar-center flex-grow w-1/2">
        <PortfolioChart />
      </div>
      <div className="navbar-end mr-4">
        <RainbowKitCustomConnectButton />
        {/* {isLocalNetwork && <FaucetButton />}
        {isLocalNetwork && <DepositTokenFaucetButton />} */}
      </div>
    </div>
  );
};
