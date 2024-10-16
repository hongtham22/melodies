"use client";
import React, { useEffect, useRef } from "react";
import { useAppContext } from '@/components/provider/songProvider';
import { useScrollArea } from "@/components/provider/scrollProvider";

import { Link } from 'react-scroll';

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';


const Header = ({ }) => {
    const { scrollAreaRef } = useScrollArea();
    const { showSidebarRight } = useAppContext();
    const headerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const handleSignUpClick = () => {
      router.push('/authenticate/signup'); 
    };
    const handleLoginClick = () => {
      router.push('/authenticate/login'); 
    };

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current && scrollAreaRef?.current) {
                const scrollTop = scrollAreaRef.current.scrollTop;

                // Background and padding changes on scroll
                if (scrollTop > 0) {
                    headerRef.current.classList.remove('bg-transparent', 'pt-14');
                    headerRef.current.classList.add('bg-primaryColorBg', 'py-6');
                } else {
                    headerRef.current.classList.remove('bg-primaryColorBg', 'py-6');
                    headerRef.current.classList.add('bg-transparent', 'pt-14');
                }
            }
        };

        const scrollArea = scrollAreaRef?.current;

        if (scrollArea) {
            scrollArea.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (scrollArea) {
                scrollArea.removeEventListener('scroll', handleScroll);
            }
        };
    }, [scrollAreaRef]);

    return (
        <div
            ref={headerRef}
            id="header"
            className={`${showSidebarRight ? 'w-[62vw]' : 'w-[78vw]'} flex pt-8 px-12 justify-between items-center bg-transparent fixed z-20`}
        >
            <div id="search-header" className='flex bg-transparent border-2 items-center px-2 rounded-full w-[30%]'>
                <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Search For Music, Artist, ..."
                    className={`${showSidebarRight ? 'text-[0.8rem] placeholder:text-[0.8rem]' : 'placeholder:text-[0.9rem] text-[0.9rem]'}  ml-2 py-2  bg-transparent border-none outline-none placeholder:text-white/80`}
                />
            </div>
            <div id='about-section'>
                <ul className="flex">
                    <li className={`${showSidebarRight ? 'mx-6 text-[0.9rem]' : 'mx-8'} text-nowrap font-semibold`}>
                        <Link to="about" smooth={true} duration={500} className="cursor-pointer">
                            About Us
                        </Link>
                    </li>
                    <li className={`${showSidebarRight ? 'mx-6 text-[0.9rem]' : 'mx-8'} text-nowrap font-semibold`}>
                        <Link to="footer" smooth={true} duration={500} className="cursor-pointer">
                            Contact
                        </Link>
                    </li>
                    <li className={`${showSidebarRight ? 'mx-6 text-[0.9rem]' : 'mx-8'} text-nowrap font-semibold`}>
                        <a href="" className="">Premium</a>
                    </li>
                </ul>
            </div>
            <div id='button-section' className="flex">
                <button className={`${showSidebarRight ? 'text-[0.9rem] mx-1 w-24' : 'mx-2 w-32'} border-2 border-white text-white font-semibold py-2  rounded-full`} onClick={handleLoginClick}>Login</button>
                <button className={`${showSidebarRight ? 'text-[0.9rem] mx-1 w-24' : 'mx-2 w-32'} bg-white font-semibold py-2  rounded-full text-black`}onClick={handleSignUpClick}>Sign Up</button>
            </div>
        </div>
    );
};

export default Header;
