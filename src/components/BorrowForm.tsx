import { LoanPoolABI } from 'abi/LoanPool'
import { ethers } from 'ethers'
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'

const BorrowForm = () => {
  const [amount, setAmount] = useState(0)
  const { address } = useAccount()

  const { config } = usePrepareContractWrite({
    address: '0xfc17Eb6d20Cd687e493Fa113930c2FCb157a014F',
    abi: LoanPoolABI,
    functionName: 'fundPool',
    ...(amount > 0 && {
      overrides: {
        from: address,
        value: ethers.utils.parseEther(amount.toString()),
      },
    }),
  })

  const { data: applyLoanData, isLoading, isSuccess, write: fundPool } = useContractWrite(config)

  const fundPoolWrite = async (amt: number) => {
    console.log(amt)
    console.log(amt.toString())
    // @ts-ignore
    await fundPool()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: Handle submit
    event.preventDefault()

    await fundPoolWrite(amount)
  }

  return (
    <Form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-2xl">
      <div className="text-center">
        <h2 className="text-center text-2xl font-medium">BORROW</h2>
        <text>Borrow FIL from loan pool</text>
      </div>
      <Form.Group>
        <Form.Label className="font-medium">Loan Amount</Form.Label>
        <Form.Control
          type="number"
          name="fund Amount"
          value={amount}
          onChange={e => setAmount(parseInt(e.target.value))}
          required
          className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-red-500 focus:bg-white focus:outline-none"
        />
      </Form.Group>
      <Button
        type="submit"
        className="primaryBtn rounded-full bg-purple-500 py-2 px-4 font-medium text-white hover:bg-purple-700"
      >
        Submit
      </Button>
    </Form>
  )
}

export default BorrowForm
