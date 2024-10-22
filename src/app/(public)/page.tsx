'use client'
import { useEffect, useState } from "react";
import envConfig from "@/config"

import Banner from "@/components/banner";
import PopularArtists from "@/components/popularArtists";
import SongList from "@/components/listSong";
import TrendingSongs from "@/components/trendingSongs";
import MoodPlaylist from "@/components/moodPlaylist";
import { useAppContext } from "@/app/AppProvider";

export default function Home() {
  const { setLoading } = useAppContext();
  const [weekSong, setWeekSong] = useState()
  const [newReleaseSong, setNewReleaseSong] = useState()
  const [trendSong, setTrendSong] = useState()
  const [popularArtist, setPopularArtist] = useState()
  useEffect(() => {
    const fetchSong = async () => {
      try {
        setLoading(true)
        const urls = [
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/songs/weeklytopsongs`,
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/songs/newRaleaseSong`,
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/songs/trending`,
          `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/api/songs/popularArtist`
        ];

        const options = {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        };
        const fetchMovies = async (url: string) => {
          return await fetch(url, options).then((response) => response.json());
        };
        try {
          const response = await Promise.all(urls.map(fetchMovies));
          const data1 = response[0];
          const data2 = response[1];
          const data3 = response[2];
          const data4 = response[3];
          setWeekSong(data1.weeklyTopSongs)
          setNewReleaseSong(data2.newReleaseSongs)
          setTrendSong(data3.topSongs)
          setPopularArtist(data4.popArtist)
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.error('Error fetching actor details:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchSong();
  }, []);
  return (
    <div className="flex flex-col px-8 gap-5 mb-20">
      <Banner />
      <div className="">
        <SongList maintitle="Weekly Top" subtitle="Songs" data={weekSong} />
      </div>
      <div className="mt-4">
        <SongList maintitle="New Releases" subtitle="Songs" data={newReleaseSong} />
      </div>
      <div className="">
        <TrendingSongs data={trendSong} />
      </div>
      <div className="">
        <PopularArtists maintitle="Popular" subtitle="Artists" data={popularArtist} />
      </div>
      <div className="mt-4">
        <SongList maintitle="Top" subtitle="Albums" />
      </div>
      <div className="mt-4">
        <MoodPlaylist />
      </div>
    </div>
  );
}
