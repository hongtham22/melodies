'use client'
import React, { useEffect, useState } from 'react'
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
import { Comment } from '@/types/interfaces';
import { fetchApiData } from '@/app/api/appService';

interface CommentSectionProps {
    id: string
}

const CommentSection: React.FC<CommentSectionProps> = ({ id }) => {
    const sorts = ['Newest', 'Oldest']
    const [valueSort, setValueSort] = useState('Newest')
    const [isClickSort, setIsClickSort] = useState(false)
    const [comments, setComments] = useState<Comment[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState<number>(100)
    const [totalComment, setTotalCmt] = useState<number>()

    const handleClickSort = () => {
        setIsClickSort(!isClickSort)
    }

    const handleValueSort = (sort: string) => {
        setValueSort(sort)
        setIsClickSort(!isClickSort)
    }

    const fetchComments = async () => {
        setLoading(true);
        const response = await fetchApiData(`/api/songs/comment/${id}`, 'GET', null, null, null, page)
        if (response.success) {
            const data = await response.data;
            setComments(prevComments => [...prevComments, ...data.comments]);
            setPage(prevPage => prevPage + 1);
            setTotalPage(data.totalPage)
            setTotalCmt(data.totalComment)
        }
        setLoading(false);
    };

    useEffect(() => {
        setComments([])
        setPage(1)
        fetchComments(); // Fetch dữ liệu trang đầu tiên
    }, [id]);

    const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
        if (scrollHeight - scrollTop <= clientHeight + 50 && !loading) {
            if (page <= totalPage) {
                fetchComments()
            }
        }
    };

    return (
        <div className='w-[100%]'>
            <div className='flex justify-between mb-2 items-end'>
                <div className='flex items-center text-primaryColorGray'>
                    <FaCommentAlt />
                    <p className='ml-2'>{totalComment} Comment</p>
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
            <div className="min-h-[120px] max-h-[600px] overflow-auto pr-4 scrollbar-thin scrollbar-thumb-transparent/30 scrollbar-track-transparent" onScroll={handleScroll}>
                {comments?.map((comment, index) => (
                    <div key={index}>
                        <CommentProvider>
                            <CommentPart data={comment} />
                        </CommentProvider>
                    </div>
                ))}
                {loading && <p>Đang tải thêm bình luận...</p>}
            </div>
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