import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LendForm = () => {
  const [amount, setAmount] = useState(0)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert(amount)
    // TODO: Handle submit
    event.preventDefault()
  }

  return (
    <Form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-2xl">
      <Form.Group>
        <Form.Label className="font-medium">Deposit Amount</Form.Label>
        <Form.Control
          type="number"
          value={amount}
          onChange={e => setAmount(parseInt(e.target.value))}
          required
          className="my-2 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-red-500 focus:bg-white focus:outline-none"
        />
      </Form.Group>
      <Button
        type="submit"
        className="primaryBtn mt-4 rounded-full bg-purple-500 py-2 px-4 font-medium text-white hover:bg-purple-700"
      >
        Submit
      </Button>
    </Form>
  )
}

export default LendForm
