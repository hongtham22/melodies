"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { PlusIcon } from "@radix-ui/react-icons";
import { useAppContext } from "@/components/provider/songProvider";
import { Artist } from "@/types/interfaces";
interface PeopleListProps {
  maintitle?: string;
  subtitle?: string;
  data?: Array<Artist>;
}

const PopularArtists: React.FC<PeopleListProps> = ({
  maintitle,
  subtitle,
  data = [],
}) => {
  const { showSidebarRight } = useAppContext();
  const router = useRouter()
  const avatarSize = showSidebarRight ? 120 : 150;

  return (
    <div className="bg-transparent w-full mt-2 text-white">
      <h1 className="text-h1 mb-5">
        {maintitle} <span className="text-primaryColorPink">{subtitle}</span>
      </h1>

      <div className="flex justify-between items-center">
        {/* Map over artist data */}
        {data?.slice(0, 6).map((artist, index) => (
          <div
            key={artist.id || index}
            className="flex flex-col gap-6 justify-center items-center group cursor-pointer"
            onClick={() => router.push(`/artist/${artist.id}`)}
          >
            <div style={{ width: avatarSize, height: avatarSize }}>
              <Image
                src={artist.avatar}
                alt={`Avatar of ${artist.name}`}
                width={avatarSize}
                height={avatarSize}
                quality={100}
                className="rounded-full w-full h-full"
              />
            </div>
            <h3 className="text-textMedium line-clamp-1 group-hover:underline">{artist.name}</h3>
          </div>
        ))}

        {/* View All button */}
        <div className="flex flex-col items-center cursor-pointer">
          <PlusIcon
            className={`${showSidebarRight ? "w-[40px] h-[40px]" : "w-[50px] h-[50px]"
              } bg-[#1F1F1F] rounded-full p-3 mb-2`}
          />
          <p
            className={`${showSidebarRight ? "font-semibold text-[0.9rem]" : "text-h4"
              } whitespace-nowrap`}
          >
            View All
          </p>
        </div>
      </div>

      {/* Fallback for empty data */}
      {data?.length === 0 && (
        <p className="text-center text-textMedium mt-4">No artists found</p>
      )}
    </div>
  );
};

export default PopularArtists;
