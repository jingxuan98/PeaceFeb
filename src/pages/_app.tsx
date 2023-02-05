import 'styles/style.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { app } from 'appConfig'
import { useState, useEffect } from 'react'
import HeadGlobal from 'components/HeadGlobal'
// Web3Wrapper deps:
import { connectorsForWallets, RainbowKitProvider, lightTheme, darkTheme } from '@rainbow-me/rainbowkit'
import {
  injectedWallet,
  metaMaskWallet,
  braveWallet,
  coinbaseWallet,
  walletConnectWallet,
  ledgerWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { Chain } from '@rainbow-me/rainbowkit'
import { createClient, configureChains, WagmiConfig } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <HeadGlobal />
      <Web3Wrapper>
        <Component key={router.asPath} {...pageProps} />
      </Web3Wrapper>
    </ThemeProvider>
  )
}
export default App

// Add Custom Chain
// Demo purpose, gnosis is included in wagmi/chains
// import { gnosis } from 'wagmi/chains'
const hyperspaceChain: Chain = {
  id: 3141,
  name: 'Hyperspace',
  network: 'Hyperspace',
  iconUrl: 'https://chainstack.com/wp-content/themes/chainstack/img/bbw-filecoin.png',
  iconBackground: '#000',
  nativeCurrency: {
    decimals: 18,
    name: 'Hyperspace',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: {
      http: ['https://api.hyperspace.node.glif.io/rpc/v1'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Filecoin Hyperspace Explorer',
      url: 'https://hyperspace.filfox.info/en/',
    },
  },
  testnet: true,
}

// Web3 Configs
const { chains, provider } = configureChains(
  [hyperspaceChain],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID !== '' && process.env.NEXT_PUBLIC_INFURA_ID }),
    jsonRpcProvider({
      rpc: chain => {
        if (chain.id !== hyperspaceChain.id) return null
        return {
          http: `${chain.rpcUrls.default}`,
        }
      },
    }),
    publicProvider(),
  ]
)

const otherWallets = [
  braveWallet({ chains }),
  ledgerWallet({ chains }),
  coinbaseWallet({ chains, appName: app.name }),
  rainbowWallet({ chains }),
]

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [injectedWallet({ chains }), metaMaskWallet({ chains }), walletConnectWallet({ chains })],
  },
  {
    groupName: 'Other Wallets',
    wallets: otherWallets,
  },
])

const wagmiClient = createClient({ autoConnect: true, connectors, provider })

// Web3Wrapper
export function Web3Wrapper({ children }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={{
          appName: app.name,
          learnMoreUrl: app.url,
        }}
        chains={chains}
        initialChain={1} // Optional, initialChain={1}, initialChain={chain.mainnet}, initialChain={gnosisChain}
        showRecentTransactions={true}
        theme={lightTheme()}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
