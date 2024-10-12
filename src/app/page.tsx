import Image from "next/image";
import ArtistBanner from "@/components/artistBanner";
import Banner from "@/components/banner";
import PopularArtists from "@/components/popularArtists";
import SignUp from "@/components/signUp";
import SongList from "@/components/listSong";
import TrendingSongs from "@/components/trendingSongs";
import MoodPlaylist from "@/components/moodPlaylist";
import CommentSection from "@/components/commentSection";

export default function Home() {
  return (
    <div className="">
      {/* <ArtistBanner /> */}
      <div className="p-5 flex flex-col gap-10 rounded-t-lg bg-gradient-to-b from-transparent to-black/50">
        {/* Header */}
        <div className="w-full h-12 bg-transparent"></div>
        {/* Content albums */}
        <div className="flex items-end gap-8">
          <div className="shadow-[0_4px_60px_rgba(0,0,0,0.5)] rounded-md ">
            <Image
              src="https://i.scdn.co/image/ab67616d00001e029fb4a807965fa0cb0972221b"
              alt="Album Cover"
              width={220}
              height={220}
              priority
              className="rounded-md"
            />
          </div>
          <div className="flex gap-4 flex-col">
            <h3 className="">Album</h3>
            <h1 className="text-t1 text-[58px] ">dreamAMEE</h1>
            <div className="flex items-center space-x-2 text-h4 font-semibold">
              <p>AMEE</p>
              <span className="text-gray-300">•</span>
              <p className="text-gray-300">2021</p>
              <span className="text-gray-300">•</span>
              <p className="text-gray-300">10 songs, 1h 32 min 4 sec</p>
            </div>
          </div>
        </div>
      </div>
      <CommentSection />
      <SongList />
      <MoodPlaylist />

    </div>
  );
}

