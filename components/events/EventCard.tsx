import Event from "@/services/model/event";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
const EventCard = ({ event }: { event: Event }) => {
  return (
    <Link href={`${event.organizationId}/${event.id}`}>
      <div className="flex flex-col hover:bg-primary hover:shadow-lg p-2 rounded cursor-pointer">
        <div className="  w-96 aspect-video relative p-2 ">
          {event.eventCover ? (
            <Image
              src={event.eventCover}
              alt={event.name}
              fill
              className="rounded-2xl shadow-md"
            />
          ) : (
            <Image src={Logo} alt={event.name} width={300} height={300} />
          )}
        </div>
        <div className=" flex flex-col p-4">
          <h1 className="text-xl text-main-text uppercase font-medium">
            {event.name}
          </h1>
          <p className="text-secondary-text">
            {event.location} - {event.start.toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
