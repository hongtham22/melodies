import React from 'react'
import Image from "next/image";


function ListCmtAdmin() {
    const listCmt = [
        {
          poster:
            "https://i.scdn.co/image/ab67616100005174f2db4875c81f4d103aefc81a",
          name: "Bùi Anh Tuấn",
          content:
            "This song captures my emotions and paints my world with its beautiful melody and heartfelt lyrics. It's truly special. This song captures my emotions and paints my world with .This song captures my emotions and paints my world with .This song captures my emotions and paints my world with .This song captures my emotions and paints my world with ",
          time: "12 hours",
          status: "Denied",
        },
        {
          poster:
            "https://i.scdn.co/image/ab67616100005174f2db4875c81f4d103aefc81a",
          name: "Bùi Anh Tuấn",
          content:
            "This song captures my emotions and paints my world with its beautiful melody and heartfelt lyrics. It's truly special.",
          time: "12 hours",
          status: "Posted",
        },
        {
          poster:
            "https://i.scdn.co/image/ab67616100005174f2db4875c81f4d103aefc81a",
          name: "Bùi Anh Tuấn",
          content:
            "This song captures my emotions and paints my world with its beautiful melody and heartfelt lyrics. It's truly special.",
          time: "12 hours",
          status: "Denied",
        },
        {
          poster:
            "https://i.scdn.co/image/ab67616100005174f2db4875c81f4d103aefc81a",
          name: "Bùi Anh Tuấn",
          content:
            "This song captures my emotions and paints my world with its beautiful melody and heartfelt lyrics. It's truly special.",
          time: "12 hours",
          status: "Posted",
        },
        {
          poster:
            "https://i.scdn.co/image/ab67616100005174f2db4875c81f4d103aefc81a",
          name: "Bùi Anh Tuấn",
          content:
            "This song captures my emotions and paints my world with its beautiful melody and heartfelt lyrics. It's truly special.",
          time: "12 hours",
          status: "Posted",
        },
        {
          poster:
            "https://i.scdn.co/image/ab67616100005174f2db4875c81f4d103aefc81a",
          name: "Bùi Anh Tuấn",
          content:
            "This song captures my emotions and paints my world with its beautiful melody and heartfelt lyrics. It's truly special.",
          time: "12 hours",
          status: "Posted",
        },
      ];
  return (
    <div className="flex w-2/3 bg-secondColorBg rounded-xl flex-col gap-4 p-3 shadow-sm shadow-primaryColorBlue">
    <p className="text-h3 text-primaryColorPink">Recent Comments</p>
    {listCmt.map((comment, index) => {
      return (
        <div key={index} className="flex gap-3 w-full justify-between">
          <Image
            src={comment.poster}
            alt="user Poster"
            width={52}
            height={52}
            quality={100}
            className="object-cover rounded-md w-[52px] h-[52px]"
          />
          <div className="w-3/4 flex flex-col gap-2 mb-2">
            <p className=" text-primaryColorGray line-clamp-2">
              {comment.content}
            </p>
            <p className="text-textMedium text-gray-400 line-clamp-1">
              <span>By </span>
              {comment.name}
            </p>
          </div>
          <div className="flex flex-col justify-between items-end mb-2">
            <p className="w-[75px] text-textMedium font-semibold line-clamp-1 text-primaryColorBlue border-2 border-primaryColorPink/40 rounded-2xl text-center">
              {comment.status}
            </p>
            <p className="text-gray-400 text-textMedium line-clamp-1">
              {comment.time} <span> ago</span>
            </p>
          </div>
        </div>
      );
    })}
  </div>
  )
}

export default ListCmtAdmin