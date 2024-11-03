'use client'
import React, { useEffect, useState } from 'react'
import artistimg from "@/assets/img/artist.png";
import Image from 'next/image';

import {
    FaHeart,
    FaRegHeart,
    FaCircle
} from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { GoReport } from "react-icons/go";
import { useAppContext } from '@/components/provider/commentProvider';


interface CommentProps {
    data: { name: string; time: string };
    comment: string;
    role: string
}

const Comment: React.FC<CommentProps> = ({ data, comment, role }) => {
    const [tymCmt, setTymCmt] = useState<boolean>(false)
    const [isReply, setIsReply] = useState<boolean | null>(false)
    const [isReport, setIsReport] = useState<boolean>(false)

    const { replyStatus, setReplyStatus } = useAppContext()
    useEffect(() => {
        setIsReply(replyStatus)
    }, [replyStatus])

    const handleReply = () => {
        setIsReply(!isReply)
        setReplyStatus(!isReply)
    }

    return (
        <div>
            <div className={`flex w-full justify-between items-center mb-5 ${role === 'children' ? 'pl-14 mb-2' : 'mb-2'}`}>
                <div className='flex'>
                    <div className='w-[50px] mr-2'>
                        <Image
                            src={artistimg}
                            alt="avatar"
                            className="rounded-full w-[40px] h-[40px]"
                        />
                    </div>
                    <div className='w-[86%]'>
                        <div className='flex items-center'>
                            <p className='font-semibold'>{data.name}</p>
                            <FaCircle className='w-[6px] h-[6px] text-primaryColorGray mx-3' />
                            <p className='font-light text-primaryColorGray text-[0.9rem]'>{data.time}</p>

                        </div>
                        <div className='text-[0.9rem]'>
                            <div className='text-[0.9rem] line-clamp-3 hover:line-clamp-none'>
                                <p className='text-justify'>{comment}</p>
                            </div>
                        </div>
                        <div className='flex items-center mt-1 relative'>
                            <p
                                className='inline-block font-semibold text-[0.9rem] hover:cursor-pointer'
                                onClick={handleReply}
                            >Reply</p>
                            <FiMoreHorizontal
                                className='ml-2 text-primaryColorGray cursor-pointer'
                                onClick={() => setIsReport(!isReport)}
                            />
                            {
                                isReport && (
                                    <div className='absolute flex font-semibold items-center bg-colorPopover rounded-lg cursor-pointer z-10 shadow-lg px-2 py-2 top-5 left-10 hover:text-red-500'>
                                        <GoReport />
                                        <p className='ml-2 text-[0.9rem]'>Report</p>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div
                    className='cursor-pointer flex flex-col items-center justify-center'
                    onClick={() => setTymCmt(!tymCmt)}
                >
                    {
                        tymCmt ? (
                            <FaHeart className='w-[20px] h-[20px] text-red-500' />
                        ) : (
                            <FaRegHeart className='w-[20px] h-[20px] text-primaryColorGray' />
                        )
                    }
                    <p className='mt-1'>17</p>
                </div>
            </div>


        </div>
    )
}

export default Comment