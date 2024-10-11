'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

import {
    PlusIcon
} from '@radix-ui/react-icons'
import { useAppContext } from '@/components/provider/songProvider';

const SongList = () => {
    const { setCurrentSong, isSkip, setIsSkip, valueSkip } = useAppContext();
    const [index, setIndex] = useState<number | null>(null);

    useEffect(() => {
        if (index !== null && index >= 0 && index < listSong.length && isSkip) {
            if (valueSkip === 'back') {
                setIndex(prevIndex => (prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : 0));
            } else {
                setIndex(prevIndex => (prevIndex !== null && prevIndex < listSong.length - 1 ? prevIndex + 1 : listSong.length - 1));
            }
        }
        if (index !== null && index >= 0 && index < listSong.length) {
            setCurrentSong(listSong[index]);
        }
        setIsSkip(false);
    }, [isSkip]);




    const listSong = [
        { audio: '/audio/NangTho.mp3', poster: 'https://i.scdn.co/image/ab67616d00001e02c8e1db773a282546b2a57fd9', name: 'Nàng thơ', artist: 'Hoàng Dũng' },
        { audio: '/audio/EmDungKhoc.mp3', poster: "https://i.scdn.co/image/ab67616d00001e02827bd87fc2dec81441a4a059", name: 'Em đừng khóc', artist: 'Chillies' },
        { audio: '/audio/DoanKetMoi.mp3', poster: "https://i.scdn.co/image/ab67616d00001e02d0e2168c8f5e545b621ad549", name: 'Đoạn kết mới', artist: 'Hoàng Dũng' },
        { audio: '/audio/MotNganNoiDau.mp3', poster: "https://i.scdn.co/image/ab67616d00001e02acdef1320a648494b4303e9d", name: 'Một ngàn nỗi đau', artist: 'Văn Mai Hương' },
        { audio: '/audio/Audio.mp3', poster: 'https://i.scdn.co/image/ab67616d00001e02a1bc26cdd8eecd89da3adc39', name: 'Đừng làm trái tim anh đau', artist: 'Sơn Tùng M-TP' },
    ]

    return (
        <div className=''>
            <h1 className='font-bold text-[1.5rem] mb-2'>Weekly Top <span className='text-primaryColorPink'>Songs</span></h1>
            <div className='flex items-center'>
                <div id="list" className='flex'>
                    {
                        listSong.map((song, index: number) => (
                            <div
                                key={index}
                                className='bg-[#1F1F1F] p-2 px-3 mr-3 w-[13vw] rounded-lg border border-gray-700 cursor-pointer'
                                onClick={() => { setCurrentSong(song); setIndex(index) }}
                            >
                                <Image
                                    src={song.poster}
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