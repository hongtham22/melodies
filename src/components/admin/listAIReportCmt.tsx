"use client";
import { Report } from "@/types/interfaces";
import Image from "next/image";
import React from "react";
import userImg from "@/assets/img/placeholderUser.jpg";

function ListAIReportCmt({ data }: { data: Report }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not deleted":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "AI":
        return "text-pink-500";
      case "Deleted":
        return "text-red-500";
      default:
        return "";
    }
  };
  return (
    <div className="w-[100%] flex flex-col justify-center items-center rounded-md border-primaryColorBg mb-2">
    <table className="w-full text-white border-separate border-spacing-y-3 mb-2 ">
      <thead className="w-full text-textMedium text-primaryColorBlue">
        <tr>
          <th className="w-[5%] pl-3">
            <div className="flex gap-1 justify-center items-center cursor-pointer">
              <p>No</p>
            </div>
          </th>
          <th className="w-[20%] pl-2">
            <div className="flex gap-1 justify-center items-center cursor-pointer">
              <p>Reported User</p>
            </div>
          </th>
          <th className="w-[40%] pl-2">
            <div className="flex gap-1 justify-center items-center cursor-pointer">
              <p>Comment</p>
            </div>
          </th>
          <th className="w-[20%] pl-2">
            <div className="flex gap-1 justify-center items-center cursor-pointer">
              <p>Comment Of Songs</p>
            </div>
          </th>
          <th className="w-[15%] pl-2">
            <div className="flex gap-1 justify-center items-center cursor-pointer">
              <p>Status</p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="">
        {data &&
          data.map((report, index) => (
            <tr
              key={report.id}
              className="bg-secondColorBg  cursor-pointer hover:bg-gray-700"
            >
              <td className="pl-1 text-h4 text-center rounded-tl-lg rounded-bl-lg">
                {/* {(page - 1) * itemsPerPage + index + 1} */}
                {index + 1}
              </td>
              <td className="pr-2">
                <div className="pl-2 flex felx-col gap-2 items-start">
                  <Image
                    src={report.user?.image || userImg}
                    alt={report.user?.name}
                    width={50}
                    height={50}
                    className="rounded-lg w-12 h-12"
                  />
                  <div>
                      <h3 className="text-h4 mb-1 hover:underline truncate">
                        {report.comment?.user?.name}
                      </h3>
                      <p className="text-textSmall hover:underline truncate text-darkPink">
                        {report.comment?.user?.username}
                      </p>
                    </div>
                </div>
              </td>
              <td className="text-textMedium pl-2 text-start truncate">
                <div className="line-clamp-2">{report.comment?.content || 0}</div>
              </td>
              <td className="text-textMedium pl-2 text-center truncate">
                <div className="line-clamp-1">
                  {report.comment?.song?.title || "Unknow"}</div>
              </td>
              <td className="text-textMedium pl-2 text-center rounded-tr-lg rounded-br-lg">
                <div className={`line-clamp-1 ${getStatusColor(report.status) || ""}`}>{report.status || 0}</div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
   
  </div>
  );
}

export default ListAIReportCmt;
