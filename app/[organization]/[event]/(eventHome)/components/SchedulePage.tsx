"use client";
import {
  useContext,
  useMemo,
  useState,
  useLayoutEffect,
  useEffect,
} from "react";
import { IStage } from "@/services/model/stage";
import { CELL_HEIGHT } from "../utils";
import ScheduleGrid from "./ScheduleGrid";
import SessionsOnGrid from "./SessionsOnGrid";
import { IEvent } from "@/services/model/event";
import DateFilter from "./Filter";
const SchedulePage = ({
  stages,
  event,
}: {
  stages: IStage[];
  event: IEvent;
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedStage, setSelectedStage] = useState(stages[0].id);
  useLayoutEffect(() => {
    function updateSize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <>
      <div className="flex flex-row md:flex-col">
        <DateFilter event={event} />
        {isMobile ? (
          <div className="flex flex-row w-full justify-center items-center p-2 ">
            <select
              className="text-xl cursor-pointer font-bold box-border"
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
            >
              {stages.map((stage) => (
                <option key={stage.name} value={stage.id}>
                  {stage.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="w-[calc(100%-6rem)] flex flex-row ml-auto">
            {stages.map((stage) => (
              <div className="w-full p-4 text-center text-xl" key={stage.id}>
                {stage.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div
        className={`flex flex-row w-full h-full relative overflow-y-scroll mb-[${
          CELL_HEIGHT + "rem"
        }]`}
      >
        <ScheduleGrid />
        <div className="w-[calc(100%-6rem)] flex flex-row h-full ml-auto">
          {isMobile ? (
            <SessionsOnGrid stageId={selectedStage} />
          ) : (
            stages.map((stage) => (
              <SessionsOnGrid key={stage.id} stageId={stage.id} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default SchedulePage;
