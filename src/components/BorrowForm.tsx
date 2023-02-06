import { LoanPoolABI } from 'abi/LoanPool'
import styles from 'styles/Home.module.scss'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useAccount, useContractWrite, usePrepareContractWrite, useBalance } from 'wagmi'
import { MockData } from '../../public/mock_data'

const BorrowForm = () => {
  const [amount, setAmount] = useState(0)
  const [loanableAmt, setLoanableAmt] = useState('')
  const { address } = useAccount()
  const loanPoolAddress = '0x3E78028Ebc699C5354e5954f0D3C717306534D09'

  const { config } = usePrepareContractWrite({
    address: loanPoolAddress,
    abi: LoanPoolABI,
    functionName: 'applyLoan',
    ...(amount > 0 && {
      args: [ethers.utils.parseEther(amount.toFixed(2).toString()), 'NoPasswordNoEntry'],
    }),
  })

  const { data: balanceData } = useBalance({
    address: loanPoolAddress,
  })

  const { data: applyLoanData, isLoading, isSuccess, write: applyLoan } = useContractWrite(config)

  const verifyAddress = address => {
    for (let i = 0; i < MockData.length; i++) {
      if (address === MockData[i].address && MockData[i].reputation_score >= 95) {
        return true
      }
    }
    return false
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(verifyAddress(address))
    // if (!verifyAddress(address)) {
    //   alert('You are not eligible for a loan')
    //   return
    // }
    if (amount <= Number(loanableAmt)) {
      setAmount(amount)
      await applyLoan()
    } else {
      alert('Please enter a valid amount')
    }
  }

  useEffect(() => {
    address && setLoanableAmt(Number((Number(balanceData?.formatted) / 3) * Math.random()).toFixed(2))
  }, [balanceData, address])

  return (
    <div className="w-2/5 rounded-lg bg-white p-6 shadow-2xl">
      <div className="flex w-full flex-wrap items-center justify-center">
        <div className="flex flex-col">
          <p className="text-xl font-medium">Pool Loanable Balance</p>
          <p className={styles.balanceAmt}>{balanceData?.formatted ?? 0} FIL</p>
        </div>
      </div>
      <div className="align-center mt-4 flex flex-col justify-center">
        <p className="self-center text-2xl font-medium">Your Loanable Amount</p>
        <p className={styles.loanAmt}>{loanableAmt ? loanableAmt : '0'} FIL</p>
        <div className="mt-4 flex w-full justify-center">
          <Form onSubmit={handleSubmit} className="align-center flex flex-col">
            <Form.Group>
              <Form.Label className="text-xl font-medium">Amount to Loan</Form.Label>
              <Form.Control
                type="number"
                name="fund Amount"
                value={amount}
                onChange={e => setAmount(parseInt(e.target.value))}
                required
                className="my-2 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-red-500 focus:bg-white focus:outline-none"
              />
            </Form.Group>
            <Button
              type="submit"
              className="primaryBtn mt-4 self-center rounded-full bg-purple-500 py-2 px-4 font-medium text-white hover:bg-purple-700"
            >
              Get Loan
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default BorrowForm
