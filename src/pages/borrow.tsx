import styles from 'styles/Home.module.scss'
import { useState } from 'react'

export default function Borrow() {
  return (
    <main className={styles.main + ' space-y-6'}>
      <h2 className={styles.h2Header}>Earn Interest with Your FILs</h2>
      {/* <p className="header-desc">FEVMs Reward Sharing Undercollateralised Loan Platform</p> */}
      <div className="text-center">Borrow</div>
    </main>
  )
}
