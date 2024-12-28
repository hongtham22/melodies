"use client";
import ListPayments from "@/components/admin/listPayment";
import React, { useEffect, useState } from "react";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { SlBadge } from "react-icons/sl";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { useAppContext } from "@/app/AppProvider";
import { Payment } from "@/types/interfaces";
import { fetchApiData } from "@/app/api/appService";
import { useSearchParams } from "next/navigation";
import LoadingPage from "@/components/loadingPage";
import { PaginationWithLinks } from "@/components/paginationWithLinks";

function Page() {
    const { loading, setLoading } = useAppContext();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams?.get("page") || "1", 10);
  const [totalPage, setTotalPage] = useState(1);
  const { accessToken } = useAppContext()
    const [listPaymentData, setListPaymentData] = useState<Payment[]>([]);
 useEffect(() => {
    const fetchPaymentAdmin = async () => {
      setLoading(true);
      try {
        const responses = await Promise.all([
          fetchApiData("/api/admin/allPayment", "GET", null, accessToken, { page: page }),
        ]);
        if (responses[0].success) {
          setListPaymentData(responses[0].data.payments);
          setTotalPage(responses[0].data.totalPage);
          console.log("List payment:", responses[0].data.payments);
        }
        
      } catch (error) {
        console.error("Error fetching payment:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentAdmin();
  }, [setLoading, page, accessToken]);

  if (loading) return <LoadingPage />;


  return (
    <div className="w-full mt-20 m-6 p-8 flex flex-col items-center justify-center">
      
      <div className="w-full flex justify-around items-center px-4 mb-3">
        <div className="flex justify-center items-center gap-4 px-4 py-2 bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md">
          <div className="w-18 h-18 bg-primaryColorBg rounded-full flex items-center justify-center">
            <MdOutlineWorkspacePremium className="w-10 h-10 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig font-semibold">A month package</p>
            <p className="text-h2 text-primaryColorBlue">
              256
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-4 px-4 py-2 bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md">
          <div className="w-18 h-18 bg-primaryColorBg rounded-full flex items-center justify-center">
            <SlBadge className="w-10 h-10 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig font-semibold">A week package</p>
            <p className="text-h2 text-primaryColorBlue">
              200
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-3 px-4 py-2 bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md">
          <div className="w-18 h-18 bg-primaryColorBg rounded-full flex items-center justify-center">
            <BiSolidBadgeDollar className="w-10 h-10 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig font-semibold">Pending payment</p>
            <p className="text-h2 text-primaryColorBlue">
              10
            </p>
          </div>
        </div>
      </div>
      
      <div className=" w-[90%] p-4 flex flex-col items-start rounded-xl gap-4">
        <div className="w-full flex items-center justify-between px-3 mb-3">
          <h1 className="text-h2 text-primaryColorPink font-semibold">List payment of users</h1>
        </div>
        <ListPayments data={listPaymentData} page={page}/>
        <PaginationWithLinks page={page} totalPage={totalPage} />
      </div>
    </div>
  );
}

export default Page;
