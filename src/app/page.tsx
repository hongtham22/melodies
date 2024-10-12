import Banner from "@/components/banner";
import PopularArtists from "@/components/popularArtists";
import SongList from "@/components/listSong";
import TrendingSongs from "@/components/trendingSongs";
import MoodPlaylist from "@/components/moodPlaylist";
import SignUp from "@/components/signUp";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 mb-20">
      <Banner />
      <div className="">
        <SongList maintitle="Weekly Top" subtitle="Songs" />
      </div>
      <div className="mt-4">
        <SongList maintitle="New Releases" subtitle="Songs" />

      </div>
      <div className="">
        <TrendingSongs />
      </div>
      <PopularArtists />
      <div className="mt-4">
        <SongList maintitle="Top" subtitle="Albums" />

      </div>
      <MoodPlaylist />
      {/* <SignUp/> */}
    </div>
  );
}

