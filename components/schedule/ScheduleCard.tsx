import Session from "@/services/model/session";
import SpeakerIcon from "@/components/speakers/SpeakerIcon";
const ScheduleCard = ({ session }: { session: Session }) => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col justify-center items-center w-32 bg-tertiary rounded-tl rounded-bl border-r border-accent p-4 ">
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
      <div className="flex flex-col p-4 bg-tertiary rounded-tr rounded-br w-full">
        <p className="text-main-text text-sm font-medium uppercase mb-2">{session.name}</p>
        {session.speakers.map((speaker) => (
          <SpeakerIcon key={speaker.id} speaker={speaker} onlyImage />
        ))}
      </div>
    </div>
  );
};

export default ScheduleCard;
