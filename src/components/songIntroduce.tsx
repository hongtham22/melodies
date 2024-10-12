'use client'
import { useAppContext } from '@/components/provider/songProvider';
import React from 'react'

const SongIntroduce: React.FC = () => {
    const { showContentSong } = useAppContext();

    if (!showContentSong) return null;

    return (
        <div
            className='min-w-[20vw] block bg-white text-black right-0'
        >

        </div>
    )
}

export default SongIntroduce