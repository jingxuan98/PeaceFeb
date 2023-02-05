/* eslint-disable react-hooks/exhaustive-deps */
import { LoanPoolABI } from 'abi/LoanPool'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useAccount, useBalance, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { treasuryABI } from 'abi/Treasury'
import styles from 'styles/Home.module.scss'

const LendForm = () => {
  const [amount, setAmount] = useState(0)
  const [funderDeposit, setFunderDeposit] = useState(0)
  const [funderInterest, setFunderInterest] = useState(0)
  const { address } = useAccount()
  const loanPoolAddress = '0x3E78028Ebc699C5354e5954f0D3C717306534D09'
  const treasuryAddress = '0xcF8776Fc79ef0cdD0d918fD3F0Ec1Ade525706eB'
  const ethersProvider = new ethers.providers.JsonRpcProvider('https://api.hyperspace.node.glif.io/rpc/v1')
  const signer = ethersProvider.getSigner(address)
  const loanPoolContract = new ethers.Contract(loanPoolAddress, LoanPoolABI, signer)
  const treasureContract = new ethers.Contract(treasuryAddress, treasuryABI, signer)

  const { config } = usePrepareContractWrite({
    address: loanPoolAddress,
    abi: LoanPoolABI,
    functionName: 'fundPool',
    ...(amount > 0 && {
      overrides: {
        from: address,
        value: ethers.utils.parseEther(amount.toString()),
      },
    }),
  })
  const { data: fundPoolData, write: fundPool } = useContractWrite(config)

  const { config: harvestConfig } = usePrepareContractWrite({
    address: treasuryAddress,
    abi: treasuryABI,
    functionName: 'claimAll',
  })
  const { data: claimAllData, write: claimAll } = useContractWrite(harvestConfig)

  const { data: balanceData } = useBalance({
    address: loanPoolAddress,
  })

  useEffect(() => {
    async function fetchFunderDeposit() {
      let funderAmount = await loanPoolContract.getFundersAmount(address)
      setFunderDeposit(Number(ethers.utils.formatUnits(funderAmount)))
      // console.log('Test', ethers.utils.formatUnits(funderAmount))
    }

    async function fetchFunderInterest() {
      let funderAmount = await treasureContract.getAllocation(address)
      setFunderInterest(Number(ethers.utils.formatUnits(funderAmount)))
      // setFunderDeposit(Number(ethers.utils.formatUnits(funderAmount)))
      // console.log('Test', ethers.utils.formatUnits(funderAmount))
    }

    address && fetchFunderDeposit() && fetchFunderInterest()
  }, [address])

  const fundPoolWrite = async (amt: number) => {
    // @ts-ignore
    await fundPool()
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: Handle submit
    event.preventDefault()

    await fundPoolWrite(amount)
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-2xl">
      <div className="flex flex-col">
        <p className="selc-center text-xl font-medium">Pool Balance</p>
        <p className={styles.lendAmt}>{balanceData?.formatted} FIL</p>
      </div>
      <div style={{ width: 530 }} className="flex w-full flex-wrap items-center justify-evenly">
        <div className="flex flex-col">
          <p className="text-xl font-medium">Lent Balance</p>
          <p className={styles.lendAmt}>{funderDeposit} FIL</p>
        </div>
        <div className="align-center flex flex-col justify-center">
          <p className="self-center text-xl font-medium">Your Interest Earned</p>
          <p className={styles.lendAmt}>{funderInterest} FIL</p>
        </div>
      </div>
      <div className="mt-8 flex w-full justify-center">
        <Form style={{ width: 400 }} onSubmit={handleSubmit} className="flex flex-col justify-center">
          <Form.Group className="align-center flex flex-col">
            <Form.Label>
              <span className="text-xl font-medium">Amount to Lend</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="fund Amount"
              value={amount}
              onChange={e => setAmount(parseInt(e.target.value))}
              required
              className="my-2 w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-red-500 focus:bg-white focus:outline-none"
            />
          </Form.Group>
          <div className="flex w-full justify-evenly">
            <Button
              onClick={async () => await claimAll()}
              className="secondarybtn mt-1 rounded-full bg-purple-500 py-2 px-4 font-medium text-white hover:bg-purple-700"
            >
              Harvest
            </Button>
            <Button
              type="submit"
              className="primaryBtn mt-1 rounded-full bg-purple-500 py-2 px-4 font-medium text-white hover:bg-purple-700"
            >
              Lend
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default LendForm
