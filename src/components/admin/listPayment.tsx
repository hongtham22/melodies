"use client";
import Image from "next/image";
import userImg from "@/assets/img/placeholderUser.jpg";
import { LockClosedIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { Payment } from "@/types/interfaces";

function ListPayments({ data, page }: { data: Payment[]; page: number }) {
  const itemsPerPage = 10;
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
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <table className="w-full text-white border-separate border-spacing-y-3 ">
        <thead className="w-full text-textMedium text-primaryColorBlue">
          <tr>
            <th className="w-[5%] pl-3">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>No</p>
              </div>
            </th>
            <th className="w-[25%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Name user</p>
              </div>
            </th>
            <th className="w-[15%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p> Start Date</p>
              </div>
            </th>
            <th className="w-[15%] pl-2">End Date</th>
            <th className="w-[15%] pl-2">
              <div className="flex gap-1 justify-center items-center cursor-pointer">
                <p>Package</p>
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
          {/* {Array.from({ length: 10 }, (_, index) => ( */}
          {data &&
            data.map((payment, index) => {
              return (
                <tr
                  key={payment.id}
                  className="bg-secondColorBg  cursor-pointer hover:bg-gray-700"
                >
                  <td className="pl-2 text-h4 rounded-tl-lg rounded-bl-lg text-center">
                  {(page - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="">
                    <div className="pl-2 flex felx-col gap-2 items-start">
                      <Image
                        src={payment?.user?.image || userImg}
                        alt="song"
                        width={50}
                        height={50}
                        className="rounded-lg"
                      />
                      <div>
                        <h3 className="text-h4 mb-1 hover:underline line-clamp-1 truncate">
                          {payment?.user?.username}
                        </h3>
                        <p className="text-textSmall hover:underline line-clamp-1 truncate">
                          {payment?.user?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-textMedium pl-2 text-center">
                    <div className="line-clamp-1">
                      {new Date(payment?.startDate).toLocaleDateString('en-US', options)}
                      </div>
                  </td>
                  <td className="text-textMedium pl-2 text-center">
                    <div className="line-clamp-1 p-1 bg-darkerPink rounded-lg text-lightPink">
                       {/* {payment.endDate} */}
                       {new Date(payment?.endDate).toLocaleDateString('en-US', options)}
                       </div>
                  </td>
                  <td className="text-textMedium pl-2 text-center">
                    <div className="line-clamp-1"> 
                      {payment.package.name}
                      </div>
                  </td>
                  <td className="text-textMedium pl-2 text-center rounded-tr-lg rounded-br-lg">
                    <div className="line-clamp-1"> 
                      {payment.status}
                      </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default ListPayments;
