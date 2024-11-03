"use client";
import Image from "next/image";
import songimg from "@/assets/img/songs.png";
import { CaretSortIcon} from "@radix-ui/react-icons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

function ListTracksAdmin() {
  const tracks = [
    {
      name: "Đừng bao giờ nói yêu em",
      artist: "Văn Mai Hương",
      albums: "Đừng bao giờ nói yêu em",
      writer: "Văn Mai Hương",
      duration: "03:45",
      upload_date: "22/10/2024",
      release_date: "22/10/2024",
      download_times: "10000",
      play_times: "10000",
      cmt_times: "10000",
      like_times: "100000",
      report_times: "100000",
    },
  ];

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);

  const handleHeaderCheckboxChange = () => {
    if (isHeaderChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(Array.from({ length: 10 }, (_, index) => index));
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
              <th className="w-[7%] pl-3">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>No</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[30%] pl-2">
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
              <th className="w-[15%] pl-2 ">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Report Times</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {Array.from({ length: 10 }, (_, index) => (
              <tr
                key={index}
                className="bg-secondColorBg  cursor-pointer hover:bg-gray-700"
              >
                <td className="pl-2 text-h4 rounded-tl-lg rounded-bl-lg text-center">
                  <Checkbox
                    checked={selectedItems.includes(index)}
                    onCheckedChange={() => handleItemCheckboxChange(index)}
                  />
                </td>
                <td className="pl-1 text-h4 text-center">{index + 1}</td>
                <td className="">
                  <div className="pl-2 flex felx-col gap-2 justify-center">
                    <Image
                      src={songimg}
                      alt="song"
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <div>
                      <h3 className="text-h4 mb-1 hover:underline line-clamp-1">
                        {tracks[0].name}
                      </h3>
                      <p className="text-textSmall hover:underline line-clamp-1">
                        {tracks[0].artist}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1">{tracks[0].albums}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1"> {tracks[0].duration}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1"> {tracks[0].upload_date}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1"> {tracks[0].release_date}</div>
                </td>
                <td className="text-textMedium text-center pl-2">
                  <div className="line-clamp-1">{tracks[0].download_times}</div>
                </td>
                <td className="text-textMedium text-center pl-2">
                  <div className="line-clamp-1">{tracks[0].play_times}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1">{tracks[0].cmt_times}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1">{tracks[0].like_times}</div>
                </td>
                <td className="text-textMedium pl-2 text-center rounded-tr-lg rounded-br-lg">
                  <div className="line-clamp-1">{tracks[0].report_times}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default ListTracksAdmin;
