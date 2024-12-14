"use client";
import Image from "next/image";
import songimg from "@/assets/img/songs.png";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  status2: string;
  accountType: string;
  createdAt: string;
  totalPlay: string;
  totalViolation: number;
}


function ListUser({ data, page }: { data: User[]; page: number; }) {
  const itemsPerPage = 10;

  const statusOptions = [
    "normal",
    "block 3 days",
    "block 7 days",
    "block a week",
  ];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-500";
      case "block 3 days":
        return "text-yellow-500";
      case "block 7 days":
        return "text-pink-500";
      case "block a week":
        return "text-red-500";
      default:
        return "";
    }
  };

  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(
    data.map((user) => user.status2)
  );

  const handleStatusChange = (index: number, newStatus: string) => {
    const confirmed = window.confirm(
      `Please confirm change to "${newStatus}"`
    );
    if (confirmed) {
      setSelectedStatuses((prevStatuses) => {
        const updatedStatuses = [...prevStatuses];
        updatedStatuses[index] = newStatus;
        return updatedStatuses;
      });
    }
  };
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };

  return (

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
              <th className="w-[13%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Play Times</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[15%] pl-2">
                <div className="flex gap-1 justify-center items-center cursor-pointer">
                  <p>Violation Times</p>
                  <CaretSortIcon className="text-white cursor-pointer w-4 h-4" />
                </div>
              </th>
              <th className="w-[15%] pl-2">Status</th>
            </tr>
          </thead>
          <tbody className="">
            {data && data.map((user, index) => {
              const availableStatuses = [
                user.status2,
                ...statusOptions.filter((status) => status !== user.status2),
              ];
              return (
                <tr
                  key={user.id}
                  className="bg-secondColorBg  cursor-pointer hover:bg-gray-700"
                >
                  <td className="pl-2 text-h4 rounded-tl-lg rounded-bl-lg text-center">
                  {(page - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="">
                    <div className="pl-2 flex felx-col gap-2 items-start">
                      <Image
                        src={user.image || songimg}
                        alt="song"
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div>
                        <h3 className="text-h4 mb-1 hover:underline line-clamp-1">
                          {user.username}
                        </h3>
                        <p className="text-textSmall hover:underline line-clamp-1">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-textMedium pl-2 text-center">
                    <div className="line-clamp-1">
                      {new Date(user?.createdAt).toLocaleDateString('en-US', options)}
                    </div>
                  </td>
                  <td className="text-textMedium pl-2 text-center">
                    <div className="line-clamp-1"> {user.accountType}</div>
                  </td>

                  <td className="text-textMedium pl-2 text-center">
                    <div className="line-clamp-1"> {user.totalPlay}</div>
                  </td>

                  <td className="text-textMedium text-center pl-2">
                    <div className="line-clamp-1">
                      {user.totalViolation}
                    </div>
                  </td>
                  <td className="text-textMedium pl-2 text-center rounded-tr-lg rounded-br-lg">
                    <Select
                      value={selectedStatuses[index]}
                      onValueChange={(newStatus) =>
                        handleStatusChange(index, newStatus)
                      }
                    >
                      <SelectTrigger className={`${getStatusColor(selectedStatuses[index])} w-full` }>
                        <SelectValue
                          placeholder={selectedStatuses[index]}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {availableStatuses.map((status) => (
                            <SelectItem
                              key={status}
                              value={status}
                              className={getStatusColor(status)}
                            >
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>    
      </div>
  );
}

export default ListUser;
