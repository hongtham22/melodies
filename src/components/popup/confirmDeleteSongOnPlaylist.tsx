'use client'

import { fetchApiData } from "@/app/api/appService";
import { useAppContext } from "@/app/AppProvider";
import { DataSong } from "@/types/interfaces";

interface ConfirmDeleteSongOnPlaylistProps {
    onClose: () => void,
    data?: DataSong,
    playlistId?: string
}
const ConfirmDeleteSongOnPlaylist: React.FC<ConfirmDeleteSongOnPlaylistProps> = ({ onClose, data, playlistId }) => {
    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    const { accessToken } = useAppContext()

    const handleDelete = async (idSong: string) => {
        const data = {
            playlistId: playlistId,
            songId: idSong
        }
        const result = await fetchApiData(`/api/user/playlist/deleteSong`, 'DELETE', JSON.stringify(data), accessToken)
        if (result.success) {
            // router.push('/')
            // setPlaylistList(result.data.playlists)
            onClose();
        }
    }

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 shadow-md"
            onClick={handleBackgroundClick}
        >
            <div className="bg-[#222222] w-[30%] rounded-lg p-5 border border-slate-400">
                <div className="md:flex items-center gap-5">
                    <div className="rounded-full border border-gray-300 flex items-center justify-center w-14 h-14">
                        <i className="bx bx-error text-2xl  text-yellow-500">
                            &#9888;
                        </i>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="font-bold text-[1.2rem]">Warning!</p>
                        <p className="text-sm text-gray-100 mt-1">
                            This will delete <span className="font-bold text-primaryColorPink">{data?.title}</span> from your Playlist
                        </p>
                    </div>
                </div>
                <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                    <button id="confirm-delete-btn" className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 text-black rounded-lg font-semibold text-sm md:ml-2 md:order-2 hover:bg-darkPink"
                        onClick={() => data?.id && handleDelete(data.id)}
                    >
                        Delete
                    </button>
                    <button id="confirm-cancel-btn"
                        className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteSongOnPlaylist