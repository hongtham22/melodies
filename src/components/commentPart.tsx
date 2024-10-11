'use client'
import React from 'react'
import Image from 'next/image';

import artistimg from "@/assets/img/artist.png";
import {
    IoIosSend,
    IoMdClose
} from "react-icons/io";
import Comment from '@/components/comment'
import { useAppContext } from '@/components/provider/commentProvider'


const CommentPart = () => {
    const { replyStatus, setReplyStatus } = useAppContext()

    return (
        <div>
            <Comment data={{ name: "Phi Hùng", time: "01-09-2003" }} comment='Lorem ipsum dolor sit amet, ' role='parent' />
            <Comment data={{ name: "Phi Hùng", time: "01-09-2003" }} comment='Lorem ipsum dolor sit amet, ' role='children' />

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
