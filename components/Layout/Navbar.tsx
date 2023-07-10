"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import img from "@/public/logo.png";
import { HomeIcon } from "@heroicons/react/24/outline";
import Home from "@/app/(home)/page";
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

  return (
    <header className="shadow-sm bg-base border-r border-primary absolute top-0 left-0 h-screen w-20">
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex flex-col items-center justify-between gap-4 lg:gap-10">
          <Link href="/">
            <span className="sr-only">Logo</span>
            <Image src={img} alt="Logo" width={50} />
          </Link>

          <nav
            aria-label="Global"
            className="hidden gap-8 text-md font-medium md:flex flex-col"
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
