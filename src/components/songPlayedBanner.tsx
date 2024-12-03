"use client";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "@/app/AppProvider";
import Image from "next/image";
import { fetchApiData } from "@/app/api/appService";
import { DataSong } from "@/types/interfaces";
import { getMainArtistId } from "@/utils/utils";
import "./scss/musicPlayer.scss";

import { GoPlusCircle } from "react-icons/go";
import {
  FaCirclePlay,
  FaCirclePause,
  FaForward,
  FaBackward,
  FaRepeat,
  FaListCheck,
} from "react-icons/fa6";
import {
  BsFilePlayFill,
  BsSkipEndFill,
  BsFillSkipStartFill,
} from "react-icons/bs";
import {
  PiSpeakerHighFill,
  PiSpeakerXFill,
  PiSpeakerLowFill,
} from "react-icons/pi";
import { MdLyrics } from "react-icons/md";
import { RiExpandDiagonalLine } from "react-icons/ri";

import { TbSwitch3 } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatTime, getMainArtistName, getPosterSong } from "@/utils/utils";
import WaveSurfer from "wavesurfer.js";
import { decrypt } from "@/app/decode";
import LoadingPage from "@/components/loadingPage";

function SongPlayedBanner({ id }: { id: string }) {
  const [notFound, setNotFound] = useState(false);
  const [dominantColor, setDominantColor] = useState<string>();
  const [dataSong, setDataSong] = useState<DataSong>();
  const [anotherSong, setAnotherSong] = useState<DataSong[]>([]);
  const [mainArtist, setMainArtist] = useState<string | undefined>();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [endTime, setEndTime] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [sound, setSound] = useState(100);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { accessToken, loading, setLoading } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetchApiData(`/api/song/${id}`, "GET");
      if (result.success) {
        setDataSong(result.data.song);
        const imageUrl =
          typeof getPosterSong(result.data.song.album).image === "string"
            ? getPosterSong(result.data.song.album).image
            : "";
        setMainArtist(getMainArtistName(result.data.song.artists));
        try {
          const responses = await Promise.all([
            fetch(
              `/api/get-dominant-color?imageUrl=${encodeURIComponent(
                imageUrl as string
              )}`
            ),
            fetchApiData(
              `/api/songs/otherByArtist/${
                result.data.song.artists
                  ? getMainArtistId(result.data.song.artists)
                  : ""
              }`,
              "GET",
              null,
              null,
              { page: 1 }
            ),
          ]);
          const data = await responses[0].json();
          if (responses[0].ok) {
            console.log("Dominant color:", data.dominantColor);
            setDominantColor(data.dominantColor);
          } else {
            console.error("Error fetching dominant color:", data.error);
          }
          if (responses[1].success) setAnotherSong(responses[1].data.songs);
        } catch (error) {
          console.error("Error fetching dominant color:", error);
        }
      } else {
        console.error("Login error:", result.error);
        setNotFound(true);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
  
      const updateDuration = () => {
        console.log("Audio duration:", audioElement.duration);
        setEndTime(audioElement.duration || 0);
      };
  
      audioElement.addEventListener("loadedmetadata", updateDuration);
  
      return () => {
        audioElement.removeEventListener("loadedmetadata", updateDuration);
      };
    }
  }, []);
  

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;

      const updateProgress = () => {
        setStartTime(audioElement.currentTime);
        setProgressWidth((audioElement.currentTime / endTime) * 100);
      };

      audioElement.addEventListener("timeupdate", updateProgress);

      return () => {
        audioElement.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [endTime]);

  useEffect(() => {
    const handleLyricClick = (event: CustomEvent) => {
      if (audioRef.current) {
        const newTime = event.detail.startTime; // Lấy thời gian từ sự kiện
        audioRef.current.currentTime = newTime;
        setStartTime(newTime);
        audioRef.current.play();
        setIsPlaying(true);
      }
    };

    document.addEventListener("lyricClick", handleLyricClick as EventListener);

    return () => {
      document.removeEventListener(
        "lyricClick",
        handleLyricClick as EventListener
      );
    };
  }, []);

  const handleClickOnProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressPercent = (clickX / rect.width) * 100;
    const newTime = (progressPercent / 100) * endTime;
    if (audioRef.current) {
      const audioElement = audioRef.current;
      audioElement.currentTime = newTime;
      setStartTime(audioElement.currentTime);
    }
  };
  const handleClickSound = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressPercent = Math.floor((clickX / rect.width) * 100);
    setSound(progressPercent);
    if (audioRef.current) {
      audioRef.current.volume = progressPercent / 100;
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
      audioElement.currentTime += 5;
      setStartTime(audioElement.currentTime);
    }
  };

  const handleSkipBackward = () => {
    if (audioRef.current) {
      const audioElement = audioRef.current;
      audioElement.currentTime -= 5;
      setStartTime(audioElement.currentTime);
    }
  };

  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop;
    }
  };

  const handleMuteSound = () => {
    if (audioRef.current) {
      if (isMute) {
        audioRef.current.volume = 20 / 100;
        setSound(20);
      } else {
        audioRef.current.volume = 0 / 100;
        setSound(0);
      }
      setIsMute(!isMute);
    }
  };

  const getVolumeIcon = () => {
    if (sound === 0) {
      return (
        <PiSpeakerXFill
          className="w-[18px] h-[18px]"
          onClick={handleMuteSound}
        />
      );
    } else if (sound < 50 && sound > 0) {
      return (
        <PiSpeakerLowFill
          className="w-[18px] h-[18px]"
          onClick={handleMuteSound}
        />
      );
    } else {
      return (
        <PiSpeakerHighFill
          className="w-[18px] h-[18px]"
          onClick={handleMuteSound}
        />
      );
    }
  };

  if (loading) return <LoadingPage />;
  // if (!currentSong) return null;

  return (
    <TooltipProvider>
      <div className="w-full bg-secondColorBg">
        <div
          className="m-3 rounded-lg border-2 border-primaryColorBg bg-gradient-to-b to bg-primaryColorBg overflow-auto"
          style={{
            background: `linear-gradient(to bottom, ${dominantColor} 20%, rgba(0, 0, 0, 1) 80%)`,
          }}
        >
          {/* Nội dung của banner */}
          <div className=" w-full h-[22vh] flex flex-col justify-end gap-6 rounded-t-lg bg-gradient-to-b from-transparent to-black/30">
            {/* Header */}
            {/* Content albums */}
            <div className="flex items-start gap-8">
              <div className="shadow-[0_4px_60px_rgba(0,0,0,0.5)] rounded-md">
                <Image
                  src={
                    dataSong?.album ? getPosterSong(dataSong.album).image : ""
                  }
                  alt="Album Cover"
                  width={160}
                  height={160}
                  priority
                  className="rounded-tl-md round-bl-md w-40 h-40"
                />
              </div>
              <div className="h-full flex flex-col justify-between">
                <div className="flex gap-1 flex-col">
                  {/* <h3>Song</h3> */}
                  <h1 className="mt-3 text-2xl font-bold">{dataSong?.title}</h1>
                  <div className="flex items-center space-x-2 text-textMedium ">
                    <p
                      className="cursor-pointer hover:underline"
                      // onClick={() => dataSong?.artists && router.push(`/artist/${getMainArtistId(dataSong.artists)}`)}
                    >
                      {dataSong?.artists
                        ? getMainArtistName(dataSong.artists)
                        : "Unknown Artist"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center mb-4">
                  <audio
                    ref={audioRef}
                    src={
                      dataSong?.filePathAudio
                        ? decrypt(dataSong.filePathAudio)
                        : ""
                    }
                    preload="auto"
                  ></audio>
                  <div className="flex items-center mb-1 text-primaryColorGray cursor-pointer">
                    <Tooltip>
                      <TooltipTrigger>
                        <TbSwitch3 className="mx-3 w-[24px] h-[24px] hover:text-primaryColorPink" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Bật phát lộn xộn</p>
                      </TooltipContent>
                    </Tooltip>
                    <BsFillSkipStartFill className="mx-3 w-[25px] h-[25px] hover:text-primaryColorPink" />
                    <FaBackward
                      className="mx-3 w-[20px] h-[20px]  hover:text-primaryColorPink"
                      onClick={handleSkipBackward}
                    />
                    {isPlaying ? (
                      <FaCirclePause
                        className="mx-3 w-[32px] h-[32px]  hover:text-primaryColorPink"
                        onClick={handlePlayPause}
                      />
                    ) : (
                      <FaCirclePlay
                        className="mx-3 w-[32px] h-[32px]  hover:text-primaryColorPink"
                        onClick={handlePlayPause}
                      />
                    )}
                    <FaForward
                      className="mx-3 w-[20px] h-[20px] hover:text-primaryColorPink"
                      onClick={handleSkipForward}
                    />
                    <BsSkipEndFill className="mx-3 w-[25px] h-[25px] hover:text-primaryColorPink" />
                    <Tooltip>
                      <TooltipTrigger className="relative">
                        <FaRepeat
                          className={`mx-3 w-[20px] h-[20px] hover:text-primaryColorPink ${
                            isRepeat ? "text-primaryColorPink" : "text-white"
                          }`}
                          onClick={handleRepeat}
                        />
                        {isRepeat && (
                          <div className="absolute left-2 -bottom-2 mx-3 w-[5px] h-[5px] bg-primaryColorPink rounded-full"></div>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        {isRepeat
                          ? "Tắt chế độ lặp lại"
                          : "Bật chế độ lặp lại một bài"}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="w-full flex items-center">
                    <p className="mx-2 text-[0.9rem]">
                      {formatTime(startTime * 1000)}
                    </p>
                    <div
                      className="relative group hover:cursor-pointer"
                      onClick={handleClickOnProgress}
                    >
                      <div
                        className="absolute -top-[270%] left-0 w-full h-full opacity-0 group-hover:opacity-100 -z-10"
                        id="waveform"
                      ></div>
                      <div className="w-[15vw] bg-[#4D4D4D] h-1 rounded-md "></div>
                      <div
                        className="absolute bg-white top-0 w-full h-1 rounded-md"
                        style={{ width: `${progressWidth}%` }}
                      ></div>
                      <div
                        className="absolute -top-[100%] left-[50%] w-3 h-3 bg-white rounded-full transform -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ left: `calc(${progressWidth}%)` }}
                      ></div>
                    </div>
                    {/* <p className="mx-2 text-[0.9rem]">
                      {formatTime(endTime * 1000)}
                    </p> */}
                    <p className="mx-2 text-[0.9rem]">
                      {isNaN(endTime) || endTime === 0
                        ? "00:00"
                        : formatTime(endTime * 1000)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default SongPlayedBanner;
