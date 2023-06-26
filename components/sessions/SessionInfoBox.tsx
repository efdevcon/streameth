"use client";
import { useContext } from "react";
import { ISession } from "@/services/model/session";
import { ShareIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
import SpeakerIcon from "@/components/speakers/SpeakerIcon";
import EmbedSessionModal from "@/components/sessions/EmbedSession";
import { ModalContext } from "@/components/context/ModalContext";

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
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="flex flex-row w-full mb-4">
¨¨          <CodeBracketIcon
            className="p-1 cursor-pointer ml-auto h-8 w-8 hover:bg-gray-200"
            onClick={() => {
              modal.openModal(<EmbedSessionModal stageId={session.stageId} />);
            }}
          />
          <ShareIcon className="p-1 h-8 w-8 cursor-pointer ml-3 hover:bg-gray-200" />
        </div>
        <p className="text-3xl font-medium">{session.name}</p>
        <p className="mt-4 text-lg opacity-60">{session.description}</p>
        <p className="mt-8">
          {session.speakers.map((speaker) => {
            return <SpeakerIcon key={speaker.id} speaker={speaker} />;
          })}
        </p>
      </div>
    </div>
  );
};

export default SessionInfoBox;
