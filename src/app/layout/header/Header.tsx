'use client';

import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from '@/app/AppProvider';
import { useAppContext as useSongContext } from '@/components/provider/songProvider';
import { useScrollArea } from "@/components/provider/scrollProvider";

import { Link } from 'react-scroll';

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";
import { BellIcon } from "@radix-ui/react-icons";

import Image from "next/image";
import { fetchApiData } from "@/app/api/appService";
import { User } from "@/types/interfaces";

const Header = () => {
    const { accessToken, setSearch } = useAppContext();
    const { scrollAreaRef } = useScrollArea();
    const { showSidebarRight } = useSongContext();
    const headerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState<User>()
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchApiData(`/api/user/info`, "GET", null, accessToken ?? null);
            if (result.success) {
                setUser(result.data.user)
            } else {
                console.error("Login error:", result.error);
            }
        };

        fetchData();
    }, [accessToken]);

    const handleSignUpClick = () => {
        router.push('/signup');
    };
    const handleLoginClick = () => {
        router.push('/login');
    };

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

    useEffect(() => {
        const handler = setTimeout(() => {
            setSearch(searchTerm);
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    if (!isClient) return null;

    return (
        <div
            ref={headerRef}
            id="header"
            className={`${showSidebarRight ? 'w-[62%]' : 'w-[82%]'} flex pt-8 px-28 justify-between items-center bg-transparent fixed z-20`}
        >
            <div className={`w-[30%] flex items-center`}>
                <div>
                    <FaArrowLeft className='mr-8' />
                </div>
                <div id="search-header" className='w-full flex bg-transparent border-2 border-slate-200 items-center px-2 rounded-full'>
                    <MagnifyingGlassIcon className="w-[24px] h-[24px]" />
                    <input
                        type="text"
                        placeholder="Search For Music, Artist, ..."
                        className={`w-full ${showSidebarRight ? 'text-[0.8rem] placeholder:text-[0.8rem]' : 'placeholder:text-[0.85rem] text-[0.85rem]'}  ml-2 py-2 pr-2 bg-transparent border-none outline-none placeholder:text-white/80`}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
            </div>
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

            {accessToken ? (
                <div className="flex gap-3 justify-center items-center">
                    <BellIcon className="w-6 h-6" />
                    <div className="flex gap-2">
                        <Image
                            src={user?.image || 'https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da'}
                            alt="avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div className="flex  flex-col">
                            <p className="text-textSmall">Welcome</p>
                            <p className="text-textMedium font-bold line-clamp-1">{user?.name || user?.username}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <>
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
