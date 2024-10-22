'use client';

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from '@/app/AppProvider';
import { useAppContext as useSongContext } from '@/components/provider/songProvider';
import { useScrollArea } from "@/components/provider/scrollProvider";

import { Link } from 'react-scroll';

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
    const { accessToken } = useAppContext();
    const { scrollAreaRef } = useScrollArea();
    const { showSidebarRight } = useSongContext();
    const headerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Xử lý điều hướng đăng nhập và đăng ký
    const handleSignUpClick = () => {
        router.push('/signup');
    };
    const handleLoginClick = () => {
        router.push('/login');
    };

    // Thêm logic thay đổi header khi scroll
    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current && scrollAreaRef?.current) {
                const scrollTop = scrollAreaRef.current.scrollTop;
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

    if (!isClient) return null; // Đảm bảo chỉ render trên client

    return (
        <div
            ref={headerRef}
            id="header"
            className={`${showSidebarRight ? 'w-[62%]' : 'w-[83%]'} flex pt-8 px-28 justify-between items-center bg-transparent fixed z-20`}
        >
            <div className={`${showSidebarRight ? 'w-[25vw]' : 'w-[30vw]'} flex items-center`}>
                <div>
                    <FaArrowLeft className='mr-8' />
                </div>
                <div id="search-header" className='w-full flex bg-transparent border-2 items-center px-2 rounded-full'>
                    <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
                    <input
                        type="text"
                        placeholder="Search For Music, Artist, ..."
                        className={`w-full ${showSidebarRight ? 'text-[0.8rem] placeholder:text-[0.8rem]' : 'placeholder:text-[0.9rem] text-[0.9rem]'}  ml-2 py-2 pr-2 bg-transparent border-none outline-none placeholder:text-white/80`}
                    />
                </div>
            </div>

            {accessToken ? (
                <div className=''>
                    <ul className='flex items-center'>
                        <li className='font-semibold ml-7'><a href="">Share</a></li>
                        <li className='font-semibold ml-7'><a href="">About</a></li>
                        <li className='font-semibold ml-7'><a href="">Premium</a></li>
                        <li className='font-semibold ml-7'><a href=""><IoPersonCircleOutline className='w-[30px] h-[30px]' /></a></li>
                    </ul>
                </div>
            ) : (
                <>
                    <div id="about-section">
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
                                <a href="">Premium</a>
                            </li>
                        </ul>
                    </div>
                    <div id='button-section' className="flex">
                        <button className={`${showSidebarRight ? 'text-[0.9rem] mx-1 w-24' : 'mx-2 w-32'} border-2 border-white text-white font-semibold py-2  rounded-full`} onClick={handleLoginClick}>Login</button>
                        <button className={`${showSidebarRight ? 'text-[0.9rem] mx-1 w-24' : 'mx-2 w-32'} bg-white font-semibold py-2  rounded-full text-black`} onClick={handleSignUpClick}>Sign Up</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Header;
