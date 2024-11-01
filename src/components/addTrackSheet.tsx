"use client";

import React from "react";
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
import { PlusIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddTrackSheetProps {
  onSave: (trackData: {
    title: string;
    main_artist: string;
    sub_artist: string[];
    poster: string;
    audio: string;
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

const AddTrackSheet: React.FC<AddTrackSheetProps> = ({ onSave }) => {
  const [trackTitle, setTrackTitle] = React.useState("");
  const [mainArtist, setMainArtist] = React.useState("");
  const [subArtists, setSubArtists] = React.useState<string[]>([]);
  const [poster, setPoster] = React.useState("");
  const [audio, setAudio] = React.useState("");
  const [openMainArtist, setOpenMainArtist] = React.useState(false);
  const [openSubArtist, setOpenSubArtist] = React.useState(false);

  const handleSubArtistChange = (artist: string) => {
    setSubArtists((prevArtists) =>
      prevArtists.includes(artist)
        ? prevArtists.filter((a) => a !== artist)
        : [...prevArtists, artist]
    );
  };

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPoster(URL.createObjectURL(file));
    }
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudio(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    onSave({
      title: trackTitle,
      main_artist: mainArtist,
      sub_artist: subArtists,
      poster,
      audio,
    });

    setTrackTitle("");
    setMainArtist("");
    setSubArtists([]);
    setPoster("");
    setAudio("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-textMedium p-3 bg-primaryColorPink flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover">
          <PlusIcon className="text-white w-5 h-5" />
          Add New Track
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-primaryColorPink">
            Add New Track
          </SheetTitle>
          <SheetDescription>Enter details to add a new track.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 items-start">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="trackTitle" className="text-left">
              Title
            </Label>
            <Input
              id="trackTitle"
              value={trackTitle}
              onChange={(e) => setTrackTitle(e.target.value)}
              placeholder="Enter track title"
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
            <Label htmlFor="subArtists" className="text-left">
              Sub Artists
            </Label>
            <div className="col-span-3">
              <Popover open={openSubArtist} onOpenChange={setOpenSubArtist}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openSubArtist}
                    className="w-full justify-between border-darkBlue col-span-3 truncate"
                  >
                    {subArtists.length > 0
                      ? subArtists.join(", ")
                      : "Select sub artists"}
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
                              onSelect={() => handleSubArtistChange(artist)}
                            >
                              {artist}
                              <CheckIcon
                                className={`ml-auto h-4 w-4 ${
                                  subArtists.includes(artist)
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
            <Label htmlFor="poster" className="text-left">
              Poster
            </Label>
            <Input
              id="poster"
              type="file"
              accept="image/*"
              onChange={handlePosterChange}
              className="col-span-3 border-darkBlue"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="audio" className="text-left">
              Audio
            </Label>
            <Input
              id="audio"
              type="file"
              accept="audio/*"
              onChange={handleAudioChange}
              className="col-span-3 border-darkBlue"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={handleSave}
              type="submit"
              className="text-textMedium p-3 bg-primaryColorPink flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover"
            >
              Save Track
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddTrackSheet;
