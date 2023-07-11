"use client";
import { useContext, useEffect, useState, useLayoutEffect } from "react";
import { IEvent } from "@/server/model/event";
import Session from "@/server/model/session";
import {
  FilterContext,
  FilterOption,
} from "../../archive/components/FilterContext";

const Filter = ({ event }: { event: IEvent }) => {
  const { setFilterOptions } = useContext(FilterContext);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const days = event.end.getDate() - event.start.getDate() + 1;
  const dates: FilterOption<Session>[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(
      event.start.getTime() + i * 24 * 60 * 60 * 1000
    ).toLocaleDateString();
    dates.push({
      name: "date",
      value: date,
      type: "date",
      filterFunc: async (item: Session) => {
        console.log(item.start.toLocaleDateString(), date);
        return item.start.toLocaleDateString() === date;
      },
    });
  }

  // Check for mobile device
  useLayoutEffect(() => {
    function updateSize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    setFilterOptions([dates[selectedIndex]]);
  }, [selectedIndex]);

  return (
    <div className="flex flex-row w-full space-x-3 justify-center p-2 md:p-4 box-border">
      {isMobile ? (
        <select
          className="text-xl cursor-pointer font-bold"
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
        >
          {dates.map((date, index) => (
            <option key={date.value} value={index}>
              {date.value}
            </option>
          ))}
        </select>
      ) : (
        dates.map((date, index) => (
          <h1
            key={date.value}
            className={`text-2xl cursor-pointer font-bold ${
              selectedIndex === index ? "text-main-text" : "text-secondary-text"
            }`}
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {date.value}
          </h1>
        ))
      )}
    </div>
  );
};

export default Filter;
