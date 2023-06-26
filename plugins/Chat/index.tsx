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
        <div className="relative flex flex-col h-96 w-full ">
          <iframe
            className=" rounded w-full p-4 h-80"
            src={`https://stingray-app-u9f8x.ondigitalocean.app/${conversationId}?isCastr=${true}`}
          />
        </div>
      ) : (
        <iframe
          className=" rounded w-full p-4 h-80"
          style={{ height: "20rem" }}
          src={`https://stingray-app-u9f8x.ondigitalocean.app/${conversationId}?isCastr=${false}&address=${userAddress}`}
        />
      )}
    </>
  );
};

export default ChatBar;
