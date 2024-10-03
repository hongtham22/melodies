'use client';
import Image from "next/image";
import songimg from "../../../public/images/songs.png";
import { HeartIcon } from "@radix-ui/react-icons";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

function TrendingSongs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const songs = [
    {
      title: "Pain the town red",
      artist: "The neighborhood",
      releaseDate: "Nov 4, 2023",
      album: "Hard to Imagine the Neighbourhood Ever Changing",
      duration: "3:26",
    },
  ];

  return (
    <div className="bg-primaryColorBg w-[1062px] mx-6 my-6 p-3">
      <h1 className="text-white text-h1">
        Trending <span className="text-primaryColorPink"> Songs</span>
      </h1>
      <div className="flex flex-col justify-center items-center">
        <table className="max-w-full text-white border-separate border-spacing-y-3 ">
          <thead className="max-h-[32px]">
            <tr>
              <th className="w-[30px] pl-4"></th>
              <th className="w-[60px] pl-4"></th>
              <th className="w-[250px] pl-4"></th>
              <th className="w-[130px] text-textBig pl-4">Release Date</th>
              <th className="w-[400px] text-textBig pl-4">Album</th>
              <th className="w-[80px] text-textBig ">Time</th>
            </tr>
          </thead>
          <tbody className="">
            {Array.from({ length: 7 }, (_, index) => (
              <tr key={index} className="bg-secondColorBg">
                <td className="pl-4 pr-8 text-h2 rounded-tl-lg rounded-bl-lg">
                  #{index + 1}
                </td>
                <td className="">
                  <Image
                    src={songimg}
                    alt="song"
                    width={60}
                    height={60}
                    className="rounded-lg"
                  />
                </td>
                <td className="pl-4">
                  <h3 className="text-h3 mb-1">{songs[0].title}</h3>
                  <p className="text-textSmall">{songs[0].artist}</p>
                </td>
                <td className="text-textMedium pl-4 text-center">
                  {songs[0].releaseDate}
                </td>
                <td className="text-textMedium pl-4 text-center">
                  {songs[0].album}
                </td>
                <td className="text-center pl-4 rounded-tr-lg rounded-br-lg">
                  <div className="flex gap-2">
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="h-[40px] w-[120px] mt-1 bg-secondColorBg text-white rounded-sm flex items-center justify-center gap-2">
          <PlusIcon className="w-5 h-5" />
          View All
        </button>
      </div>
    </div>
  );
}

export default TrendingSongs;
