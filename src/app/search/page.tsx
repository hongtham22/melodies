'use client'
import SongList from "@/components/listSong";
import PopularArtists from "@/components/popularArtists";
import Image from "next/image"
import { useState } from "react";

import {
    FaCirclePlay,
} from "react-icons/fa6";

const SearchPage = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
    };
    const categories = ['All', 'Song', 'Playlist', 'Artist', 'Album'];

    const listSong = [
        { audio: '/audio/NangTho.mp3', poster: 'https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da', name: 'Nàng thơ', artist: 'Hoàng Dũng', duration: '4:14' },
        { audio: '/audio/EmDungKhoc.mp3', poster: "https://i.scdn.co/image/ab67616d00001e02827bd87fc2dec81441a4a059", name: 'Em đừng khóc', artist: 'Chillies', duration: '4:14' },
        { audio: '/audio/DoanKetMoi.mp3', poster: "https://i.scdn.co/image/ab67616d00001e02d0e2168c8f5e545b621ad549", name: 'Đoạn kết mới', artist: 'Hoàng Dũng', duration: '4:14' },
        { audio: '/audio/Audio.mp3', poster: 'https://i.scdn.co/image/ab67616d00001e02a1bc26cdd8eecd89da3adc39', name: 'Đừng làm trái tim anh đau', artist: 'Sơn Tùng M-TP', duration: '4:14' },
    ]
    return (
        <div className="mt-[8%] w-full min-h-dvh bg-secondColorBg p-3">
            <div className="bg-[#0E0E0E] w-full p-6 rounded-xl">
                <div className="mb-7">
                    <ul className="flex gap-3">
                        {categories.map((category) => (
                            <li
                                key={category}
                                className={`px-3 py-1 font-semibold text-[0.9rem] rounded-full cursor-pointer ${activeCategory === category ? 'bg-white text-black' : 'bg-[#2F2F2F] text-white hover:bg-[#333333]'
                                    }`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-5">
                    <div className="w-[30%]">
                        <p className="font-bold text-[1.5rem] mb-2">Kết quả hàng đầu</p>
                        <div className="relative bg-[#121212]  pt-4 pb-6 px-4 rounded-xl hover:bg-[#2F2F2F] cursor-pointer group">
                            <Image
                                src="https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da"
                                alt="Song Poster"
                                width={110}
                                height={110}
                                quality={100}
                                className='object-cover rounded-md mb-3'
                            />
                            <p className="w-[70%] text-3xl font-bold line-clamp-2">Nàng thơ</p>
                            <div className="flex items-center gap-2 text-[0.95rem]">
                                <p className="text-primaryColorGray">Bài hát</p>
                                <div className="h-[6px] w-[6px] bg-primaryColorGray rounded-full">

                                </div>
                                <p>Hoàng Dũng</p>
                            </div>
                            <div className="absolute right-3 bottom-7 opacity-0 group-hover:text-primaryColorPink group-hover:opacity-100">
                                <FaCirclePlay
                                    className='mx-3 w-[45px] h-[45px]'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[60%]">
                        <p className="font-bold text-[1.5rem] mb-2">Bài hát</p>
                        <div className="flex flex-col gap-1 w-full">
                            {
                                listSong.map((song, index) => (
                                    <div key={index} className='flex justify-between items-center cursor-pointer hover:bg-[#2F2F2F] py-2 px-3 rounded-md'>
                                        <div className="relative group flex">
                                            <Image
                                                src={song.poster}
                                                alt="Song Poster"
                                                width={45}
                                                height={45}
                                                quality={100}
                                                className='object-cover rounded-md'
                                            />
                                            <div className='ml-3'>
                                                <p className='font-bold'>{song.name}</p>
                                                <p className='font-thin text-primaryColorGray text-[0.9rem]'>{song.artist}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-primaryColorGray font-thin text-[0.9rem]">{song.duration}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                </div>
                <div className="mt-6">
                    <p className="font-bold text-[1.5rem] mb-2">Artist</p>
                    <PopularArtists />
                </div>
                <div className="mt-6">
                    <p className="font-bold text-[1.5rem] mb-2">Album</p>
                    <SongList />
                </div>
                <div className="mt-6">
                    <p className="font-bold text-[1.5rem] mb-2">Playlist</p>
                    <SongList />
                </div>
            </div>

        </div>
    )
}

export default SearchPage