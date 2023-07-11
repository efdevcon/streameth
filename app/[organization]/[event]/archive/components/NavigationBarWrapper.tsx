"use client";

import { useState } from "react";

const NavigationBarWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:flex">{children}</div>
      <div className="lg:hidden px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 border rounded w-full bg-accent text-white text-center"
        >
          Filter
        </button>
        {isOpen && children}
      </div>
    </>
  );
};

export default NavigationBarWrapper;
