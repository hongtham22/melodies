"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScrollArea } from "@/components/provider/scrollProvider";
import { Link } from "react-scroll";
import { BellIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import userImg from "@/assets/img/placeholderUser.jpg";
import { useAppContext } from "@/app/AppProvider";
import { fetchApiData } from "@/app/api/appService";
import { User } from "@/types/interfaces";

function HeaderAdmin() {
  const { accessToken } = useAppContext();
  const [user, setUser] = useState<User>();
  const { scrollAreaRef } = useScrollArea();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        const result = await fetchApiData(
          `/api/user`,
          "GET",
          null,
          accessToken ?? null
        );
        if (result.success) {
          setUser(result.data.user);
          localStorage.setItem("avatar", result.data.user.image);
        } else {
          console.error("Login error:", result.error);
        }
      };

      fetchData();
    }
  }, [accessToken]);

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && scrollAreaRef?.current) {
        const scrollTop = scrollAreaRef.current.scrollTop;
        setIsScrolled(scrollTop > 0);
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
      className={`w-[82%] flex pt-8 px-28 justify-between items-center bg-transparent fixed z-20 ${
        isScrolled
          ? "after:content-[''] after:w-full after:h-[3px] after:absolute after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-transparent after:via-darkerBlue after:to-transparent"
          : ""
      }`}
    >
      <div className={"w-full flex items-center justify-between"}>
        <div className="flex justify-center items-center">
          <div className="">
            <ul className="flex items-center">
              <li className="font-bold ml-7">
                <a href="/">Home</a>
              </li>

              <li className="font-bold ml-7">
                <Link
                  to="about"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li className="font-bold ml-7">
                <Link
                  to="footer"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer"
                >
                  Contact
                </Link>
              </li>
              <li className="font-bold ml-7">
                <a href="/premium">Premium</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          
          <div className="flex gap-2">
            <Image
              src={user?.image || userImg}
              alt="user avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <p className="text-textSmall">Welcome</p>
              <p className="text-textMedium font-bold line-clamp-1 text-primaryColorBlue">
                {user?.name || user?.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
