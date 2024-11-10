import { LiaMusicSolid } from "react-icons/lia";
import { LiaMicrophoneAltSolid } from "react-icons/lia";
import { BiAlbum } from "react-icons/bi";
import { PiPlaylistDuotone } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa6";

interface OverallAdminProps {
  data: {
    totalSongs?: number;
    totalArtists?: number;
    totalAlbums?: number;
    totalPlaylist?: number;
    totalUsers?: number;
  };
}

function OverallAdmin({data }: OverallAdminProps) {
  return (
    <div className="mt-2 flex w-full justify-between gap-3">
    <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md flex gap-5 justify-center items-center p-4">
      <div className="w-20 h-20 bg-primaryColorBg rounded-full flex items-center justify-center">
        <LiaMusicSolid className="w-14 h-14 text-primaryColorPink" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-textBig">Total Songs</p>
        <p className="text-h1 text-primaryColorBlue">{data.totalSongs || 0}</p>
      </div>
    </div>

    <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md flex gap-5 justify-center items-center p-4">
      <div className="w-20 h-20 bg-primaryColorBg rounded-full flex items-center justify-center">
        <LiaMicrophoneAltSolid className="w-14 h-14 text-primaryColorPink" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-textBig">Total Artists</p>
        <p className="text-h1 text-primaryColorBlue">{data.totalArtists || 0}</p>
      </div>
    </div>

    <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md flex gap-5 justify-center items-center p-4">
      <div className="w-20 h-20 bg-primaryColorBg rounded-full flex items-center justify-center">
        <BiAlbum className="w-14 h-14 text-primaryColorPink" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-textBig">Total Albums</p>
        <p className="text-h1 text-primaryColorBlue">{data.totalAlbums || 0}</p>
      </div>
    </div>

    <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md flex gap-5 justify-center items-center p-4">
      <div className="w-20 h-20 bg-primaryColorBg rounded-full flex items-center justify-center">
        <PiPlaylistDuotone className="w-14 h-14 text-primaryColorPink" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-textBig">Total Playlists</p>
        <p className="text-h1 text-primaryColorBlue">{data.totalPlaylist || 0}</p>
      </div>
    </div>

    <div className="bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md flex gap-5 justify-center items-center p-4">
      <div className="w-20 h-20 bg-primaryColorBg rounded-full flex items-center justify-center">
        <FaRegUser className="w-10 h-10 text-primaryColorPink" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-textBig">Total Users</p>
        <p className="text-h1 text-primaryColorBlue">{data.totalUsers || 0}</p>
      </div>
    </div>
  </div>
  )
}

export default OverallAdmin