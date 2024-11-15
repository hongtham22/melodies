'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/components/provider/songProvider'


const LyricPage = () => {
    const { showLyricPage, currentSong } = useAppContext()
    const [lyricsUrl, setLyrics] = useState()

    useEffect(() => {
        if (currentSong) {
            const fetchLyrics = async () => {
                try {
                    const response = await fetch('/api/getLyrics', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ title: currentSong?.name, artist: currentSong?.artist }),
                    });
                    const data = await response.json();
                    if (response.ok) {
                        setLyrics(data.lyrics);
                    } else {
                    }
                } catch (err) {
                    console.error('Fetch error:', err);
                }
            };
            fetchLyrics();
        }
    }, [currentSong]);

    if (!showLyricPage) return null
    return (
        <div className='absolute top-0 left-0 w-full h-full bg-primaryColorBg'>
            <pre
                style={{ whiteSpace: 'pre-wrap' }}
                className='text-center'
            >{lyricsUrl}</pre>
        </div>
    )
}

export default LyricPage