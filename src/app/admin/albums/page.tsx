"use client";
import AddAlbumSheet from "@/components/admin/addAlbumSheet";
import ListAlbumsAdmin from "@/components/admin/listAlbumsAdmin";
import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { fetchApiData } from "@/app/api/appService";
import { useAppContext } from "@/app/AppProvider";
import { PaginationWithLinks } from "@/components/paginationWithLinks";
import { useSearchParams } from "next/navigation";
import LoadingPage from "@/components/loadingPage";

function Page() {
  const handleAddAlbum = (trackData: {
    title: string;
    main_artist: string;
    sub_artist: string[];
    audio: string;
  }) => {
    console.log("New track added:", trackData);
  };
  const { loading, setLoading } = useAppContext();
  const [listAlbumsAdminData, setListAlbumsAdminData] = useState([]);
  const searchParams = useSearchParams();
  const page = parseInt(searchParams?.get("page") || "1", 10);
  const [totalPage, setTotalPage] = useState(1);
  useEffect(() => {
    const fetchAlbumsAdmin = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all([
          fetchApiData("/api/admin/allAlbum", "GET", null, null, {
            page: page,
          }),
        ]);
        if (responses[0].success) {
          setListAlbumsAdminData(responses[0].data.data);
          setTotalPage(responses[0].data.totalPage);

          console.log("List albums:", responses[0].data.data);
        }
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbumsAdmin();
  }, [setLoading, page]);
  if (loading) return <LoadingPage />;

  return (
    <div className="w-full my-20 m-6 p-8 ">
      <div className="p-4 flex flex-col items-start rounded-xl">
        <div className="w-full flex items-center justify-between px-3">
          <h1 className="text-h2 text-primaryColorPink">List Albums</h1>
          <div className="flex gap-4">
            <button className="text-textMedium p-3 flex items-center gap-2 bg-transparent border border-primaryColorBlue text-primaryColorBlue rounded-md hover:text-darkBlue">
              <MdDeleteOutline className="text-primaryColorBlue w-5 h-5 hover:text-darkBlue" />
              Delete Albums
            </button>

            <AddAlbumSheet onSave={handleAddAlbum} />
          </div>
        </div>
      </div>
      <ListAlbumsAdmin data={listAlbumsAdminData} page={page} />
      <PaginationWithLinks page={page} totalPage={totalPage} />
    </div>
  );
}

export default Page;
