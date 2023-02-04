import styles from 'styles/Home.module.scss'
import { useState } from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Button } from 'react-bootstrap'
import { useContract, useProvider } from 'wagmi'
import BorrowForm from 'components/BorrowForm'

export default function Borrow() {
  const provider = useProvider()

  console.log('provider', provider)
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
