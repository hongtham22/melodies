import React from 'react'
import Image from 'next/image';
import Poster from '@/assets/img/song_img.jpg';
import PropTypes from 'prop-types';

import { PlusIcon } from '@radix-ui/react-icons'

// Define an interface for the props
interface SongListProps {
    maintitle: string;
    subtitle: string;
}

const SongList: React.FC<SongListProps> = ({ maintitle, subtitle }) => {
    const listSong = [
        { name: 'Nàng thơ', artist: 'Hoàng Dũng' },
        { name: 'Nàng thơ', artist: 'Hoàng Dũng' },
        { name: 'Nàng thơ', artist: 'Hoàng Dũng' },
        { name: 'Nàng thơ', artist: 'Hoàng Dũng' },
        { name: 'Nàng thơ', artist: 'Hoàng Dũng' },
    ]
    return (
        <div className=''>
            <h1 className='text-h1 mb-5'>
                {maintitle} <span className='text-primaryColorPink'>{subtitle}</span>
            </h1>
            <div className='flex items-center'>
                <div id="list" className='flex'>
                    {
                        listSong.map((song, index) => (
                            // <div key={index} className='bg-[#1F1F1F] p-2 px-3 mr-3 w-[13vw] rounded-lg border border-gray-700 cursor-pointer'>
                            <div key={index} className='bg-[#1F1F1F] p-2 px-3 mr-3 w-[13vw] rounded-lg  cursor-pointer'>
                                <Image
                                    src={Poster}
                                    alt="Song Poster"
                                    width={500}
                                    height={500}
                                    className='mb-2 rounded-2xl'
                                />
                                <p className='text-[1.1rem] font-semibold mb-1'>{song.name}</p>
                                <p className='text-[0.8rem] font-thin mb-1'>{song.artist}</p>
                            </div>
                        ))
                    }
                </div>
                <div className='flex flex-col items-center ml-3 cursor-pointer'>
                    <PlusIcon className='w-[50px] h-[50px] bg-[#1F1F1F] rounded-full p-3' />
                    <p className='whitespace-nowrap text-h4'>View All</p>
                </div>
            </div>
        </div>
    )
}

// Define PropTypes as a fallback for runtime validation
SongList.propTypes = {
    maintitle: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired
}

export default SongList;
