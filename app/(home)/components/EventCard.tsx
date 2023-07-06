"use client";
import {IEvent} from "@/services/model/event";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";


const EventCard = ({ event }: { event: IEvent }) => {
  return (
    <Link href={`${event.organizationId}/${event.id}`}>
      <div className="flex flex-col xs:h-80 w-full p-2 cursor-pointer rounded shadow-3xl">
        <div className="max-w-96 aspect-video relative p-2">
          {event.eventCover ? (
            <Image
              src={event.eventCover}
              alt={event.name}
              fill
              className="rounded"
            />
          ) : (
            <Image src={Logo} alt={event.name} width={300} height={300} />
          )}
        </div>
        <div className=" flex flex-col p-4">
          <h1 className="text-xl text-main-text uppercase font-medium">
            {event.name}
          </h1>
          <p className="text-accent-text">
            {event.location} - {event.start.toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
