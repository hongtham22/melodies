import { fetchApiData } from '@/app/api/appService';
import { Artist } from '@/types/interfaces';
import Image from 'next/image'
import ImageArtist from '@/assets/img/placeholderUser.jpg'
import React, { useEffect, useState } from 'react'

import { FiUserPlus } from "react-icons/fi";
import {
    MdAudiotrack,
    MdOutlinePeopleAlt
} from "react-icons/md";

interface AvatarArtistProps {
    id?: string
}

const AvatarArtist: React.FC<AvatarArtistProps> = ({ id }) => {
    const [artist, setArtist] = useState<Artist>()
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const result = await fetchApiData(`/api/artist/${id}`, "GET");
                if (result.success) {
                    setArtist(result.data.artists)
                } else {
                    console.error("Login error:", result.error);
                }
            };

            fetchData();
        }

    }, [id]);
    return (
        <div>
            <div className='w-[150px] h-[150px]'>
                <Image
                    src={artist?.avatar || ImageArtist}
                    alt="Song Poster"
                    width={500}
                    height={500}
                    quality={100}
                    className='w-full h-full object-cover rounded-full shadow-md'
                />
                <p className='text-[0.95rem] font-semibold mt-3 my-2'>{artist?.name}</p>
                <div className='flex gap-4 mb-3'>
                    <div title={`${artist?.totalFollow.toLocaleString()} followers`} className='flex items-center'>
                        <MdOutlinePeopleAlt /> <span className='text-primaryColorGray text-[0.8rem] ml-1'>{artist?.totalFollow.toLocaleString()}</span>
                    </div>
                    <div title={`${artist?.totalSong} tracks`} className='flex items-center'>
                        <MdAudiotrack /> <span className='text-primaryColorGray text-[0.8rem] ml-1'>{artist?.totalSong}</span>
                    </div>
                </div>
                <button className='flex items-center bg-primaryColorPink px-3 py-1 rounded-[2px]'>
                    <FiUserPlus /> <span className='ml-1 text-[0.7rem]'>Follow</span>
                </button>
            </div>
        </div>
    )
}

export default AvatarArtist