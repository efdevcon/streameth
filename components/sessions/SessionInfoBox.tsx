"use client";
import { useContext } from "react";
import { ISession } from "@/server/model/session";
import { ShareIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import EmbedSessionModal from "@/components/sessions/EmbedSession";
import { ModalContext } from "@/components/context/ModalContext";
import ComponetCard from "../misc/ComponentCard";

const SessionInfoBox = ({ session }: { session: ISession | undefined }) => {
  const modal = useContext(ModalContext);

  if (!session) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <p>There are no sessions scheduled for this stage.</p>
      </div>
    );
  }
  return (
    <ComponetCard title={session.name}>
      <div className="flex flex-row w-full ">
        <p className="mt-4 text-main-text">{session.description}</p>
        <div className="flex flex-col w-1/4 ml-auto gap-2">
          <p className="text-lg  text-secondary-text text-right">
            {session.start.toDateString()}
          </p>
          <div className="flex flex-row w-full">
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
  );
};

export default SessionInfoBox;
