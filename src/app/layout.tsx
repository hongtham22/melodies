import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/app/layout/sidebar/Sidebar";
import Footer from "@/app/layout/footer/Footer";
import Header from "@/app/layout/header/Header";
import MusicPlayer from "@/components/musicPlayer";
import { SongProvider } from "@/components/provider/songProvider";
import SongIntroduce from "@/components/songIntroduce";

import { Toast } from "@radix-ui/react-toast";
import { ToastProvider } from "@/components/ui/toast";
import { ScrollProvider } from "@/components/provider/scrollProvider";
import ScrollContent from "@/components/scrollContent";
import WaitingList from "@/components/waitingList";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-primaryColorBg flex overflow-hidden text-white`}
      >
        <ScrollProvider>
          <SongProvider>
            <Sidebar />
            <ScrollContent>
              <div className="ml-[16.66vw]">
                <main className="flex flex-col items-center">
                  <Header />
                  {children}
                  <ToastProvider/>
                  <Footer />
                </main>
              </div>
            </ScrollContent>
            <SongIntroduce />
            <WaitingList />
            <MusicPlayer />
          </SongProvider>
        </ScrollProvider>
      </body>
    </html >
  );
}
