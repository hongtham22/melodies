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
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

interface AddArtistSheetProps {
  onSave: (artistData: {
    name: string;
    bio: string;
    avatar: string;
    genre: string[];
  }) => void;
}

const availableGenres = [
  "Pop",
  "Rock",
  "Jazz",
  "Hip-Hop",
  "Classical",
  "Country",
  "Electronic",
  "R&B",
];

const AddArtistSheet: React.FC<AddArtistSheetProps> = ({ onSave }) => {
  const [artistName, setArtistName] = React.useState("");
  const [artistBio, setArtistBio] = React.useState("");
  const [artistAvatar, setArtistAvatar] = React.useState("");
  const [artistGenre, setArtistGenre] = React.useState<string[]>([]);

  const handleGenreChange = (genre: string) => {
    setArtistGenre((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArtistAvatar(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    onSave({
      name: artistName,
      bio: artistBio,
      avatar: artistAvatar,
      genre: artistGenre,
    });

    setArtistName("");
    setArtistBio("");
    setArtistAvatar("");
    setArtistGenre([]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-textMedium p-3 bg-primaryColorPink flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover">
          <PlusIcon className="text-white w-5 h-5" />
          Add New Artist
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-primaryColorPink">
            Add New Artist
          </SheetTitle>
          <SheetDescription>
            Enter details to add a new artist.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 items-start">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="artistName" className="text-left">
              Name
            </Label>
            <Input
              id="artistName"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Enter artist name"
              className="col-span-3 border-darkerBlue"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="artistBio" className="text-left">
              Bio
            </Label>
            <textarea
              id="artistBio"
              value={artistBio}
              onChange={(e) => setArtistBio(e.target.value)}
              placeholder="Enter artist bio"
              className="col-span-3 border rounded p-2 border-darkBlue bg-primaryColorBg resize-none"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="artistAvatar" className="text-left">
              Avatar
            </Label>
            <Input
              id="artistAvatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="col-span-3 border-darkerBlue"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre" className="text-left">
              Genre
            </Label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between border-darkBlue truncate"
                  >
                    {artistGenre.length > 0
                      ? artistGenre.join(", ")
                      : "Select genres"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="w-full flex flex-col gap-2">
                    {availableGenres.map((genre) => (
                      <div key={genre} className="flex items-center">
                        <Checkbox
                          checked={artistGenre.includes(genre)}
                          onCheckedChange={() => handleGenreChange(genre)}
                          id={`genre-${genre}`}
                        />
                        <Label htmlFor={`genre-${genre}`} className="ml-2">
                          {genre}
                        </Label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
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
              Save Artist
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddArtistSheet;
