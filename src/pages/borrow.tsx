import styles from 'styles/Home.module.scss'
import { useEffect, useState } from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Button } from 'react-bootstrap'
import { useAccount, useContract, useContractRead, useProvider } from 'wagmi'
import { LoanPoolABI } from 'abi/LoanPool'
import BorrowForm from 'components/BorrowForm'
import { ethers } from 'ethers'

export default function ApplyLoan() {
  const provider = useProvider()
  const { address } = useAccount()
  const [loanWalletArr, setLoanWalletArr] = useState([])
  const [loanPoolReadContract, setLoanPoolReadContract] = useState(null)

  const LoanPoolContract = {
    address: '0xfc17Eb6d20Cd687e493Fa113930c2FCb157a014F',
    abi: LoanPoolABI,
  }

  useEffect(() => {
    const ethersProvider = new ethers.providers.JsonRpcProvider('https://api.hyperspace.node.glif.io/rpc/v1')
    const signer = ethersProvider.getSigner(address)
    const loanPoolContract = new ethers.Contract('0xfc17Eb6d20Cd687e493Fa113930c2FCb157a014F', LoanPoolABI, signer)

    async function fetchAddrLoanPool() {
      let addrCounter = await loanPoolContract.getLoanTxnByAddress(address)
      console.log(Number(addrCounter))
    }

    address && fetchAddrLoanPool()
  }, [address])

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main + ' space-y-6'}>
        <h2 className={styles.h2Header}>Apply for Loan</h2>
        <BorrowForm />
        <h2 className={styles.h2Header}>Your Loans</h2>

        <div className="w-2/4 rounded-xl bg-white p-6 shadow-2xl">
          <h3 className={styles.h3Header}>Loan ID: 00001</h3>
          <div>
            <p className={styles.loanDesc} style={{ marginTop: 15 }}>
              Loan Wallet Addr: 0xXXXXXXXXXXX
            </p>
            <p className={styles.loanDesc}>Loan Wallet Balance: 4 tFIL</p>
            <p className={styles.loanDesc} style={{ marginBottom: 15 }}>
              Rewards: 0 tFIL
            </p>
            <div className={'mb-6 rounded-xl border border-slate-300 p-3'}>
              <h5 className={styles.loanInnerTitle}>Last Withdrawal Request</h5>
              <p className={styles.loanDesc}>Amount: 2 tFil</p>
              <p className={styles.loanDesc}>Request Time: 2023-01-23</p>
              <p className={styles.loanDesc}>Status: PENDING</p>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                className="primaryBtn rounded-full bg-purple-500 py-2 px-4 font-medium text-white hover:bg-purple-700"
              >
                Request for Withdrawal
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
