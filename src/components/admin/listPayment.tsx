"use client";
import Image from "next/image";
import songimg from "@/assets/img/songs.png";
import { LockClosedIcon, CaretSortIcon } from "@radix-ui/react-icons";

function ListPayments() {
  const users = [
    {
      name: "John Brown",
      email: "hoangthihongtham22@gmail.com",
      startdate: "22/10/2024",
      enddate: "22/10/2024",
      type: "Premium 1 months",
      status: "Canceled",
    },
  ];
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <table className="w-full text-white border-separate border-spacing-y-3 ">
        <thead className="w-full text-textMedium text-primaryColorBlue">
          <tr>
            <th className="w-[5%] pl-3">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>No</p>
                <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
              </div>
            </th>
            <th className="w-[25%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Name user</p>
                <CaretSortIcon className="text-white  w-4 h-4" />
              </div>
            </th>
            <th className="w-[15%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p> Start Date</p>
                <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
              </div>
            </th>
            <th className="w-[15%] pl-2">End Date</th>
            <th className="w-[15%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Package</p>
                <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
              </div>
            </th>
            <th className="w-[15%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Status</p>
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
                <div className="line-clamp-1">{users[0].startdate}</div>
              </td>
              <td className="text-textMedium pl-2 text-center">
                <div className="line-clamp-1"> {users[0].enddate}</div>
              </td>
              <td className="text-textMedium pl-2 text-center">
                <div className="line-clamp-1"> {users[0].type}</div>
              </td>
              <td className="text-textMedium pl-2 text-center rounded-tr-lg rounded-br-lg">
                <div className="line-clamp-1"> {users[0].status}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
}
export default ListPayments;
