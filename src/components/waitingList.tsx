"use client";
import { useAppContext } from "@/components/provider/songProvider";
import Image from "next/image";
import Lottie from 'react-lottie-player';
import animation from '../../public/animation/Animation - song.json'
import SongImage from '@/assets/img/placeholderSong.jpg'
import React from "react";
import "@/components/scss/waitingList.scss";

import { IoIosClose } from "react-icons/io";
import { getMainArtistInfo, getPosterSong } from "@/utils/utils";

const WaitingList: React.FC = () => {
  const { showWaitingList, setShowWaitingList, setShowSidebarRight, currentSong, waitingList, setCurrentSong } = useAppContext();

  if (!showWaitingList) return null;

  return (
    <div className="min-w-[20vw] block bg-secondColorBg text-white right-0 pl-1 animate-slide-up">
      <div
        className="flex flex-col w-[98%] bg-primaryColorBg rounded-lg mt-3"
      >
        <div className="block w-[18%] fixed bg-primaryColorBg py-3 shadow-lg shadow-black">
          <div className="w-full flex justify-between">
            <p className="font-semibold text-[1.1rem] mt-1 ml-3 text-primaryColorPink text-nowrap">
              Waiting list
            </p>
            <IoIosClose
              className="text-3xl cursor-pointer"
              onClick={() => {
                setShowSidebarRight(showWaitingList ? false : true);
                setShowWaitingList(!showWaitingList);
              }}
            />
          </div>
        </div>
        <div
          className="w-full self-center flex flex-col overflow-auto mt-16 h-screen
[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-inherit
  hover:[&::-webkit-scrollbar-thumb]:bg-white/30
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  hover:dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 "
        >
          <div className="flex flex-col px-3">
            <p className="font-bold my-4 text-[0.9rem]">Now playing</p>
            <div className="relative group flex">
              <Image
                src={currentSong?.album ? getPosterSong(currentSong.album).image : SongImage}
                alt="Song Poster"
                width={48}
                height={48}
                quality={100}
                className="object-cover rounded-md"
              />
              <div className="ml-3">
                <p className="font-bold text-primaryColorPink line-clamp-1" title={currentSong?.title}>{currentSong?.title}</p>
                <p className="font-thin text-primaryColorGray text-[0.9rem]">
                  {currentSong?.artists ? getMainArtistInfo(currentSong.artists)?.name : ''}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-3 mt-5">
            <p className="font-bold my-4 text-[0.9rem]">Continued from <span className="font-semibold text-primaryColorPink text-nowrap">
              Waiting list
            </span></p>
            {waitingList.map((song, index) => {
              const isCurrentPlaying = currentSong?.id === song.id;
              return (
                <div
                  key={index}
                  className={`relative group flex p-2 items-center rounded-md ${isCurrentPlaying ? "bg-primaryColorPink/10" : "hover:bg-slate-600"} transition-all duration-300 cursor-pointer`}
                  onClick={() => setCurrentSong(song)}
                >
                  <Image
                    src={getPosterSong(song.album).image}
                    alt="Song Poster"
                    width={48}
                    height={48}
                    quality={100}
                    className="object-cover rounded-md"
                  />
                  <div className="ml-3 w-[60%]">
                    <p className={`font-bold line-clamp-1 text-[0.95rem] ${isCurrentPlaying ? "text-primaryColorPink" : ""}`}>{song.title}</p>
                    <p className="font-thin text-primaryColorGray text-[0.9rem]">
                      {getMainArtistInfo(song.artists)?.name}
                    </p>
                  </div>
                  {
                    isCurrentPlaying && (
                      <div className="absolute right-3">
                        <Lottie
                          loop
                          animationData={animation}
                          play
                          style={{ width: 24, height: 24 }}
                        />
                      </div>
                    )
                  }
                </div>
              );
            })}
          </div>
          <div className={`${currentSong ? "mb-44" : "mb-20"}`}></div>
        </div>
      </div>
    </div>
  );
};

export default WaitingList;
