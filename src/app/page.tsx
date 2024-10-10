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
    <div className="m-3">
      <ArtistBanner />
      <CommentSection />
      <SongList />
      <MoodPlaylist />

    </div>
  );
}

