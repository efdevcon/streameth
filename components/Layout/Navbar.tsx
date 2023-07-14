"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import img from "@/public/logo.png";

export default function Navbar({
  pages,
}: {
  pages: {
    name: string;
    href: string;
    icon: JSX.Element;
  }[];
}) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="hidden md:shadow-sm md:bg-base md:border-r border-primary md:absolute md:top-0 md:left-0 w-full md:w-20 md:h-screen">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex flex-row md:flex-col md:items-center justify-between gap-4 md:gap-10">
          <Link href="/">
            <span className="sr-only">Logo</span>
            <Image src={img} alt="Logo" width={50} />
          </Link>

          <nav
            aria-label="Global"
            className={`gap-8 text-md font-medium ${isNavOpen ? 'flex' : 'hidden'} md:flex flex-col`}
          >
            {pages.map((item) => (
              <Link
                key={item.name}
                className="text-main-text hover:text-gray-300"
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.icon}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <button
              className="rounded-lg bg-gray-100 p-2 text-gray-600"
              type="button"
              onClick={() => setIsNavOpen(!isNavOpen)}
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
