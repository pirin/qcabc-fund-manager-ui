# 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Wagmi, Viem, and Typescript.

- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

## Configuring Graph Client

This application uses the following Graph: https://thegraph.com/studio/subgraph/qcabc-fund-manager-graph/
(Connect Meteaverse Mask wallet)

### Updating contract addresses

Use https://github.com/pirin/qcabc-fund-manager-graph to update the published graph

[Graphclient](https://github.com/graphprotocol/graph-client?tab=readme-ov-file#features-and-goals) is installed using `yarn add -D @graphprotocol/client-cli` createadds an interace to query graphs.

Define the graph to be queried in `.graphclientrc.yml`
use `/graphql/` folder to store queries that will be exposed in the generated Schema

use `$npx graphclient build` to generate client side Typescript Libraries (written to `.graphclient` folder)

use `$npx graphclient serve-dev` to run a local client node that can be used to test the graph endpoint
