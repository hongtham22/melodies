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
import { PlusIcon, CaretSortIcon, CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
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
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddAlbumSheetProps {
  onSave: (trackData: {
    title: string;
    main_artist: string;
    list_song: string[];
    album_img: string | null;
  }) => void;
}

const availableArtists = [
  "Sơn Tùng MTP",
  "Đen Vâu",
  "Karik",
  "Binz",
  "Rhymastic",
  "Wowy",
  "JustaTee",
  "Bích Phương",
  "Min",
  "AMEE",
  "Phan Mạnh Quỳnh",
];

const availableSongs = [
  "Chạy ngay đi",
  "Chúng ta của hiện tại",
  "Có chắc yêu là đây",
  "Có hẹn với thanh xuân",
  "Có tất cả nhưng thiếu anh",
  "Trời giấu trời mang đi",
  "Nàng thơ",
  "Nơi này có anh",
  "Phải chăng em đã yêu?",
  "Không một bài hát nào có thể kể hết tâm trạng của em",
];

const AddAlbumSheet: React.FC<AddAlbumSheetProps> = ({ onSave }) => {
  const [albumTitle, setAlbumTitle] = React.useState("");
  const [mainArtist, setMainArtist] = React.useState("");
  const [listSongOfMainArtist, setListSongOfMainArtist] = React.useState<
    string[]
  >([]);
  const [openMainArtist, setOpenMainArtist] = React.useState(false);
  const [openListSong, setOpenListSong] = React.useState(false);
  const [albumImg, setAlbumImg] = useState<string | null>(null);

  const [reorderedSong, setReorderSong] = React.useState(availableSongs);

  const handleSongChange = (song: string) => {
    setListSongOfMainArtist((prevArtists) =>
      prevArtists.includes(song)
        ? prevArtists.filter((a) => a !== song)
        : [...prevArtists, song]
    );
    setReorderSong((prevSongs) => {
      // Nếu bài hát đã có trong danh sách, đưa nó lên đầu
      if (prevSongs.includes(song)) {
        return [song, ...prevSongs.filter((s) => s !== song)];
      }
      return [song, ...prevSongs];
    });
    
  };

  const handleSave = () => {
    onSave({
      title: albumTitle,
      main_artist: mainArtist,
      list_song: listSongOfMainArtist,
      album_img: albumImg,
    });

    setAlbumTitle("");
    setMainArtist("");
    setListSongOfMainArtist([]);
    setAlbumImg(null);
  };

  const handleAlbumImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAlbumImg(URL.createObjectURL(file));
    }
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
          <SheetDescription>Enter details to add a new album.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 items-start">
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
                  {mainArtist || "Select main artist"}
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
                        {availableArtists.map((artist) => (
                          <CommandItem
                            key={artist}
                            onSelect={() => {
                              setMainArtist(
                                artist === mainArtist ? "" : artist
                              );
                              setOpenMainArtist(false);
                            }}
                          >
                            {artist}
                            <CheckIcon
                              className={`ml-auto h-4 w-4 ${
                                artist === mainArtist
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ablumImg" className="text-left">
              Album Image
            </Label>
            <Input
              id="ablumImg"
              type="file"
              accept="image/*"
              onChange={handleAlbumImgChange}
              className="col-span-3 border-darkerBlue"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subArtists" className="text-left">
              List songs
            </Label>
            <div className="col-span-3">
              <Popover open={openListSong} onOpenChange={setOpenListSong}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openListSong}
                    className="w-full justify-between border-darkBlue col-span-3 truncate"
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
                              key={song}
                              onSelect={() => handleSongChange(song)}
                            >
                              {song}
                              <CheckIcon
                                className={`ml-auto h-4 w-4 ${
                                  listSongOfMainArtist.includes(song)
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
          <div className="grid grid-cols-4 items-center gap-4">
            <div className="space-y-2 col-span-4">
              {listSongOfMainArtist.map((song, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 p-2 border rounded-md border-darkBlue bg-gray-800  hover:bg-darkerBlue cursor-pointer"
                >
                  <span>{song}</span>
                  <Cross2Icon 
                  className="text-primaryColorPink h-6 w-6 flex-shrink-0 cursor-pointer"
                  onClick={() =>
                    setListSongOfMainArtist((prevSongs) =>
                      prevSongs.filter((s) => s !== song)
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
