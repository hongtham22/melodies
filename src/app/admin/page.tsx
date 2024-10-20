"use client";
import { LiaMusicSolid } from "react-icons/lia";
import { LiaMicrophoneAltSolid } from "react-icons/lia";
import { BiAlbum } from "react-icons/bi";
import { PiPlaylistDuotone } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";
import { RocketIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import SongsChart from "@/components/songsChart";
import UserChart from "@/components/userChart";

const Page = () => {
  const todayBestSong = {
    poster: "https://i.scdn.co/image/ab67616d00001e022cd9649ea111a552283f0165",
    name: "Chúng Ta Của Hiện Tại",
    release_date: "2020-12-20",
    artist: "Sơn Tùng M-TP",
    plays_count: 1000000,
  };

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
  const listCmt = [
    {
      poster:
        "https://i.scdn.co/image/ab67616100005174f2db4875c81f4d103aefc81a",
      name: "Bùi Anh Tuấn",
      content:
        "This song captures my emotions and paints my world with its beautiful melody and heartfelt lyrics. It's truly special. This song captures my emotions and paints my world with .This song captures my emotions and paints my world with .This song captures my emotions and paints my world with .This song captures my emotions and paints my world with ",
      time: "12 hours",
      status: "Pending",
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
      status: "Pending",
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
    <div className="p-8 my-20 w-full space-y-6">
      <div className="mt-2 flex w-full justify-between gap-3">
        <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md flex gap-5 justify-center items-center p-4">
          <div className="w-20 h-20 bg-primaryColorBg rounded-full flex items-center justify-center">
            <LiaMusicSolid className="w-14 h-14 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig">Total Songs</p>
            <p className="text-h1 text-primaryColorBlue">352</p>
          </div>
        </div>

        <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md flex gap-5 justify-center items-center p-4">
          <div className="w-20 h-20 bg-primaryColorBg rounded-full flex items-center justify-center">
            <LiaMicrophoneAltSolid className="w-14 h-14 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig">Total Artists</p>
            <p className="text-h1 text-primaryColorBlue">352</p>
          </div>
        </div>

        <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md flex gap-5 justify-center items-center p-4">
          <div className="w-20 h-20 bg-primaryColorBg rounded-full flex items-center justify-center">
            <BiAlbum className="w-14 h-14 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig">Total Albums</p>
            <p className="text-h1 text-primaryColorBlue">352</p>
          </div>
        </div>

        <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md flex gap-5 justify-center items-center p-4">
          <div className="w-20 h-20 bg-primaryColorBg rounded-full flex items-center justify-center">
            <PiPlaylistDuotone className="w-14 h-14 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig">Total Playlists</p>
            <p className="text-h1 text-primaryColorBlue">352</p>
          </div>
        </div>

        <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md flex gap-5 justify-center items-center p-4">
          <div className="w-20 h-20 bg-primaryColorBg rounded-full flex items-center justify-center">
            <FaRegUser className="w-10 h-10 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig">Total Users</p>
            <p className="text-h1 text-primaryColorBlue">352</p>
          </div>
        </div>
      </div>

      {/* chart */}
      <div className="flex gap-7">
        <div className="flex w-2/3  bg-secondColorBg rounded-xl">
          <SongsChart />
        </div>
        <div className=" w-1/3 flex  flex-col gap-7">
          {/* TodayBestSong */}
          <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-lg p-3">
            <p className="text-h3 text-primaryColorPink">Today Best Song</p>

            <div className="flex gap-3 w-full mt-2">
              <Image
                src={todayBestSong.poster}
                alt="user Poster"
                width={60}
                height={60}
                quality={100}
                className="object-cover rounded-md w-[60px] h-[60px]"
              />
              <div className="w-3/4 flex flex-col gap-2">
                <p className=" text-primaryColorGray line-clamp-2">
                  {todayBestSong.name}
                </p>
                <p className="text-textMedium text-gray-400 line-clamp-1">
                  {todayBestSong.artist}
                </p>
                <div className="flex gap-2">
                  <RocketIcon></RocketIcon>
                  <p className="text-textMedium text-gray-400 line-clamp-1">
                    {todayBestSong.plays_count}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <UserChart />
        </div>
      </div>

      <div className="flex gap-7">
        {/* Recent comment */}
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
                  <p className="text-textMedium font-semibold line-clamp-1 text-primaryColorBlue p-1 border-2 border-primaryColorPink/40 rounded-2xl">
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
        {/* Recent users */}
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
      </div>
    </div>
  );
};

export default Page;
