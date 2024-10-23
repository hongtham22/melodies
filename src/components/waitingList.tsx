"use client";
import { useAppContext } from "@/components/provider/songProvider";
import Image from "next/image";
import React from "react";
import "@/components/scss/waitingList.scss";

import { IoIosClose } from "react-icons/io";

const WaitingList: React.FC = () => {
  const { waitingList, setWaitingList, setShowSidebarRight, currentSong } =
    useAppContext();

  const listSong = [
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
      name: "Nàng thơ",
      artist: "Hoàng Dũng",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02827bd87fc2dec81441a4a059",
      name: "Em đừng khóc",
      artist: "Chillies",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02d0e2168c8f5e545b621ad549",
      name: "Đoạn kết mới",
      artist: "Hoàng Dũng",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02acdef1320a648494b4303e9d",
      name: "Một ngàn nỗi đau",
      artist: "Văn Mai Hương",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02a1bc26cdd8eecd89da3adc39",
      name: "Đừng làm trái tim anh đau",
      artist: "Sơn Tùng M-TP",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
      name: "Nàng thơ",
      artist: "Hoàng Dũng",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02827bd87fc2dec81441a4a059",
      name: "Em đừng khóc",
      artist: "Chillies",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02d0e2168c8f5e545b621ad549",
      name: "Đoạn kết mới",
      artist: "Hoàng Dũng",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02acdef1320a648494b4303e9d",
      name: "Một ngàn nỗi đau",
      artist: "Văn Mai Hương",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02a1bc26cdd8eecd89da3adc39",
      name: "Đừng làm trái tim anh đau",
      artist: "Sơn Tùng M-TP",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
      name: "Nàng thơ",
      artist: "Hoàng Dũng",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02827bd87fc2dec81441a4a059",
      name: "Em đừng khóc",
      artist: "Chillies",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02d0e2168c8f5e545b621ad549",
      name: "Đoạn kết mới",
      artist: "Hoàng Dũng",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02acdef1320a648494b4303e9d",
      name: "Một ngàn nỗi đau",
      artist: "Văn Mai Hương",
    },
    {
      poster:
        "https://i.scdn.co/image/ab67616d00001e02a1bc26cdd8eecd89da3adc39",
      name: "Đừng làm trái tim anh đau",
      artist: "Sơn Tùng M-TP",
    },
  ];

  if (!waitingList) return null;

  return (
    <div className="min-w-[20vw] block bg-secondColorBg text-white right-0 pl-1 animate-slide-up">
      <div
        className="
            flex flex-col w-[98%] bg-primaryColorBg rounded-md mt-3
            "
      >
        <div className="block w-[18%] fixed bg-primaryColorBg py-3 shadow-lg shadow-black">
          <div className="w-full flex justify-between">
            <p className="font-semibold text-[1.1rem] mt-1 ml-3 text-primaryColorPink text-nowrap">
              Waiting list
            </p>
            <IoIosClose
              className="text-3xl cursor-pointer"
              onClick={() => {
                setShowSidebarRight(waitingList ? false : true);
                setWaitingList(!waitingList);
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
                src="https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da"
                alt="Song Poster"
                width={48}
                height={48}
                quality={100}
                className="object-cover rounded-md"
              />
              <div className="ml-3">
                <p className="font-bold text-primaryColorPink">Nàng thơ</p>
                <p className="font-thin text-primaryColorGray text-[0.9rem]">
                  Hoàng Dũng
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-3 mt-5">
            <p className="font-bold my-4 text-[0.9rem]">Continued from ...</p>
            {listSong.map((song, index) => {
              return (
                <div key={index} className="relative group flex my-2">
                  <Image
                    src={song.poster}
                    alt="Song Poster"
                    width={48}
                    height={48}
                    quality={100}
                    className="object-cover rounded-md"
                  />
                  <div className="ml-3">
                    <p className="font-bold line-clamp-1">{song.name}</p>
                    <p className="font-thin text-primaryColorGray text-[0.9rem]">
                      {song.artist}
                    </p>
                  </div>
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
