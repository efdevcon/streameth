"use client";
import { useContext, useEffect, useState } from "react";
import { IEvent } from "@/server/model/event";
import SearchFilter from "@/app/[organization]/[event]/archive/components/SearchFilter";
import { FilterContext } from "@/app/[organization]/[event]/archive/components/FilterContext";

const FilterBar = ({ events }: { events: IEvent[] }) => {
  const { setFilterOptions } = useContext(FilterContext);
  const [isShowCurrent, setIsShowCurrent] = useState(true);

  const eventFilter = events.map((event) => {
    return {
      name: event.name,
      value: event.id,
      type: "event",
      filterFunc: async (item: IEvent) => {
        return item.id === event.id;
      },
    };
  });

  const handleTabClick = () => {
    const date = isShowCurrent
      ? new Date().toLocaleDateString()
      : new Date(0).toLocaleDateString();
    setFilterOptions([
      {
        name: "date",
        value: "date",
        type: "date",
        filterFunc: async (item: IEvent) => {
          console.log(item.start.toLocaleDateString(), date);
          return item.start.toLocaleDateString() < date;
        },
      },
    ]);
  };

  useEffect(() => {
    handleTabClick();
  }, [isShowCurrent]);

  return (
    <div className="bg-base p-4 w-full flex justify-center items-center">
      <div className=" w-full flex flex-col sm:flex-row items-center">
        <div className="flex flex-row w-full justify-center md:justify-start">
          <h1
            className={` text-xl md:text-2xl  font-bold  ${
              isShowCurrent
                ? "text-secondary-text cursor-pointer"
                : "text-main-text"
            } border-r-2 border-accent pr-4`}
            onClick={() => setIsShowCurrent(false)}
          >
            Upcoming events
          </h1>
          <h1
            className={`text-xl md:text-2xl text-main-text font-bold ml-4 ${
              !isShowCurrent
                ? "text-secondary-text cursor-pointer"
                : "text-main-text"
            }`}
            onClick={() => setIsShowCurrent(true)}
          >
            Past events
          </h1>
        </div>
        <div className="w-full max-w-[20rem] m-auto lg:ml-auto my-4">
          <SearchFilter filterOptions={eventFilter} filterName="Event" />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
