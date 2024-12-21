"use client";
import { useAppContext } from "@/app/AppProvider";
import { useAppContext as useSongContext } from "@/components/provider/songProvider";
import { fetchApiData } from "@/app/api/appService";
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "@/components/scss/songIntroduce.scss";

import { IoIosMore, IoIosClose, IoIosLink } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { GoPlusCircle } from "react-icons/go";
import { getAllArtistsInfo, getMainArtistInfo, getPosterSong } from "@/utils/utils";
import SongImage from '@/assets/img/placeholderSong.jpg'
import UserImage from '@/assets/img/placeholderUser.jpg'
import Playlist from '@/assets/img/placeholderPlaylist.png'
import { Artist, DataPlaylist } from "@/types/interfaces";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { handleAddSongToNewUserPlaylist, handleAddToUserPlaylist, handleFetchPlaylistByUser } from "@/utils/api";
import { ToastAction } from "@/components/ui/toast";

const SongIntroduce: React.FC = () => {
  const { accessToken } = useAppContext()
  const router = useRouter()
  const { toast } = useToast()
  const {
    showContentSong,
    setShowContentSong,
    currentSong,
    setShowSidebarRight,
  } = useSongContext();

  const [dataArtist, setDataArtist] = useState<Artist>()
  const [listPlayer, setListPlayer] = useState<DataPlaylist[]>()
  const mainArtistId = currentSong?.artists ? getMainArtistInfo(currentSong.artists)?.id : undefined;
  useEffect(() => {
    if (currentSong) {
      const fetchArtist = async () => {
        try {
          const responses = await Promise.all([
            fetchApiData(`/api/artist/${mainArtistId}`, "GET"),
          ]);
          if (responses[0].success) {
            setDataArtist(responses[0].data.artist)
          }
        } catch (error) {
          console.error("Error fetching songs:", error);
        } finally {
        }
      };
      fetchArtist();
    }
  }, [mainArtistId]);

  const handleFetchPlaylist = async () => {
    if (accessToken) {
      const playlists = await handleFetchPlaylistByUser(accessToken);
      setListPlayer(playlists);
    }
  }

  const handleAddSongToPlaylist = async (playlistId: string) => {
    if (accessToken && currentSong) {
      const result = await handleAddToUserPlaylist(accessToken, currentSong?.id, playlistId)
      if (result.success) {
        toast({
          variant: "success",
          title: "Congratulation!!!",
          description: 'Add song to your playlist success',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  }

  const handleAddSongToNewPlaylist = async () => {
    if (accessToken && currentSong) {
      const result = await handleAddSongToNewUserPlaylist(accessToken, currentSong?.id)
      if (result.success) {
        toast({
          variant: "success",
          title: "Congratulation!!!",
          description: 'Add song to your playlist success',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: result.error,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    }
  }

  if (!showContentSong) return null;

  return (
    <div className="min-w-[20vw] block bg-secondColorBg text-white right-0 pl-1 animate-slide-in-right">
      <div className="flex flex-col w-[98%] bg-primaryColorBg rounded-md mt-3 group">
        <div className="block w-[18%] fixed bg-primaryColorBg py-3 shadow-lg shadow-black">
          <div className="w-[19vw] flex justify-between">
            <div className="w-[70%]">
              {
                currentSong && (
                  <div className='mt-1 ml-3 relative max-w-full overflow-hidden cursor-pointer'>
                    <p
                      className={`text-nowrap text-primaryColorPink font-semibold ${currentSong.title.length > 20 ? 'marquee' : ''}`}
                    >
                      {currentSong?.title}
                    </p>
                  </div>
                )
              }
            </div>
            <div className="flex items-center gap-2">
              <IoIosMore className="text-2xl" />
              <IoIosClose
                className="text-3xl cursor-pointer"
                onClick={() => {
                  setShowContentSong(!showContentSong);
                  setShowSidebarRight(showContentSong ? false : true);
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="w-full self-center flex flex-col overflow-auto mt-16 h-screen
[&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-inherit
  hover:[&::-webkit-scrollbar-thumb]:bg-white/30
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  hover:dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 "
        >
          <div className="self-center mb-6">
            <Image
              src={currentSong?.album ? getPosterSong(currentSong.album).image : SongImage}
              alt="Song Poster"
              width={260}
              height={260}
              quality={100}
              className="object-cover rounded-md mb-3"
            />
            <div className="flex items-center justify-between w-[260px]">
              <div className="w-[80%]">
                {
                  currentSong && (
                    <>
                      <div className='relative overflow-hidden cursor-pointer hover:underline'>
                        <p
                          className={`text-2xl font-bold text-nowrap ${currentSong.title.length > 16 ? 'marquee' : ''}`}
                          onClick={() => router.push(`/song/${currentSong.id}`)}
                        >
                          {currentSong?.title}
                        </p>
                      </div>
                      <div className="relative max-w-full overflow-hidden">
                        <div
                          className={`flex whitespace-nowrap items-center text-[0.8rem] text-primaryColorGray font-thin ${getAllArtistsInfo(currentSong.artists).length > 3 ? 'marquee' : ''
                            }`}
                        >
                          {currentSong?.artists ? (
                            getAllArtistsInfo(currentSong.artists).map((artist, index, array) => (
                              <span key={artist.id} className="flex items-center">
                                <span
                                  className="cursor-pointer hover:underline"
                                  onClick={() => router.push(`/artist/${artist.id}`)}
                                >
                                  {artist.name}
                                </span>
                                {index < array.length - 1 && <span>,&nbsp;</span>}
                              </span>
                            ))
                          ) : (
                            <p>Unknown Artist</p>
                          )}
                        </div>
                      </div>
                    </>
                  )
                }
              </div>
              <div className="cursor-pointer gap-2 text-white flex">
                <IoIosLink
                  title="Sao chép liên kết bài hát"
                  className="w-[20px] h-[20px] opacity-0 group-hover:opacity-100 transition-transform duration-200 hover:scale-105"
                />
                <div
                  className='relative cursor-pointer text-primaryColorGray transition-transform duration-200 hover:scale-105 hover:text-white'
                >
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        onClick={handleFetchPlaylist}
                      >
                        <GoPlusCircle className='w-[20px] h-[20px]' />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="absolute w-52 p-0 border-darkerBlue top-0 right-0 shadow-sm shadow-white/20">
                      <Command className='bg-[#171717]'>
                        <CommandInput
                          placeholder="Search your playlist..."
                          className="h-9"
                          required
                        />
                        <CommandList>
                          <CommandEmpty>No playlist found.</CommandEmpty>
                          <ScrollArea className="h-40">
                            <CommandGroup>
                              {listPlayer?.map((playlist) => (
                                <CommandItem
                                  key={playlist.playlistId}
                                  onSelect={() => handleAddSongToPlaylist(playlist.playlistId)}
                                >
                                  <Image
                                    src={playlist.image || Playlist}
                                    alt={playlist.title}
                                    width={50}
                                    height={50}
                                    className="rounded-lg w-9 h-9 mr-2"
                                  />

                                  {playlist.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </ScrollArea>
                        </CommandList>
                        <div
                          className='bg-[#1F1F1F] w-full px-4 py-3 flex gap-2 items-center cursor-pointer hover:underline'
                          onClick={() => handleAddSongToNewPlaylist()}
                        >
                          <GoPlusCircle className='w-[20px] h-[20px]' />
                          <p className='text-[0.9rem]'>Add to new Playlist</p>
                        </div>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`relative self-center rounded-md ${currentSong ? "mb-64" : "mb-40"} `}
          >
            <Image
              src={dataArtist?.avatar || UserImage}
              alt="Song Poster"
              width={260}
              height={260}
              quality={100}
              className="object-cover rounded-md"
            />
            <div
              className="absolute inset-0 pointer-events-none z-0 rounded-md"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 50%)",
              }}
            />
            <p className="absolute top-3 left-4 font-semibold z-10 text-[0.95rem]">
              Giới thiệu về nghệ sĩ
            </p>
            <div className="absolute bg-[#1F1F1F] w-full z-10 mb-3 -mt-4 py-3 px-4 rounded-b-lg space-y-2">
              <p
                className="font-semibold text-nowrap cursor-pointer hover:underline"
                onClick={() => router.push(`/artist/${dataArtist?.id}`)}
              >{dataArtist?.name}</p>
              <div className="flex">
                <div className="w-1/2">
                  <p className="text-[0.95rem] text-primaryColorGray text-wrap">
                    {dataArtist?.totalFollow.toLocaleString()} người theo dõi
                  </p>
                </div>
                <button className="border-2 border-slate-50 font-semibold px-3 py-1 rounded-full text-[0.85rem] text-nowrap">
                  Hủy theo dõi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongIntroduce;
