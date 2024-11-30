"use client";
import { MdDeleteOutline } from "react-icons/md";
import ListArtistAdmin from "@/components/admin/listArtistAdmin";
import AddArtistSheet from "@/components/admin/addArtistSheet";
import { useEffect, useState, useCallback } from "react";
import { fetchApiData } from "@/app/api/appService";
import { useAppContext } from "@/app/AppProvider";
import { PaginationWithLinks } from "@/components/paginationWithLinks";
import { useSearchParams } from "next/navigation";
import LoadingPage from "@/components/loadingPage";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useToast } from "@/hooks/use-toast"

function Page() {
  const { loading, setLoading } = useAppContext();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams?.get("page") || "1", 10);
  const [totalPage, setTotalPage] = useState(1);
  const [listArtistsAdminData, setListArtistsAdminData] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { toast } = useToast()
  const { accessToken } = useAppContext()

 
  const fetchArtists = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const artistsResponse = await fetchApiData("/api/artist/allArtist", "GET", null, accessToken, {
        page: page,
      });

      if (artistsResponse.success) {
        setListArtistsAdminData(artistsResponse.data.artists);
        setTotalPage(artistsResponse.data.totalPage);
      }
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  // Hàm fetch Genres
  const fetchGenres = useCallback(async () => {
    setLoading(true);
    try {
      const genresResponse = await fetchApiData("/api/admin/allGenre", "GET", null, accessToken);

      if (genresResponse.success) {
        setGenreList(genresResponse.data.genres);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchArtists(page);
    fetchGenres();
  }, [fetchArtists, fetchGenres, page]);

  const handleAddArtist = async (artistData: { name: string; bio: string; avatar: File; genre: string[] }) => {
    const { name, bio, avatar, genre } = artistData;
    const data = {
      name,
      bio,
      genres: genre.map(id => ({ genreId: id })),
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("avatar", avatar);
    try {
      const response = await fetchApiData('/api/admin/create/artist', 'POST', formData, accessToken, null);
  
      if (response.success) {
        toast({
          title: "Success",
          description: `Artist "${name}" added successfully.`,
          variant: "success",
        });
        fetchArtists(page);
      } else {
        alert('Error: ' + response.error);
      }
    } catch (error) {
      console.error('Error adding artist:', error);
      alert('An error occurred while sending the data.');
    }
  };

  const handleDeleteArtist = async () => {
    if (selectedItems.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one artist to delete.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const requestBody = JSON.stringify({ artistIds: selectedItems });
  
      const response = await fetchApiData(
        "/api/admin/delete/artist",
        "PATCH",
        requestBody, 
        accessToken, 
        null 
      );
  
      if (response.success) {
        fetchArtists(page);
  
        toast({
          title: "Success",
          description: "Artist deleted successfully.",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to delete artist.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting artist:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting artist.",
        variant: "destructive",
      });
    } finally {
      setSelectedItems([]);
    }
  
    console.log("Deleting artists:", { artistIds: selectedItems });
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="w-full my-20 m-6 p-8 flex flex-col items-center justify-center">
      <div className="w-[90%] py-3 flex flex-col items-center justify-center rounded-xl">
        <div className="w-full flex items-center justify-between px-3 mb-3">
          <h1 className="text-h2 text-primaryColorPink">List Artists</h1>
          <div
            id="search-header"
            className="w-1/3 h-[35px] flex bg-transparent border border-darkBlueHover items-center px-2 rounded-full"
          >
            <MagnifyingGlassIcon className="w-[20px] h-[20px] text-primaryColorBlue font-extrabold" />
            <input
              type="text"
              placeholder="Search for Artist"
              className="ml-2 py-2 pr-2 bg-transparent border-none outline-none placeholder:text-white/70"
            />
          </div>
          <div className="flex gap-4">
            <button className="text-textMedium p-3 flex items-center gap-2 bg-transparent border border-primaryColorBlue text-primaryColorBlue rounded-md hover:text-darkBlue"
            onClick={handleDeleteArtist}>
              <MdDeleteOutline className="text-primaryColorBlue w-5 h-5 hover:text-darkBlue" />
              Delete Artist
            </button>

            <AddArtistSheet onSave={handleAddArtist} genre={genreList} fetchGenres={fetchGenres}/>
          </div>
        </div>
      </div>
      <ListArtistAdmin data={listArtistsAdminData} page={page} onSelectedItemsChange={setSelectedItems}/>
      <PaginationWithLinks page={page} totalPage={totalPage} />
    </div>
  );
}

export default Page;
