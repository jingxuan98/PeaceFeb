import ConnectWallet from 'components/Connect/ConnectWallet'
import HeaderButton from './HeaderButton'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/router'

const Header = () => {
  const { address } = useAccount()
  const router = useRouter()

  const handleClick = e => {
    e.preventDefault()
    router.push('/borrow')
  }

  const verifyAddress = () => {
    let verified = true

    return verified
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg relative flex w-full items-center justify-between px-16 py-8">
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="logo" className="h-14" />
            {/* TODO: Change to link to redirect */}
            <HeaderButton text="LEND" icon="/lend.png" href="#" className="ml-20" />
            {verifyAddress() && (
              <HeaderButton onClick={handleClick} text="BORROW" icon="/borrow.png" href="#" className="ml-10" />
            )}
          </div>
          <div className="flex flex-row-reverse items-center">
            <ConnectWallet />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
