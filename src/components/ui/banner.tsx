function Banner() {
    return (
      <div
        className="w-[1081px] h-[595px] text-primaryColorPink mx-6 my-12 px-6 py-4 rounded-3xl bg-cover bg-center flex gap-[114px] flex-col relative overflow-hidden"
      >
        {/* Pseudo-element for background image */}
        <div
          className="absolute inset-0 transform scale-x-[-1] bg-cover bg-center -z-10"
          style={{
            backgroundImage: "url('/images/banner.png')",
          }}
        />
        
        <div className="w-full h-[36px] bg-primaryColorPink"></div>
        <div className="w-[352px] h-fit flex flex-col gap-[16px] justify-center">
          <h1 className=" text-white text-t1 p-2" >All the <span className="text-primaryColorPink">Best Songs</span> in One Place</h1>
          <p className="text-textSmall text-white p-2">On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality and enjoy without interruptions. Whatever your taste in music, we have it all for you!</p>
          <div className="flex gap:24px justify-between p-2">
            <button className="h-[40px] px-[24px] py-[8px] bg-primaryColorPink text-white rounded-sm hover:bg-darkPinkHover">Discover Now</button>
            <button className="h-[40px] px-[24px] py-[8px] bg-transparent border border-primaryColorBlue text-primaryColorBlue rounded-sm">Create Playlist</button>
          </div>
        </div>
      </div>

    );
  }
  
  export default Banner;
  