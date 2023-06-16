"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import img from "@/public/logo.png";

function classNameNames(...classNamees: string[]) {
  return classNamees.filter(Boolean).join(" ");
}

export default function Navbar({
  pages,
}: {
  pages: {
    name: string;
    href: string;
  }[];
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const extendedPages: { name: string; href: string }[] = [
    ...pages,
    { name: "Archive", href: "/archive" },
  ];

  return (
    <header className="shadow-sm">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex items-center justify-between gap-4 lg:gap-10">
          <div className="flex lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Logo</span>
              <Image src={img} alt="Logo" width={150} />
            </a>
          </div>

          <nav
            aria-label="Global"
            className="hidden gap-8 text-md font-medium md:flex"
          >
            {extendedPages.map((item) => (
              <Link
                key={item.name}
                className="text-gray-500 hover:text-gray-900"
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
            <a
              className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500"
              href=""
            >
              Log in
            </a>

            <a
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white"
              href=""
            >
              Sign up
            </a>
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
                viewbox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
