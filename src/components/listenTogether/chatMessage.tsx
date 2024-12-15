import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon} from "@radix-ui/react-icons";
import { useAppContext } from '@/app/AppProvider';
import Image from 'next/image';


function ChatMessage() {
    const [message, setMessage] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<
      { user: object; message: string }[]
    >([]);
  const { accessToken } = useAppContext();
  const { socket } = useAppContext();


  useEffect(() => {
    if (!socket) return
    socket.on("ServerSendMessage", (data) => {
      console.log("Message:", data);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { user: data.user, message: data.message },
      ]);
    });
  }, [socket])


    const handleSentMessage = () => {
        socket?.emit("SendMessage", {
          message: message,
        });
      };
    

  return (
    <div className="w-full flex-grow text-white flex flex-col gap-4 p-4 bg-secondColorBg rounded-lg">
    <div className="w-full flex gap-4">
      <Input
        placeholder="enter message"
        className="text-white border-primaryColorBlue h-10"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></Input>
      <button
        onClick={handleSentMessage}
        className="h-10 w-10 p-2 text-textMedium bg-primaryColorPink rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover"
      >
        <PaperPlaneIcon className="h-5 w-5 text-white" />
      </button>
    </div>

    <div className="w-full border border-primaryColorBlue text-white">
      {chatMessages.map((msg, index) => (
        <div key={index}>
          {/* <Image
           src={msg.user?.image} alt='' height={"100"} width={"100"}
          ></Image> */}
          <img src={msg.user?.image} alt='' height={"100"} width={"100"}/>
          <p>{msg.user?.username}</p>
          <h3>{msg.message}</h3>
        </div>
      ))}
    </div>
  </div>
  )
}

export default ChatMessage