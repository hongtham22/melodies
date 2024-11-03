'use client'
import UpdatePlaylist from '@/components/popup/updatePlaylist';
import Image from 'next/image'
import React, { useState } from 'react'
import { LuPen } from "react-icons/lu";

const PlaylistBanner = () => {
    const [isUpdate, setIsUpdate] = useState<boolean>()
    function formatDuration(totalMilliseconds: number) {
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const timeParts = [];
        if (hours > 0) {
            timeParts.push(`${hours}h`);
        }
        timeParts.push(`${minutes} min`);
        timeParts.push(`${seconds} sec`);
        return timeParts.join(' ');
    }
    const dataPlaylist = {
        title: "Top Hits 2024",
        artists: [
            { name: "Artist Name" },
        ],
        album: {
            title: "Album Title",
        },
        releaseDate: "2024-10-01T00:00:00Z", // ISO format date
        duration: 3600, // Duration in seconds
        playCount: 1500000, // Number of plays
    };

    const songImage = "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da";

    return (
        <div className=" w-full h-[50vh] p-5 flex flex-col justify-end gap-6 rounded-t-lg bg-gradient-to-b from-transparent to-black/30">
            {/* Header */}
            {/* Content albums */}
            <div className="flex items-end gap-8">
                <div className="relative shadow-[0_4px_60px_rgba(0,0,0,0.5)] rounded-md ">
                    <Image
                        src={songImage}
                        alt="Album Cover"
                        width={220}
                        height={220}
                        priority
                        className="rounded-md"
                    />
                    <div className='absolute bg-black/60 top-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100'>
                        <div
                            className='flex flex-col items-center cursor-pointer gap-1'
                            onClick={() => setIsUpdate(true)}
                        >
                            <LuPen className='w-[3.5rem] h-[3.5rem]' />
                            <p className='text-[0.95rem] tracking-wide'>Edit playlist</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 flex-col">
                    <h3>Playlist</h3>
                    <h1
                        className="mt-2 text-6xl font-bold cursor-pointer"
                        onClick={() => setIsUpdate(true)}
                    >{dataPlaylist?.title}</h1>
                    <div className="mt-3 flex items-center space-x-2 text-h4 font-semibold">
                        <p>{dataPlaylist?.artists[0].name}</p>
                        <span className="text-gray-300">•</span>
                        <p className="">{dataPlaylist?.album?.title}</p>
                        <span className="text-gray-300">•</span>
                        <p className="text-gray-300">{dataPlaylist?.releaseDate ? new Date(dataPlaylist.releaseDate).getFullYear() : "Unknown"}</p>
                        <span className="text-gray-300">•</span>
                        <p className="text-gray-300">{formatDuration(dataPlaylist?.duration ?? 0)}</p>
                        <span className="text-gray-300">•</span>
                        <p className="text-gray-300">{dataPlaylist?.playCount}</p>
                    </div>
                </div>
            </div>
            {
                isUpdate && (
                    <UpdatePlaylist onClose={() => setIsUpdate(false)} />
                )
            }
        </div>
    )
}

export default PlaylistBanner