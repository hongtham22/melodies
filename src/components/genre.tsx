import { SewingPinIcon } from "@radix-ui/react-icons";
import React from "react";

function Genre() {
  return (
    <div>
      <button className="text-textMedium py-3 px-2 bg-primaryColorPink flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover">
        <SewingPinIcon className="text-white w-5 h-5" />
        Manage Genre
      </button>
    </div>
  );
}

export default Genre;
