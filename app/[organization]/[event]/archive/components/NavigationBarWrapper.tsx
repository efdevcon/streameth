"use client";

import { useState } from "react";

const NavigationBarWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="hidden lg:flex">{children}</div>
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 border text-gray-500 border-gray-600 hover:text-white hover:bg-black"
        >
          Filter
        </button>
        {isOpen && children}
      </div>
    </>
  );
};

export default NavigationBarWrapper;
