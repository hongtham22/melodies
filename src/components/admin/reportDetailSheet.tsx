"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { fetchApiData } from "@/app/api/appService";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/app/AppProvider";
import userImg from "@/assets/img/placeholderUser.jpg";
import { Report } from "@/types/interfaces";

const ReportDetailSheet: React.FC<
  Report & { onClose: () => void; onUpdateReport: (id: string) => void }
> = ({ reportId, onClose, onUpdateReport }) => {
  const [reportDetail, setReportDetail] = useState<Report | null>(null);

  const { toast } = useToast();
  const { accessToken } = useAppContext();

  useEffect(() => {
    const fetchReportDetail = async () => {
      try {
        const response = await fetchApiData(
          `/api/admin/report/${reportId}`,
          "GET",
          null,
          accessToken
        );
        if (!response.success) {
          throw new Error("Failed to fetch artist details.");
        }
        setReportDetail(response.data.report);
      } catch (error) {
        console.error("Error fetching artist details:", error);
      } finally {
      }
    };

    if (reportId) fetchReportDetail();
  }, [reportId, accessToken]);

  const reportContents = [
    "Toxic",
    "Severe Toxic",
    "Obscene",
    "Threat",
    "Insult",
    "Identity Hate",
  ];
  const [checkboxStates, reportText] = (() => {
    const parts = reportDetail?.content?.split(",");
    const checkboxes = parts?.slice(0, 6).map((value) => value === "1") || [];
    const text = parts?.slice(6).join(",") || "";
    return [checkboxes, text];
  })();

  const handleDeleteComment = async () => {
    const response = await fetchApiData(
      `/api/admin/report/${reportId}`,
      "PATCH",
      null,
      accessToken
    );

    if (response.success) {
      toast({
        title: "Success",
        description: "Comment deleted successfully!",
        variant: "success",
      });
      onUpdateReport(reportId);
      onClose();
    } else {
      toast({
        title: "Error",
        description: response.error || "Comment deleted successfully!",
        variant: "destructive",
      });
    }
  };

  const handleNotDeleteComment = async () => {
    const response = await fetchApiData(
      `/api/admin/report/${reportId}/reject`,
      "PATCH",
      null,
      accessToken
    );
    if (response.success) {
      toast({
        title: "Success",
        description: "Comment marked as resolved!",
        variant: "success",
      });
      onUpdateReport(reportId);
      onClose();
    } else {
      console.error("Error resolving comment:", response.error);
      toast({
        title: "Error",
        description: response.error || "Comment marked as resolved!",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={!!reportId} onOpenChange={onClose}>
      <SheetContent className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-darkBlue scrollbar-track-black  text-gray-100">
        <div className="p-2 rounded-lg shadow-md">
          <SheetHeader className="border-b border-gray-700 pb-4">
            <SheetTitle className="text-2xl font-bold text-blue-400">
              Reported Comment Details
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-300">
              Comprehensive details about the reported comment.
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-6">
            {/* User Info Section */}
            <div className="flex items-center justify-center">
              <Image
                src={reportDetail?.user?.image || userImg}
                alt="Artist Image"
                width={120}
                height={120}
                className="rounded-full w-30 h-30 object-cover border-2 border-blue-500 shadow-lg"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              <Label className="font-semibold text-gray-300 leading-relaxed">
                Report User:{" "}
                <span className="font-normal text-gray-400 leading-relaxed">
                  {reportDetail?.user?.username || "Unknown"}
                </span>
              </Label>
              <Label className="font-semibold text-gray-200 leading-relaxed">
                Reported User:{" "}
                <span className="font-normal text-gray-300 leading-relaxed">
                  {reportDetail?.comment?.user?.username || "Unknown"}
                </span>
              </Label>
              <Label className="font-semibold text-gray-200 leading-relaxed">
                Song Title:{" "}
                <span className="font-normal text-gray-300 leading-relaxed">
                  {reportDetail?.comment?.song?.title || "Unknown song"}
                </span>
              </Label>
              <Label className="font-semibold text-gray-200 leading-relaxed">
                Previous Comment:{" "}
                <span className="italic text-gray-300 leading-relaxed">
                  {reportDetail?.comment?.parentComment?.content ||
                    "No content"}
                </span>
              </Label>
            </div>

            {/* Reported Content Section */}
            <div className="p-4 bg-gray-700 rounded-lg border border-gray-600 shadow-sm">
              <Label className="font-semibold text-blue-400">
                Reported Comment:
              </Label>
              <p className="mt-2 text-gray-300 leading-relaxed">
                {reportDetail?.comment?.content ||
                  "No content" ||
                  "No content available"}
              </p>
            </div>

            {/* Report Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportContents.map((content, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-md border border-gray-700 bg-gray-800 shadow-sm"
                >
                  <input
                    type="checkbox"
                    checked={checkboxStates[index]}
                    id={`contentCheck${index}`}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <label
                    htmlFor={`contentCheck${index}`}
                    className="text-gray-200"
                  >
                    {content}
                  </label>
                </div>
              ))}
            </div>

            {/* Report Text */}
            <div>
              <textarea
                className="w-full h-24 p-4 border border-gray-700 rounded-lg text-gray-200 bg-gray-800 focus:ring-2 focus:ring-blue-500 leading-relaxed"
                placeholder="Report content details..."
                value={reportText}
                readOnly
              />
            </div>
          </div>
        </div>
        <SheetFooter>
        {reportDetail?.status === "PENDING" && (

          <SheetClose asChild>
            <div className="w-full p-2 flex justify-between">
              <Button
                type="submit"
                onClick={handleNotDeleteComment}
                className="text-textMedium p-3 bg-primaryColorBlueHover flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkBlueHover"
              >
                Not Delete Comment
              </Button>
              <Button
                type="submit"
                onClick={handleDeleteComment}
                className="text-textMedium p-3 bg-red-800 flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-red-900"
              >
                Delete comment
              </Button>
            </div>
          </SheetClose>
        )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ReportDetailSheet;
