'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { CiCirclePlus } from "react-icons/ci";
import { FaCirclePlay } from "react-icons/fa6";
import { BsFilePlayFill } from "react-icons/bs";
import {
    PiMicrophoneStageFill,
    PiSpeakerHighFill
} from "react-icons/pi";
import {
    MdLyrics,
    MdCastConnected
} from "react-icons/md";
import { RiExpandDiagonalLine } from "react-icons/ri";
import {
    IoPlaySkipBackSharp,
    IoPlaySkipForward,
    IoRepeat
} from "react-icons/io5";

import { TbSwitch3 } from "react-icons/tb";

const MusicPlayer = () => {
    const [endTime, setEndTime] = useState<number>(279);
    const [startTime, setStartTime] = useState<number>(20);
    const [progressWidth, setProgressWidth] = useState(0);
    const [sound, setSound] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            if (startTime < endTime) {
                setStartTime(prevTime => prevTime + 1);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime]);

    useEffect(() => {
        const progress = (startTime / endTime) * 100;
        setProgressWidth(progress);
    }, [startTime, endTime]);

    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleClickOnProgress = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressPercent = (clickX / rect.width) * 100;
        const newTime = (progressPercent / 100) * endTime;
        setStartTime(newTime);
    };
    const handleClickSound = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressPercent = Math.floor((clickX / rect.width) * 100);
        setSound(progressPercent);
    }
    return (
        <div className='fixed bottom-0 h-[12vh] w-full border-2 bg-[#121212] flex justify-between items-center px-5' >
            <div className='flex items-center'>
                <Image
                    src="https://i.scdn.co/image/ab67616d00001e02a1bc26cdd8eecd89da3adc39"
                    alt="Song Poster"
                    width={60}
                    height={60}
                    className='mb-2 rounded-md'
                />
                <div className='ml-3'>
                    <p className='font-[400]'>Đừng làm trái tim anh đau</p>
                    <p className='text-[0.8rem] text-primaryColorGray font-thin'>Sơn Tùng M-TP</p>
                </div>
                <div className='ml-3 cursor-pointer text-primaryColorGray transition-transform duration-200 hover:scale-105 hover:text-white'>
                    <CiCirclePlus className='w-[24px] h-[24px]' />
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <div className='flex items-center mb-1'>
                    <TbSwitch3 className='mx-3 w-[24px] h-[24px] cursor-pointer text-primaryColorGray hover:text-primaryColorPink' />
                    <IoPlaySkipBackSharp className='mx-3 w-[24px] h-[24px] cursor-pointer text-primaryColorGray hover:text-primaryColorPink' />
                    <FaCirclePlay className='mx-3 w-[32px] h-[32px] cursor-pointer' />
                    <IoPlaySkipForward className='mx-3 w-[24px] h-[24px] cursor-pointer text-primaryColorGray hover:text-primaryColorPink' />
                    <IoRepeat className='mx-3 w-[24px] h-[24px] cursor-pointer text-primaryColorGray hover:text-primaryColorPink' />
                </div>
                <div className='flex items-center'>
                    <p className='mx-2 text-[0.9rem]'>{formatTime(startTime)}</p>
                    <div className='relative' onClick={handleClickOnProgress}>
                        <div className='w-[35vw] bg-[#4D4D4D] h-1 rounded-md'></div>
                        <div
                            className='absolute bg-white top-0 w-full h-1 rounded-md'
                            style={{ width: `${progressWidth}%` }}
                        ></div>
                    </div>
                    <p className='mx-2 text-[0.9rem]'>{formatTime(endTime)}</p>
                </div>
            </div>
            <div className='flex'>
                <BsFilePlayFill className='w-[18px] h-[18px] ml-2 cursor-pointer' />
                <PiMicrophoneStageFill className='w-[18px] h-[18px] ml-2 cursor-pointer' />
                <MdLyrics className='w-[18px] h-[18px] ml-2 cursor-pointer' />
                <MdCastConnected className='w-[18px] h-[18px] ml-2 cursor-pointer' />
                <div className='flex items-center ml-2 cursor-pointer'>
                    <PiSpeakerHighFill className='w-[18px] h-[18px]' />
                    <div className='relative ml-1'
                        onClick={handleClickSound}
                        title={`${sound}`}
                    >
                        <div className='w-[7vw] bg-[#4D4D4D] h-1 rounded-md'></div>
                        <div
                            className='absolute bg-white top-0 w-full h-1 rounded-md'
                            style={{ width: `${sound}%` }}
                        ></div>
                    </div>
                </div>

                <RiExpandDiagonalLine className='w-[18px] h-[18px] ml-2 cursor-pointer' />
            </div>
        </div>
    )
}

export default MusicPlayer