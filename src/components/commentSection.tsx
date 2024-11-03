'use client'
import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    FaCommentAlt,
    FaCaretUp,
    FaCaretDown
} from "react-icons/fa";
import artistimg from "@/assets/img/artist.png";
import {
    IoIosSend,
    IoMdClose
} from "react-icons/io";

import { CommentProvider } from '@/components/provider/commentProvider';
import CommentPart from '@/components/commentPart';
import Image from 'next/image';


const CommentSection = () => {
    const sorts = ['Newest', 'Oldest']
    const [valueSort, setValueSort] = useState('Newest')
    const [isClickSort, setIsClickSort] = useState(false)

    const handleClickSort = () => {
        setIsClickSort(!isClickSort)
    }

    const handleValueSort = (sort: string) => {
        setValueSort(sort)
        setIsClickSort(!isClickSort)
    }

    return (
        <div className='w-[100%]'>
            <div className='flex justify-between mb-2 items-end'>
                <div className='flex items-center text-primaryColorGray'>
                    <FaCommentAlt />
                    <p className='ml-2'>17 Comment</p>
                </div>
                <div className='relative'>
                    <button
                        className='cursor-pointer w-[10vw] text-[0.9rem] flex justify-end items-center border-2 border-primaryColorPink p-2 transition duration-300 rounded-md hover:bg-primaryColorPink'
                        onClick={handleClickSort}
                    >
                        Sort by: {valueSort}
                        {
                            isClickSort ? (
                                <FaCaretUp className='ml-2' />
                            ) : (
                                <FaCaretDown className='ml-2' />
                            )
                        }
                    </button>
                    {
                        isClickSort && (
                            <div className='absolute mt-2 left-[40%] bg-colorPopover w-[80px] z-10 rounded-lg'>
                                <ul>
                                    {sorts.map((sort, index) => {
                                        return (
                                            <li
                                                key={index}
                                                onClick={() => handleValueSort(sort)}
                                                className='cursor-pointer text-[0.9rem] text-end p-2 hover:text-primaryColorPink'
                                            >
                                                {sort}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>
            <hr className='py-2' />
            <ScrollArea className='h-[600px] overflow-auto pr-4'>
                <CommentProvider>
                    <CommentPart />
                </CommentProvider>
                <CommentProvider>
                    <CommentPart />
                </CommentProvider>
                <CommentProvider>
                    <CommentPart />
                </CommentProvider>
                <CommentProvider>
                    <CommentPart />
                </CommentProvider>
            </ScrollArea>
            <div className='flex justify-between items-center mt-5'>
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
                            placeholder='Write a comment'
                        />
                        <IoMdClose
                            className='w-6 h-6 absolute right-3 top-2 cursor-pointer'
                        // onClick={() => setReplyStatus(!replyStatus)}
                        />
                    </div>
                </div>

                <div className='border-2 p-2 rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'>
                    <IoIosSend />
                </div>
            </div>
        </div>
    )
}

export default CommentSection