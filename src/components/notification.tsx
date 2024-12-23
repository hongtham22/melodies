'use client'
import { useState } from "react";
import { useAppContext } from "@/app/AppProvider";
import { useRouter } from "next/navigation";
import { BellIcon } from "@radix-ui/react-icons";
import { Notification as NotificationType } from "@/types/interfaces";
import ShowDeleteComment from "@/components/popup/showDeleteComment";
import { formatTimeCommentNotification } from "@/utils/utils";

const Notification = () => {
    const { listNotification } = useAppContext()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [showModalCmt, setShowModalCmt] = useState<boolean>(false)
    const [notification, setNotification] = useState<NotificationType>()
    const router = useRouter()
    const handleClickNotification = (notification: NotificationType) => {
        if (notification.type === 'PACKAGE') {
            router.push('/pakage')
        } else if (notification.type === 'COMMENT') {
            setShowModalCmt(true)
            setNotification(notification)
        }
    }

    return (
        <div className="relative">
            <BellIcon
                onClick={() => setIsOpen(!isOpen)}
                className="w-5 h-5 cursor-pointer" />
            {
                isOpen && (
                    <div className="absolute -left-40 px-2 top-8 w-80 max-h-96 bg-black shadow-md rounded-xl overflow-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-darkBlue">
                        {
                            listNotification?.map((notification) => (
                                <div key={notification.id}
                                    className="cursor-pointer p-3 flex flex-col gap-2 my-2 bg-[#2F2F2F] shadow-lg rounded-xl"
                                    onClick={() => handleClickNotification(notification)}
                                >
                                    <div>{notification.message}</div>
                                    {
                                        notification.type === 'COMMENT' && (
                                            <div>{notification.report.comment.content}</div>
                                        )
                                    }

                                    <div className="self-end text-[0.75rem]">
                                        {formatTimeCommentNotification(notification.createdAt)}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                showModalCmt && (
                    <ShowDeleteComment
                        onClose={() => setShowModalCmt(false)}
                        notification={notification}
                    />
                )
            }
        </div>
    )
}

export default Notification