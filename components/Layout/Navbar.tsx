"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import img from "@/public/logo.png";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
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
    <nav className="bg-white border-b border-gray-200 py-2 h-[5rem] z-50">
      <Container>
        <div className="flex justify-between py-2">
          <div className="flex items-center">
            <Link href="/" className="relative w-28 h-12 lg:w-40 lg:h-12">
              <Image src={img} alt="Logo" />
            </Link>
          </div>
          <div className="flex-1 flex items-center space-x-2 justify-end">
            <div className="hidden md:flex">
              {extendedPages.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={"px-2 py-1  text-gray-500"}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex"></div>
          <button
            className="md:hidden border-2 border-black p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            Menu
          </button>
        </div>
        <div
          className={classNames(
            "md:hidden relative bg-white z-50",
            isMenuOpen ? "block" : "hidden"
          )}
        >
          <ul className="border-t border-gray-200 py-3">
            {pages.map((item) => (
              <li key={item.name} className="py-2">
                <Link
                  href={item.href}
                  className={classNames(
                    "block px-4 py-2 text-gray-500",
                    pathname === item.href ? "bg-gray-200" : ""
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              {/* <div className="border-2 border-black p-2 my-2">Sign in with Ethereum</div> */}
              {/* <ConnectButton
                accountStatus={{
                  smallScreen: 'full',
                  largeScreen: 'full',
                }}
                chainStatus="none"
              /> */}
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}
