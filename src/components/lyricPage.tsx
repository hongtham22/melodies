'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/components/provider/songProvider'


const LyricPage = () => {
    const { showLyricPage, currentSong } = useAppContext()


    if (!showLyricPage) return null
    return (
        <div className='absolute top-0 left-0 w-full h-full bg-primaryColorBg'>{lyricsUrl}</div>
    )
}

export default LyricPage