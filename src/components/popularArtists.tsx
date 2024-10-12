import React from "react";
import artistimg from "@/assets/img/artist.png";
import Image from "next/image";
import { PlusIcon } from "@radix-ui/react-icons";

function PopularArtists() {
  const artist = { name: "Lana Del Ray", img: artistimg };

  // Sử dụng Array.from để tạo mảng gồm 6 bản sao của cùng một nghệ sĩ
  const artistList = Array.from({ length: 6 }, () => artist);

  return (
    <div className="bg-primaryColorBg w-full mt-2 text-white">
      <h1 className="text-h1 mb-5">
        Popular <span className="text-primaryColorPink"> Artists</span>
      </h1>
      <div className="flex justify-around gap-6 items-center pr-5">
        {artistList.map((artist, index) => (
          <div
            key={index}
            className="flex flex-col gap-6 justify-center items-center"
          >
            <Image
              src={artist.img}
              alt={artist.name}
              width={150}
              height={150}
              quality={100}
              className="rounded-full"
            />
            <h3 className="text-textMedium">{artist.name}</h3>
          </div>
        ))}

        {/* View All button */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <button className="h-[50px] w-[50px] bg-secondColorBg rounded-full flex items-center justify-center">
            <PlusIcon className="w-6 h-6" />
          </button>
          <h4 className="text-h4">View All</h4>
        </div>
      </div>
    </div>
  );
}

export default PopularArtists;
