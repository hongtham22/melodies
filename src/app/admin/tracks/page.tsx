"use client";
import ListTracksAdmin from "@/components/listTracksAdmin";
import { MdDeleteOutline } from "react-icons/md";

import React from "react";
import AddTrackSheet from "@/components/addTrackSheet";

function Page() {
  const handleAddTrack = (trackData: {
    title: string;
    main_artist: string;
    sub_artist: string[];
    poster: string;
    audio: string;
  }) => {
    console.log("New track added:", trackData);
  };
  return (
    <div className="w-full my-20 m-6 p-8 ">
      <div className="p-4 flex flex-col items-start rounded-xl">
        <div className="w-full flex items-center justify-between px-3">

            <h1 className="text-h2 text-primaryColorPink">List Tracks</h1>
            <div className="flex gap-4">
                <button className="text-textMedium p-3 flex items-center gap-2 bg-transparent border border-primaryColorBlue text-primaryColorBlue rounded-md hover:text-darkBlue">
                <MdDeleteOutline className="text-primaryColorBlue w-5 h-5 hover:text-darkBlue" />

                Delete Track</button>
                
             <AddTrackSheet onSave={handleAddTrack} />
            </div>
        </div>
      </div>
      <ListTracksAdmin />
    </div>
  );
}

export default Page;
