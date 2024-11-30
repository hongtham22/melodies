"use client";
import Image from "next/image";
import songimg from "@/assets/img/songs.png";
import { CaretSortIcon } from "@radix-ui/react-icons";

import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import ArtistDetailSheet from "@/components/admin/artistDetailSheet";
interface Artist {
  id: string;
  name: string;
  avatar: string;
  bio: string | null;
  createdAt: string;
  totalSong: string;
  totalAlbum: number;
  totalFollow: string;
}
interface ListArtistAdminProps {
  data: Artist[];
}
function ListArtistAdmin({
  data,
  page,
  onSelectedItemsChange,
}: {
  data: ListArtistAdminProps;
  page: number;
  onSelectedItemsChange: (selectedItems: string[]) => void;
}) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const itemsPerPage = 10;
  const [openArtistId, setOpenArtistId] = useState<string | null>(null);

  const handleHeaderCheckboxChange = () => {
    if (isHeaderChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(data.map((artist) => artist.id));
    }
    setIsHeaderChecked(!isHeaderChecked);
  };

  const handleItemCheckboxChange = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  useEffect(() => {
    onSelectedItemsChange(selectedItems);
  }, [selectedItems, onSelectedItemsChange]);

  const handleRowClick = (artistId: string) => {
    setOpenArtistId(artistId); 
  };
  return (
    <div className="w-[90%] flex flex-col justify-center items-center rounded-md border-primaryColorBg mb-2">
      <table className="w-full text-white border-separate border-spacing-y-3 mb-2 ">
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
                <p>Artists</p>
                <CaretSortIcon className="text-white  w-4 h-4" />
              </div>
            </th>
            <th className="w-[12%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Number Of Tracks</p>
                <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
              </div>
            </th>
            <th className="w-[15%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Number Of Albums</p>
                <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
              </div>
            </th>
            <th className="w-[15%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Number Of Followers</p>
                <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="">
          {/* {Array.from({ length: 10 }, (_, index) => ( */}
          {data &&
            data.map((artist, index) => (
              <tr
                key={artist.id}
                className="bg-secondColorBg  cursor-pointer hover:bg-gray-700"
                onClick={() => handleRowClick(artist.id)}
              >
                <td className="pl-2 text-h4 rounded-tl-lg rounded-bl-lg text-center">
                  <Checkbox
                    checked={selectedItems.includes(artist.id)}
                    onCheckedChange={() => handleItemCheckboxChange(artist.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="pl-1 text-h4 text-center">
                  {(page - 1) * itemsPerPage + index + 1}
                </td>
                <td className="">
                  <div className="pl-4 flex felx-col gap-2 justify-start items-center">
                    <Image
                      src={artist.avatar || songimg}
                      alt={artist.name}
                      width={50}
                      height={50}
                      className="rounded-lg w-12 h-12"
                    />
                    <h3 className="text-h4 mb-1 hover:underline line-clamp-1">
                      {artist.name}
                    </h3>
                  </div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1">{artist.totalSong}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1">{artist.totalAlbum}</div>
                </td>
                <td className="text-textMedium pl-2 text-center rounded-tr-lg rounded-br-lg">
                  <div className="line-clamp-1">{artist.totalFollow}</div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {openArtistId && (
        <ArtistDetailSheet
          artistId={openArtistId}
          onClose={() => setOpenArtistId(null)} 
        />
      )}
    </div>
  );
}

export default ListArtistAdmin;
