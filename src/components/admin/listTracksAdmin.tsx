"use client";
import Image from "next/image";
import songimg from "@/assets/img/songs.png";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

interface Artist {
  name: string;
}

interface Track {
  id: string;
  title: string;
  albumTitle: string;
  duration: number;
  createdAt: string;
  releaseDate: string;
  totalDownload: number;
  totalPlay: number;
  totalComment: number;
  totalLike: number;
  artists: Artist[];
  images: { image: string }[];
}

function ListTracksAdmin({ data, page }: { data: Track[]; page: number; }) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const itemsPerPage = 10;

  function capitalizeWords(str: string): string {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  function formatDuration(duration: number): string {
    const minutes = Math.floor(duration / 60000);
    const seconds = Math.floor((duration % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  const handleHeaderCheckboxChange = () => {
    if (isHeaderChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(
        Array.from({ length: data.length }, (_, index) => index)
      );
    }
    setIsHeaderChecked(!isHeaderChecked);
  };

  const handleItemCheckboxChange = (index: number) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <ScrollArea className="w-[1150px] whitespace-nowrap rounded-md border-primaryColorBg mb-2">
        <table className=" table-fixed w-[140%] text-white border-separate border-spacing-y-3 mb-5 ">
          <thead className="w-full text-textMedium text-primaryColorBlue">
            <tr>
              <th className="w-[3%] pl-3">
                <Checkbox
                  checked={isHeaderChecked}
                  onCheckedChange={handleHeaderCheckboxChange}
                />
              </th>
              <th className="w-[10%] pl-3">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>No</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[35%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Track</p>
                  <CaretSortIcon className="text-white  w-4 h-4" />
                </div>
              </th>
              <th className="w-[25%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p> Album</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[12%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Duration</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[15%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p> Upload Date</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[15%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p> Release Date</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[17%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Download Times</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[15%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Play Times</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[15%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Comment Times</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[15%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Like Times</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {data &&
              data.map((track, index) => (
                <tr
                  key={track.id}
                  className="bg-secondColorBg  cursor-pointer hover:bg-gray-700"
                >
                  <td className="pl-2 text-h4 rounded-tl-lg rounded-bl-lg text-center">
                    <Checkbox
                      checked={selectedItems.includes(index)}
                      onCheckedChange={() => handleItemCheckboxChange(index)}
                      className="line-clamp-1"
                    />
                  </td>
                  <td className="pl-1 text-h4 text-center">
                    <p className="line-clamp-1">{(page - 1) * itemsPerPage + index + 1}</p>
                  </td>
                  <td className="pl-2 line-clamp-1">
                    <div className="w-full flex gap-2">
                      <Image
                        src={track.images[0].image || songimg}
                        alt="song"
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div>
                        <h3 className="text-h4 mb-1 hover:underline">
                          {track.title}
                        </h3>
                        <p className="text-textSmall hover:underline text-primaryColorGray">
                          {track.artists
                            .map((artist) => artist.name)
                            .join(", ")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-textMedium pl-6 text-center">
                    <div className="line-clamp-1">{capitalizeWords(track.albumTitle)}</div>
                  </td>
                  <td className="text-textMedium pl-2 text-center">
                    <div className="line-clamp-1">
                      {formatDuration(track.duration)}
                    </div>
                  </td>
                  <td className="text-textMedium pl-2 text-center">
                    <div className="line-clamp-1">
                      {new Date(track?.createdAt).toLocaleDateString('en-US', options)}
                    </div>
                  </td>
                  <td className="text-textMedium pl-2 text-center">
                    <div className="truncate">
                      {new Date(track?.releaseDate).toLocaleDateString('en-US', options)}
                    </div>
                  </td>
                  <td className="text-textMedium text-center pl-2">
                    <div className="line-clamp-1">{track.totalDownload}</div>
                  </td>
                  <td className="text-textMedium text-center pl-2">
                    <div className="line-clamp-1">{track.totalPlay}</div>
                  </td>
                  <td className="text-textMedium pl-2 text-center">
                    <div className="line-clamp-1">{track.totalComment}</div>
                  </td>
                  <td className="text-textMedium pl-2 text-center rounded-tr-lg rounded-br-lg">
                    <div className="line-clamp-1">{track.totalLike}</div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      
    </div>
  );
}

export default ListTracksAdmin;