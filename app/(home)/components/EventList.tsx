"use client"
import { useContext } from "react"
import { FilterContext } from "@/app/[organization]/[event]/archive/components/FilterContext";
import EventCard from "./EventCard";
import { IEvent } from "@/services/model/event";

const EventList = () => {

  const { filteredItems } = useContext(FilterContext);

  return (
    <div className="h-full lg:mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-3 md:space-y-0 md:space-x-3 overflow-y-scroll">
      {filteredItems.map((event: IEvent) => {
        return <EventCard key={event.id} event={event} />;
      })}
    </div>
  );
}

export default EventList;