"use client";
import { fetchApiData } from "@/app/api/appService";
import { useAppContext } from "@/app/AppProvider";
import NotFound from "@/app/not-found";
import AlbumList from "@/components/albumList";
import SongList from "@/components/listSong";
import LoadingPage from "@/components/loadingPage";
import PopularArtists from "@/components/popularArtists";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";

interface AlbumImage {
  image: string;
  size: number;
}

interface Album {
  albumId: string;
  title: string;
  albumImages: AlbumImage[];
}

interface ArtistSong {
  main: boolean;
}

interface Artist {
  id: string;
  name: string;
  ArtistSong: ArtistSong;
  avatar: string
}

interface DataSong {
  id: string;
  title: string;
  duration: number;
  lyric: string;
  filePathAudio: string;
  privacy: boolean;
  uploadUserId: string | null;
  releaseDate: string;
  viewCount: number | null;
  createdAt: string;
  album: Album;
  artists: Array<Artist>;
  playCount: string;
}
interface TopResults {
  artist?: Artist;
  songs?: Array<DataSong>
}

const SearchPage = ({ params }: { params: { value: string } }) => {
  const { loading, setLoading } = useAppContext();
  const [notFound, setNotFound] = useState(false);
  const [topResults, setTopResults] = useState<TopResults>({})
  const [artists, setArtists] = useState([])
  const [songs, setSongs] = useState([])
  const [song, setSong] = useState<DataSong>()
  const [albums, setAlbums] = useState([])
  const [activeCategory, setActiveCategory] = useState("All");
  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };
  const categories = ["All", "Song", "Playlist", "Artist", "Album"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await fetchApiData(`/api/user/search?query=${params.value}`, "GET");
      if (result.success) {
        console.log('ok');
        setTopResults(result.data.topResult)
        setArtists(result.data.artists)
        setSongs(result.data.songs)
        setSong(result.data.songs[0])
        setAlbums(result.data.albums)
      } else {
        console.error("Login error:", result.error);
        setNotFound(true)
      }
      setLoading(false);
    };
    fetchData();
  }, [params.value])

  const isEmptyResults =
    Object.keys(topResults).length === 0 &&
    !artists.length &&
    !songs.length &&
    !albums.length;

  const isEmptyTopResults = Object.keys(topResults).length === 0

  const [poster, setPoster] = useState("https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da");

  const getMainArtistName = (artists: Artist[]): string | undefined => {
    const mainArtist = artists.find(artist => artist?.ArtistSong.main === true);
    return mainArtist?.name;
  };

  const getPoster = (song: DataSong) => {
    if (song?.album?.albumImages && song.album.albumImages.length > 0) {
      const foundImage = song.album.albumImages.find(img => img.size === 300)?.image;
      return foundImage || song.album.albumImages[0].image;
    } else {
      return "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da";
    }
  };

  useEffect(() => {
    if (song) {
      setPoster(getPoster(song));
    }
  }, [song]);


  function formatDuration(totalMilliseconds: number) {
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const timeParts = [];
    if (hours > 0) {
      timeParts.push(`${hours}:`);
    }
    timeParts.push(`${minutes}:`);
    timeParts.push(`${seconds < 10 ? '0' : ''}${seconds}`);
    return timeParts.join('');
  }
  if (loading) return <LoadingPage />
  if (notFound) return <NotFound />;
  return (
    <div className="mt-[8%] w-full min-h-dvh bg-secondColorBg p-3">
      <div className="bg-[#0E0E0E] w-full p-6 rounded-xl">
        {
          isEmptyResults ? (
            <p className="text-center">Không có kết quả tìm kiếm của &quot;{params.value}&quot;</p>
          ) : (
            <div>
              <div className="mb-7">
                <ul className="flex gap-3">
                  {categories.map((category) => (
                    <li
                      key={category}
                      className={`px-3 py-1 font-semibold text-[0.9rem] rounded-full cursor-pointer ${activeCategory === category
                        ? "bg-white text-black"
                        : "bg-[#2F2F2F] text-white hover:bg-[#333333]"
                        }`}
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-5">
                <div className="w-[30%]">
                  <p className="font-bold text-[1.5rem] mb-2">Kết quả hàng đầu</p>
                  <div className="relative bg-[#121212]  pt-4 pb-6 px-4 rounded-xl hover:bg-[#2F2F2F] cursor-pointer group">
                    {isEmptyTopResults ? (
                      <>
                        <Image
                          src={poster}
                          alt="Song Poster"
                          width={110}
                          height={110}
                          quality={100}
                          className="object-cover rounded-md mb-3"
                        />
                        <p className="w-[70%] text-3xl font-bold line-clamp-2">
                          {song?.title}
                        </p>
                        <div className="flex items-center gap-2 text-[0.95rem]">
                          <p className="text-primaryColorGray">Bài hát</p>
                          <div className="h-[6px] w-[6px] bg-primaryColorGray rounded-full"></div>
                          <p>{song?.artists ? getMainArtistName(song.artists) : ''}</p>
                        </div>
                        <div className="absolute right-3 bottom-7 opacity-0 group-hover:text-primaryColorPink group-hover:opacity-100">
                          <FaCirclePlay className="mx-3 w-[45px] h-[45px]" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-[110px] h-[110px] overflow-hidden rounded-full mb-3">
                          <Image
                            src={topResults?.artist?.avatar || "https://via.placeholder.com/110"}
                            alt="Song Poster"
                            width={110}
                            height={110}
                            quality={100}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <p className="w-[70%] text-3xl font-bold line-clamp-2">
                          {topResults?.artist?.name}
                        </p>
                        <p className="text-primaryColorGray mt-1">Nghệ sĩ</p>
                      </>
                    )
                    }
                  </div>

                </div>
                <div className="w-[60%]">
                  <p className="font-bold text-[1.5rem] mb-2">Bài hát</p>
                  <div className="flex flex-col gap-1 w-full">
                    {(isEmptyTopResults ? songs : topResults?.songs)?.slice(0, 4).map((song: DataSong, index) => {
                      const poster = getPoster(song)
                      return (
                        <div
                          key={index}
                          className="flex justify-between items-center cursor-pointer hover:bg-[#2F2F2F] py-2 px-3 rounded-md"
                        >
                          <div className="relative group flex">
                            <Image
                              src={poster}
                              alt="Song Poster"
                              width={45}
                              height={45}
                              quality={100}
                              className="object-cover rounded-md"
                            />
                            <div className="ml-3">
                              <p className="font-bold">{song?.title}</p>
                              <p className="font-thin text-primaryColorGray text-[0.9rem]">
                                {song?.artists[0].name}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-primaryColorGray font-thin text-[0.9rem]">
                              {formatDuration(song.duration)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <SongList maintitle="Songs" data={songs} />
              </div>
              <div className="mt-6">
                <PopularArtists maintitle='Artists' data={artists} />
              </div>
              <div className="mt-6">
                <AlbumList maintitle='Albums' data={albums} />
              </div>
            </div>

          )
        }

      </div>
    </div>
  );
};

export default SearchPage;
