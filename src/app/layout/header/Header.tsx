'use client'
import React, { useEffect, useRef } from 'react'

import {
    MagnifyingGlassIcon
} from '@radix-ui/react-icons'

const Header: React.FC = () => {
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
            <div id="search-header" className='flex bg-[#1F1F1F] items-center px-2 rounded-md w-[30%]'>
                <MagnifyingGlassIcon className='w-[24px] h-[24px]' />
                <input type="text" name="" id="" placeholder='Search For Music, Artist, ...' className='ml-2 py-2 text-[0.9rem] bg-transparent border-none outline-none placeholder:text-[0.9rem]' />
            </div>
            <div>
                <ul className='flex'>
                    <li className='text-nowrap font-semibold mx-8'><a href="#footer">About Us</a></li>
                    <li className='font-semibold mx-8'><a href="#footer">Contact</a></li>
                    <li className='font-semibold mx-8'><a href="">Premium</a></li>
                </ul>
            </div>
            <div>
                <button className='border border-primaryColorPink text-primaryColorPink font-semibold py-2 w-32 mx-2 rounded-md'>Login</button>
                <button className='bg-primaryColorPink font-semibold py-2 w-32 mx-2 rounded-md'>Sign Up</button>
            </div>
        </div>
    )
}

export default Header