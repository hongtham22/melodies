'use client'
import { useEffect, useState } from "react";
import { useAppContext } from "@/app/AppProvider";

import { fetchApiData } from "@/app/api/appService";
import ArtistBanner from "@/components/artistBanner";
import TrendingSongs from "@/components/trendingSongs";
import AlbumList from "@/components/albumList";
import LoadingPage from "@/components/loadingPage";
import NotFound from "@/app/not-found";


const Page = ({ params }: { params: { id: string } }) => {
    const { loading, setLoading } = useAppContext();
    const [dataArtist, setDataArtist] = useState()
    const [dataSongArtist, setDataSongArtist] = useState()
    const [dominantColor, setDominantColor] = useState<string>();
    const [dataAlbumArtist, setDataAlbumArtist] = useState()
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await fetchApiData(`/api/artist/more/${params.id}`, "GET");
            if (result.success) {
                setDataArtist(result.data.artist)
                setDataSongArtist(result.data.artist.popSong)
                setDataAlbumArtist(result.data.artist.artistAlbum)
                const imageUrl = result.data.artist.avatar;
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
            } else {
                console.error("Login error:", result.error);
                setNotFound(true)
            }
            setLoading(false);
        };

        fetchData();
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
