import React from 'react'
import Image from "next/image";

function ListRecentUserAdmin() {
    const listUser = [
        {
          poster:
            "https://i.scdn.co/image/ab676161000051742fc3ef8a80c35243e5e899b8",
          name: "Keshi",
          gmail: "example@gmail.com",
          time: "12 hours",
        },
        {
          poster:
            "https://i.scdn.co/image/ab676161000051742fc3ef8a80c35243e5e899b8",
          name: "Keshi",
          gmail: "example@gmail.com",
          time: "12 hours",
        },
        {
          poster:
            "https://i.scdn.co/image/ab676161000051742fc3ef8a80c35243e5e899b8",
          name: "Keshi",
          gmail: "example@gmail.com",
          time: "12 hours",
        },
        {
          poster:
            "https://i.scdn.co/image/ab676161000051742fc3ef8a80c35243e5e899b8",
          name: "Keshi",
          gmail: "example@gmail.com",
          time: "12 hours",
        },
        {
          poster:
            "https://i.scdn.co/image/ab676161000051742fc3ef8a80c35243e5e899b8",
          name: "Keshi",
          gmail: "example@gmail.com",
          time: "12 hours",
        },
        {
          poster:
            "https://i.scdn.co/image/ab676161000051742fc3ef8a80c35243e5e899b8",
          name: "Keshi",
          gmail: "example@gmail.com",
          time: "12 hours",
        },
        {
          poster:
            "https://i.scdn.co/image/ab676161000051742fc3ef8a80c35243e5e899b8",
          name: "Keshi",
          gmail: "example@gmail.com",
          time: "12 hours",
        },
        {
          poster:
            "https://i.scdn.co/image/ab676161000051742fc3ef8a80c35243e5e899b8",
          name: "Keshi",
          gmail: "example@gmail.com",
          time: "12 hours",
        },
        {
          poster:
            "https://i.scdn.co/image/ab676161000051742fc3ef8a80c35243e5e899b8",
          name: "Keshi",
          gmail: "example@gmail.com",
          time: "12 hours",
        },
      ];
  return (
    <div className=" w-1/3 bg-secondColorBg rounded-xl flex flex-col gap-4 p-3 shadow-sm shadow-primaryColorBlue">
    <p className="text-h3 text-primaryColorPink">Recent Users</p>
    {listUser.map((user, index) => {
      return (
        <div key={index} className="flex gap-1 w-full">
          <Image
            src={user.poster}
            alt="user Poster"
            width={48}
            height={48}
            quality={100}
            className="object-cover rounded-md"
          />
          <div className="ml-3 w-full">
            <div className="flex justify-between">
              <p className="font-bold line-clamp-1">{user.name}</p>
              <p className="text-textMedium text-gray-400 line-clamp-1">
                {user.time} <span> ago</span>
              </p>
            </div>
            <p className="font-thin text-primaryColorGray text-[0.9rem]">
              {user.gmail}
            </p>
          </div>
        </div>
      );
    })}
  </div>
  )
}

export default ListRecentUserAdmin