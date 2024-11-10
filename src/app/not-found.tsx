import React from "react";
import notfoundimg from "@/assets/img/bgnotfound.png";
import { ResetIcon } from "@radix-ui/react-icons";
import Link from "next/link";
function NotFound() {
  return (
    <div
      className="bg-cover bg-center flex flex-col items-center justify-center h-screen w-screen text-white gap-2"
      style={{
        backgroundImage: `url(${notfoundimg.src})`,
      }}
    >
      <h1 className="text-[100px] font-extrabold">Oops!</h1>
      <h3 className="text-h3">You are lost</h3>
      <h3 className="text-primaryColorPink text-[50px] font-bold ">404</h3>
      <p>Sorry, we were unable to find that page</p>
      <Link
        href="/"
        className="mt-1 p-2 bg-primaryColorPink flex items-center gap-2 rounded-md"
      >
        <ResetIcon className="text-white w-5 h-5" />
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
