"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PlusIcon } from "@radix-ui/react-icons";
import { useAppContext } from "@/components/provider/songProvider";
import PropTypes from "prop-types";

// Define an interface for the props
interface Album {
  albumId: string;
  title: string;
  albumImages: Array<ImageAlbum>;
}
interface Artists {
  id: string;
  name: string;
  avatar: string;
}
interface ImageAlbum {
  albumId: string;
  image: string;
  size: number;
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
  maintitle?: string;
  subtitle?: string;
  data?: Array<SongPlay>;
}

const SongList: React.FC<SongListProps> = ({ maintitle, subtitle, data }) => {
  const { setCurrentSong, isSkip, setIsSkip, valueSkip, showSidebarRight } =
    useAppContext();
  const [index, setIndex] = useState<number | null>(null);

  const listSong: Array<{
    audio: string;
    poster: string;
    name: string;
    artist: string;
  }> = [];

  useEffect(() => {
    if (index !== null && index >= 0 && index < listSong.length && isSkip) {
      if (valueSkip === "back") {
        setIndex((prevIndex) =>
          prevIndex !== null && prevIndex > 0 ? prevIndex - 1 : 0
        );
      } else {
        setIndex((prevIndex) =>
          prevIndex !== null && prevIndex < listSong.length - 1
            ? prevIndex + 1
            : listSong.length - 1
        );
      }
    }
    if (index !== null && index >= 0 && index < listSong.length) {
      setCurrentSong(listSong[index]);
    }
    setIsSkip(false);
  }, [isSkip]);

  return (
    <div className="w-full">
      <h1 className="text-h1 mb-5">
        {maintitle} <span className="text-primaryColorPink">{subtitle}</span>
      </h1>

      <div
        id="list"
        className="w-full flex flex-wrap gap-3 items-stretch"
      >
        {(showSidebarRight ? data?.slice(0, 4) : data?.slice(0, 5))?.map(
          (song, index) => {
            const nameArtist =
              song.artists && song.artists.length > 0
                ? song.artists[0].name
                : "Unknown Artist";
            const poster =
              song.album &&
              song.album.albumImages &&
              song.album.albumImages.length > 0
                ? song.album.albumImages[0].image
                : "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da";
            const songData = {
              audio: song.filePathAudio,
              poster: poster,
              name: song.title,
              artist: nameArtist,
            };
            listSong.push(songData);
            return (
              <div
                key={index}
                className={`bg-[#1F1F1F] p-2 px-3 mr-3 ${
                  showSidebarRight ? "w-[12vw]" : "w-[13vw]"
                } rounded-lg cursor-pointer flex flex-col`}
                onClick={() => {
                  setCurrentSong(songData);
                  setIndex(index);
                }}
              >
                <Image
                  src={poster}
                  alt="Song Poster"
                  width={400}
                  height={400}
                  className="mb-2 rounded-md"
                />
                <div className="flex flex-col justify-between">
                  <p
                    className={`${
                      showSidebarRight ? "" : "text-h4"
                    } font-semibold mb-1 line-clamp-2`}
                  >
                    {song.title}
                  </p>
                  <p className="text-[0.8rem] font-thin mb-1 line-clamp-1">
                    {nameArtist}
                  </p>
                </div>
              </div>
            );
          }
        )}
        <div className="flex flex-col items-center cursor-pointer justify-center">
          <PlusIcon
            className={`${
              showSidebarRight ? "w-[40px] h-[40px]" : "w-[50px] h-[50px]"
            } bg-[#1F1F1F] rounded-full p-3 mb-2`}
          />
          <p
            className={`${
              showSidebarRight ? "font-semibold text-[0.9rem]" : "text-h4"
            } whitespace-nowrap`}
          >
            View All
          </p>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes as a fallback for runtime validation
SongList.propTypes = {
  maintitle: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SongList;
