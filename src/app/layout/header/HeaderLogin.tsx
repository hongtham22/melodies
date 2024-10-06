'use client'
import React, { useEffect, useRef } from 'react'

import {
    FaArrowLeft,
} from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

const HeaderLogin: React.FC = () => {
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                if (window.scrollY > 0) {
                    headerRef.current.classList.remove('bg-transparent', 'pt-14');
                    headerRef.current.classList.add('bg-primaryColorBg', 'py-6');
                } else {
                    headerRef.current.classList.remove('bg-primaryColorBg', 'py-6', 'border-b');
                    headerRef.current.classList.add('bg-transparent', 'pt-14');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <div ref={headerRef} id='header' className='w-[78vw] flex pt-14 px-12 justify-between items-center bg-transparent fixed z-20 transition-all duration-300 ease-in-out'>
            <FaArrowLeft />
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