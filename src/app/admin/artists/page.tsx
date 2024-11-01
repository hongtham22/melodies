"use client";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import ListArtistAdmin from "@/components/listArtistAdmin";
import AddArtistSheet from "@/components/addArtistSheet";

function Page() {
  const handleAddArtist = (artistData: {
    name: string;
    bio: string;
    avatar: string;
    genre: string[];
  }) => {
    console.log("New artist added:", artistData);
  };

  return (
    <div className="w-full my-20 m-6 p-8 flex flex-col items-center justify-center">
      <div className="w-[90%] py-3 flex flex-col items-center justify-center rounded-xl">
        <div className="w-full flex items-center justify-between px-3">
          <h1 className="text-h2 text-primaryColorPink">List Artists</h1>
          <div className="flex gap-4">
            <button className="text-textMedium p-3 flex items-center gap-2 bg-transparent border border-primaryColorBlue text-primaryColorBlue rounded-md hover:text-darkBlue">
              <MdDeleteOutline className="text-primaryColorBlue w-5 h-5 hover:text-darkBlue" />
              Delete Artist
            </button>

            <AddArtistSheet onSave={handleAddArtist} />
          </div>
        </div>
      </div>
      <ListArtistAdmin />
    </div>
  );
}

export default Page;
