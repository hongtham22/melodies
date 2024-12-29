import React from 'react'
import Image from "next/image";
import artistimg from "@/assets/img/placeholderUser.jpg";
import { TimerIcon } from '@radix-ui/react-icons';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string;
  createdAt: string;
  
}

interface ListRecentUserAdminProps {
  data: User[]; 
}

 
function ListRecentUserAdmin({ data }: ListRecentUserAdminProps) {
   
    const formatTime = (createdAt: string) => {
      const now = new Date();
      const commentDate = new Date(createdAt);
      const diffInMilliseconds = now.getTime() - commentDate.getTime();
      const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  
      if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
      }
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    };

    return (
    <div className=" w-1/3 bg-secondColorBg rounded-xl flex flex-col gap-4 p-3 shadow-sm shadow-primaryColorBlue">
    <p className="text-h3 text-primaryColorPink flex gap-2 items-center"> <span><TimerIcon className='w-5 h-5'/></span>Recent Users</p>
    {data.map((user) => {
      const { id, username, email, image, createdAt } = user;
      return (
        <div key={id} className="flex gap-1 w-full">
          <Image
            // src={image}
            src={image || artistimg}
            alt="user Poster"
            width={48}
            height={48}
            quality={100}
            className="object-cover rounded-md"
          />
          <div className="ml-3 w-full">
            <div className="flex justify-between">
              <p className="font-bold line-clamp-1">{username || "Unknown User"}</p>
              <p className="text-textMedium text-gray-400 line-clamp-1">
                {formatTime(createdAt)|| 'Unknow'}
              </p>
            </div>
            <p className="font-thin text-primaryColorGray text-[0.9rem]">
              {email || "No email provided"}
            </p>
          </div>
        </div>
      );
    })}
  </div>
  )
}

export default ListRecentUserAdmin
