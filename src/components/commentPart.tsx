'use client'
import React, { useState } from 'react'
import Image from 'next/image';

import artistimg from "@/assets/img/artist.png";
import {
    IoIosSend,
    IoMdClose
} from "react-icons/io";
import Comment from '@/components/comment'
import { useAppContext } from '@/components/provider/commentProvider'
import { FaChevronDown } from "react-icons/fa";
import { Comment as CommentInterface } from '@/types/interfaces';
import { fetchApiData } from '@/app/api/appService';

interface CommentPartProps {
    data?: CommentInterface
}

const CommentPart: React.FC<CommentPartProps> = ({ data }) => {
    const { replyStatus, setReplyStatus } = useAppContext()
    const [childrenCmt, setChildrenCmt] = useState<CommentInterface[]>([])
    const [showCmtChild, setShowCmtChild] = useState<boolean>(false)
    const [hasFetched, setHasFetched] = useState<boolean>(false);

    const ViewChildrenComment = async () => {
        setShowCmtChild(!showCmtChild)
        if (!hasFetched) {
            const result = await fetchApiData(
                `/api/songs/comment/replies/${data?.id}`,
                "GET",
                null,
                null,
                0
            );

            if (result.success) {
                setChildrenCmt(result.data.comments);
                setHasFetched(true);
            } else {
                console.error("Login error:", result.error);
            }
        }
    }

    return (
        <div>
            <Comment dataUser={data?.user} time={data?.createdAt} comment={data?.content || ''} role='parent' />
            {showCmtChild && (
                <div className="">
                    {childrenCmt.length > 0 && (
                        childrenCmt.map((childComment, index) => (
                            <Comment
                                key={childComment.id || index}
                                dataUser={childComment.user}
                                time={childComment.createdAt}
                                comment={childComment.content}
                                role="children"
                            />
                        ))
                    )}
                </div>
            )}
            {
                (data?.hasChild ?? 0) > 0 && (
                    <div
                        className='ml-14 -mt-3 flex items-center mb-5 cursor-pointer'
                        onClick={ViewChildrenComment}
                    >
                        <div className="w-[4%] h-[0.1rem] bg-gray-200 font-bold mr-3"></div>
                        <p className='text-[0.85rem] text-gray-200'>Xem thêm {data?.hasChild} câu trả lời</p>
                        <FaChevronDown className='ml-2 w-3 h-3 text-gray-200' />
                    </div>
                )
            }
            {
                replyStatus && (
                    <div className='flex justify-between pl-14 items-center my-5 mb-7'>
                        <div className='w-[100%] mr-2 flex'>
                            <div className='w-[50px] mr-2 flex'>
                                <Image
                                    src={artistimg}
                                    alt="avatar"
                                    className="rounded-full w-[40px] h-[40px] mr-3"
                                />
                            </div>

                            <div className='relative w-[88%]'>
                                <input
                                    type="text"
                                    className='w-full py-2 bg-transparent border-2 border-white text-[0.9rem] rounded-3xl pl-3 pr-10 focus:outline-none'
                                    placeholder='Thêm bình luận...'
                                />
                                <IoMdClose
                                    className='w-6 h-6 absolute right-3 top-2 cursor-pointer'
                                    onClick={() => setReplyStatus(!replyStatus)}
                                />
                            </div>
                        </div>

                        <div className='border-2 p-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'>
                            <IoIosSend />
                        </div>
                    </div>
                )
            }
        </div>

    )
}

export default CommentPart
