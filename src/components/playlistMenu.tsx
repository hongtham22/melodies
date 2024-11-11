import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAppContext as useSongContext } from '@/components/provider/songProvider';
import { useAppContext } from "@/app/AppProvider";
import { BiSolidPlaylist } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import {
    FaPlus,
    FaPlay
} from "react-icons/fa6";
import {
    IoSearch,
    IoListSharp
} from "react-icons/io5";
import '@/components/scss/playlistMenu.scss'
import Image from "next/image";
import { fetchApiData } from "@/app/api/appService";
import { DataPlaylist } from "@/types/interfaces";
import { getPosterPlaylist } from "@/utils/utils";
const PlaylistMenu = () => {
    const router = useRouter();
    const { accessToken, setShowPlaylistMenu } = useAppContext()
    const { currentSong } = useSongContext();
    const [listPlayer, setListPlayer] = useState<DataPlaylist[]>()
    const [pb, setPb] = useState(false)

    useEffect(() => {
        if (currentSong) {
            setPb(true);
        }
    }, [currentSong]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchApiData(
                "/api/user/playlist",
                "GET",
                null,
                accessToken,
                null,
                1
            );
            if (result.success) {
                setListPlayer(result.data.playlists)
            } else {

            }
        };

        fetchData();
    }, [accessToken])

    const handleAddPlaylist = async () => {
        const result = await fetchApiData(
            "/api/user/playlist/create",
            "POST",
            null,
            accessToken
        );
        if (result.success && result.data?.newPlaylist) {
            setListPlayer(prevList => [result.data?.newPlaylist, ...(prevList || [])])
            router.push(`/playlist/${result.data.newPlaylist.id}`)
        } else {

        }
    }

    return (
        <div
            className='mt-5 drop-shadow-lg animate-slide-up'>
            <div className="flex w-full justify-between mb-1 px-3">
                <div className="flex gap-2 items-center">
                    <BiSolidPlaylist className="cursor-pointer text-gray-400" />
                    <span className="font-semibold">My playlist</span>
                </div>
                <div className="flex items-center">
                    <div className="rounded-full bg-transparent p-2 hover:bg-[#1F1F1F]">
                        <FaPlus
                            className="text-[1.2rem] cursor-pointer text-gray-400 hover:scale-105 hover:text-white"
                            onClick={handleAddPlaylist}
                        />
                    </div>
                    <IoMdClose
                        className="text-[1.5rem] cursor-pointer text-gray-400 hover:scale-105 hover:text-white"
                        onClick={() => setShowPlaylistMenu(false)}
                    />
                </div>
            </div>
            <div className="flex justify-between items-center mb-1 px-2 pr-3">
                <div className="rounded-full bg-transparent p-2 cursor-pointer hover:bg-[#1F1F1F]">
                    <IoSearch className="text-[1.2rem]" />
                </div>
                <div>
                    <IoListSharp className="text-[1.2rem]" />
                </div>
            </div>
            <div className={`px-1 pr-3 overflow-auto h-screen [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-inherit hover:[&::-webkit-scrollbar-thumb]:bg-white/30 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 hover:dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                    ${pb ? 'pb-[15.5rem]' : 'pb-[10rem]'} 
                `}>
                {
                    listPlayer?.map((playlist, index) => (
                        <div key={index}
                            className="relative group flex items-center p-2 hover:bg-[#1F1F1F] cursor-pointer rounded-md"
                            onClick={() => router.push(`/playlist/${playlist.playlistId}`)}
                        >
                            <div className="relative w-[50px] h-[50px]">
                                <Image
                                    src={getPosterPlaylist(playlist)}
                                    alt="Song Poster"
                                    width={50}
                                    height={50}
                                    quality={100}
                                    className="object-cover rounded-md"
                                />
                                <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-black/50 rounded-md opacity-0 group-hover:opacity-100">
                                    <FaPlay />
                                </div>
                            </div>

                            <div className="ml-3">
                                <p className="font-bold text-[0.9rem] line-clamp-1">{playlist.name || playlist.title}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PlaylistMenu