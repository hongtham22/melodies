'use client'
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/AppProvider";
import PlaylistBanner from "@/components/playlistBanner"
import { IoSearch } from "react-icons/io5";
import { IoPlayCircleOutline } from "react-icons/io5";
import { TfiMoreAlt } from "react-icons/tfi";
import { IoIosMore } from "react-icons/io";
import Image, { StaticImageData } from "next/image";
import { fetchApiData } from "@/app/api/appService";
import LoadingPage from "@/components/loadingPage";
import { DataPlaylist } from "@/types/interfaces";
import { formatTime, getPoster, getPosterPlaylist } from "@/utils/utils";

const Page = ({ params }: { params: { id: string } }) => {
    const [playlist, setPlaylist] = useState<DataPlaylist>()
    const [searchTerm, setSearchTerm] = useState("");
    const [dominantColor, setDominantColor] = useState<string>();
    const { loading, setLoading } = useAppContext();
    const [filteredSongs, setFilteredSongs] = useState<{ title: string; artist: string; album: string; imageUrl: string; }[]>([]);
    const songs = [
        // Quốc tế
        {
            title: "Flowers",
            artist: "Miley Cyrus",
            album: "Endless Summer Vacation",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
        },
        {
            title: "Kill Bill",
            artist: "SZA",
            album: "SOS",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
        },
        {
            title: "As It Was",
            artist: "Harry Styles",
            album: "Harry's House",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
        },
        {
            title: "Calm Down",
            artist: "Rema feat. Selena Gomez",
            album: "Single",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
        },
        {
            title: "Anti-Hero",
            artist: "Taylor Swift",
            album: "Midnights",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
        },

        // Việt Nam
        {
            title: "Bên Trên Tầng Lầu",
            artist: "Tăng Duy Tân",
            album: "Single",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
        },
        {
            title: "Thích Em Hơi Nhiều",
            artist: "Wren Evans",
            album: "Single",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
        },
        {
            title: "Nàng Thơ",
            artist: "Hoàng Dũng",
            album: "Single",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
        },
        {
            title: "Chìm Sâu",
            artist: "MCK feat. Trung Trần",
            album: "Single",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
        },
        {
            title: "Hẹn Em Kiếp Sau",
            artist: "Dương Edward",
            album: "Single",
            imageUrl: "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da",
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await fetchApiData(`/api/user/playlist/detail/${params.id}`, "GET");
            if (result.success) {
                setPlaylist(result.data.playlist)
                const imageUrl = typeof getPosterPlaylist(result.data.playlist) === "string"
                    ? getPosterPlaylist(result.data.playlist)
                    : `${process.env.NEXT_PUBLIC_FE}${(getPosterPlaylist(result.data.playlist) as StaticImageData).src}`;
                try {
                    const response = await fetch(
                        `/api/get-dominant-color?imageUrl=${encodeURIComponent(imageUrl as string)}`
                    );
                    console.log("API response:", response);
                    const data = await response.json();
                    if (response.ok) {
                        console.log("Dominant color:", data.dominantColor);
                        setDominantColor(data.dominantColor);
                    } else {
                        console.error("Error fetching dominant color:", data.error);
                    }
                } catch (error) {
                    console.error("Error fetching dominant color:", error);
                }
            } else {
                console.error("Login error:", result.error);
                // setNotFound(true)
            }
            setLoading(false);
        };

        fetchData();
    }, [params.id]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchTerm === "") {
                setFilteredSongs([]);
            } else {
                const results = songs.filter(song =>
                    song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    song.artist.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredSongs(results);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
    };

    if (loading) return <LoadingPage />
    return (
        <div className="w-full  bg-secondColorBg">
            <div
                className="m-3 rounded-lg border-2 border-primaryColorBg bg-gradient-to-b to bg-primaryColorBg overflow-auto"
                style={{
                    background: `linear-gradient(to bottom, ${dominantColor} 20%, rgba(0, 0, 0, 1) 80%)`,
                }}
            >
                {playlist && <PlaylistBanner data={playlist} />}
                <div className="m-3 flex flex-col pl-5">
                    <div className="flex gap-5 items-center">
                        <IoPlayCircleOutline className="mt-1 w-16 h-16 text-primaryColorPink" />
                        <button className=" text-primaryColorPink">
                            <TfiMoreAlt className="w-5 h-5 shadow-[0_4px_60px_rgba(0,0,0,0.3)]" />
                        </button>
                    </div>
                    {/* <table className="max-w-full text-white border-separate border-spacing-y-3 ">
                        <thead className="w-full max-h-[32px]">
                            <tr className="text-primaryColorGray text-[0.9rem]">
                                <th className="w-[4%] pl-4 text-start">#</th>
                                <th className="w-[4%] pl-4"></th>
                                <th className="w-[70%] pl-4 text-start">Tiêu đề</th>
                                <th className="w-[10%] text-textMedium ">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlist?.songsOfPlaylist.map((song, index) => (
                                <tr
                                    key={index}
                                    className="bg-secondColorBg cursor-pointer hover:bg-gray-700"
                                >
                                    <td className="pl-4 pr-8 text-h4 rounded-tl-lg rounded-bl-lg">
                                        #{index + 1}
                                    </td>
                                    <td className="py-1">
                                        <Image
                                            src={getPoster(dataAlbum)}
                                            alt="song"
                                            width={50}
                                            height={50}
                                            className="rounded-lg"
                                        />
                                    </td>
                                    <td className="pl-4">
                                        <h3 className="text-h4 mb-1 hover:underline">
                                            {song.title}
                                        </h3>
                                        <p className="text-textSmall hover:underline">
                                            {getMainArtistName(song.artists)}
                                        </p>
                                    </td>
                                    <td className="text-center pl-4 rounded-tr-lg rounded-br-lg align-middle">
                                        <div className="flex gap-3 items-center justify-center">
                                            <p className="text-textMedium">{formatTime(song.duration)}</p>
                                            <button className="hover:scale-110">
                                                <IoIosMore className="w-5 h-5 shadow-[0_4px_60px_rgba(0,0,0,0.3)]" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                    <div className="w-full h-[0.125rem] bg-gray-500 my-5">

                    </div>
                    <div>
                        <p className="font-bold text-2xl mb-3">Let&apos;s find content for your playlist</p>
                        <div className="flex items-center bg-[#2C2C2C] w-[35%] p-2 gap-2 rounded-md">
                            <IoSearch className="text-[1.2rem]" />
                            <input type="text" placeholder="Find songs"
                                className="focus:outline-none placeholder:text-[0.9rem] placeholder:text-primaryColorGray text-primaryColorGray text-[0.9rem] bg-transparent w-full"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <table className="max-w-full text-white border-separate border-spacing-y-3 ">
                        <thead className="w-full max-h-[32px]">
                            <tr>
                                <th className="w-[35%] pl-4"></th>
                                <th className="w-[40%] pl-4"></th>
                                <th className="w-[15%] pl-4"></th>
                            </tr>
                        </thead>
                        <tbody className="mt-4">
                            {filteredSongs.length > 0 && (
                                filteredSongs.map((song, index) => (
                                    <tr key={index}>
                                        <td className="relative group flex" >
                                            <Image
                                                src={song.imageUrl}
                                                alt="Song Poster"
                                                width={48}
                                                height={48}
                                                quality={100}
                                                className="object-cover rounded-md"
                                            />
                                            <div className="ml-3">
                                                <p className="font-bold text-primaryColorPink">{song.title}</p>
                                                <p className="font-thin text-primaryColorGray text-[0.9rem]">
                                                    {song.artist}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="font-thin text-primaryColorGray text-[0.9rem]">
                                                {song.album}
                                            </p>
                                        </td>
                                        <td>
                                            <button className="px-4 py-1 border-white border-2 text-[0.8rem] text-white font-bold rounded-full hover:text-black hover:bg-white transition-all duration-300">Add</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >

    )
}

export default Page