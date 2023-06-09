import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useState, useEffect } from 'react'
const ChatBar = ({ conversationId }: { conversationId: string }) => {
  const { address: userAddress, isConnected } = useAccount()
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (isConnected) {
      setConnected(true)
    }
  }, [isConnected])

  if (connected) {
    return (
      <iframe className="h-full" src={`https://stingray-app-u9f8x.ondigitalocean.app/${conversationId}?isCastr=${false}&address=${userAddress}`} />
    )
  }
  return (
    <>
      <iframe className="flex h-[calc(100%-3.6rem)]" src={`https://stingray-app-u9f8x.ondigitalocean.app/${conversationId}?isCastr=${true}`} />
      <div className="flex flex-col justify-center items-center">
        <p>Connect your account to chat</p>
        <ConnectButton
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
          chainStatus="none"
        />
      </div>
    </>
  )
}

export default ChatBar
