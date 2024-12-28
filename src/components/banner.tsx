'use client'
import imgBanner from '@/assets/img/banner.png'
import { useAppContext } from '@/components/provider/songProvider';

function Banner() {
  const { showSidebarRight } = useAppContext();

  return (
    <div
      className={`${showSidebarRight ? 'w-[58vw]' : 'w-[78vw] h-[80vh]'} text-primaryColorPink my-4 px-8 py-4 rounded-3xl bg-cover bg-center flex self-center  gap-[114px] flex-col relative overflow-hidden`}
    >
      {/* Pseudo-element for background image */}
      <div
        className="absolute inset-0 transform scale-x-[-] bg-cover bg-center -z-20"
        style={{
          backgroundImage: `url(${imgBanner.src})`
        }}
      />
      <div className="w-[352px] h-fit flex flex-col gap-[16px] justify-center -z-10">
        <h1 className=" text-white text-t1 p-2 mt-40" >All the <span className="text-primaryColorPink">Best Songs</span> in One Place</h1>
        <p className="text-[0.9rem] text-white p-2">On our website, you can access an amazing collection of popular and new songs. Stream your favorite tracks in high quality and enjoy without interruptions. Whatever your taste in music, we have it all for you!</p>
        <div className={`${showSidebarRight ? 'gap-6' : 'justify-between'} flex p-2`}>
          <button className={`${showSidebarRight && 'text-[0.8rem]'} h-[40px] px-[24px] py-[8px] bg-primaryColorPink text-white rounded-sm hover:bg-darkPinkHover`}>Discover Now</button>
          <button className={`${showSidebarRight && 'text-[0.8rem]'} h-[40px] px-[24px] py-[8px] bg-transparent border border-primaryColorBlue text-primaryColorBlue rounded-sm`}>Create Playlist</button>
        </div>
      </div>
    </div>

  );
}

export default Banner;
