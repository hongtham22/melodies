'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '@/components/provider/songProvider';
import Image from 'next/image';
import './scss/musicPlayer.scss'

import { GoPlusCircle } from "react-icons/go";
import {
    FaCirclePlay,
    FaCirclePause,
    FaForward,
    FaBackward,
    FaRepeat,
    FaListCheck
} from "react-icons/fa6";
import {
    BsFilePlayFill,
    BsSkipEndFill,
    BsFillSkipStartFill,
} from "react-icons/bs";
import {
    PiSpeakerHighFill,
    PiSpeakerXFill,
    PiSpeakerLowFill
} from "react-icons/pi";
import {
    MdLyrics,
} from "react-icons/md";
import {
    RiExpandDiagonalLine
} from "react-icons/ri";

import { TbSwitch3 } from "react-icons/tb";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { formatTime, getMainArtistName, getPosterSong } from '@/utils/utils';
import WaveSurfer from 'wavesurfer.js';

const MusicPlayer: React.FC = () => {
    const {
        currentSong,
        showContentSong,
        setShowContentSong,
        setShowSidebarRight,
        showWaitingList,
        setShowWaitingList,
        showLyricPage,
        setShowLyricPage,
        nextSong,
        previousSong,
        startTime,
        setStartTime,
    } = useAppContext()

    const [isPlaying, setIsPlaying] = useState(false);
    const [endTime, setEndTime] = useState<number>(0);
    // const [startTime, setStartTime] = useState<number>(0);
    const [progressWidth, setProgressWidth] = useState(0);
    const [isRepeat, setIsRepeat] = useState(false);
    const [sound, setSound] = useState(100);
    const [isMute, setIsMute] = useState(false)
    const wavesurferRef = useRef<WaveSurfer | null>(null);
    const waveformContainerRef = useRef<HTMLDivElement | null>(null);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (currentSong?.filePathAudio) {
            audioRef.current = new Audio(currentSong.filePathAudio);
            const audioElement = audioRef.current;

            wavesurferRef.current = WaveSurfer.create({
                container: waveformContainerRef.current!,
                waveColor: 'rgba(255, 255, 255, 0.5)',
                progressColor: 'rgba(255, 0, 0, 0)',
                height: 25,
                normalize: true,
            });

            wavesurferRef.current.load('/audio/NangTho.mp3');
            // wavesurferRef.current.load('https://audiomelodies.nyc3.cdn.digitaloceanspaces.com/AUDIO/OLD/HoangDung/25/NangTho.m4a');

            const handleMetadataLoaded = () => {
                const duration = audioElement.duration;
                setEndTime(duration)

                audioElement?.play()
                    .then(() => {
                        setIsPlaying(true);
                    })
                    .catch((error) => {
                        console.error('Autoplay failed:', error);
                    });
            };

            const handleTimeUpdate = () => {
                setStartTime(audioElement.currentTime);
            };
            const handleAudioEnded = () => {
                setIsPlaying(false);
                nextSong()
                setStartTime(0)
            };

            audioElement.addEventListener('loadedmetadata', handleMetadataLoaded);
            audioElement.addEventListener('timeupdate', handleTimeUpdate);
            audioElement.addEventListener('ended', handleAudioEnded);

            audioElement.volume = sound / 100;

            return () => {
                if (audioRef.current) {
                    audioRef.current.pause(); // Pause the audio
                    audioRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
                    audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                    audioRef.current.removeEventListener('ended', handleAudioEnded);
                    wavesurferRef.current?.destroy();
                }
            };
        }
    }, [currentSong]);

    useEffect(() => {
        const handleLyricClick = (event: CustomEvent) => {
            if (audioRef.current) {
                const newTime = event.detail.startTime; // Lấy thời gian từ sự kiện
                audioRef.current.currentTime = newTime;
                setStartTime(newTime);
                audioRef.current.play();
                setIsPlaying(true);
            }
        };

        document.addEventListener('lyricClick', handleLyricClick as EventListener);

        return () => {
            document.removeEventListener('lyricClick', handleLyricClick as EventListener);
        };
    }, []);


    useEffect(() => {
        const progress = (startTime / endTime) * 100;
        setProgressWidth(progress);
    }, [startTime, endTime]);

    const handleClickOnProgress = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressPercent = (clickX / rect.width) * 100;
        const newTime = (progressPercent / 100) * endTime;
        if (audioRef.current) {
            const audioElement = audioRef.current;
            audioElement.currentTime = newTime;
            setStartTime(audioElement.currentTime);
        }
    };
    const handleClickSound = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const progressPercent = Math.floor((clickX / rect.width) * 100);
        setSound(progressPercent);
        if (audioRef.current) {
            audioRef.current.volume = progressPercent / 100;
        }
    }

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSkipForward = () => {
        if (audioRef.current) {
            const audioElement = audioRef.current;
            audioElement.currentTime += 5;
            setStartTime(audioElement.currentTime);
        }
    };

    const handleSkipBackward = () => {
        if (audioRef.current) {
            const audioElement = audioRef.current;
            audioElement.currentTime -= 5;
            setStartTime(audioElement.currentTime);
        }
    };

    const handleRepeat = () => {
        setIsRepeat(!isRepeat);
        if (audioRef.current) {
            audioRef.current.loop = !audioRef.current.loop;
        }
    };

    const handleMuteSound = () => {
        if (audioRef.current) {
            if (isMute) {
                audioRef.current.volume = 20 / 100;
                setSound(20)
            } else {
                audioRef.current.volume = 0 / 100;
                setSound(0)
            }
            setIsMute(!isMute)
        }
    }

    const getVolumeIcon = () => {
        if (sound === 0) {
            return <PiSpeakerXFill className='w-[18px] h-[18px]' onClick={handleMuteSound} />;
        } else if (sound < 50 && sound > 0) {
            return <PiSpeakerLowFill className='w-[18px] h-[18px]' onClick={handleMuteSound} />;
        } else {
            return <PiSpeakerHighFill className='w-[18px] h-[18px]' onClick={handleMuteSound} />;
        }
    };

    if (!currentSong) return null;

    return (
        <TooltipProvider>
            <div className='fixed bottom-0 h-[12%] w-full border-2 bg-[#121212] flex justify-between items-center px-5 z-40' >
                <div className='flex items-center w-[23%]'>
                    <Image
                        src={getPosterSong(currentSong?.album).image}
                        alt="Song Poster"
                        width={60}
                        height={60}
                        className='mb-2 rounded-md'
                    />
                    <div className='ml-3 max-w-[70%]'>
                        <div className='relative max-w-full overflow-hidden cursor-pointer hover:underline'>
                            <p
                                className={`font-[500] ${currentSong.title.length > 25 ? 'marquee' : ''}`}
                            >
                                {currentSong.title}
                            </p>
                        </div>
                        <p className='text-[0.8rem] text-primaryColorGray font-thin cursor-pointer hover:underline hover:text-white'>{getMainArtistName(currentSong.artists)}</p>
                    </div>
                    <div className='ml-3 cursor-pointer text-primaryColorGray transition-transform duration-200 hover:scale-105 hover:text-white'>
                        <GoPlusCircle className='w-[20px] h-[20px]' />
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='flex items-center mb-1 text-primaryColorGray cursor-pointer'>
                        <Tooltip>
                            <TooltipTrigger>
                                <TbSwitch3 className='mx-3 w-[24px] h-[24px] hover:text-primaryColorPink' />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Bật phát lộn xộn</p>
                            </TooltipContent>
                        </Tooltip>
                        <BsFillSkipStartFill
                            className='mx-3 w-[25px] h-[25px] hover:text-primaryColorPink'
                            onClick={previousSong}
                        />
                        <FaBackward
                            className='mx-3 w-[20px] h-[20px]  hover:text-primaryColorPink'
                            onClick={handleSkipBackward}
                        />
                        {isPlaying ? (
                            <FaCirclePause
                                className='mx-3 w-[32px] h-[32px]  hover:text-primaryColorPink'
                                onClick={handlePlayPause}
                            />
                        ) : (
                            <FaCirclePlay
                                className='mx-3 w-[32px] h-[32px]  hover:text-primaryColorPink'
                                onClick={handlePlayPause}
                            />
                        )}
                        <FaForward
                            className='mx-3 w-[20px] h-[20px] hover:text-primaryColorPink'
                            onClick={handleSkipForward}
                        />
                        <BsSkipEndFill
                            className='mx-3 w-[25px] h-[25px] hover:text-primaryColorPink'
                            onClick={nextSong}
                        />
                        <Tooltip>
                            <TooltipTrigger className='relative'>
                                <FaRepeat
                                    className={`mx-3 w-[20px] h-[20px] hover:text-primaryColorPink ${isRepeat ? 'text-primaryColorPink' : 'text-white'}`}
                                    onClick={handleRepeat}
                                />
                                {
                                    isRepeat &&
                                    (
                                        <div className='absolute left-2 -bottom-2 mx-3 w-[5px] h-[5px] bg-primaryColorPink rounded-full'>

                                        </div>
                                    )
                                }
                            </TooltipTrigger>
                            <TooltipContent>
                                {isRepeat ? 'Tắt chế độ lặp lại' : 'Bật chế độ lặp lại một bài'}
                            </TooltipContent>
                        </Tooltip>

                    </div>
                    <div className='flex items-center'>
                        <p className='mx-2 text-[0.9rem]'>{formatTime(startTime * 1000)}</p>
                        <div className='relative group hover:cursor-pointer' onClick={handleClickOnProgress}>
                            <div className='absolute -top-[270%] left-0 w-full h-full opacity-0 group-hover:opacity-100 -z-10'
                                ref={waveformContainerRef} id="waveform"></div>
                            <div className='w-[35vw] bg-[#4D4D4D] h-1 rounded-md '></div>
                            <div
                                className='absolute bg-white top-0 w-full h-1 rounded-md'
                                style={{ width: `${progressWidth}%` }}
                            ></div>
                            <div
                                className='absolute -top-[100%] left-[50%] w-3 h-3 bg-white rounded-full transform -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                                style={{ left: `calc(${progressWidth}%)` }}  // Adjust the position of the circle
                            ></div>
                        </div>
                        <p className='mx-2 text-[0.9rem]'>{formatTime(endTime * 1000)}</p>
                    </div>
                </div>
                <div className='flex'>
                    <BsFilePlayFill
                        className={`w-[18px] h-[18px] ml-2 cursor-pointer ${showContentSong ? 'text-primaryColorPink' : 'text-white'}`}
                        onClick={() => { setShowContentSong(!showContentSong); setShowSidebarRight(showContentSong ? false : true); setShowWaitingList(false) }}
                    />
                    <MdLyrics
                        className={`w-[18px] h-[18px] ml-2 cursor-pointer ${showLyricPage ? 'text-primaryColorPink' : 'text-white'}`}
                        onClick={() => setShowLyricPage(!showLyricPage)}
                    />
                    <FaListCheck
                        className={`w-[18px] h-[18px] ml-2 cursor-pointer ${showWaitingList ? 'text-primaryColorPink' : 'text-white'}`}
                        onClick={() => { setShowSidebarRight(showWaitingList ? false : true); setShowWaitingList(!showWaitingList); setShowContentSong(false) }}
                    />
                    <div className='flex items-center ml-2 cursor-pointer'>
                        {getVolumeIcon()}

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
        </TooltipProvider>
    )
}

export default MusicPlayer