"use client";
import React, { useEffect, useState } from "react";
import { useAppContext as useSongContext } from '@/components/provider/songProvider';
import { useAppContext } from "@/app/AppProvider";

import {
  HomeIcon,
  GlobeIcon,
  DiscIcon,
  AvatarIcon,
  ExitIcon,
  GearIcon,
  ListBulletIcon,
  ExternalLinkIcon,
} from "@radix-ui/react-icons";
import { CgProfile } from "react-icons/cg";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { fetchApiData } from "@/app/api/appService";
import { BiAperture } from "react-icons/bi";
import UploadSong from "@/components/uploadSong";

const Sidebar = () => {
  const { accessToken, socket, setAccessToken, role, setRole, setShowPlaylistMenu } = useAppContext();
  const { currentSong } = useSongContext()
  const [pb, setPb] = useState(false)
  useEffect(() => {
    if (currentSong) {
      setPb(true);
    }
  }, [currentSong]);

  const [activeMenu, setActiveMenu] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const currentPath = usePathname();
  const isInListenTogether = currentPath.startsWith("/listenTogether/");
  const handleMenuClick = (menuItem: string) => {
    if (isInListenTogether) {
      setShowPlaylistMenu(false);
      toast({
        variant: "destructive",
        title: "Action Required",
        description: "Please press the Leave Room button to perform other actions.",
      });
    } else {
      if (menuItem === 'home') {
        router.push('/');
        setActiveMenu(menuItem);
      } else {
        router.push(`/${menuItem}`);
        setActiveMenu(menuItem);

      }
    }
  };

  const handleMenuClickUploadSong = (menuItem: string) => {
    if (isInListenTogether) {
      setShowPlaylistMenu(false);
      toast({
        variant: "destructive",
        title: "Action Required",
        description: "Please press the Leave Room button to perform other actions.",
      });
    } else {
      if (menuItem === 'home') {
        router.push('/');
        setActiveMenu(menuItem);
      } else {
        setActiveMenu(menuItem);
      }
    }
  };

  const handleShowPlaylist = () => {
    if (accessToken) {
      setShowPlaylistMenu(true);
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You must be logged in to perform this function",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  const handleListenTogether = () => {
    if (accessToken) {
      // router.push("/listenTogether");
      handleMenuClick("listenTogether");
    } else {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "You must be logged in to perform this function",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
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
        socket?.emit('leaveRoom');
        document.cookie =
          "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setAccessToken("");
        setRole("");
        localStorage.removeItem('avatar')
        router.replace("/");
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
      ? "bg-primaryColorPink rounded-xl px-2 font-semibold w-[12rem]"
      : "text-[0.9rem]";
  };
  return (
    <div className={`flex flex-col justify-between h-full w-full mt-8 pl-9 pr-7 drop-shadow-lg ${pb && 'pb-20'} overflow-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-darkBlue`}>
      <div>
        <div id="menu-section" className="mb-5">
          <p className="text-primaryColorPink/60 text-[0.8rem]">Menu</p>
          {role === "Admin" && (
            <div
              className={`flex my-2 cursor-pointer ${getMenuClass(
                "admin"
              )} py-2 items-center `}
              onClick={() => handleMenuClick("admin")}
            >
              <ExternalLinkIcon className="w-[24px] h-[24px] mr-3 text-primaryColorBlue" />
              {/* <Link href="/">Home</Link> */}
              <p className="text-primaryColorBlueHover font-bold">Admin Manage</p>
            </div>
          )}
          <div
            className={`flex my-2 cursor-pointer ${getMenuClass(
              "home"
            )} py-2 items-center `}
            onClick={() => handleMenuClick("home")}
          >
            <HomeIcon className="w-[24px] h-[24px] mr-3" />
            {/* <Link href="/">Home</Link> */}
            <p>Home</p>
          </div>
          <div
            className={`flex my-2 cursor-pointer ${getMenuClass(
              "discover"
            )} py-2 items-center`}
            onClick={() => handleMenuClick("discover")}
          >
            <GlobeIcon className="w-[24px] h-[24px] mr-3" />
            {/* <Link href="/discover">Discover</Link> */}
            <p>Discover</p>
          </div>
        </div>
        <div id="playlist-section" className="mb-5">
          <p className="text-primaryColorPink/60 text- text-[0.8rem]">
            Playlist and favorite
          </p>
          <div
            className={`relative flex my-2 cursor-pointer ${getMenuClass(
              "your-playlist"
            )} py-2 items-center`}
          >
            <ListBulletIcon className="w-[24px] h-[24px] mr-3" />
            <p onClick={handleShowPlaylist}>Your playlists</p>
          </div>
          {/* Listen Together */}
          <div
            className={`relative flex my-2 cursor-pointer ${getMenuClass(
              "listenTogether"
            )} py-2 items-center`}
          >
            <BiAperture className="w-[24px] h-[24px] mr-3" />
            <p onClick={handleListenTogether}>Listen Together</p>
          </div>
        </div>
        <div id="general-section" className="mb-5">
          <p className="text-primaryColorPink/60 text-[0.8rem]">General</p>
          <div
            className={`flex my-2 cursor-pointer ${getMenuClass(
              "Profile"
            )} py-2 items-center `}
            onClick={() => handleMenuClick("profile")}
          >
            <CgProfile className="w-[24px] h-[24px] mr-3" />
            <p>Profile</p>
          </div>

          <div
            className={`flex my-2 cursor-pointer ${getMenuClass(
              "UploadSong"
            )} py-2 items-center `}
            onClick={() => handleMenuClickUploadSong("UploadSong")}
            style={{ pointerEvents: isInListenTogether ? 'none' : 'auto' }}
          >
            <UploadSong />
          </div>
        </div>
      </div>
      {
        accessToken && (
          <div
            className={`flex cursor-pointer mb-10 py-2 items-center`}
            onClick={() => handleLogout()}
          >
            <ExitIcon className="w-[24px] h-[24px] mr-3 text-primaryColorPink" />
            <p className="text-primaryColorPink text-[0.9rem]">Logout</p>
          </div>
        )
      }
    </div>
  );
};

export default Sidebar;
