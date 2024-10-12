'use client'
import React from 'react'
import Image from 'next/image';
import { useAppContext } from '@/components/provider/songProvider';

import {
    PlusIcon
} from '@radix-ui/react-icons'

const MoodPlaylist = () => {
    const { showContentSong } = useAppContext();

    const listSong = [
        { audio: '/audio/NangTho.mp3', poster: 'https://i.scdn.co/image/ab67616d00001e02c8e1db773a282546b2a57fd9', name: 'Nàng thơ', artist: 'Hoàng Dũng' },
        { audio: '/audio/EmDungKhoc.mp3', poster: "https://i.scdn.co/image/ab67616d00001e02827bd87fc2dec81441a4a059", name: 'Em đừng khóc', artist: 'Chillies' },
        { audio: '/audio/DoanKetMoi.mp3', poster: "https://i.scdn.co/image/ab67616d00001e02d0e2168c8f5e545b621ad549", name: 'Đoạn kết mới', artist: 'Hoàng Dũng' },
        { audio: '/audio/MotNganNoiDau.mp3', poster: "https://i.scdn.co/image/ab67616d00001e02acdef1320a648494b4303e9d", name: 'Một ngàn nỗi đau', artist: 'Văn Mai Hương' },
        { audio: '/audio/Audio.mp3', poster: 'https://i.scdn.co/image/ab67616d00001e02a1bc26cdd8eecd89da3adc39', name: 'Đừng làm trái tim anh đau', artist: 'Sơn Tùng M-TP' },
    ]
    return (
        <div className=''>
            <h1 className='text-h1 my-6'>Mood <span className='text-primaryColorPink'>Playlists</span></h1>
            <div className='flex items-center'>
                <div id="list" className='flex'>
                    {
                        (showContentSong ? listSong.slice(0, 4) : listSong).map((song, index) => (
                            <div
                                key={index}
                                className={`bg-[#1F1F1F] p-2 px-3 mr-3 ${showContentSong ? 'w-[11vw]' : 'w-[13vw]'} rounded-lg cursor-pointer`}
                            >
                                <Image
                                    src={song.poster}
                                    alt="Song Poster"
                                    width={400}
                                    height={400}
                                    className='mb-2 rounded-2xl'
                                />
                                <p className={`${showContentSong ? '' : 'text-[1.1rem]'} font-semibold mb-1`}>{song.name}</p>
                            </div>
                        ))
                    }
                </div>

                <div className='flex flex-col items-center ml-3 cursor-pointer'>
                    <PlusIcon className={`${showContentSong ? 'w-[40px] h-[40px]' : 'w-[50px] h-[50px]'} bg-[#1F1F1F] rounded-full p-3 mb-2`} />
                    <p className={`${showContentSong ? 'font-semibold text-[0.9rem]' : 'text-h4'} whitespace-nowrap`}>View All</p>
                </div>
            </div>
        </div>
    )
}

export default MoodPlaylist