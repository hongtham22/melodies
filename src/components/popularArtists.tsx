'use client'
import React from "react";
import artistimg from "@/assets/img/artist.png";
import Image from "next/image";
import { PlusIcon } from "@radix-ui/react-icons";
import { useAppContext } from '@/components/provider/songProvider';

interface PeopleListProps {
  maintitle?: string;
  subtitle?: string;
}

const PopularArtists: React.FC<PeopleListProps> = ({ maintitle, subtitle }) => {
  const { showSidebarRight } = useAppContext();
  const artist = { name: "Lana Del Ray", img: artistimg };

  // Sử dụng Array.from để tạo mảng gồm 6 bản sao của cùng một nghệ sĩ
  let artistList = []
  if (showSidebarRight) {
    artistList = Array.from({ length: 5 }, () => artist);
  } else {
    artistList = Array.from({ length: 6 }, () => artist);
  }


  return (
    <div className="bg-primaryColorBg w-full mt-2 text-white">
      <h1 className="text-h1 mb-5">
        {maintitle} <span className="text-primaryColorPink"> {subtitle}</span>
      </h1>
      <div className="flex justify-around gap-6 items-center pr-5">
        {artistList.map((artist, index) => (
          <div
            key={index}
            className="flex flex-col gap-6 justify-center items-center"
          >
            {
              showSidebarRight ? (
                <Image
                  src={artist.img}
                  alt={artist.name}
                  width={120}
                  height={120}
                  quality={100}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src={artist.img}
                  alt={artist.name}
                  width={150}
                  height={150}
                  quality={100}
                  className="rounded-full"
                />
              )
            }

            <h3 className="text-textMedium">{artist.name}</h3>
          </div>
        ))}

        {/* View All button */}
        <div className='flex flex-col items-center ml-3 cursor-pointer'>
          <PlusIcon className={`${showSidebarRight ? 'w-[40px] h-[40px]' : 'w-[50px] h-[50px]'} bg-[#1F1F1F] rounded-full p-3 mb-2`} />
          <p className={`${showSidebarRight ? 'font-semibold text-[0.9rem]' : 'text-h4'} whitespace-nowrap`}>View All</p>
        </div>
      </div>
    </div>
  );
}

export default PopularArtists;
