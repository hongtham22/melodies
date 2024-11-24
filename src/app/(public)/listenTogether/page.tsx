"use client";

import { Input } from "@/components/ui/input";
import { PlusIcon } from "@radix-ui/react-icons";
import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAppContext } from "@/app/AppProvider";

let socket: Socket | null = null;

function Page() {
  const { accessToken } = useAppContext();
  const [roomId, setRoomId] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [permit, setPermit] = useState(true);

  const [message, setMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<{ user: string; message: string }[]>([]);

  const handleTimeUpdate = () => {
    if (audioRef.current && permit) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  useEffect(() => {
    // Khởi tạo socket
    socket = io("https://1vtglwl3-20099.asse.devtunnels.ms");

    socket.on("connect", () => {
      console.log("Đã kết nối tới server:", socket?.id);
    });

    socket.on("CreateRoomSuccess", (id) => {
      console.log("Đã kết nối tới room:", id);
    });

    socket.on("JoinRoomSuccess", (data) => {
      console.log("Join Success to room:", data);
      setPermit(data.permit);
    });

    socket.on("Users", (id) => {
      console.log("Userid:", id);
    });

    // socket.on("PermissionUpdateFail", (status) => {
    //   setPermit(status);
    //   console.log("Permission update fail:", status); // Ghi log giá trị status
    // });

    socket.on("UpdateAudio", (data) => {
      console.log("Update audio:", data);
      if (audioRef.current) {
        audioRef.current.currentTime = data.currentTime;
        if (data.isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    });

    socket.on("ServerSendMessage", (data) => {
      console.log("Message:", data);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: data.user.username, message: data.message }, 
      ]);
    });

    return () => {
      socket?.disconnect();
      console.log("Đã ngắt kết nối socket");
    };
  }, []);

  const handleJoinRoom = async () => {
    console.log("Join room:", roomId);
    socket?.emit("JoinRoom", { accessToken: accessToken, roomId: roomId });
  };

  const handleCreateRoom = async () => {
    socket?.emit("createRoom", { accessToken: null, data: "a" });
    try {
      console.log("Kết quả từ API:", "response");
    } catch (error) {
      console.error("Lỗi khi tạo phòng:", error);
      alert("Không thể tạo phòng. Vui lòng thử lại.");
    }
  };

  const handlePlay = () => {
    if (permit) {
      socket?.emit("SyncAudio", {
        accessToken: accessToken,
        currentTime: currentTime,
        isPlaying: true,
      });
    }
  };

  const handlePause = () => {
    if (permit) {
      socket?.emit("SyncAudio", {
        accessToken: accessToken,
        currentTime: currentTime,
        isPlaying: false,
      });
    }
  };

  const handleSentMessage = () => {
    socket?.emit("SendMessage", {
      accessToken: accessToken,
      message: message,
    });
   };

  return (
    <div className="w-full my-20 m-6 p-8 flex flex-col gap-4">
      <div className="flex ">
        <div className="flex w-1/3 gap-2 items-center justify-start">
          <button
            onClick={handleCreateRoom}
            className="p-2 text-textMedium bg-primaryColorPink flex items-center shrink-0 gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover"
          >
            <PlusIcon className="text-white w-5 h-5" />
            Create a room
          </button>
        </div>
        <div className="flex w-1/3 gap-2 items-center justify-start">
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

      <div className="w-1/3 flex flex-col gap-4">
        <h1 className="text-primaryColorPink">List Music</h1>
        <div className="w-full">
          <audio
            ref={audioRef}
            controls
            onPause={permit ? handlePause : undefined}
            onPlay={permit ? handlePlay : undefined}
            onTimeUpdate={permit ? handleTimeUpdate : undefined}
            className={!permit ? "pointer-events-none opacity-50" : ""}
          >
            <source
              src="https://audiomelodies.nyc3.digitaloceanspaces.com/AUDIO/OLD/HoangThuyLinh/VIETNAMESECONCERTTHEALBUM/BanhTroiNuocVietnameseConcertEdition.m4a"
              type="audio/mpeg"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div className="w-full h-[400px] bg-white text-black flex flex-col gap-4 p-4">
          <div className="w-full flex gap-4">
            <Input placeholder="enter message" className="text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            ></Input>
            <button
              onClick={handleSentMessage}
              className="h-[45px] p-2 text-textMedium bg-primaryColorPink rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover"
            >
              Sent
            </button>

          </div>
          
          <div className="w-full border border-primaryColorBlue">
            {chatMessages.map((msg, index) => (
              <div key={index}>
                <p>{msg.user}</p>
                <h3>{msg.message}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
