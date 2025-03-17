"use client";

import React from "react";
import { RainbowKitCustomConnectButton } from "./scaffold-eth/RainbowKitCustomConnectButton";

/**
 * Component displayed when no wallet is connected
 * Instructs the user to connect their wallet to use the application
 */
const ConnectWalletMessage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-2/3 gap-4 mt-12 mb-8 py-8">
      <div className="text-primary text-6xl mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>
      </div>
      <p className="text-center text-base-content/70 max-w-md mb-8 px-4">
        To deposit funds or redeem shares, please connect your wallet.
      </p>
      <RainbowKitCustomConnectButton />
      <div className="flex items-center gap-3 text-sm p-3 mt-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-info"
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
        <span>
          New to crypto?{" "}
          <a
            href="https://ethereum.org/en/wallets/"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            Learn about wallets
          </a>
        </span>
      </div>
    </div>
  );
};

export default ConnectWalletMessage;
