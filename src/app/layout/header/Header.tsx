"use client";
import React, { useEffect, useRef } from "react";
import { useAppContext } from "@/components/provider/songProvider";
import { Link } from "react-scroll";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const { showContentSong } = useAppContext();
  const headerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleSignUpClick = () => {
    router.push('/authenticate/signup'); 
  };
  const handleLoginClick = () => {
    router.push('/authenticate/login'); 
  };

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        if (window.scrollY > 0) {
          headerRef.current.classList.remove("bg-transparent", "pt-14");
          headerRef.current.classList.add("bg-primaryColorBg", "py-6");
        } else {
          headerRef.current.classList.remove(
            "bg-primaryColorBg",
            "py-6",
            "border-b"
          );
          headerRef.current.classList.add("bg-transparent", "pt-14");
        }
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={headerRef}
      id="header"
      className={`${
        showContentSong ? "w-[58vw]" : "w-[78vw]"
      } flex pt-8 px-12 justify-between items-center bg-transparent fixed z-20`}
    >
      <div
        id="search-header"
        className="flex bg-transparent border-2 items-center px-2 rounded-full w-[30%]"
      >
        <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
        <input
          type="text"
          name=""
          id=""
          placeholder="Search For Music, Artist, ..."
          className={`${
            showContentSong
              ? "text-[0.8rem] placeholder:text-[0.8rem]"
              : "placeholder:text-[0.9rem] text-[0.9rem]"
          }  ml-2 py-2  bg-transparent border-none outline-none placeholder:text-white/80`}
        />
      </div>
      <div id="about-section">
        <ul className="flex">
          <li
            className={`${
              showContentSong ? "mx-6 text-[0.9rem]" : "mx-8"
            } text-nowrap font-semibold`}
          >
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="cursor-pointer"
            >
              About Us
            </Link>
          </li>
          <li
            className={`${
              showContentSong ? "mx-6 text-[0.9rem]" : "mx-8"
            } text-nowrap font-semibold`}
          >
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="cursor-pointer"
            >
              Contact
            </Link>
          </li>
          <li
            className={`${
              showContentSong ? "mx-6 text-[0.9rem]" : "mx-8"
            } text-nowrap font-semibold`}
          >
            <a href="" className="">
              Premium
            </a>
          </li>
        </ul>
      </div>
      <div id="button-section" className="flex text-center">
        <button
          className={`${
            showContentSong ? "text-[0.9rem] mx-1 w-24" : "mx-2 w-32"
          } border-2 border-white text-white font-semibold py-2  rounded-full`}
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
        <button
          className={`${
            showContentSong ? "text-[0.9rem] mx-1 w-24" : "mx-2 w-32"
          } bg-white font-semibold py-2  rounded-full text-black`}
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
