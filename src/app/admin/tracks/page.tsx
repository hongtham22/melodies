"use client";
import { useEffect, useState, useCallback } from "react";
import { fetchApiData } from "@/app/api/appService";
import { useAppContext } from "@/app/AppProvider";
import ListTracksAdmin from "@/components/admin/listTracksAdmin";
import { MdDeleteOutline } from "react-icons/md";
import React from "react";
import AddTrackSheet from "@/components/admin/addTrackSheet";
import LoadingPage from "@/components/loadingPage";
import { PaginationWithLinks } from "@/components/paginationWithLinks";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast"

function Page() {
  const { toast } = useToast()
  const { loading, setLoading } = useAppContext();
  const [listTracksData, setListTracksData] = useState([]);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams?.get("page") || "1", 10);
  const [totalPage, setTotalPage] = useState(1);
  const [listArtistsData, setListArtistsData] = useState([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { accessToken } = useAppContext()

  const fetchTrackAdmin = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const responses = await Promise.all([
          fetchApiData("/api/songs", "GET", null, accessToken, { page: page }),
        ]);
        if (responses[0].success) {
          setListTracksData(responses[0].data.song);
          setTotalPage(responses[0].data.totalPage);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const fetchArtists = useCallback(async () => {
    setLoading(true);
    try {
      const artistsResponse = await fetchApiData(
        "/api/admin/allArtistName",
        "GET",
        null,
        accessToken
      );

      if (artistsResponse.success) {
        setListArtistsData(artistsResponse.data.artists);
        setTotalPage(artistsResponse.data.totalPage);
      }
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchArtists();
    fetchTrackAdmin(page);
  }, [fetchArtists, fetchTrackAdmin, page]);

  const handleAddTrack = async (trackData: {
    title: string;
    mainArtistId: string;
    subArtistIds: string[];
    audioFile: File;
    releaseDate: string;
    lyricFile: File;
  }) => {
    const { title, mainArtistId, subArtistIds, audioFile, releaseDate, lyricFile } =
      trackData;
    const data = {
      title,
      mainArtistId,
      subArtistIds: subArtistIds.map((id) => ({ artistId: id })),
      releaseDate,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("audioFile", audioFile);
    formData.append("lyricFile", lyricFile);

    try {
      const response = await fetchApiData(
        '/api/admin/create/song',
        "POST",
        formData,
        accessToken
      );

      if (response.success) {
        toast({
          title: "Success",
          description: `Track "${title}" added successfully.`,
          variant: "success",
        });
        fetchTrackAdmin(page);
      } else {
        alert("Error: " + response.error);
      }
    } catch (error) {
      console.error("Error adding track:", error);
      alert("An error occurred while sending the data.");
    }
    console.log("New track added:", trackData);
  };

  const handleDeleteTracks = async () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one track to delete.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const requestBody = JSON.stringify({ songIds: selectedItems });
  
      const response = await fetchApiData(
        "/api/admin/delete/song",
        "DELETE",
        requestBody, 
        accessToken, 
        null 
      );
  
      if (response.success) {
        fetchTrackAdmin(page);
  
        toast({
          title: "Success",
          description: "Tracks deleted successfully.",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to delete tracks.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting albums:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting tracks.",
        variant: "destructive",
      });
    } finally {
      setSelectedItems([]);
    }
  
    console.log("Deleting tracks:", { songIds: selectedItems });
  };
  
  

  if (loading) return <LoadingPage />;

  return (
    <div className="w-full my-20 m-6 p-8 ">
      <div className="p-4 flex flex-col items-start rounded-xl">
        <div className="w-full flex items-center justify-between px-3">
          <h1 className="text-h2 text-primaryColorPink">List Tracks</h1>
          <div className="flex gap-4">
            <button className="text-textMedium p-3 flex items-center gap-2 bg-transparent border border-primaryColorBlue text-primaryColorBlue rounded-md hover:text-darkBlue"
            onClick={handleDeleteTracks}>
              <MdDeleteOutline className="text-primaryColorBlue w-5 h-5 hover:text-darkBlue" />
              Delete Track
            </button>
            <AddTrackSheet onSave={handleAddTrack} artist={listArtistsData} />
          </div>
        </div>
      </div>
      <ListTracksAdmin data={listTracksData} page={page} onSelectedItemsChange={setSelectedItems} />
      <PaginationWithLinks page={page} totalPage={totalPage} />
    </div>
  );
}

export default Page;
