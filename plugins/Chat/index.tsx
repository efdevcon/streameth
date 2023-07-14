"use client";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const ChatBar = ({ conversationId }: { conversationId: string }) => {
  const { isDisconnected, address: userAddress, isConnecting } = useAccount();

  if (isConnecting) {
    return <div>Loading</div>;
  }

  return (
    <>
      {isDisconnected ? (
          <iframe
            className="h-full"
            src={`https://stingray-app-u9f8x.ondigitalocean.app/${conversationId}?isCastr=${true}`}
          />
      ) : (
        <iframe
          className=" rounded w-full p-4"
          src={`https://stingray-app-u9f8x.ondigitalocean.app/${conversationId}?isCastr=${false}&address=${userAddress}`}
        />
      )}
    </>
  );
};

export default ChatBar;
