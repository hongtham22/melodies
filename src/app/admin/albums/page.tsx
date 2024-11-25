"use client";
import AddAlbumSheet from "@/components/admin/addAlbumSheet";
import ListAlbumsAdmin from "@/components/admin/listAlbumsAdmin";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState, useCallback } from "react";
import { fetchApiData } from "@/app/api/appService";
import { useAppContext } from "@/app/AppProvider";
import { PaginationWithLinks } from "@/components/paginationWithLinks";
import { useSearchParams } from "next/navigation";
import LoadingPage from "@/components/loadingPage";
import { useToast } from "@/hooks/use-toast"


function Page() {
  const { loading, setLoading } = useAppContext();
  const [listAlbumsAdminData, setListAlbumsAdminData] = useState([]);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams?.get("page") || "1", 10);
  const [totalPage, setTotalPage] = useState(1);
  const [listArtistsData, setListArtistsData] = useState([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast()

  const fetchAlbumsAdmin = useCallback(
    async (currentPage: number) => {
      setLoading(true);
      try {
        const responses = await Promise.all([
          fetchApiData("/api/admin/allAlbum", "GET", null, null, {
            page: currentPage,
          }),
          fetchApiData("/api/admin/allArtistName", "GET", null, null),
        ]);
        if (responses[0].success) {
          setListAlbumsAdminData(responses[0].data.data);
          setTotalPage(responses[0].data.totalPage);
        }
        if (responses[1].success) {
          setListArtistsData(responses[1].data.artists);
        }
      } catch (error) {
        console.error("Error fetching albums:", error);
      } finally {
        setLoading(false);
      }
    }, [setLoading]
  );
  
  useEffect(() => {
    fetchAlbumsAdmin(page);
  }, [fetchAlbumsAdmin, page]); 

  const handleAddAlbum = async (albumData: {
    title: string;
    mainArtistId: string;
    type: string;
    songIds: string[];
    albumCover: File;
    releaseDate: string;
  }) => {
    const { title, mainArtistId, type, songIds, albumCover, releaseDate } =
      albumData;
    const data = {
      title,
      mainArtistId,
      type,
      songIds: songIds.map((id) => ({ songId: id })),
      releaseDate,
    };
    console.log("New track added:", albumData);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("albumCover", albumCover);

    try {
      const response = await fetchApiData(
        "/api/admin/create/album",
        "POST",
        formData
      );

      if (response.success) {
        toast({
          title: "Success",
          description: `Album "${title}" added successfully.`,
          variant: "success",
        });
        fetchAlbumsAdmin(page);
      } else {
        alert("Error: " + response.error);
      }
    } catch (error) {
      console.error("Error adding album:", error);
      alert("An error occurred while sending the data.");
    }
  };

  const handleDeleteAlbums = async () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one album to delete.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const requestBody = JSON.stringify({ albumIds: selectedItems });
  
      const response = await fetchApiData(
        "/api/admin/delete/album",
        "DELETE",
        requestBody, 
        null, 
        null 
      );
  
      if (response.success) {
        fetchAlbumsAdmin(page);
  
        toast({
          title: "Success",
          description: "Albums deleted successfully.",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to delete albums.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting albums:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting albums.",
        variant: "destructive",
      });
    } finally {
      setSelectedItems([]);
    }
  
    console.log("Deleting albums:", { albumIds: selectedItems });
  };
  
  

  if (loading) return <LoadingPage />;

  return (
    <div className="w-full my-20 m-6 p-8 ">
      <div className="p-4 flex flex-col items-start rounded-xl">
        <div className="w-full flex items-center justify-between px-3">
          <h1 className="text-h2 text-primaryColorPink">List Albums</h1>
          <div className="flex gap-4">
            <button className="text-textMedium p-3 flex items-center gap-2 bg-transparent border border-primaryColorBlue text-primaryColorBlue rounded-md hover:text-darkBlue"
            onClick={handleDeleteAlbums}>
              <MdDeleteOutline className="text-primaryColorBlue w-5 h-5 hover:text-darkBlue" />
              Delete Albums
            </button>

            <AddAlbumSheet onSave={handleAddAlbum} artist={listArtistsData} />
          </div>
        </div>
      </div>
      <ListAlbumsAdmin data={listAlbumsAdminData} page={page} onSelectedItemsChange={setSelectedItems} />
      <PaginationWithLinks page={page} totalPage={totalPage} />
    </div>
  );
}

export default Page;
