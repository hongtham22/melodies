'use client'
import React, { useEffect, useRef } from 'react'
import { useAppContext } from '@/components/provider/songProvider';

import {
    FaArrowLeft,
} from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useScrollArea } from '@/components/provider/scrollProvider';

const HeaderLogin: React.FC = () => {
    const { scrollAreaRef } = useScrollArea();
    const { showSidebarRight } = useAppContext();

    const headerRef = useRef<HTMLDivElement>(null);

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
        <div ref={headerRef} id='header'
            className={`${showSidebarRight ? 'w-[58vw]' : 'w-[78vw]'} flex pt-8 px-12 justify-between items-center bg-transparent fixed z-20`}
        >
            <div className={`${showSidebarRight ? 'w-[25vw]' : 'w-[30vw]'} flex items-center`}>
                <div>
                    <FaArrowLeft className='mr-8' />
                </div>
                <div id="search-header" className='w-full flex bg-transparent border-2 items-center px-2 rounded-full'>
                    <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Search For Music, Artist, ..."
                        className={`w-full ${showSidebarRight ? 'text-[0.8rem] placeholder:text-[0.8rem]' : 'placeholder:text-[0.9rem] text-[0.9rem]'}  ml-2 py-2 pr-2 bg-transparent border-none outline-none placeholder:text-white/80`}
                    />
                </div>
            </div>
            <div className=''>
                <ul className='flex items-center'>
                    <li className='font-semibold ml-7'><a href="">Share</a></li>
                    <li className='font-semibold ml-7'><a href="">About</a></li>
                    <li className='font-semibold ml-7'><a href="">Premium</a></li>
                    <li className='font-semibold ml-7'><a href=""><IoPersonCircleOutline className='w-[30px] h-[30px]' /></a></li>
                </ul>

            </div>
        </div>
    )
}

export default HeaderLogin