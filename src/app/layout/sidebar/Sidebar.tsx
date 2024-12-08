"use client";
import React from "react";
import { useState } from "react";

import {
  HomeIcon,
  GlobeIcon,
  DiscIcon,
  AvatarIcon,
  ExitIcon,
  GearIcon,
  HeartIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useAppContext } from "@/app/AppProvider";
import { fetchApiData } from "@/app/api/appService";
import { BiAperture } from "react-icons/bi";

const Sidebar = () => {
  const { accessToken, setAccessToken, setRole, setShowPlaylistMenu } =
    useAppContext();
  const [showRequireLogin, setShowRequireLogin] = useState(false);
  const [
    showRequireLoginForListenTogether,
    setShowRequireLoginForListenTogether,
  ] = useState(false);

  const handleShowPlaylist = () => {
    if (accessToken) {
      setShowPlaylistMenu(true);
      handleMenuClick("your-playlist");
    } else {
      setShowRequireLogin(true);
    }
  };

  const handleListenTogether = () => {
    if (accessToken) {
      router.push("/listenTogether");
      handleMenuClick("listen-together");
    } else {
      setShowRequireLoginForListenTogether(true);
    }
  };

  const [activeMenu, setActiveMenu] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleMenuClick = (menuItem: string) => {
    setActiveMenu(menuItem);
  };

  async function handleLogout() {
    try {
      const result = await fetchApiData(
        "/api/auth/logout",
        "POST",
        null,
        accessToken
      );

      if (result.success) {
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAccessToken("");
        setRole("");
        router.push("/");
        window.location.reload();

        toast({
          variant: "success",
          title: "Congratulation!",
          description: "Logout Successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: (error as Error).message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }

  const getMenuClass = (menuItem: string) => {
    return activeMenu === menuItem
      ? "bg-primaryColorPink rounded-xl px-2 font-semibold"
      : "text-[0.9rem]";
  };
  return (
    <div className={`h-screen w-full mt-3 pl-9 pr-7 drop-shadow-lg z-20`}>
      <div id="menu-section" className="mb-5">
        <p className="text-primaryColorPink/60 text-[0.8rem]">Menu</p>
        <div
          className={`flex my-2 cursor-pointer ${getMenuClass(
            "home"
          )} py-2 items-center `}
          onClick={() => handleMenuClick("home")}
        >
          <HomeIcon className="w-[24px] h-[24px] mr-3" />
          <Link href="/">Home</Link>
          {/* <p>Home</p> */}
        </div>
        <div
          className={`flex my-2 cursor-pointer ${getMenuClass(
            "discover"
          )} py-2 items-center`}
          onClick={() => handleMenuClick("discover")}
        >
          <GlobeIcon className="w-[24px] h-[24px] mr-3" />
          <Link href="/discover">Discover</Link>
          {/* <p>Discover</p> */}
        </div>
        <div
          className={`flex my-2 cursor-pointer ${getMenuClass(
            "album"
          )} py-2 items-center`}
          onClick={() => handleMenuClick("album")}
        >
          <DiscIcon className="w-[24px] h-[24px] mr-3" />
          <Link href="/albums">Albums</Link>

          {/* <p>Albums</p> */}
        </div>
        <div
          className={`flex my-2 cursor-pointer ${getMenuClass(
            "artist"
          )} py-2 items-center`}
          onClick={() => handleMenuClick("artist")}
        >
          <AvatarIcon className="w-[24px] h-[24px] mr-3" />
          <Link href="/artists">Artists</Link>
          {/* <p>Artists</p> */}
        </div>
      </div>
      <div id="playlist-section" className="mb-5">
        <p className="text-primaryColorPink/60 text- text-[0.8rem]">
          Playlist and favorite
        </p>
        <div
          className={`flex my-2 cursor-pointer ${getMenuClass(
            "your-favorites"
          )} py-2 items-center`}
          onClick={() => handleMenuClick("your-favorites")}
        >
          <HeartIcon className="w-[24px] h-[24px] mr-3" />
          <Link href="/your_favorites">Your favorites</Link>
          {/* <p>Your favorites</p> */}
        </div>
        <div
          className={`relative flex my-2 cursor-pointer ${getMenuClass(
            "your-playlist"
          )} py-2 items-center`}
        >
          <ListBulletIcon className="w-[24px] h-[24px] mr-3" />
          <p onClick={handleShowPlaylist}>Your playlists</p>
          {showRequireLogin && (
            <div className="absolute z-20 w-[21rem] transition-opacity duration-300 ease-in-out px-6 py-4 text-sm text-black bg-[#69BFFF] rounded-lg shadow-lg transform -translate-y-1/2 left-48 top-1/2">
              <p className="font-bold mb-2">Create playlist</p>
              <p className="font-thin text-[0.9rem]">
                Sign in to create and share playlists.
              </p>
              <div className="mt-7 flex space-x-2 justify-end w-full">
                <button
                  className="px-2 py-2 rounded-md text-[0.85rem] font-bold  hover:scale-105"
                  onClick={() => {
                    setShowRequireLogin(!showRequireLogin);
                    console.log(showRequireLogin);
                  }}
                >
                  Later
                </button>
                <button
                  className="bg-white px-4 py-2 rounded-full text-[0.85rem] hover:scale-105 font-bold"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              </div>

              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#69BFFF]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Listen Together */}
        <div
          className={`relative flex my-2 cursor-pointer ${getMenuClass(
            "listen-together"
          )} py-2 items-center`}
        >
          <BiAperture className="w-[24px] h-[24px] mr-3" />
          <p onClick={handleListenTogether}>Listen Together</p>
          {showRequireLoginForListenTogether && (
            <div className="absolute z-20 w-[21rem] transition-opacity duration-300 ease-in-out px-6 py-4 text-sm text-black bg-[#69BFFF] rounded-lg shadow-lg transform -translate-y-1/2 left-48 top-1/2">
              <p className="font-bold mb-2">Listen Together</p>
              <p className="font-thin text-[0.9rem]">
                Sign in to join and enjoy listening together.
              </p>
              <div className="mt-7 flex space-x-2 justify-end w-full">
                <button
                  className="px-2 py-2 rounded-md text-[0.85rem] font-bold  hover:scale-105"
                  onClick={() => {
                    setShowRequireLoginForListenTogether(false);
                  }}
                >
                  Later
                </button>
                <button
                  className="bg-white px-4 py-2 rounded-full text-[0.85rem] hover:scale-105 font-bold"
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
              </div>

              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#69BFFF]"></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div id="general-section" className="mb-5">
        <p className="text-primaryColorPink/60 text-[0.8rem]">General</p>
        <div
          className={`flex my-2 cursor-pointer ${getMenuClass(
            "Setting"
          )} py-2 items-center `}
          onClick={() => handleMenuClick("Setting")}
        >
          <GearIcon className="w-[24px] h-[24px] mr-3" />
          <Link href="/setting">Setting</Link>

          {/* <p>Setting</p> */}
        </div>
        <div
          className={`flex my-2 cursor-pointer py-2 items-center`}
          onClick={() => handleLogout()}
        >
          <ExitIcon className="w-[24px] h-[24px] mr-3 text-primaryColorPink" />
          <p className="text-primaryColorPink text-[0.9rem]">Logout</p>

          {/* <p className='text-primaryColorPink'>Logout</p> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
