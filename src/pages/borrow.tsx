import styles from 'styles/Home.module.scss'
import { useEffect, useMemo, useState } from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Button } from 'react-bootstrap'
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
  useWaitForTransaction,
} from 'wagmi'
import { LoanPoolABI } from 'abi/LoanPool'
import BorrowForm from 'components/BorrowForm'
import { ethers } from 'ethers'
import { LotusWalletABI } from 'abi/PFLotusWallet'

export default function ApplyLoan() {
  const provider = useProvider()
  const { address } = useAccount()
  const [isLoading, setLoading] = useState(false)
  const [loanTxs, setLoantxs] = useState([])
  const [loanWalletArr, setLoanWalletArr] = useState([])
  const [callLoanWalletAddr, setCallLoanWalletAddr] = useState('')
  const loanPoolAddr = '0x3E78028Ebc699C5354e5954f0D3C717306534D09'
  const ethersProvider = useMemo(
    () => new ethers.providers.JsonRpcProvider('https://api.hyperspace.node.glif.io/rpc/v1'),
    []
  )

  const { config } = usePrepareContractWrite({
    // @ts-ignore
    address: callLoanWalletAddr,
    abi: LotusWalletABI,
    functionName: 'claimRewardsAll',
    enabled: Boolean(callLoanWalletAddr),
  })

  const { data: withdrawAllData, write: withdrawAll } = useContractWrite(config)

  const { isSuccess } = useWaitForTransaction({
    hash: withdrawAllData?.hash,
  })

  useEffect(() => {
    if (!address) return
    setLoading(true)
    const signer = ethersProvider.getSigner(address)
    const loanPoolContract = new ethers.Contract(loanPoolAddr, LoanPoolABI, signer)

    async function fetchAddrLoanPool() {
      let tempLoanTxs = []
      let res: any
      let addrCounter = await loanPoolContract.getLoanTxnByAddress(address)

      res = await loanPoolContract.loanTxs(addrCounter[addrCounter.length - 1])
      console.log(res)
      if (res) {
        tempLoanTxs.push(res)
      }

      setLoantxs(tempLoanTxs)
    }

    address && fetchAddrLoanPool()
  }, [address, ethersProvider])

  useEffect(() => {
    const fetchLoanWalletDetails = async () => {
      let data = []
      for (let i = 0; i < loanTxs.length; i++) {
        let bal = await ethersProvider.getBalance(loanTxs[i].loanWalletAddr)
        const balanceInFil = ethers.utils.formatEther(bal)
        const loanWalletContract = new ethers.Contract(
          loanTxs[i].loanWalletAddr,
          LotusWalletABI,
          ethersProvider.getSigner(address)
        )

        let totalFund = await loanWalletContract.totalFund()
        let totalRewards = await loanWalletContract.totalRewards()
        let applicantRewards = await loanWalletContract.applicantRewards()
        let historicalRewards = await loanWalletContract.rewardsReceivedRecord()

        data.push({
          loanId: i + 1,
          applicant: loanTxs[i].sp,
          loanWalletAddr: loanTxs[i].loanWalletAddr,
          balance: balanceInFil,
          total: ethers.utils.formatEther(totalFund),
          totalRewards: ethers.utils.formatEther(totalRewards),
          applicantRewards: ethers.utils.formatEther(applicantRewards),
          historicalRewards: ethers.utils.formatEther(historicalRewards),
        })
      }
      setLoanWalletArr(data)
      setLoading(false)
    }

    fetchLoanWalletDetails()
  }, [loanTxs, isSuccess])

  useEffect(() => {
    if (callLoanWalletAddr == '') return
    const withhdrawAllSign = async () => {
      await withdrawAll?.()
      setCallLoanWalletAddr('')
    }

    console.log(callLoanWalletAddr)
    withhdrawAllSign()
  }, [callLoanWalletAddr])

  const renderLoanTx = data => {
    const { applicant, loanWalletAddr, balance, loanId, totalRewards, applicantRewards, historicalRewards } = data

    return (
      <div key={loanWalletAddr} className="w-2/4 rounded-xl bg-white p-6 px-12 shadow-2xl">
        <h3 className={styles.h3Header}>Loan Details</h3>
        <div>
          <p className={styles.loanDesc} style={{ marginTop: 15 }}>
            Miner Wallet Addr: {loanWalletAddr}
          </p>
          <p className={styles.loanDesc}>Loan Applicant Address: {applicant}</p>
          <p className={styles.loanDesc}>Miner Wallet Balance: {Number(balance).toFixed(2)} FIL</p>
          <p className={styles.loanDesc}>Total Rewards(Historical): {Number(historicalRewards).toFixed(2)} FIL</p>
          <p className={styles.loanDesc}>Total Undistributed Mining Rewards: {Number(totalRewards).toFixed(2)} FIL</p>
          <div className="flex flex-col">
            <p className="mt-4 self-center text-2xl font-medium">Your Mining Rewards</p>
            <p className={styles.balanceAmt}>{Number(applicantRewards).toFixed(2)} FIL</p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={async () => {
                setCallLoanWalletAddr(loanWalletAddr)
              }}
              className="primaryBtn rounded-full bg-purple-500 py-2 px-4 font-medium text-white hover:bg-purple-700"
            >
              Claim Rewards
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main + ' space-y-6'}>
        <h2 className={styles.h2Header}>Apply for Loan</h2>
        <BorrowForm />
        <h2 className={styles.h2Header}>Your Loans</h2>
        {isSuccess && (
          <div>
            Txn Successful!
            <div>
              <a href={`https://hyperspace.filfox.info/en/tx/${withdrawAllData?.hash}`}>Check on Explorer</a>
            </div>
          </div>
        )}
        {!isLoading && loanWalletArr.length > 0 ? (
          loanWalletArr.map(wallet => renderLoanTx(wallet))
        ) : (
          <p className={styles.loanDesc}>{isLoading ? 'Loading...' : 'You have no not apply any loans Yet'}</p>
        )}
      </main>
      <Footer />
    </div>
  )
}
