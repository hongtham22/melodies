"use client";
import { RocketIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import SongsChart from "@/components/songsChart";
import UserChart from "@/components/userChart";
import ListCmtAdmin from "@/components/listCmtAdmin";
import ListRecentUserAdmin from "@/components/listRecentUserAdmin";
import OverallAdmin from "@/components/overallAdmin";

const Page = () => {
  const todayBestSong = {
    poster: "https://i.scdn.co/image/ab67616d00001e022cd9649ea111a552283f0165",
    name: "Chúng Ta Của Hiện Tại",
    release_date: "2020-12-20",
    artist: "Sơn Tùng M-TP",
    plays_count: 1000000,
  };

  return (
    <div className="p-8 my-20 w-full space-y-6">
      <OverallAdmin />
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
        <ListCmtAdmin />
        {/* Recent users */}
        <ListRecentUserAdmin />
      </div>
    </div>
  );
};

export default Page;
