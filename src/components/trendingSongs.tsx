"use client";
import Image from "next/image";
import { HeartIcon } from "@radix-ui/react-icons";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface Album {
  albumId: string,
  title: string
  albumImages: Array<ImageAlbum>
}
interface Artists {
  id: string,
  name: string,
  avatar: string
}
interface ImageAlbum {
  albumId: string,
  image: string,
  size: number
}
interface SongPlay {
  id: string;
  albumId: string;
  title: string;
  duration: number;
  lyric: string;
  filePathAudio: string;
  privacy: boolean;
  uploadUserId: string | null;
  createdAt: string;
  updatedAt: string;
  likeCount: string;
  viewCount: string;
  totalCount: string;
  album: Album;
  artists: Array<Artists>;
}

interface SongListProps {
  data?: Array<SongPlay>
}

const TrendingSongs: React.FC<SongListProps> = ({ data }) => {

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    });
  };

  const formatTime = (duration: number) => {
    const min = Math.floor(duration / 1000 / 60);
    const sec = Math.floor((duration / 1000) % 60);

    const formattedSec = sec < 10 ? '0' + sec : sec;

    return min + ':' + formattedSec;
  }

  return (
    <div className="bg-primaryColorBg w-full mt-2">
      <h1 className="text-white text-h1">
        Trending <span className="text-primaryColorPink"> Songs</span>
      </h1>
      <div className="flex flex-col justify-center items-center">
        <table className="max-w-full text-white border-separate border-spacing-y-3 ">
          <thead className="w-full max-h-[32px]">
            <tr>
              <th className="w-[3%] pl-4"></th>
              <th className="w-[4%] pl-4"></th>
              <th className="w-[30%] pl-4"></th>
              <th className="w-[15%] text-textMedium pl-4">Release Date</th>
              <th className="w-[33%] text-textMedium pl-4">Album</th>
              <th className="w-[15%] text-textMedium ">Time</th>
            </tr>
          </thead>
          <tbody className="">
            {data?.slice(0, 10)?.map((song, index) => {
              const nameArtist = song.artists && song.artists.length > 0 ? song.artists[0].name : 'Unknown Artist'
              const nameAlbum = song.album ? song.album.title : ''
              const poster = song.album && song.album.albumImages && song.album.albumImages.length > 0
                ? song.album.albumImages[0].image
                : 'https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da';
              return (
                <tr key={index} className="bg-secondColorBg  cursor-pointer hover:bg-gray-700">
                  <td className="pl-4 pr-8 text-h2 rounded-tl-lg rounded-bl-lg">
                    #{index + 1}
                  </td>
                  <td className="">
                    <Image
                      src={poster}
                      alt="song"
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  </td>
                  <td className="pl-4">
                    <h3 className="text-h3 mb-1 hover:underline">{song.title}</h3>
                    <p className="text-textSmall hover:underline">{nameArtist}</p>
                  </td>
                  <td className="text-textMedium pl-4 text-center">
                    {formatDate(song.updatedAt)}
                  </td>
                  <td className="text-textMedium pl-4 text-center">
                    {nameAlbum}
                  </td>
                  <td className="text-center pl-4 rounded-tr-lg rounded-br-lg align-middle">
                    <div className="flex gap-2 items-center justify-center">
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
                      <p className="text-textMedium">{formatTime(song.duration)}</p>
                    </div>
                  </td>
                </tr>
              )
            })}
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
