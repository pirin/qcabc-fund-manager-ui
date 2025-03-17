# QCABC Fund Manager UI Development Guide

## Commands
- **Start development server**: `yarn start` or `yarn dev`
- **Build**: `yarn next:build`
- **Lint**: `yarn next:lint`
- **Format**: `yarn next:format`
- **Type checking**: `yarn next:check-types`
- **Deploy to Vercel**: `yarn vercel` or `yarn vercel:yolo` (ignore build errors)
- **GraphClient**: `yarn gc-dev` (development) or `yarn gc-build` (build)

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

## Blockchain Integration
- Uses wagmi, viem, and RainbowKit for Web3 connectivity
- Smart contract interaction through scaffold-eth patterns in /hooks/scaffold-eth