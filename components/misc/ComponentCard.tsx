"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const ComponetCard = ({
  children,
  title,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-primary shadow-sm rounded-md flex flex-col">
      <div className="flex flex-row border-b-2 border-secondary text-main-text p-3 px-4 uppercase ">
        {title} 
        <ChevronDownIcon className="h-6 w-6 ml-auto border-button bg-button border rounded-md p-1" />
      </div>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
};

export default ComponetCard;
