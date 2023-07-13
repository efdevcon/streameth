"use client";
import { useState } from "react";
import { IEvent } from "@/server/model/event";
import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";

const EventCard = ({ event }: { event: IEvent }) => {
  const [image, setImage] = useState("/events/" + event.id + ".png");

  return (
    <Link href={`${event.organizationId}/${event.id}`}>
      <div className="flex flex-col rounded p-4 shadow box-border bg-base">
        <div className="aspect-video relative">
          <Image
            className="rounded"
            alt="session image"
            quality={80}
            src={image}
            fill
            style={{
              objectFit: "cover",
            }}
            onError={() => {
              setImage(Logo.src);
            }}
            onLoadingComplete={(result) => {
              if (result.naturalHeight === 0) {
                setImage(Logo.src);
              }
            }}
          />
        </div>
        <div className="border-b-2 border-accent  p-2 py-4 flex flex-col">
        <p className=" text-md uppercase my-2 ">
          {event.name} - {event.organizationId}
        </p>
        <p className="text-secondary-text">
          {event.start.toLocaleDateString()} - {event.end.toLocaleDateString()}
        </p>
        </div>

      </div>
    </Link>
  );
};

export default EventCard;
