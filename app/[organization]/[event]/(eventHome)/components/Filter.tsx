"use client";
import { useContext, useEffect, useState } from "react";
import { IEvent } from "@/services/model/event";
import Session from "@/services/model/session";
import {
  FilterContext,
  FilterOption,
} from "../../archive/components/FilterContext";

const Filter = ({ event }: { event: IEvent }) => {
  const { setFilterOptions } = useContext(FilterContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const days = event.end.getDate() - event.start.getDate() + 1;
  const dates: FilterOption<Session>[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(
      event.start.getTime() + i * 24 * 60 * 60 * 1000
    ).toLocaleDateString()
    dates.push({
      name: "date",
      value: date,
      type: "date",
      filterFunc: async (item: Session) => {
        console.log(item.start.toLocaleDateString(), date)
        return item.start.toLocaleDateString() === date;
      },
    });
  }

  useEffect(() => {
    setFilterOptions([dates[selectedIndex]]);
  }, [selectedIndex]);

  return (
    <div className="flex flex-row p-4 space-x-3 justify-center">
      {dates.map((date, index) => {
        return (
          <h1
            key={date.value}
            className={`text-2xl font-bold ${
              selectedIndex === index ? "text-main-text" : "text-secondary-text"
            }`}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {date.value}
          </h1>
        );
      })}
    </div>
  );
};

export default Filter;
