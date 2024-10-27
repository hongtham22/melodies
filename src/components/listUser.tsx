"use client";
import Image from "next/image";
import songimg from "@/assets/img/songs.png";
import { LockClosedIcon, CaretSortIcon } from "@radix-ui/react-icons";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function ListUser() {
  const users = [
    {
      name: "John Brown",
      email: "hoangthihongtham22@gmail.com",
      joined: "22/10/2024",
      type: "Premium",
      status: "Normal",
      play_times: "10000",
      cmt_times: "10000",
      violation_times: "3",
    },
  ];
  return (
    <div className="p-4 flex flex-col items-start rounded-xl">
      <h1 className="text-h2 text-primaryColorPink">List User</h1>
      <div className="w-full flex flex-col justify-center items-center">
        <table className="w-full text-white border-separate border-spacing-y-3 ">
          <thead className="w-full text-textMedium text-primaryColorBlue">
            <tr>
              <th className="w-[3%] pl-3">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>No</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[24%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Name</p>
                  <CaretSortIcon className="text-white  w-4 h-4" />
                </div>
              </th>
              <th className="w-[10%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p> Joined</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[10%] pl-2">Type</th>
              <th className="w-[10%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Play Times</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[12%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Comment Times</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[13%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Violation Times</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[10%] pl-2">Status</th>
              <th className="w-[10%] pl-2">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {Array.from({ length: 10 }, (_, index) => (
              <tr
                key={index}
                className="bg-secondColorBg  cursor-pointer hover:bg-gray-700"
              >
                <td className="pl-2 text-h4 rounded-tl-lg rounded-bl-lg text-center">
                  {index + 1}
                </td>
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
                        {users[0].name}
                      </h3>
                      <p className="text-textSmall hover:underline line-clamp-1">
                        {users[0].email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1">{users[0].joined}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1"> {users[0].type}</div>
                </td>

                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1"> {users[0].play_times}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1"> {users[0].cmt_times}</div>
                </td>
                <td className="text-textMedium text-center pl-2">
                  <div className="line-clamp-1">{users[0].violation_times}</div>
                </td>
                <td className="text-textMedium pl-2 text-center">
                  <div className="line-clamp-1">{users[0].status}</div>
                </td>
                <td className="text-textMedium text-center pl-2  rounded-tr-lg rounded-br-lg">
                  <div className="flex items-center justify-center">
                    <LockClosedIcon className="flex w-5 h-5 hover:text-primaryColorPink" />
                  </div>
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
    </div>
  );
}

export default ListUser;
