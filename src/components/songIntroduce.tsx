"use client";
import { useAppContext } from "@/components/provider/songProvider";
import Image from "next/image";
import React from "react";
import "@/components/scss/songIntroduce.scss";

import { IoIosMore, IoIosClose, IoIosLink } from "react-icons/io";
import { GoPlusCircle } from "react-icons/go";

const SongIntroduce: React.FC = () => {
  const {
    showContentSong,
    setShowContentSong,
    currentSong,
    setShowSidebarRight,
  } = useAppContext();

  if (!showContentSong) return null;

  return (
    <div className="min-w-[20vw] block bg-secondColorBg text-white right-0 pl-1 animate-slide-in-right">
      <div
        className="
            flex flex-col w-[98%] bg-primaryColorBg rounded-md mt-3 group
                    
            "
      >
        <div className="block w-[18%] fixed bg-primaryColorBg py-3 shadow-lg shadow-black">
          <div className="w-full flex justify-between">
            <p className="font-semibold mt-1 ml-3 text-[1.1rem] text-primaryColorPink text-nowrap line-clamp-1">
              Nàng thơ
            </p>
            <div className="flex items-center gap-2">
              <IoIosMore className="text-2xl" />
              <IoIosClose
                className="text-3xl cursor-pointer"
                onClick={() => {
                  setShowContentSong(!showContentSong);
                  setShowSidebarRight(showContentSong ? false : true);
                }}
              />
            </div>
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
          <div className="self-center mb-6">
            <Image
              src="https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da"
              alt="Song Poster"
              width={260}
              height={260}
              quality={100}
              className="object-cover rounded-md mb-3"
            />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">Nàng Thơ</p>
                <p className="text-[0.95rem] text-primaryColorGray">
                  Hoàng Dũng
                </p>
              </div>
              <div className="cursor-pointer gap-2 text-white flex">
                <IoIosLink
                  title="Sao chép liên kết bài hát"
                  className="w-[20px] h-[20px] opacity-0 group-hover:opacity-100 transition-transform duration-200 hover:scale-105"
                />
                <GoPlusCircle className="w-[20px] h-[20px] transition-transform duration-200 hover:scale-105" />
              </div>
            </div>
          </div>
          <div
            className={`relative self-center rounded-md ${currentSong ? "mb-60" : "mb-40"
              } `}
          >
            <Image
              src="https://i.scdn.co/image/ab67616100005174d1f2d75c4da62e87d1ede357"
              alt="Song Poster"
              width={260}
              height={260}
              quality={100}
              className="object-cover rounded-md"
            />
            <div
              className="absolute inset-0 pointer-events-none z-0 rounded-md"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%)",
              }}
            />
            <p className="absolute top-3 left-4 font-semibold z-10 text-[0.95rem]">
              Giới thiệu về nghệ sĩ
            </p>
            <div className="absolute bg-[#1F1F1F] w-full z-10 mb-3 -mt-4 py-2 px-1 flex justify-center items-center rounded-b-lg">
              <div className="w-1/2">
                <p className="font-semibold">Hoàng Dũng</p>
                <p className="text-[0.95rem] text-primaryColorGray text-wrap">
                  123.456 người theo dõi
                </p>
              </div>
              <button className="border-2 border-slate-50 font-semibold px-3 py-1 rounded-full text-[0.9rem] text-nowrap">
                Hủy theo dõi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongIntroduce;
