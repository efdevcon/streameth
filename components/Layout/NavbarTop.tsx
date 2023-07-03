"use client";
import Image from "next/image";
import WalletSignIn from "@/components/misc/WalletSignIn";
import img from "@/public/logo.png";

export default function Navbar() {
  return (
    <header className="bg-base border-b border-primary w-full ml-auto">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex flex-row items-center justify-between gap-4 lg:gap-10">
          <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
            <div className="relative bg-white hover:shadow-md shadow-slate-500 px-5 py-2 text-sm font-medium text-black">
              <span className="absolute bg-gray-300 hover:bg-white text-sm font-medium text-black h-full w-[90%] -z-20" />
              <WalletSignIn />
            </div>
          </div>

          <div className="lg:hidden">
            <button
              className="rounded-lg bg-gray-100 p-2 text-gray-600"
              type="button"
            >
              <span className="sr-only">Open menu</span>
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
