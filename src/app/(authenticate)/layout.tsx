import Image from "next/image";
import React from "react";
import bg from "@/assets/img/bg-4.jpg";
import leftimg from "@/assets/img/pp_img.png";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full bg-center flex justify-center items-center "
      style={{
        backgroundImage: `url(${bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-[60%] h-[72%] my-36 flex justify-center items-center ">
        {/* Phần ảnh bên trái */}
        <div className="w-[50%] h-full ">
          <Image
            src={leftimg}
            alt="signIn"
            width={500}
            height={0}
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
            quality={100}
            className="rounded-l-3xl"
          />
        </div>
        <div className="w-[50%] h-full p-5 bg-primaryColorBg bg-opacity-55 rounded-r-3xl flex justify-center">
          {children} 
        </div>
      </div>
    </div>
  );
}
