"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddGenre from "@/components/admin/addGenre";
import { fetchApiData } from "@/app/api/appService";
import { useAppContext } from "@/app/AppProvider";

interface Genre {
  genreId: string;
  name: string;
}
interface AddArtistSheetProps {
  onSave: (artistData: {
    name: string;
    bio: string;
    avatar: string;
    genre: string[];
  }) => void;
}

const AddArtistSheet: React.FC<AddArtistSheetProps> = ({ onSave }) => {
  const [artistName, setArtistName] = React.useState("");
  const [artistBio, setArtistBio] = React.useState("");
  const [artistAvatar, setArtistAvatar] = React.useState<File | null>(null);
  const [artistGenre, setArtistGenre] = React.useState<string[]>([]);
  const [openGenre, setOpenGenre] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [reorderedGenre, setReorderedGenre] = React.useState<Genre[]>([]);
    const { accessToken } = useAppContext()
  
  // React.useEffect(() => {
  //   setGenre(genre.map((item) => ({
  //     ...item,
  //     selected: artistGenre.includes(item.genreId),
  //   })));    
  // }, [genre, artistGenre]);
  
  const fetchGenres = useCallback(async () => {
    setLoading(true);
    try {
      const genresResponse = await fetchApiData("/api/admin/allGenre", "GET", null, accessToken);

      if (genresResponse.success) {
        setReorderedGenre(genresResponse.data.genres);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, accessToken]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleAddGenre = (newGenre: Genre) => {
    setArtistGenre((prev) => [newGenre.genreId, ...prev]);
    setReorderedGenre((prev) => [newGenre, ...prev]);
  };

  const handleGenreChange = (genreId: string) => {
    setArtistGenre((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  // const handleAddGenre = async (newGenre: Genre) => {
  //   setArtistGenre((prevGenres) => [newGenre.genreId,...prevGenres]);

  //   setGenre((prev) => {
  //     const updatedGenres = [newGenre, ...prev]; 
  //     return updatedGenres;
  //   });
  //   // await fetchGenres();
  // };

  // const handleGenreChange = (genreId: string) => {
  //   setArtistGenre((prevGenres) =>
  //     prevGenres.includes(genreId)
  //       ? prevGenres.filter((id) => id !== genreId)
  //       : [...prevGenres, genreId]
  //   );

  //   const reorderedGenres = genre
  //     .filter(
  //       (item) => artistGenre.includes(item.genreId) || item.genreId === genreId
  //     )
  //     .concat(
  //       genre.filter(
  //         (item) =>
  //           !artistGenre.includes(item.genreId) && item.genreId !== genreId
  //       )
  //     );
  //   setGenre(reorderedGenres); 
  // };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        e.target.value = "";
        alert("File size should not exceed 10MB");
        return;
      }
      else{
        setArtistAvatar(file);
      }
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
    setArtistAvatar(null);
    setArtistGenre([]);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="text-textMedium font-bold p-3 bg-primaryColorPink flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkPinkHover  transition-all duration-300">
          <PlusIcon className="text-white w-5 h-5 stroke-white" />
          Add New Artist
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-primaryColorPink">Add New Artist</SheetTitle>
          <SheetDescription>Enter details to add a new artist.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 items-start">
          {/* Aritst  */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="artistName" className="text-left">Name</Label>
            <Input
              id="artistName"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Enter artist name"
              className="col-span-3 border-darkBlue"
            />
          </div>
          {/* Bio */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="artistBio" className="text-left">Bio</Label>
            <textarea
              id="artistBio"
              value={artistBio}
              onChange={(e) => setArtistBio(e.target.value)}
              placeholder="Enter artist bio"
              className="col-span-3 border rounded p-2 border-darkBlue bg-primaryColorBg resize-none"
            />
          </div>
          {/* Avatar */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="artistAvatar" className="text-left">Avatar</Label>
            <Input
              id="artistAvatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="col-span-3 border-darkBlue"
            />
          </div>
          {/* Genre */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genre" className="text-left">Genre</Label>
            <div className="col-span-3 flex gap-1">
              <Popover open={openGenre} onOpenChange={setOpenGenre}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openGenre}
                    className="w-full flex justify-between items-center border-darkBlue p-2"
                  >
                    <span className="truncate max-w-full capitalize">

                    {artistGenre.length > 0
                      ? reorderedGenre
                          .filter((g) => artistGenre.includes(g.genreId))
                          .map((g) => g.name)
                          .join(", ")
                      : "Select genre"}
                    </span>
                    <CaretSortIcon className="ml-2 h-4 w-4 flex shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 border-darkBlue">
                  <Command>
                    <CommandInput placeholder="Search genre..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No genre found.</CommandEmpty>
                      <ScrollArea className="h-40">
                        <CommandGroup className="capitalize">
                          <AddGenre onAddGenre={handleAddGenre} />
                          {reorderedGenre.map((genreItem) => (
                            <CommandItem
                              key={genreItem.genreId}
                              onSelect={() => handleGenreChange(genreItem.genreId)}
                            >
                              {genreItem.name}
                              <CheckIcon
                                className={`ml-auto h-4 w-4 ${
                                  artistGenre.includes(genreItem.genreId)
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
