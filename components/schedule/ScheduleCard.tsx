import { ISession } from "@/server/model/session";
import SpeakerIcon from "@/components/speakers/SpeakerIcon";
import { ModalContext } from "../context/ModalContext";
import { useContext } from "react";
import ScheduleCardModal from "@/components/schedule/ScheduleCardModal";
const ScheduleCard = ({
  session,
  showTime = false,
}: {
  session: ISession;
  showTime?: boolean;
}) => {
  const { openModal } = useContext(ModalContext);
  return (
    <div
      className="flex space-y-3 flex-col w-full h-full bg-base shadow rounded p-2 cursor-pointer"
      onClick={() => {
        openModal(<ScheduleCardModal session={session} />);
      }}
    >
      {showTime && (
        <div className="flex flex-col justify-center items-center w-32 bg-tertiary rounded-tl rounded-bl   p-4 ">
          <p className="text-main-text text-2xl font-bold mb-2">
            {session.start.getDate().toLocaleString()}
          </p>
          <p className="text-main-text text-sm uppercase ">
            {session.start.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      )}
      <div className=" border-l border-accent flex flex-col p-4 py-2 rounded-tr rounded-br w-full h-full">
        <p className="flex h-2/4 overflow-hidden text-ellipsis text-main-text text-sm font-medium uppercase">
          {session.name}
        </p>
        <div className="flex h-2/4 items-center flex-row space-x-2">
          {session.speakers.map((speaker) => (
            <SpeakerIcon key={speaker.id} speaker={speaker} onlyImage />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCard;
