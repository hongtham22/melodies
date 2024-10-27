import ListTracksAdmin from "@/components/listTracksAdmin";
import { PlusIcon } from "@radix-ui/react-icons";

import React from "react";

function Page() {
  return (
    <div className="w-full my-20 m-6 p-8 ">
      <div className="p-4 flex flex-col items-start rounded-xl">
        <div className="w-full flex items-center justify-between px-3">

            <h1 className="text-h2 text-primaryColorPink">List Tracks</h1>
             <button className="text-textMedium p-3 bg-primaryColorPink flex items-center gap-2 rounded-md shadow-sm shadow-white/60">
                <PlusIcon className="text-white w-5 h-5" />
                Add New Track</button>
        </div>
      </div>
      <ListTracksAdmin />
    </div>
  );
}

export default Page;
