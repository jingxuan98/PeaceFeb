import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BorrowForm = () => {
  const [amount, setAmount] = useState(0)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: Handle submit
    event.preventDefault()
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-2xl">
      <div className="flex w-full flex-wrap items-center justify-between">
        <div className="flex">
          <text>Loanable Balance</text>
        </div>
        <div className="flex flex-row-reverse">
          {/* TODO: Update loanable balance amount*/}
          <text>0 FIL</text>
        </div>
      </div>
      <div className="mt-4">
        <Form onSubmit={handleSubmit} className="">
          <Form.Group>
            <Form.Label className="text-xl">Amount</Form.Label>
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
            className="primaryBtn mt-1 rounded-full bg-purple-500 py-2 px-4 font-medium text-white hover:bg-purple-700"
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default BorrowForm
