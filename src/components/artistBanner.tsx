'use client'
import React, { useState } from "react";
import { useAppContext } from '@/components/provider/songProvider';


import { FaHeart, FaRegHeart } from "react-icons/fa";
const ArtistBanner = () => {
    const { showSidebarRight } = useAppContext();

    const [tym, setTym] = useState<boolean>(false)

    return (
        <div
            className={`${showSidebarRight ? 'w-[55vw] h-[60vh]' : 'w-[75vw] h-[60vh]'} my-4 px-6 py-4 rounded-3xl bg-cover bg-center flex gap-[114px] flex-col relative overflow-hidden`}
        >
            {/* Pseudo-element for background image */}
            <div
                className="background-image-with-blur absolute inset-0 z-10 bg-contain transform bg-no-repeat rounded-lg"
                style={{
                    backgroundImage: "url('https://i.scdn.co/image/ab6761610000e5eb7abbccceb90cd440283fa62a')",
                    backgroundSize: '220px',
                    backgroundPosition: `5% calc(100% - 30px)`,
                }}
            />

            <div
                className="absolute inset-0 z-5 bg-contain transform bg-right bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-[url('https://i.scdn.co/image/ab6761610000e5eb7abbccceb90cd440283fa62a')] before:bg-cover before:transform before:bg-right before:bg-no-repeat before:blur-[5px] before:z-0"
            />
            <div className="absolute inset-0 z-15 bg-black opacity-50" />

            <div className={`z-10 absolute  line-clamp-1 ${showSidebarRight ? 'top-[61%] left-[33%] ' : 'top-[58%] left-[26%]'}`}>
                <div className="flex items-center mb-3">
                    <svg className="w-[16px] text-[#4CB3FF]" data-encore-id="icon" role="img" aria-hidden="true" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M10.814.5a1.658 1.658 0 0 1 2.372 0l2.512 2.572 3.595-.043a1.658 1.658 0 0 1 1.678 1.678l-.043 3.595 2.572 2.512c.667.65.667 1.722 0 2.372l-2.572 2.512.043 3.595a1.658 1.658 0 0 1-1.678 1.678l-3.595-.043-2.512 2.572a1.658 1.658 0 0 1-2.372 0l-2.512-2.572-3.595.043a1.658 1.658 0 0 1-1.678-1.678l.043-3.595L.5 13.186a1.658 1.658 0 0 1 0-2.372l2.572-2.512-.043-3.595a1.658 1.658 0 0 1 1.678-1.678l3.595.043L10.814.5zm6.584 9.12a1 1 0 0 0-1.414-1.413l-6.011 6.01-1.894-1.893a1 1 0 0 0-1.414 1.414l3.308 3.308 7.425-7.425z"></path></svg>
                    <p className="text-[0.9rem] ml-2">Verified Artist</p>
                </div>
                <p className={`font-bold ${showSidebarRight ? 'text-6xl' : 'text-7xl'}  mb-4`}>Hoàng Dũng</p>
                <div
                    className="flex items-center cursor-pointer text-[1.2rem]"
                    onClick={() => setTym(!tym)} // Toggle between "liked" and "unliked" state
                >
                    {tym ? (
                        <FaHeart className="text-[#F75050] text-[1.7rem] transition-transform duration-300 hover:scale-[1.1]" />
                    ) : (
                        <FaRegHeart className="text-[#F75050] text-[1.7rem] transition-transform duration-300 hover:scale-[1.1]" />
                    )}
                    <p className="ml-2 text-[0.95rem]">100.000 followers</p>
                </div>
            </div>
        </div>

    );
}

export default ArtistBanner;
