'use client'
import { useScrollArea } from "@/components/provider/scrollProvider";
import React from "react";

const ScrollContent = ({ children }: { children: React.ReactNode }) => {
    const { scrollAreaRef } = useScrollArea();

    return (
        <div ref={scrollAreaRef} className="overflow-auto h-screen
        [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-inherit
  hover:[&::-webkit-scrollbar-thumb]:bg-white/30
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  hover:dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 
  ">
            {children}
        </div>
    );
};

export default ScrollContent;
