"use client";
import React, { useCallback, useEffect, useState } from "react";
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
import Image from "next/image";
import {
  PlusIcon,
  CaretSortIcon,
  CheckIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
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

import { Button } from "@/components/ui/button";
import { fetchApiData } from "@/app/api/appService";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useAppContext } from "@/app/AppProvider";
import userImg from "@/assets/img/placeholderUser.jpg";
import { Report } from "@/types/interfaces";
interface ReportDetailSheetProps extends Report {
  reportId: string;
  onClose: () => void;
}
const ReportDetailSheet: React.FC<ReportDetailSheetProps> = ({ reportId, onClose }) => {
  return (
    <Sheet open={!!reportId} onOpenChange={onClose}>
      <SheetContent className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-darkBlue scrollbar-track-black">
        <SheetHeader>
          <SheetTitle>Reported Comment Details</SheetTitle>
          <SheetDescription>
            Detailed information about the reported comment.
          </SheetDescription>
        </SheetHeader>
          <div className="mt-4 grid gap-4 py-4">
            <div className="grid justify-center items-center gap-4">
              <Image
                src={userImg}
                alt="Artist Image"
                width={100}
                height={100}
                className="rounded-md w-28 h-28"
              />
            </div>
            {/* Title */}
            <Label>Username</Label>
            <Label>Song Title</Label>
            <Label>Previous comment</Label>
            <Label>Reported comment</Label>
            <Label>Reported content</Label>
          </div>
        <SheetFooter>
          {/* <SheetClose asChild>
          </SheetClose> */}
          <div className="w-full flex justify-between">
            <Button
              type="submit"
            //   onClick={handleUpdateClick}
              className="text-textMedium p-3 bg-primaryColorBlueHover flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-darkBlueHover"
            >
              Not Delete Comment
            </Button>
            <Button
              type="submit"
            //   onClick={handleUpdateClick}
              className="text-textMedium p-3 bg-red-800 flex items-center gap-2 rounded-md shadow-sm shadow-white/60 hover:bg-red-900"
            >
              Delete comment
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default ReportDetailSheet