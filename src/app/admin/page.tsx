"use client";
import { useEffect, useState } from "react";
import { fetchApiData } from "@/app/api/appService";
import { useAppContext } from "@/app/AppProvider";

import { RocketIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import SongsChart from "@/components/admin/songsChart";
import UserChart from "@/components/admin/userChart";
import ListCmtAdmin from "@/components/admin/listCmtAdmin";
import ListRecentUserAdmin from "@/components/admin/listRecentUserAdmin";
import OverallAdmin from "@/components/admin/overallAdmin";
import LoadingPage from "@/components/loadingPage";
import songimg from "@/assets/img/placeholderSong.jpg";

interface Artist {
  id: string;
  name: string;
  avatar: string;
  main: boolean;
}

interface AlbumImage {
  image: string;
}

interface Album {
  albumImages: AlbumImage[];
  title: string;
}

interface TodayBestSong {
  id: string;
  title: string;
  releaseDate: string;
  duration: number;
  lyric: string | null;
  filePathAudio: string;
  album: Album[];
  artists: Artist[];
  playCount: string;
}

const Page = () => {
  const [overallAdminData, setOverallAdminData] = useState({
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalPlaylist: 0,
    totalUsers: 0,
  });
  const { loading, setLoading } = useAppContext();

  const [recentCommentData, setRecentCommentData] = useState([]);
  const [todayBestSongData, setTodayBestSongData] = useState<TodayBestSong | null>(null);
  const [userGrowthData, setUserGrowthData] = useState([]);
  const [totalPlayAndCmtYearData, setTotalPlayAndCmtYearData] = useState([]);
  const [recentUserData, setRecentUserData] = useState([]);
  const { accessToken } = useAppContext()


  useEffect(() => {
    const fetchAdminDashboard = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all([
          fetchApiData("/api/admin/total", "GET",null, accessToken, null),
          fetchApiData("/api/admin/recentComment", "GET", null, accessToken, { page: 1 }),
          fetchApiData("/api/admin/todayBestSong", "GET", null, accessToken),
          fetchApiData("/api/admin/userGrowth", "GET", null, accessToken),
          fetchApiData("/api/admin/totalPlayAndCmtYear", "GET", null, accessToken),
          fetchApiData("/api/admin/recentUser", "GET", null, accessToken, { page: 1 }),
        ]);

        if (responses[0].success) {
          setOverallAdminData(responses[0].data.data);
        }
        if (responses[1].success) {
          setRecentCommentData(responses[1].data.comments);
        }
        if (responses[2].success) {
          setTodayBestSongData(responses[2].data.song);
        }
        if (responses[3].success) {
          setUserGrowthData(responses[3].data);
        }
        if (responses[4].success) {
          setTotalPlayAndCmtYearData(responses[4].data.data);
        }
        if (responses[5].success) {
          setRecentUserData(responses[5].data.users);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDashboard();
  }, [setLoading, accessToken]);

  if (loading) return <LoadingPage />;

  return (
    <div className="p-8 mt-20 w-full space-y-6">
      <OverallAdmin data={overallAdminData} />
      <div className="flex gap-7">
        <div className="flex w-2/3 bg-secondColorBg rounded-xl">
          <SongsChart data={totalPlayAndCmtYearData} />
        </div>
        <div className="w-1/3 flex flex-col gap-7">
          {todayBestSongData && (
            <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-lg p-3">
              <p className="text-h3 text-primaryColorPink">Today Best Song</p>
              <div className="flex gap-3 w-full mt-2">
                <Image
                  src={todayBestSongData.album[0]?.albumImages[0]?.image ?? songimg}
                  alt="Today Best Song Poster"
                  width={60}
                  height={60}
                  quality={100}
                  className="object-cover rounded-md w-[60px] h-[60px]"
                />
                <div className="w-3/4 flex flex-col gap-2">
                  <p className="text-primaryColorGray line-clamp-2">
                    {todayBestSongData.title}
                  </p>
                  <p className="text-textMedium text-gray-400 line-clamp-1">
                    {todayBestSongData.artists[0]?.name}
                  </p>
                  <div className="flex gap-2">
                    <RocketIcon />
                    <p className="text-textMedium text-gray-400 line-clamp-1">
                      {todayBestSongData.playCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {userGrowthData && <UserChart data={userGrowthData} />}
        </div>
      </div>

      <div className="flex gap-7">
        <ListCmtAdmin data={recentCommentData} />
        <ListRecentUserAdmin data={recentUserData} />
      </div>
    </div>
  );
};

export default Page;