'use client'
import React from "react";
import MusicPlayer from "@/components/musicPlayer";
import ScrollContent from "@/components/scrollContent";
import SongIntroduce from "@/components/songIntroduce";
import WaitingList from "@/components/waitingList";
import { ToastProvider } from "@/components/ui/toast";
import Footer from "@/app/layout/footer/Footer";
import ScrollButton from "@/app/layout/scrollButton/ScrollButton";
import SidebarAdmin from "@/app/layout/sidebar/SidebarAdmin";
import { useAppContext } from "@/app/AppProvider";
import HeaderAdmin from "@/app/layout/header/HeaderAdmin";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { role } = useAppContext();
  return (
    <div className="">
      {/* {
        role && role === 'Admin' ? (
          <div>
            <SidebarAdmin />
            <ScrollContent>
              <div className="ml-[16.66vw]">
                <main className="flex flex-col items-center">
                  <HeaderAdmin />
                  {children}
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
        ) : (
          <p>404 </p>
        )
      } */}
       <div>
            <SidebarAdmin />
            <ScrollContent>
              <div className="ml-[16.66vw]">
                <main className="flex flex-col items-center">
                  <HeaderAdmin />
                  {children}
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
    </div>
  );
};

export default AdminLayout;
