"use client";
import React, { useEffect, useRef } from "react";
import { useScrollArea } from "@/components/provider/scrollProvider";
import { Link } from "react-scroll";
import { BellIcon } from "@radix-ui/react-icons";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import songimg from "@/assets/img/songs.png";

function HeaderAdmin() {
  const { scrollAreaRef } = useScrollArea();
  const headerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && scrollAreaRef?.current) {
        const scrollTop = scrollAreaRef.current.scrollTop;

        // Background and padding changes on scroll
        if (scrollTop > 0) {
          headerRef.current.classList.remove("bg-transparent", "pt-14");
          headerRef.current.classList.add("bg-primaryColorBg", "py-6");
        } else {
          headerRef.current.classList.remove("bg-primaryColorBg", "py-6");
          headerRef.current.classList.add("bg-transparent", "pt-14");
        }
      }
    };

    const scrollArea = scrollAreaRef?.current;

    if (scrollArea) {
      scrollArea.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollArea) {
        scrollArea.removeEventListener("scroll", handleScroll);
      }
    };
  }, [scrollAreaRef]);
  return (
    <div
      ref={headerRef}
      id="header"
      className={
        "w-[82%] flex pt-8 px-28 justify-between items-center bg-transparent fixed z-20"
      }
    >
      <div className={"w-full flex items-center justify-between"}>
        <div className="flex justify-center items-center">
          <FaArrowLeft className="mr-5" />
            <div className="">
            <ul className="flex items-center">
                <li className="font-semibold ml-7">
                <a href="">Home</a>
                </li>

                <li className="font-semibold ml-7">
                <a href="">Share</a>
                </li>
                <li className="font-semibold ml-7">
                <a href="">About</a>
                </li>
                <li className="font-semibold ml-7">
                <a href="">Premium</a>
                </li>
            </ul>
            </div>
        </div>
        <div className="flex gap-3 justify-center items-center">
          <BellIcon className="w-6 h-6" />
          <div className="flex gap-2">

            <Image
                src={songimg}
                alt="song"
                width={40}
                height={40}
                className="rounded-full"
            />
            <div className="flex  flex-col">
                <p className="text-textSmall">Welcome</p>
                <p className="text-textMedium line-clamp-1">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
