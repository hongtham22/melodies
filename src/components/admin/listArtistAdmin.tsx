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
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

function ListArtistAdmin() {
    const tracks = [
        {
          name: "Văn Mai Hương",
          tracks: "100000",
          albums: "100000",
          follow_times: "10000",
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
    <div className="w-[90%] flex flex-col justify-center items-center rounded-md border-primaryColorBg mb-2">
      <table className="w-full text-white border-separate border-spacing-y-3 mb-5 ">
        <thead className="w-full text-textMedium text-primaryColorBlue">
          <tr>
            <th className="w-[5%] pl-3">
              <Checkbox
                checked={isHeaderChecked}
                onCheckedChange={handleHeaderCheckboxChange}
              />
            </th>
            <th className="w-[3%] pl-3">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>No</p>
                <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
              </div>
            </th>
            <th className="w-[22%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Artist</p>
                <CaretSortIcon className="text-white  w-4 h-4" />
              </div>
            </th>
            <th className="w-[12%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p> Tracks</p>
                <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
              </div>
            </th>
            <th className="w-[15%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Albums</p>
                <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
              </div>
            </th>
            <th className="w-[15%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Follow Times</p>
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
                <div className="pl-2 flex felx-col gap-2 justify-center items-center">
                  <Image
                    src={songimg}
                    alt="song"
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                    <h3 className="text-h4 mb-1 hover:underline line-clamp-1">
                      {tracks[0].name}
                    </h3>
                 
                </div>
              </td>
              <td className="text-textMedium pl-2 text-center">
                <div className="line-clamp-1">{tracks[0].tracks}</div>
              </td>
              <td className="text-textMedium pl-2 text-center">
                <div className="line-clamp-1"> {tracks[0].albums}</div>
              </td>

              <td className="text-textMedium pl-2 text-center">
                <div className="line-clamp-1"> {tracks[0].follow_times}</div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

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
  )
}

export default ListArtistAdmin