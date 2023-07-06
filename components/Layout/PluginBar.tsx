"use client";
import { useState } from "react";

export default function PluginBar({
  tabs,
}: {
  tabs: {
    id: string;
    header: JSX.Element;
    content: JSX.Element;
  }[];
}) {
  const [selectedId, setSelectedId] = useState(tabs[0].id);
  const selectedTab = tabs.find((tab) => tab.id === selectedId);

  if (!selectedTab) {
    return null;
  }

  return (
    <>
      <div className="flex flex-row w-full bg-secondary rounded">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setSelectedId(tab.id)}
            className="m-2 w-full "
          >
            <div
              className={`${
                selectedId === tab.id
                  ? "bg-accent text-main-text"
                  : " text-secondary-text hover:bg-accent hover:text-main-text"
              } p-2 uppercase w-full rounded text-center text-sm `}
            >
              {tab.id}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col w-full h-full mt-4" key={selectedId}>
        {selectedTab.content}
      </div>
    </>
  );
}
