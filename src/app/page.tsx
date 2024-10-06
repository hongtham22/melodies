import ArtistBanner from "@/components/artistBanner";
import Banner from "@/components/banner";
import PopularArtists from "@/components/popularArtists";
import SignUp from "@/components/signUp";
import SongList from "@/components/listSong";
import TrendingSongs from "@/components/trendingSongs";
import MoodPlaylist from "@/components/moodPlaylist";

export default function Home() {
  return (
    <div>
      <ArtistBanner />
      <SongList />
      <MoodPlaylist />

    </div>
  );
}

