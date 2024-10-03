import Banner from "@/components/ui/banner";
import PopularArtists from "@/components/ui/popularArtists";
import SignUp from "@/components/ui/signUp";
import TrendingSongs from "@/components/ui/trendingSongs";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <TrendingSongs></TrendingSongs>
      <PopularArtists></PopularArtists>
      <SignUp></SignUp>
      <h1 className="text-primaryColorPink font-bold text-center">
        Hello World
      </h1>
      <div className="flex justify-center">
        <button className="bg-primaryColorPink p-2 text-white">
          Hello World
        </button>
      </div>
      <h1 className="text-primaryColorBlue font-bold text-center">
        Hello World
      </h1>
      <div className="flex justify-center">
        <button className="bg-primaryColorBlue p-2 text-white">
          Hello World
        </button>
      </div>

    </div>
  );
}

