"use client";
import React, { useEffect, useState } from "react";
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
import Image from "next/image";
import { fetchApiData } from "@/app/api/appService";

interface Genre {
    genreId: string;
    name: string;
  }
  
  interface ArtistDetail {
    id: string;
    name: string;
    avatar: string;
    bio: string | null;
    createdAt: string;
    genres: Genre[];
  }
  
  interface ArtistDetailProps {
    artistId: string;
    onClose: () => void;
  }

const ArtistDetailSheet: React.FC<ArtistDetailProps & { onClose: () => void }> = ({ artistId, onClose }) => {
    const [artistDetail, setArtistDetail] = useState<ArtistDetail | null>(null);
  
    useEffect(() => {
      const fetchArtistDetail = async () => {
       
        try {
          const response = await fetchApiData(`/api/artist/${artistId}`, "GET", null, null,);
          if (!response.success) {
            throw new Error("Failed to fetch artist details.");
          }
          setArtistDetail(response.data.artist);
        } catch (error) {
          console.error("Error fetching artist details:", error);
        } finally {
          
        }
      };
  
      if (artistId) fetchArtistDetail();
    }, [artistId]);
  
    return (
      <Sheet open={!!artistId} onOpenChange={onClose}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Artist Details</SheetTitle>
            <SheetDescription>Detailed information about the artist.</SheetDescription>
          </SheetHeader>
          {artistDetail ? (
            <div className="mt-4">
              <h3 className="text-xl font-bold">{artistDetail.name}</h3>
              <Image
                src={artistDetail.avatar}
                alt={artistDetail.name}
                width={160}
                height={160}
                className="rounded-md w-40 h-40 mt-4"
              />
              <p className="mt-2">{artistDetail.bio}</p>
              <p className="mt-2">
                <strong>Tracks:</strong> {artistDetail.totalSong}
              </p>
              <p className="mt-2">
                <strong>Albums:</strong> {artistDetail.totalAlbum}
              </p>
              <p className="mt-2">
                <strong>Followers:</strong> {artistDetail.totalFollow}
              </p>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </SheetContent>
      </Sheet>
    );
  };

export default ArtistDetailSheet;