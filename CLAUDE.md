# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# QCABC Fund Manager UI Development Guide

## Commands
- **Start development server**: `yarn start`
- **Build**: `yarn build`
- **Lint**: `yarn lint`
- **Format**: `yarn format`
- **Type checking**: `yarn check-types`
- **Deploy to Vercel**: `yarn vercel` or `yarn vercel:yolo` (ignore build errors)
- **GraphClient**: `yarn gc-dev` (development) or `yarn gc-build` (build)
- **Install dependencies**: `yarn install`

## Architecture Overview

This is a **Scaffold-ETH 2** based decentralized fund manager application built with:
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and DaisyUI
- **Blockchain**: Ethereum-compatible networks (Base Sepolia, local Foundry)
- **Web3 Stack**: wagmi v2, viem v2, RainbowKit v2 for wallet connectivity
- **State Management**: Zustand for global state
- **Data Fetching**: The Graph Protocol with GraphClient
- **Monorepo**: Yarn workspaces with packages structure

## Key Directories

### `/packages/nextjs/`
Main Next.js application with:
- `/app/` - Next.js App Router pages and API routes
- `/components/` - React components (fund-specific and scaffold-eth components)
- `/contracts/` - Smart contract ABIs and deployment info
- `/hooks/scaffold-eth/` - Custom React hooks for blockchain interactions
- `/services/` - Web3 configuration and global store
- `/utils/scaffold-eth/` - Utility functions for blockchain operations

### Key Components Architecture
- **FundStatistics**: Displays fund performance metrics and portfolio data
- **ShareholderTransactions**: Shows transaction history for fund participants
- **ShareholdersTable**: Lists all fund shareholders with their positions
- **PortfolioValueChart**: Visualizes fund performance over time
- **ConnectWalletMessage/NoDepositTokensMessage**: User onboarding components

## Blockchain Integration

### Smart Contracts
- **FundManager**: Main contract handling deposits, redemptions, and fund operations
- **MockUSDC**: Test token for local development
- Contracts deployed on Base Sepolia (testnet) and local Foundry

### Configuration
- **scaffold.config.ts**: Network configuration, API keys, wallet settings
- **Target Networks**: Base Sepolia and Base mainnet
- **Polling Interval**: 30 seconds for live networks

### The Graph Integration
- **GraphClient**: Queries fund data from The Graph Protocol
- **Queries**: GetShareholder, GetShareholders, GetPortfolioUpdates, GetManagementFees
- **Endpoint**: `https://api.studio.thegraph.com/query/49943/qcabc-fund-manager-graph/version/latest`
- **Configuration**: Located in `packages/nextjs/.graphclientrc.yml`

## Code Style Guidelines
- **Formatting**: Uses Prettier with 120 character line length, 2 space indentation
- **Imports**: Sorted using @trivago/prettier-plugin-sort-imports in this order:
  1. React, Next
  2. Third-party modules
  3. Heroicons
  4. Local imports (prefixed with `~~/`)
- **TypeScript**: Strict mode enabled, use explicit types for function parameters and returns
- **Component structure**: Use Next.js App Router conventions with /app directory
- **Error handling**: Use try/catch blocks and toast notifications for user feedback
- **Naming**: Use PascalCase for components, camelCase for functions and variables
- **State management**: Use Zustand for global state and hooks for component state

## Fund Manager Specific Features

### Core Functionality
- **Deposits**: Users can deposit USDC tokens to receive fund shares
- **Redemptions**: Shareholders can redeem shares for underlying assets
- **Portfolio Tracking**: Real-time portfolio valuation and performance metrics
- **Oracle Integration**: Portfolio value updates through oracle system
- **Admin Controls**: Administrative functions for fund management

### API Routes
- **Portfolio Oracle** (`/api/portfolio/`): Handles portfolio value updates and oracle data
- Uses POST requests for portfolio updates with stale data protection

### Development Workflow
- Uses Yarn v3 workspaces for monorepo management
- Husky for git hooks with lint-staged for pre-commit formatting
- Vercel deployment with build error bypassing capability
- GraphClient for blockchain data indexing and querying

## Testing and Quality
- **Type Checking**: `yarn next:check-types` for TypeScript validation
- **Linting**: ESLint with Next.js and Prettier configurations
- **Build**: `yarn next:build` for production builds
- **Format**: Automatic code formatting with Prettier

## Environment Configuration
- **Alchemy API**: For RPC connections (configurable via env vars)
- **WalletConnect**: For wallet connectivity (project ID configurable)
- **Vercel**: Deployment platform with build optimizations
- **Node.js**: Requires >= v18.18.0

## Important Implementation Notes
- Fund operations require wallet connection and network switching
- Portfolio updates include staleness checks to prevent outdated data
- Admin functionality restricted to specific addresses
- All monetary values handled with proper decimal precision (USDC = 6 decimals)
- Graph queries cached and optimized for performance
# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.