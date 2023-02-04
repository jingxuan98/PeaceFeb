import styles from 'styles/Home.module.scss'
import { useState } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance } from 'wagmi'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnectModal, useAccountModal, useChainModal } from '@rainbow-me/rainbowkit'
import { useSignMessage } from 'wagmi'
import Header from 'components/Header'
import Footer from 'components/Footer'
import LendForm from 'components/LendForm'

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

function Main() {
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  })
  const { openConnectModal } = useConnectModal()
  const { openAccountModal } = useAccountModal()
  const { openChainModal } = useChainModal()

  return (
    <main className={styles.main + ' space-y-6'}>
      <h2 className={styles.h2Header}>Earn Interest with Your FILs</h2>
      {/* <p className="header-desc">FEVMs Reward Sharing Undercollateralised Loan Platform</p> */}
      <div className="text-left">
        <LendForm />
      </div>
    </main>
  )
}

function SignMsg() {
  const [msg, setMsg] = useState('Dapp Starter')
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: msg,
  })
  const signMsg = () => {
    if (msg) {
      signMessage()
    }
  }

  return (
    <>
      <p>
        <input value={msg} onChange={e => setMsg(e.target.value)} className="rounded-lg p-1" />
        <button
          disabled={isLoading}
          onClick={() => signMsg()}
          className="ml-1 rounded-lg bg-blue-500 py-1 px-2 text-white transition-all duration-150 hover:scale-105"
        >
          Sign
        </button>
      </p>
      <p>
        {isSuccess && <span>Signature: {data}</span>}
        {isError && <span>Error signing message</span>}
      </p>
    </>
  )
}
