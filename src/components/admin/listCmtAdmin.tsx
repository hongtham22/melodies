import React from 'react';
import Image from "next/image";
import userImg from "@/assets/img/placeholderUser.jpg";
import { TimerIcon } from '@radix-ui/react-icons';
interface Comment {
  id: string;
  content: string;
  createdAt: string;
  name: string;
  image: string;
  status: "hide" | "show";
}

interface ListCmtAdminProps {
  data: Comment[]; 
}

function ListCmtAdmin({ data }: ListCmtAdminProps) {
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
    <div className="flex w-2/3 bg-secondColorBg rounded-xl flex-col gap-4 p-3 shadow-sm shadow-primaryColorBlue">
      <p className="text-h3 text-primaryColorPink flex gap-2 items-center"> <span><TimerIcon className='w-5 h-5'/></span>Recent Comments</p>
      {data.map((comment) => {
        const { id, content, createdAt, name, image, status } = comment;
        return (
          <div key={id} className="flex gap-3 w-full justify-between">
            <Image
              src={image || userImg}
              alt={`${name}'s Poster`}
              width={52}
              height={52}
              quality={100}
              className="object-cover rounded-md w-[52px] h-[52px]"
            />
            <div className="w-3/4 flex flex-col gap-2 mb-2">
              <p className="text-gray-400 line-clamp-1">
                {content}
              </p>
              <p className="text-textMedium  line-clamp-1">
                <span>By </span>
                {name}
              </p>
            </div>
            <div className="flex flex-col justify-between items-end mb-2">
              <p className="w-[75px] text-textMedium font-semibold line-clamp-1 text-primaryColorBlue border-2 border-primaryColorPink/40 rounded-2xl text-center">
                {status === "hide" ? "Denied" : "Posted"}
              </p>
              <p className="text-gray-400 text-textMedium line-clamp-1">
                {formatTime(createdAt)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListCmtAdmin;
