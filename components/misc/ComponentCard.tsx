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
  const [open, setOpen] = useState(true);
  
  if(!open) return (
    <div className="flex flex-col h-full">
      {title && (
        <div className="flex flex-row rounded bg-primary text-main-text p-3 px-4 uppercase ">
          {title}
          <ChevronRightIcon
            className="h-6 w-6 ml-auto border-button bg-button border rounded-md p-1"
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className=" shadow-md flex flex-col h-full">
      {title && (
        <div className="flex flex-row rounded-t border-b-2 bg-primary border-secondary text-main-text p-3 px-4 uppercase ">
          {title}
          <ChevronDownIcon
            className="h-6 w-6 ml-auto border-button bg-button border rounded-md p-1"
            onClick={() => {
              setOpen(false);
            }}
          />
        </div>
      )}
      {open && <div className="p-4 flex flex-col h-full rounded glass-style">{children}</div>}
    </div>
  );
};

export default ComponentCard;
