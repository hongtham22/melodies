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
import { getAllArtistsInfo, getMainArtistInfo, getPosterSong } from "@/utils/utils";

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
                setMainArtist(getMainArtistInfo(result.data.song.artists)?.name)
                try {
                    const responses = await Promise.all([
                        fetchApiData(`/api/songs/otherByArtist/${result.data.song.artists ? getMainArtistInfo(result.data.song.artists)?.id : ''}`, "GET", null, null, { page: 1 }),
                    ]);
                    if (responses[0].success) setAnotherSong(responses[0].data.songs);
                } catch (error) {
                    console.error("Error fetching dominant color:", error);
                }
                if (imageUrl) {
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
                    setDominantColor('#595959');
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
                                <div className="flex">
                                    {dataSong?.artists ? (
                                        getAllArtistsInfo(dataSong.artists).map((artist, index, array) => (
                                            <span key={artist.id} className="flex items-center">
                                                <span
                                                    className="cursor-pointer hover:underline"
                                                    onClick={() => router.push(`/artist/${artist.id}`)}
                                                >
                                                    {artist.name}
                                                </span>
                                                {index < array.length - 1 && <span>,&nbsp;</span>}
                                            </span>
                                        ))
                                    ) : (
                                        <p>Unknown Artist</p>
                                    )}
                                </div>

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
                    <AvatarArtist id={dataSong?.artists ? getMainArtistInfo(dataSong.artists)?.id : undefined} />
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