"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  PlusIcon,
  CaretSortIcon,
  CheckIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import Image from "next/image";
import artistimg from "@/assets/img/placeholderUser.jpg";
import { fetchApiData } from "@/app/api/appService";

interface Artist {
  id: string;
  name: string;
  avatar: string;
}
interface AddAlbumSheetProps {
  onSave: (albumData: {
    title: string;
    mainArtistId: string;
    type: string;
    songIds: string[];
    albumCover: File;
    releaseDate: string;
  }) => void;
  artist: Artist[];
}


const AddAlbumSheet: React.FC<AddAlbumSheetProps> = ({ onSave, artist }) => {
  const [albumTitle, setAlbumTitle] = React.useState("");
  const [mainArtist, setMainArtist] = React.useState("");
  const [openMainArtist, setOpenMainArtist] = React.useState(false);
  const [openListSong, setOpenListSong] = React.useState(false);
  const [albumImg, setAlbumImg] = useState<File | null>(null);
  const [listArtist, setListArtist] = React.useState<Artist[]>(artist || []);
  const [listSongOfMainArtist, setListSongOfMainArtist] = React.useState<
    { id: string; title: string }[]
  >([]);
  const [selectedSongs, setSelectedSongs] = React.useState<
    { id: string; title: string }[]
  >([]);
  const [reorderedSong, setReorderedSong] = React.useState<
    { id: string; title: string }[]
  >([]);
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [typeAlbum, setTypeAlbum] = useState<string>("");

  React.useEffect(() => {
    setListArtist((prevList) =>
      prevList.map((item) => ({
        ...item,
        selected: mainArtist === item.id,
      }))
    );
    if (!mainArtist) {
      setListSongOfMainArtist([]);
      setSelectedSongs([]);
    }
  }, [mainArtist]);

  const handleMainArtistSelect = async (selectedArtist: Artist) => {
    if (mainArtist === selectedArtist.id) {
      setMainArtist("");
      setListArtist((prevList) =>
        prevList.map((artist) =>
          artist.id === selectedArtist.id
            ? { ...artist, selected: false }
            : artist
        )
      );
      setListSongOfMainArtist([]);
      setSelectedSongs([]);
    } else {
      setMainArtist(selectedArtist.id);
      setListArtist((prevList) => [
        { ...selectedArtist, selected: true },
        ...prevList.filter((artist) => artist.id !== selectedArtist.id),
      ]);

      try {
        const response = await fetchApiData(
          `/api/artist/song/${selectedArtist.id}`,
          "GET",
          null,
          null
        );
        if (response.success) {
          setListSongOfMainArtist(response.data.songs);
          setReorderedSong(response.data.songs);
          setSelectedSongs([]);
        } else {
          console.error("Failed to fetch songs:", response.error);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    }
  };

  const handleSongChange = (song: { id: string; title: string }) => {
    setSelectedSongs((prevSelected) =>
      prevSelected.some((s) => s.id === song.id)
        ? prevSelected.filter((s) => s.id !== song.id)
        : [...prevSelected, song]
    );

    setReorderedSong((prevSongs) => {
      // Nếu bài hát đã có trong danh sách, đưa nó lên đầu
      if (prevSongs.some((s) => s.id === song.id)) {
        return [song, ...prevSongs.filter((s) => s.id !== song.id)];
      }
      return [song, ...prevSongs];
    });
  };

  const handleSelectChange = (value: string) => {
    setTypeAlbum(value); 
  };

  const handleAlbumImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        e.target.value = "";
        setAlbumImg(null);
        alert("File size should not exceed 10MB");
        return;
      } else {
        setAlbumImg((file));
      }
    }
  };

  const handleSave = () => {
    if(albumImg){
      onSave({
        title: albumTitle,
        mainArtistId: mainArtist,
        type: typeAlbum,
        songIds: selectedSongs.map((song) => song.id),
        albumCover: albumImg,
        releaseDate: releaseDate,
      });
    }

    setAlbumTitle("");
    setMainArtist("");
    setTypeAlbum("");
    setListSongOfMainArtist([]);
    setSelectedSongs([]);
    setAlbumImg(null);
    setReleaseDate("");
  };

 
  return (
    <div className="">
      <Sheet>
        <SheetTrigger asChild>
          <button className="text-textMedium p-3 bg-primaryColorPink flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover">
            <PlusIcon className="text-white w-5 h-5" />
            Add New Album
          </button>
        </SheetTrigger>
        <SheetContent className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-darkBlue scrollbar-track-black">
          <SheetHeader>
            <SheetTitle className="text-primaryColorPink">
              Add New Album
            </SheetTitle>
            <SheetDescription>
              Enter details to add a new album.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 items-start">
            {/* title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trackTitle" className="text-left">
                Title
              </Label>
              <Input
                id="albumTitle"
                value={albumTitle}
                onChange={(e) => setAlbumTitle(e.target.value)}
                placeholder="Enter album title"
                className="col-span-3 border-darkBlue"
              />
            </div>
            {/* Main Aritst */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mainArtist" className="text-left">
                Main Artist
              </Label>
              <Popover open={openMainArtist} onOpenChange={setOpenMainArtist}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openMainArtist}
                    className="w-full justify-between border-darkBlue col-span-3 truncate"
                  >
                    {mainArtist
                      ? listArtist.find((a) => a.id === mainArtist)?.name
                      : "Select main artist"}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 border-darkBlue">
                  <Command>
                    <CommandInput
                      placeholder="Search artist..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No artist found.</CommandEmpty>
                      <ScrollArea className="h-40">
                        <CommandGroup>
                          {listArtist.map((artist) => (
                            <CommandItem
                              key={artist.id}
                              onSelect={() => handleMainArtistSelect(artist)}
                            >
                              <Image
                                src={artist.avatar || artistimg}
                                alt={artist.name}
                                width={50}
                                height={50}
                                className="rounded-lg w-8 h-8 mr-2"
                              />

                              {artist.name}
                              <CheckIcon
                                className={`ml-auto h-4 w-4 ${
                                  artist.id === mainArtist
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* Type */}

            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="typeAlbum" className="text-left text-textMedium">
                Type Album
              </label>
              <div className="col-span-3">
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full border-primaryColorBlue">
                    <SelectValue placeholder="Select type of album" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="ep">EP</SelectItem>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="album">Album</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* Album img */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ablumImg" className="text-left">
                Album Image
              </Label>
              <Input
                id="ablumImg"
                type="file"
                accept="image/*"
                onChange={handleAlbumImgChange}
                className="col-span-3 border-darkBlue"
              />
            </div>
            {/* Release Date */}
            <div className="grid grid-cols-4 items-center gap-4">
              <label
                htmlFor="releaseDate"
                className="text-left text-textMedium"
              >
                Release Date
              </label>
              <div className="col-span-3">
                <input
                  id="releaseDate"
                  type="date"
                  className="calendar-icon w-full border-primaryColorBlue border p-2 rounded-md bg-slate-950 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primaryColorBlue"
                  onChange={(e) => setReleaseDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            {/* List song */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subArtists" className="text-left">
                List songs
              </Label>
              <div className="col-span-3 border-darkBlue">
                <Popover open={openListSong} onOpenChange={setOpenListSong}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openListSong}
                      className="w-full justify-between border-darkBlue col-span-3 truncate"
                      disabled={!mainArtist}
                    >
                      Select songs of main artist
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 border-darkBlue">
                    <Command>
                      <CommandInput
                        placeholder="Search songs..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No song found.</CommandEmpty>
                        <ScrollArea className="h-40">
                          <CommandGroup>
                            {reorderedSong.map((song) => (
                              <CommandItem
                                className=""
                                key={song.id}
                                onSelect={() => handleSongChange(song)}
                              >
                                {song.title}
                                <CheckIcon
                                  className={`ml-auto h-4 w-4 ${
                                    selectedSongs.some((s) => s.id === song.id)
                                      ? "opacity-100"
                                      : "opacity-0"
                                  }`}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </ScrollArea>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Song */}
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="space-y-2 col-span-4">
                {selectedSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center justify-between gap-2 p-2 border rounded-md border-darkBlue bg-gray-800  hover:bg-darkerBlue cursor-pointer"
                  >
                    <span>{song.title}</span>
                    <Cross2Icon
                      className="text-primaryColorPink h-6 w-6 flex-shrink-0 cursor-pointer"
                      onClick={() =>
                        setSelectedSongs((prevSongs) =>
                          prevSongs.filter((s) => s.id !== song.id)
                        )
                      }
                    ></Cross2Icon>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button
                onClick={handleSave}
                type="submit"
                className="text-textMedium p-3 bg-primaryColorPink flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover"
              >
                Save Album
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddAlbumSheet;
