'use client'
import { useEffect, useState } from "react";
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
import { DataSong, Comment } from "@/types/interfaces";
import { getMainArtistId, getMainArtistName, getPoster } from "@/utils/utils";

const Page = ({ params }: { params: { id: string } }) => {
    const { loading, setLoading } = useAppContext();
    const [notFound, setNotFound] = useState(false);
    const [dominantColor, setDominantColor] = useState<string>();
    const [dataSong, setDataSong] = useState<DataSong>()
    const [anotherSong, setAnotherSong] = useState<DataSong[]>([])
    const [songImage, setSongImage] = useState<string>("https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da")
    const [mainArtist, setMainArtist] = useState<string | undefined>()
    const [comment, setComment] = useState<Comment[]>([])
    const [totalCmt, setTotalCmt] = useState<number>(0)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await fetchApiData(`/api/songs/${params.id}`, "GET");
            if (result.success) {
                setDataSong(result.data.song)
                const imageUrl = getPoster(result.data.song.album)
                setSongImage(imageUrl)
                setMainArtist(getMainArtistName(result.data.song.artists))
                try {
                    const responses = await Promise.all([
                        fetch(`/api/get-dominant-color?imageUrl=${encodeURIComponent(imageUrl)}`),
                        fetchApiData(`/api/songs/otherByArtist/${getMainArtistId(result.data.song.artists)}`, "GET", null, null, 0),
                        fetchApiData(`/api/songs/comment/${params.id}`, 'GET', null, null, 0)
                    ]);
                    const data = await responses[0].json();
                    if (responses[0].ok) {
                        console.log("Dominant color:", data.dominantColor);
                        setDominantColor(data.dominantColor);
                    } else {
                        console.error("Error fetching dominant color:", data.error);
                    }
                    if (responses[1].success) setAnotherSong(responses[1].data.songs);
                    if (responses[2].success) {
                        setComment(responses[2].data.comments)
                        setTotalCmt(responses[2].data.totalComment)
                    }
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

    // useEffect(() => {
    //     const fetchSong = async () => {
    //         setLoading(true);
    //         try {
    //             const responses = await Promise.all([
    //                 fetchApiData(`/api/songs/${params.id}`, "GET"),
    //                 fetchApiData("/api/songs/newRaleaseSong", "GET", null, null, 23),
    //                 fetchApiData("/api/songs/trending", "GET", null, null, 5),
    //                 fetchApiData("/api/artist/popular", "GET", null, null, 0)
    //             ]);
    //             if (responses[0].success) {
    //                 setDataSong(responses[0].data.song)
    //                 const imageUrl = getPoster(responses[0].data.song.album)
    //                 setSongImage(imageUrl)
    //                 try {
    //                     const response = await fetch(
    //                         `/api/get-dominant-color?imageUrl=${encodeURIComponent(imageUrl)}`
    //                     );
    //                     console.log("API response:", response);
    //                     const data = await response.json();
    //                     if (response.ok) {
    //                         console.log("Dominant color:", data.dominantColor);
    //                         setDominantColor(data.dominantColor);
    //                     } else {
    //                         console.error("Error fetching dominant color:", data.error);
    //                     }
    //                 } catch (error) {
    //                     console.error("Error fetching dominant color:", error);
    //                 }
    //             }

    //         } catch (error) {
    //             console.error("Error fetching songs:", error);
    //             setNotFound(true)
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchSong();
    // }, [params.id]);

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
                                src={songImage}
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
                                <p>{dataSong?.artists ? getMainArtistName(dataSong.artists) : "Unknown Artist"}</p>
                                <span className="text-gray-300">•</span>
                                <p className="">{dataSong?.album?.title}</p>
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
                    <CommentSection data={comment} totalCmt={totalCmt} />
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