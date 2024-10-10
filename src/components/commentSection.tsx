'use client'
import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"

import {
    FaCommentAlt,
    FaCaretUp,
    FaCaretDown
} from "react-icons/fa";

import { CommentProvider } from '@/components/provider/commentProvider';
import CommentPart from '@/components/commentPart';


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
        <div className='w-[65%] '>
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
                            <div className='absolute mt-2 left-[40%] bg-[#1F1F1F] w-[80px] rounded-lg'>
                                <ul>
                                    {sorts.map((sort, index) => {
                                        return (
                                            <li
                                                key={index}
                                                onClick={() => handleValueSort(sort)}
                                                className='cursor-pointer text-end p-2 hover:text-primaryColorPink'
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
            <hr className='' />
            <ScrollArea className='h-[600px]  pr-3'>
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
        </div>
    )
}

export default CommentSection