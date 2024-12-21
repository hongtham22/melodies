'use client'
import { useState } from "react";
import { BellIcon } from "@radix-ui/react-icons";
import { useAppContext } from "@/app/AppProvider";

const Notification = () => {
    const { listNotification } = useAppContext()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="relative">
            <BellIcon
                onClick={() => setIsOpen(!isOpen)}
                className="w-5 h-5 cursor-pointer" />
            {
                isOpen && (
                    <div className="absolute -left-40 top-8 w-80 max-h-96 bg-[#1F1F1F] shadow-md rounded-md border border-slate-50">
                        {
                            listNotification?.map((noti) => (
                                <div key={noti.id}>{noti.message}</div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Notification