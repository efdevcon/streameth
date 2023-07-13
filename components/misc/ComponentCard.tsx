"use client";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ComponentCard = ({
  children,
  title,
}: {
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className=" shadow rounded flex flex-col bg-base">
      {title && (
        <div className="flex font-bold flex-row rounded-t border-b-2 border-secondary text-main-text p-3 px-4 uppercase ">
          {title}
        </div>
      )}
      <div className="p-4 flex flex-col h-full">{children}</div>
    </div>
  );
};

export default ComponentCard;
