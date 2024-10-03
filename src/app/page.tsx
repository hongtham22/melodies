import Banner from "@/components/banner";
import PopularArtists from "@/components/popularArtists";
import SignUp from "@/components/signUp";
import SongList from "@/components/SongList";
import TrendingSongs from "@/components/trendingSongs";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <SongList />
      <TrendingSongs></TrendingSongs>
      <PopularArtists></PopularArtists>
      <SignUp></SignUp>
    </div>
  );
}

