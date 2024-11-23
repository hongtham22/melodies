"use client";
import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { fetchApiData } from "@/app/api/appService";
import Image from "next/image";

interface Album {
  albumId: string;
  title: string;
  releaseDate: string;
  albumType: string;
  createdAt: string;
  totalSong: string;
  mainArtist: MainArtist[];
}

interface MainArtist {
  id: string;
  name: string;
  avatar: string;
  bio: string | null;
  createdAt: string;
  genres: Genre[];
}

interface Genre {
  genreId: string;
  name: string;
}

interface AlbumDetailProps {
  albumId: string;
  onClose: () => void;
}

const AlbumDetailSheet: React.FC<AlbumDetailProps> = ({ albumId, onClose }) => {
  const [albumDetail, setAlbumDetail] = useState<Album | null>(null);

  useEffect(() => {
    const fetchAlbumDetail = async () => {
      try {
        const response = await fetchApiData(`/api/album/${albumId}`, "GET", null, null);
        if (!response.success) {
          throw new Error("Failed to fetch album details.");
        }
        setAlbumDetail(response.data.album);
      } catch (error) {
        console.error("Error fetching album details:", error);
      }
    };

    if (albumId) fetchAlbumDetail();
  }, [albumId]);

  return (
    <Sheet open={!!albumId} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Album Details</SheetTitle>
          <SheetDescription>Detailed information about the album.</SheetDescription>
        </SheetHeader>
        {albumDetail ? (
          <div className="mt-4">
            <h3 className="text-xl font-bold">{albumDetail.title}</h3>
            <p className="mt-2">
              <strong>Release Date:</strong> {albumDetail.releaseDate}
            </p>
            <p className="mt-2">
              <strong>Album Type:</strong> {albumDetail.albumType}
            </p>
            <p className="mt-2">
              <strong>Total Songs:</strong> {albumDetail.totalSong}
            </p>
          
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default AlbumDetailSheet;
