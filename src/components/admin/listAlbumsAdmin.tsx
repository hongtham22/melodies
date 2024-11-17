
"use client";
import Image from "next/image";
import songimg from "@/assets/img/songs.png";
import { CaretSortIcon} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export interface Album {
  albumId: string;
  title: string;
  releaseDate: string;
  albumType: string;
  createdAt: string;
  totalSong: string;
  mainArtist: MainArtist[];
}

export interface MainArtist {
  id: string;
  name: string;
  avatar: string;
  bio: string | null;
  createdAt: string;
  genres: Genre[];
}

export interface Genre {
  genreId: string;
  name: string;
}

interface ListAlbumsAdminProps {
  data: Album[];
}


function ListAlbumsAdmin({ data, page }: {data: ListAlbumsAdminProps; page: number;}) {
  // const tracks = [
  //   {
  //     name: "Đừng bao giờ nói yêu em",
  //     tracks_count: "10",
  //     main_artist: "Văn Mai Hương",
  //     upload_date: "22/10/2024",
  //     release_date: "22/10/2024",
  //     type: "Album",
  //   },
  // ];

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isHeaderChecked, setIsHeaderChecked] = useState(false);
  const itemsPerPage = 10;

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

    
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
        <table className=" table-fixed w-[100%] text-white border-separate border-spacing-y-3 mb-5 ">
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
              <th className="w-[25%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Album</p>
                  <CaretSortIcon className="text-white  w-4 h-4" />
                </div>
              </th>
              <th className="w-[20%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p> Number of Tracks</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[12%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Main Artist</p>
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
                  <p>Type</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
             
            </tr>
          </thead>
          {/* <tbody className="">
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
                    <div className="flex items-center">
                      <h3 className="text-h4 mb-1 hover:underline line-clamp-1">
                        {tracks[0].name}
                      </h3>
                    </div>
                  </div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1">{tracks[0].tracks_count}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1"> {tracks[0].main_artist}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1"> {tracks[0].upload_date}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1"> {tracks[0].release_date}</div>
                </td>
                <td className="text-textMedium text-center pl-2 rounded-tr-lg rounded-br-lg">
                  <div className="line-clamp-1">{tracks[0].type}</div>
                </td>
              </tr>
            ))}
          </tbody> */}
                  <tbody className="">
          {data && data.map((album, index) => (
            <tr
              key={album.albumId}
              className="bg-secondColorBg  cursor-pointer hover:bg-gray-700"
            >
              <td className="pl-2 text-h4 rounded-tl-lg rounded-bl-lg text-center">
                <Checkbox
                  checked={selectedItems.includes(index)}
                  onCheckedChange={() => handleItemCheckboxChange(index)}
                />
              </td>
              <td className="pl-1 text-h4 text-center">{(page - 1) * itemsPerPage + index + 1}</td>
              <td className="">
                <div className="pl-2 flex felx-col gap-2 justify-start">
                  <Image
                    src={album.mainArtist[0].avatar || songimg}
                    alt="song"
                    width={50}
                    height={50}
                    className="rounded-lg"
                  />
                  <div className="flex items-center">
                    <h3 className="text-h4 mb-1 hover:underline line-clamp-1">
                      {album.title}
                    </h3>
                  </div>
                </div>
              </td>
              <td className="text-textMedium pl-2 text-center">
                <div className="line-clamp-1">{album.totalSong}</div>
              </td>
              <td className="text-textMedium pl-2 text-center">
                <div className="line-clamp-1">{album.mainArtist[0].name}</div>
              </td>
              <td className="text-textMedium pl-2 text-center">
                <div className="line-clamp-1">
                  {new Date(album?.createdAt).toLocaleDateString('en-US', options)}
                  </div>
              </td>
              <td className="text-textMedium pl-2 text-center">
                <div className="line-clamp-1">
                  {new Date(album?.releaseDate).toLocaleDateString('en-US', options)}

                  </div>
              </td>
              <td className="text-textMedium text-center pl-2 rounded-tr-lg rounded-br-lg">
                <div className="line-clamp-1">{album.albumType}</div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>

        
     
    </div>
  );
}

export default ListAlbumsAdmin;