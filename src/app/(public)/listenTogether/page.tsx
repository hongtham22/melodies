"use client";
import { Input } from "@/components/ui/input";
import { PlusIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState, useRef, useCallback } from "react";
import { useAppContext } from "@/app/AppProvider";
import LoadingPage from "@/components/loadingPage";
import { fetchApiData } from "@/app/api/appService";
import { DataSong } from "@/types/interfaces";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import bannerImg from "@/assets/img/listen_together2.jpeg";
import { useRouter } from "next/navigation";

function Page() {
  const { socket } = useAppContext();
  const { accessToken } = useAppContext();
  const [roomId, setRoomId] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [permit, setPermit] = useState(true);

  const [playlist, setPlaylist] = useState<string[]>([]);

  // check
  const [currentProposalList, setCurrentProposalList] = useState([]);
  const [waitingSongs, setWaitingSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    socket.emit("Error", (message) => {
      console.log("Error:", message);
    });
    
    
    return () => {
    };
  }, [socket]);

  const handleJoinRoom = async () => {
    socket?.emit("joinRoom", roomId);
    socket?.on("joinRoomSuccess", (data) => {
      console.log("Join Success to room:", data.roomId);
      setPermit(data.permit);
      setWaitingSongs(data.waitingList);
      setCurrentProposalList(data.proposalList);
      router.push(`/listenTogether/${roomId}`);
    });
    socket?.on("joinRoomFailed", (data) => {
      console.log("joinRoomFailed", data);
    });
  };

  const handleCreateRoom = async () => {
    socket?.emit("createRoom");
    socket?.on("createRoomSuccess", (id) => {
      console.log("Create room success: " + id);
      router.push(`/listenTogether/${id}`);
    });
    socket?.on("createRoomFailed", (data) => {
      console.log("createRoomFailed", data);
    });
  };

  return (
    <div className="w-full my-20 m-6 p-8 gap-4 flex justify-between items-center">
      <div className="w-1/2 flex flex-col gap-6">
        <button
          onClick={handleCreateRoom}
          className="w-fit p-2 text-textMedium bg-primaryColorPink flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover"
        >
          <PlusIcon className="text-white w-5 h-5" />
          Create a room
        </button>
        <div className="w-fit flex gap-2 items-center">
          <Input
            className="border-white"
            placeholder="enter room"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            onClick={handleJoinRoom}
            className="p-2 text-textMedium bg-primaryColorPink flex items-center shrink-0 gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover"
          >
            Join room
          </button>
        </div>
      </div>

      <div
        className="w-1/2"
      >
        <Image src={bannerImg} alt="banner" />
      </div>
    </div>
  );
}

export default Page;
