"use client";
import { useEffect, useState, useCallback } from "react";
import { fetchApiData } from "@/app/api/appService";
import { useAppContext } from "@/app/AppProvider";
import { useSearchParams } from "next/navigation";
import LoadingPage from "@/components/loadingPage";
import ListReportedCmt from "@/components/admin/listReportedCmt";

function Page() {
  const { loading, setLoading } = useAppContext();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams?.get("page") || "1", 10);
  const [listReportsAdmin, setListReportsAdmin] = useState([]);
  const { accessToken } = useAppContext()

  const fetchReports = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const reportRespond = await fetchApiData("/api/admin/allReport", "GET", null, accessToken, {
        page: page,
      });

      if (reportRespond.success) {
        setListReportsAdmin(reportRespond.data.reports);
        // setTotalPage(reportRespond.data.totalPage);
      }
    } catch (error) {
      console.error("Error fetching artists:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, accessToken]);

  useEffect(() => {
    fetchReports(page);
  }, [fetchReports, page]);

  if (loading) return <LoadingPage />;

  return (
    <div className="w-full mt-20 m-6 p-8 flex flex-col items-center justify-center">
      <ListReportedCmt data={listReportsAdmin}/>
      
    </div>
  )
}

export default Page