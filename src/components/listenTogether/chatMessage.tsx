import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { PaperPlaneIcon} from "@radix-ui/react-icons";
import { useAppContext } from '@/app/AppProvider';


function ChatMessage() {
    const [message, setMessage] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<
      { user: string; message: string }[]
    >([]);
  const { accessToken } = useAppContext();
  const { socket } = useAppContext();



    const handleSentMessage = () => {
        socket?.emit("SendMessage", {
          accessToken: accessToken,
          message: message,
        });
      };
    

  return (
    <div className="w-full flex-grow text-black flex flex-col gap-4 p-4 bg-secondColorBg rounded-lg">
    <div className="w-full flex gap-4">
      <Input
        placeholder="enter message"
        className="text-black border-primaryColorBlue h-10"
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

    <div className="w-full border border-primaryColorBlue">
      {chatMessages.map((msg, index) => (
        <div key={index}>
          <p>{msg.user}</p>
          <h3>{msg.message}</h3>
        </div>
      ))}
    </div>
  </div>
  )
}

export default ChatMessage