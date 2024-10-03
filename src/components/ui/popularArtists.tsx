import React from "react";
import artistimg from "../../../public/images/artist.png";
import Image from "next/image";
import { PlusIcon } from "@radix-ui/react-icons";

function PopularArtists() {
  const artist = { name: "Lana Del Ray", img: artistimg };

  // Sử dụng Array.from để tạo mảng gồm 6 bản sao của cùng một nghệ sĩ
  const artistList = Array.from({ length: 6 }, () => artist);

  return (
    <div className="bg-primaryColorBg w-[1062px] mx-6 my-6 p-3 text-white">
      <h1 className="text-h1 mb-4">
        Popular <span className="text-primaryColorPink"> Artists</span>
      </h1>
      <div className="flex justify-around gap-6 items-center">
        {artistList.map((artist, index) => (
          <div
            key={index}
            className="flex flex-col gap-6 justify-center items-center"
          >
            <Image
              src={artist.img}
              alt={artist.name}
              width={130}
              height={130}
              quality={100}
              className="rounded-[200px]"
            />
            <h3 className="text-textMedium">{artist.name}</h3>
          </div>
        ))}

        {/* View All button */}
        <div className="flex flex-col gap-2 justify-center items-center">
          <button className="h-[62px] w-[62px] bg-secondColorBg rounded-[31px] flex items-center justify-center">
            <PlusIcon className="w-5 h-5" />
          </button>
          <h4 className="text-h4">View All</h4>
        </div>
      </div>
    </div>
  );
}

export default PopularArtists;
