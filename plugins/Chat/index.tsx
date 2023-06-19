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
        <div className="relative h-full w-full flex justify-center items-center">
          {/* <iframe
            className=" bg-white h-[calc(100%-3.6rem)]"
            src={`https://stingray-app-u9f8x.ondigitalocean.app/${conversationId}?isCastr=${true}`}
          /> */}
          <p style={{ opacity: 1 }}>Connect your account to chat</p>

          {/* <div
            className=" bg-black w-full h-full border-box p-2 flex flex-col justify-center items-center"
            style={{ opacity: 0.5, position: "absolute", top: 0 }}
          ></div> */}
        </div>
      ) : (
        <iframe
          className="h-full"
          src={`https://stingray-app-u9f8x.ondigitalocean.app/${conversationId}?isCastr=${false}&address=${userAddress}`}
        />
      )}
    </>
  );
};

export default ChatBar;
