"use client";
import { useContext } from "react";
import { ISession } from "@/server/model/session";
import { ShareIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import EmbedSessionModal from "@/components/sessions/EmbedSession";
import { ModalContext } from "@/components/context/ModalContext";
import ComponetCard from "../misc/ComponentCard";
import { useAsset, useAssetMetrics } from "@livepeer/react";

const SessionInfoBox = ({ session }: { session: ISession | undefined }) => {
  const modal = useContext(ModalContext);
  // const { data, isLoading } = useAsset(session?.playbackId || "");
  // const { data: metrics } = useAssetMetrics({
  //   // data.id ?? "",
  // });
  if (!session) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>There are no sessions scheduled for this stage.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full h-full ">
    <ComponetCard title={session.name}>
      <div className="flex flex-col md:flex-row w-full h-full ">
        <p className="text-main-text md:text-lg">{session.description}</p>
        <div className="flex w-full md:flex-col md:w-1/4 md:ml-auto gap-2">
          <p className="p-1 w-full md:text-lg text-secondary-text text-left mt-auto md:text-right">
            {session.start.toDateString()}
          </p>
          <div className="flex flex-row md:w-full pt-4 mt-auto">
            <CodeBracketIcon
              className="p-1 cursor-pointer ml-auto h-8 w-8 text-accent font-medium"
              onClick={() => {
                modal.openModal(
                  <EmbedSessionModal stageId={session.stageId} />
                );
              }}
            />
            <ShareIcon className="p-1 h-8 w-8 cursor-pointer ml-3 text-accent" />
          </div>
        </div>
      </div>
    </ComponetCard>
    </div>
  );
};

export default SessionInfoBox;
