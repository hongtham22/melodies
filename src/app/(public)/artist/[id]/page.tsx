'use client'
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/AppProvider";

import { fetchApiData } from "@/app/api/appService";
import ArtistBanner from "@/components/artistBanner";
import TrendingSongs from "@/components/trendingSongs";
import LoadingPage from "@/components/loadingPage";
import NotFound from "@/app/not-found";
import AlbumList from "@/components/albumList";


const Page = ({ params }: { params: { id: string } }) => {
    const { loading, setLoading } = useAppContext();
    const [dataArtist, setDataArtist] = useState()
    const [dataSongArtist, setDataSongArtist] = useState()
    const [dataAlbumArtist, setDataAlbumArtist] = useState()
    const [dominantColor, setDominantColor] = useState<string>();
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchSong = async () => {
            setLoading(true);
            try {
                const responses = await Promise.all([
                    fetchApiData(`/api/artist/${params.id}`, "GET"),
                    fetchApiData(`/api/artist/popSong/${params.id}`, "GET", null, null, null, 1),
                    fetchApiData(`/api/artist/album/${params.id}`, "GET", null, null, null, 1),
                ]);
                if (responses[0].success) {
                    setDataArtist(responses[0].data.artists)
                    const imageUrl = responses[0].data.artists.avatar
                    try {
                        const response = await fetch(
                            `/api/get-dominant-color?imageUrl=${encodeURIComponent(imageUrl)}`
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
                }
                if (responses[1].success) {
                    setDataSongArtist(responses[1].data.popSong)
                }
                if (responses[2].success) {
                    setDataAlbumArtist(responses[2].data.artistAlbum)
                }
            } catch (error) {
                console.error("Error fetching songs:", error);
                setNotFound(true)
            } finally {
                setLoading(false);
            }
        };
        fetchSong();
    }, [params.id]);

    if (loading) return <LoadingPage />
    if (notFound) return <NotFound />;
    return (
        <div className="w-full  bg-secondColorBg flex flex-col">
            <div
                className="m-3 rounded-2xl border-2 border-primaryColorBg bg-gradient-to-b to bg-primaryColorBg overflow-auto pb-5"
                style={{
                    background: `linear-gradient(to bottom, ${dominantColor} 20%, rgba(0, 0, 0, 0.2) 80%)`,
                }}
            >
                <div className="mb-4">
                    <ArtistBanner data={dataArtist} color={dominantColor} />
                </div>
                <div className="mx-8">
                    <TrendingSongs maintitle='Popular' data={dataSongArtist} />
                </div>
                <div className="mb-4 mx-8">
                    <AlbumList maintitle="Artist's" subtitle="Albums" data={dataAlbumArtist} />
                </div>
            </div>

        </div>
    );
};

export default Page;
