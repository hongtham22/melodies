"use client";
import AddAlbumSheet from '@/components/admin/addAlbumSheet';
import ListAlbumsAdmin from '@/components/admin/listAlbumsAdmin'
import React from 'react'
import { MdDeleteOutline } from "react-icons/md";

function Page() {
    const handleAddAlbum = (trackData: {
        title: string;
        main_artist: string;
        sub_artist: string[];
        audio: string;
      }) => {
        console.log("New track added:", trackData);
      };
  return (
    <div className='w-full my-20 m-6 p-8 '>
        <div className="p-4 flex flex-col items-start rounded-xl">
        <div className="w-full flex items-center justify-between px-3">

            <h1 className="text-h2 text-primaryColorPink">List Albums</h1>
            <div className="flex gap-4">
                <button className="text-textMedium p-3 flex items-center gap-2 bg-transparent border border-primaryColorBlue text-primaryColorBlue rounded-md hover:text-darkBlue">
                <MdDeleteOutline className="text-primaryColorBlue w-5 h-5 hover:text-darkBlue" />

                Delete Albums</button>
                
             <AddAlbumSheet onSave={handleAddAlbum} />
            </div>
        </div>
      </div>
        <ListAlbumsAdmin />

    </div>
  )
}

export default Page