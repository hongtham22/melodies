'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/app/AppProvider";
import Image from "next/image";
import { fetchApiData } from "@/app/api/appService";
import LoadingPage from "@/components/loadingPage";
import NotFound from "@/app/not-found";

import { IoPlayCircleOutline } from "react-icons/io5";
import { TfiMoreAlt } from "react-icons/tfi";
import CommentSection from "@/components/commentSection";
import AvatarArtist from "@/components/avatarArtist";
import SongList from "@/components/listSong";
import PopularArtists from "@/components/popularArtists";
import { DataSong } from "@/types/interfaces";
import { getMainArtistId, getMainArtistName, getPosterSong } from "@/utils/utils";

const Page = ({ params }: { params: { id: string } }) => {
    const router = useRouter()
    const { loading, setLoading } = useAppContext();
    const [notFound, setNotFound] = useState(false);
    const [dominantColor, setDominantColor] = useState<string>();
    const [dataSong, setDataSong] = useState<DataSong>()
    const [anotherSong, setAnotherSong] = useState<DataSong[]>([])
    const [mainArtist, setMainArtist] = useState<string | undefined>()
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetchApiData(`/api/song/${params.id}`, "GET");
            if (result.success) {
                setDataSong(result.data.song)
                const imageUrl = typeof getPosterSong(result.data.song.album).image === 'string' ? getPosterSong(result.data.song.album).image : ''
                setMainArtist(getMainArtistName(result.data.song.artists))
                try {
                    const responses = await Promise.all([
                        fetch(`/api/get-dominant-color?imageUrl=${encodeURIComponent(imageUrl as string)}`),
                        fetchApiData(`/api/songs/otherByArtist/${result.data.song.artists ? getMainArtistId(result.data.song.artists) : ''}`, "GET", null, null, { page: 1 }),
                    ]);
                    const data = await responses[0].json();
                    if (responses[0].ok) {
                        console.log("Dominant color:", data.dominantColor);
                        setDominantColor(data.dominantColor);
                    } else {
                        console.error("Error fetching dominant color:", data.error);
                    }
                    if (responses[1].success) setAnotherSong(responses[1].data.songs);
                } catch (error) {
                    console.error("Error fetching dominant color:", error);
                }
            } else {
                console.error("Login error:", result.error);
                setNotFound(true)
            }
            setLoading(false);
        };

        fetchData();
    }, [params.id]);

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
        <div className="w-full  bg-secondColorBg">
            <div
                className="m-3 rounded-lg border-2 border-primaryColorBg bg-gradient-to-b to bg-primaryColorBg overflow-auto"
                style={{
                    background: `linear-gradient(to bottom, ${dominantColor} 20%, rgba(0, 0, 0, 1) 80%)`,
                }}
            >
                {/* Banner song */}
                <div className=" w-full h-[50vh] p-5 flex flex-col justify-end gap-6 rounded-t-lg bg-gradient-to-b from-transparent to-black/30">
                    {/* Header */}
                    {/* Content albums */}
                    <div className="flex items-end gap-8">
                        <div className="shadow-[0_4px_60px_rgba(0,0,0,0.5)] rounded-md ">
                            <Image
                                src={dataSong?.album ? getPosterSong(dataSong.album).image : ""}
                                alt="Album Cover"
                                width={220}
                                height={220}
                                priority
                                className="rounded-md"
                            />
                        </div>
                        <div className="flex gap-4 flex-col">
                            <h3>Song</h3>
                            <h1 className="mt-2 text-5xl font-bold">{dataSong?.title}</h1>
                            <div className="mt-3 flex items-center space-x-2 text-h4 font-semibold">
                                <p
                                    className="cursor-pointer hover:underline"
                                    onClick={() => dataSong?.artists && router.push(`/artist/${getMainArtistId(dataSong.artists)}`)}
                                >{dataSong?.artists ? getMainArtistName(dataSong.artists) : "Unknown Artist"}</p>
                                <span className="text-gray-300">•</span>
                                <p className="">{dataSong?.album ? getPosterSong(dataSong.album).title : "Unknown Album"}</p>
                                <span className="text-gray-300">•</span>
                                <p className="text-gray-300">{dataSong?.releaseDate ? new Date(dataSong.releaseDate).getFullYear() : "Unknown"}</p>
                                <span className="text-gray-300">•</span>
                                <p className="text-gray-300">{formatDuration(dataSong?.duration ?? 0)}</p>
                                <span className="text-gray-300">•</span>
                                <p className="text-gray-300">{dataSong?.playCount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="m-3">
                    <div className="flex gap-5 items-center">
                        <IoPlayCircleOutline className="ml-3 mt-1 w-16 h-16 text-primaryColorPink" />
                        <button className=" text-primaryColorPink">
                            <TfiMoreAlt className="w-5 h-5 shadow-[0_4px_60px_rgba(0,0,0,0.3)]" />
                        </button>
                    </div>
                </div>
                <div className="flex pl-5 pr-16 gap-16">
                    <AvatarArtist id={dataSong?.artists ? getMainArtistId(dataSong.artists) : undefined} />
                    <CommentSection id={params?.id} />
                </div>
                <div className="mx-5 mt-8">
                    <SongList maintitle="Other songs by " subtitle={mainArtist} data={anotherSong} />
                </div>
                <div className="mx-5 mt-8">
                    <PopularArtists maintitle="Fans also like" />
                </div>
            </div>
        </div >
    )
}

export default Page