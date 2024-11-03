import Image from 'next/image'
import React from 'react'

import { FiUserPlus } from "react-icons/fi";
import {
    MdAudiotrack,
    MdOutlinePeopleAlt
} from "react-icons/md";

const AvatarArtist = () => {
    const listSong = [
        { avatar: 'https://i.scdn.co/image/ab6761610000e5eb7abbccceb90cd440283fa62a', name: 'Nàng thơ', artist: 'Hoàng Dũng' }
    ]
    return (
        <div>
            <div className='w-[150px] h-[150px]'>
                <Image
                    src={listSong[0].avatar}
                    alt="Song Poster"
                    width={500}
                    height={500}
                    quality={100}
                    className='w-full h-full object-cover rounded-full'
                />
                <p className='text-[0.95rem] font-semibold mt-3 my-2'>{listSong[0].artist}</p>
                <div className='flex gap-4 mb-3'>
                    <div title='1717 followers' className='flex items-center'>
                        <MdOutlinePeopleAlt /> <span className='text-primaryColorGray text-[0.8rem] ml-1'>1717</span>
                    </div>
                    <div title='17 tracks' className='flex items-center'>
                        <MdAudiotrack /> <span className='text-primaryColorGray text-[0.8rem] ml-1'>17</span>
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