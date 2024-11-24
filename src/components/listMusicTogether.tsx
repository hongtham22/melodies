import React, { useRef } from "react";

function ListMusicTogether() {
  const audioRef = useRef(null);


  return (
    <div className="w-1/3 flex flex-col gap-4">
      <h1 className="text-primaryColorPink">List Music</h1>
      <div className="w-full h-[300px]">
        <audio
          ref={audioRef}
          controls
          className="pointer-events-none opacity-50"
        >
          <source
            src="https://audiomelodies.nyc3.digitaloceanspaces.com/AUDIO/OLD/HoangThuyLinh/VIETNAMESECONCERTTHEALBUM/BanhTroiNuocVietnameseConcertEdition.m4a"
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}

export default ListMusicTogether;
