"use client";
import { useState, useContext } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ModalContext } from "../context/ModalContext";
import { CameraIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import img from "@/public/logo.png";
interface Page {
  name: string;
  href: string;
  icon: JSX.Element;
}

export default function Navbar({
  pages,
  stages,
}: {
  stages: Page[];
  pages: {
    name: string;
    href: string;
    icon: JSX.Element;
  }[];
}) {
  const pathname = usePathname();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { openModal } = useContext(ModalContext);

  const stageModal = () => {
    openModal(
      <div className="flex flex-col items-center justify-center">
        {stages.map((stage) => (
          <Link key={stage.name} href={stage.href}>
            <p className="">{stage.name}</p>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <header className="shadow md:shadow-sm z-20 bg-base md:border-r border-primary absolute bottom-0 md:top-0 md:left-0 w-full md:w-20 md:h-screen">
      <div className="flex flex-row md:flex-col md:items-center justify-between ">
        <div className="hidden items-center md:flex md:py-2">
          <Link href="/">
            <span className="sr-only">Logo</span>
            <Image src={img} alt="Logo" width={50} />
          </Link>
        </div>
        <nav
          aria-label="Global"
          className={`text-main-text text-center w-full space-x-3 lg:space-x-0 justify-between lg:gap-8 text-md font-medium flex flex-row lg:flex-col `}
        >
          {pages.map((item) => (
            <Link
              key={item.name}
              className={`h-full w-full py-1 hover:text-gray-300 cursor-pointer ${
                pathname === item.href && "bg-accent text-white rounded"
              }`}
              href={item.href}
            >
              <div className="w-8 h-8 m-auto p-1">{item.icon}</div>
              <p className="">{item.name}</p>
            </Link>
          ))}
          <div
            onClick={stageModal}
            className={`h-full w-full py-1 hover:text-gray-300 cursor-pointer ${
              pathname.includes("/stage/") && "bg-accent text-white rounded"
            }`}
          >
            <div className="w-6 h-6 m-auto">
              <CameraIcon />
            </div>
            stages
          </div>
        </nav>
      </div>
    </header>
  );
}
