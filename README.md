# PeaceFeb - Now Everyone can Participate

## Project Summary

An undercollateralised loan platform which let user to earn interests with their FIL & for Storage Providers to get loans with no collateral but through profit-sharing.

## Project Description

PeaceFeb is an undercollateralised loan platform which let user to earn interests with their FIL while encouraging the participation of storage providers to increase Filecoin's storage capacity. PeaceFeb provides 0% loan to SP while enabling lenders to earn mining rewards through a profit sharing model. With PeaceFeb, SP is able to start their mining process with no initial FIL capital and can receive monthly payout as opposed to the 180 days constraint set by Filecoin.

Using PeaceFeb, reputable storage providers are able to apply for a loan. With every loan approved, SP is assigned with a new Lotus Wallet. A Lotus Wallet is programmable and can be used to perform mining operations and block rewards are automatically distributed to SP and lenders through the Lotus Wallet.

How it works

1. Filecoin holders can deposit FIL into our Loan Pool smart contract
2. Storage providers can apply for loan depending on the loan pool balance
3. Every time a loan is approved, a Lotus Wallet associated with the storage provider is created
4. Each Lotus Wallet is used to perform mining operation and can receive block rewards.
5. The rewards are then distributed to the lenders through our Treasury contract and can be claimed by the storage provider.

Why use PeaceFeb?

1. Lower entry barrier to become a SP using PeaceFeb (0 collateral & repay for loan through profit-sharing model).
2. Filecoin holders can participate in mining process by lending extra FIL
3. Block rewards can be withdrawn anytime after being received from vesting for SP & Lender (no lockup)
4. Lenders' funds are secured by our Lotus Wallet Smart Contract
5. Lenders' funds can be withdrawn anytime provided there are enough balance in Loan Pool at time of withdrawal

## Tech Stack

**Frontend**  
Programming languages: TypeScript, JavaScript  
Frameworks: ReactJS, NextJS, Wagmi, etherjs

**Backend**  
Smart Contract: Solidity  
Network: Hyperspace  
Deployment: Spheron

## Getting Started

```bash
# Install Dependencies
yarn

# Run the development server
yarn dev
```

### ENV

```bash
# Copy ENV File
cp .env.example .env.local
```

### Configs

- `src/appConfig.ts`: app name, title, SEO etc.
- `src/pages/_app.tsx`: chains, providers, wallet connectors

### Scripts

**Next.js**

```bash
# Build
yarn build

# Start server with build files
yarn start
```

**Prettier**

```bash
# Use Prettier to do Format Check for files under ./src
yarn fc

# Use Prettier to do Format Fix for files under ./src
yarn ff
```

**Contract Types**

```bash
# Generate contract types from src/contracts/*.json
yarn compile-contract-types
```

### Deployment

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/), by the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## More

Learn about components of this kit is using:

- [Next.js](https://nextjs.org/) - React Framework by Vercel
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS Framework
- [Ethers.js](https://github.com/ethers-io/ethers.js/) - Compact library for interacting with Ethereum.
- [wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- [RainbowKit](https://rainbowkit.com/) - React library for wallet connections with dApp.
- [Headless UI](https://headlessui.dev/) - Unstyled, fully accessible UI components

## License

This app is open-source and licensed under the MIT license. For more details, check the [License file](LICENSE). 
