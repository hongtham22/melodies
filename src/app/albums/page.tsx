"use client";
import Image from "next/image";
import React, { useState, useEffect, useMemo } from "react";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import { FaPlay } from "react-icons/fa";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoIosMore } from "react-icons/io";

function Page() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [dominantColor, setDominantColor] = useState<string>();

  // Memoize the songs array to avoid re-initialization on every render
  const songs = useMemo(
    () => [
      {
        title: "Pain the town red",
        artist: "The neighborhood",
        releaseDate: "Nov 4, 2023",
        album: "Hard to Imagine the Neighbourhood Ever Changing",
        duration: "3:26",
        imageUrl:
          "https://i.scdn.co/image/ab67616d00001e029fb4a807965fa0cb0972221b", 
      },
    ],
    []
  ); // Add dependencies if the songs array can dynamically change

  useEffect(() => {
    const getDominantColor = async () => {
      const imageUrl = songs[0].imageUrl; // Lấy URL từ bài hát đầu tiên
      try {
        const response = await fetch(
          `/api/get-dominant-color?imageUrl=${encodeURIComponent(imageUrl)}`
        );
        console.log("API response:", response);
        const data = await response.json();
        if (response.ok) {
          console.log("Dominant color:", data.dominantColor);
          setDominantColor(data.dominantColor); // Cập nhật màu vào state
        } else {
          console.error("Error fetching dominant color:", data.error);
        }
      } catch (error) {
        console.error("Error fetching dominant color:", error);
      }
    };

    if (songs.length > 0) {
      getDominantColor(); // Gọi hàm nếu mảng songs có phần tử
    }
  }, [songs]); // useEffect will now trigger only when songs change

  return (
    <div className="w-full mb-5">
      <div
        className="m-3 rounded-lg bg-gradient-to-b to-black/25"
        style={{
          background: `linear-gradient(to bottom, ${dominantColor} 20%, rgba(0, 0, 0, 0.5) 80%)`,
        }}
      >
        {/* Banner album */}
        <div className="p-5 flex flex-col gap-6 rounded-t-lg bg-gradient-to-b from-transparent to-black/50">
          {/* Header */}
          <div className="w-full h-12 bg-slate-300"></div>
          {/* Content albums */}
          <div className="flex items-end gap-8">
            <div className="shadow-[0_4px_60px_rgba(0,0,0,0.5)] rounded-md ">
              <Image
                src={songs[0].imageUrl}
                alt="Album Cover"
                width={220}
                height={220}
                priority
                className="rounded-md"
              />
            </div>
            <div className="flex gap-4 flex-col">
              <h3 className="">Album</h3>
              <h1 className="text-t1 text-[58px] ">dreamAMEE</h1>
              <div className="flex items-center space-x-2 text-h4 font-semibold">
                <p>AMEE</p>
                <span className="text-gray-300">•</span>
                <p className="text-gray-300">2021</p>
                <span className="text-gray-300">•</span>
                <p className="text-gray-300">10 songs, 1h 32 min 4 sec</p>
              </div>
            </div>
          </div>
        </div>

        {/* Song lists */}
        <div className="m-3 flex flex-col ">
          <div className="flex gap-5 items-center">
            <button className=" ml-3 h-14 w-14 mt-1 bg-transparent text-primaryColorPink rounded-[50%] flex items-center justify-center shadow-[0_4px_60px_rgba(0,0,0,0.3)] border-4 border-primaryColorPink">
              <FaPlay className="w-5 h-5 " />
            </button>
            <button className=" text-primaryColorPink">
              <TfiMoreAlt className="w-5 h-5 shadow-[0_4px_60px_rgba(0,0,0,0.3)]" />
            </button>
          </div>
          <table className="max-w-full text-white border-separate border-spacing-y-3 ">
            <thead className="w-full max-h-[32px]">
              <tr>
                <th className="w-[3%] pl-4"></th>
                <th className="w-[4%] pl-4"></th>
                <th className="w-[30%] pl-4"></th>
                <th className="w-[15%] text-textMedium pl-4">Release Date</th>
                <th className="w-[30%] text-textMedium pl-4">Album</th>
                <th className="w-[18%] text-textMedium ">Time</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 7 }, (_, index) => (
                <tr
                  key={index}
                  className="bg-secondColorBg cursor-pointer hover:bg-gray-700"
                >
                  <td className="pl-4 pr-8 text-h2 rounded-tl-lg rounded-bl-lg">
                    #{index + 1}
                  </td>
                  <td>
                    <Image
                      src={songs[0].imageUrl} 
                      alt="song"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  </td>
                  <td className="pl-4">
                    <h3 className="text-h3 mb-1 hover:underline">
                      {songs[0].title}
                    </h3>
                    <p className="text-textSmall hover:underline">
                      {songs[0].artist}
                    </p>
                  </td>
                  <td className="text-textMedium pl-4 text-center">
                    {songs[0].releaseDate}
                  </td>
                  <td className="text-textMedium pl-4 text-center">
                    {songs[0].album}
                  </td>
                  <td className="text-center pl-4 rounded-tr-lg rounded-br-lg align-middle">
                    <div className="flex gap-3 items-center justify-center">
                      <div
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {hoveredIndex === index ? (
                          <HeartFilledIcon className="text-primaryColorPink w-5 h-5 cursor-pointer" />
                        ) : (
                          <HeartIcon className="text-primaryColorPink w-5 h-5 cursor-pointer" />
                        )}
                      </div>
                      <p className="text-textMedium">{songs[0].duration}</p>
                      <button className="hover:scale-110">
                        <IoIosMore className="w-5 h-5 shadow-[0_4px_60px_rgba(0,0,0,0.3)]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Page;
