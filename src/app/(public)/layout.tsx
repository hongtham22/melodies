'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Sidebar from "@/app/layout/sidebar/Sidebar";
import MusicPlayer from "@/components/musicPlayer";
import ScrollContent from "@/components/scrollContent";
import SongIntroduce from "@/components/songIntroduce";
import WaitingList from "@/components/waitingList";
import { ToastProvider } from "@/components/ui/toast";
import Header from "@/app/layout/header/Header";
import Footer from "@/app/layout/footer/Footer";
import ScrollButton from "@/app/layout/scrollButton/ScrollButton";
import LyricPage from "@/components/lyricPage"
import { useAppContext } from "@/app/AppProvider";

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { search } = useAppContext()
  const router = useRouter();
  const [previousPage, setPreviousPage] = useState<string | null>(null);

  useEffect(() => {
    if (search !== '') {
      if (!previousPage) {
        setPreviousPage(window.location.pathname);
      }
      router.push(`/search/${search}`);
    } else if (previousPage) {
      router.push(previousPage);
      setPreviousPage(null);
    }
  }, [search, router, previousPage]);
  return (
    <div className="flex">
      <Sidebar />
      <ScrollContent>
        <div className="ml-[16.66vw]">
          <main className="flex flex-col items-center relative">
            <Header />
            {children}
            <LyricPage />
            <ToastProvider />
            <Footer />
          </main>
        </div>
      </ScrollContent>
      <SongIntroduce />
      <WaitingList />
      <MusicPlayer />
      <ScrollButton />
    </div>
  );
};

export default PublicLayout;
