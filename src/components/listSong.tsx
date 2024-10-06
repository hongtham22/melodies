import React from 'react'
import Image from 'next/image';
import Poster from '@/assets/img/song_img.jpg';

import {
    PlusIcon
} from '@radix-ui/react-icons'

const SongList = () => {
    const listSong = [
        { name: 'Nàng thơ', artist: 'Hoàng Dũng' },
        { name: 'Nàng thơ', artist: 'Hoàng Dũng' },
        { name: 'Nàng thơ', artist: 'Hoàng Dũng' },
        { name: 'Nàng thơ', artist: 'Hoàng Dũng' },
        { name: 'Nàng thơ', artist: 'Hoàng Dũng' },
    ]
    return (
        <div className=''>
            <h1 className='font-bold text-[1.5rem] mb-2'>Weekly Top <span className='text-primaryColorPink'>Songs</span></h1>
            <div className='flex items-center'>
                <div id="list" className='flex'>
                    {
                        listSong.map((song, index: number) => (
                            <div key={index} className='bg-[#1F1F1F] p-2 px-3 mr-3 w-[13vw] rounded-lg border border-gray-700 cursor-pointer'>
                                <Image
                                    src={Poster}
                                    alt="Song Poster"
                                    width={500}
                                    height={500}
                                    className='mb-2 rounded-2xl'
                                />
                                <p className='text-[1.1rem] font-semibold mb-1'>{song.name}</p>
                                <p className='text-[0.8rem] font-thin mb-1'>{song.artist}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-col items-center ml-3 cursor-pointer'>
                    <PlusIcon className='w-[50px] h-[50px] bg-[#1F1F1F] rounded-full p-3' />
                    <p className='whitespace-nowrap font-semibold'>View All</p>
                </div>
            </div>
        </div>
    )
}

export default SongList