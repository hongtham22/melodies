import React, { useEffect, useState } from "react";
import Image from "next/image";
import songimg from "@/assets/img/songs.png";
import { Divide } from "lucide-react";
import { User } from "@/types/interfaces";

function ListUser({ listUser }: { listUser: User[] }) {
  const [users, setUsers] = useState<User[]>(listUser);
  useEffect(() => {
    setUsers(listUser);
    console.log("thay đổi list users");
  }, [listUser]);
  return (
    <div className="w-1/4 h-screen flex flex-col gap-6 relative bg-secondColorBg rounded-lg">
      {users.length > 0 ? (
        <div className="w-full flex flex-col gap-4 p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-darkBlue scrollbar-track-black">
          {/* {Array.from({ length: 10 }, (_, index) => ( */}
          {users.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Image
                src={songimg}
                alt="song"
                width={36}
                height={36}
                className="rounded-full"
              />
              <h4 className="text-textMedium mb-1 hover:underline line-clamp-1">
                {/* {users[0].name} */}
                {item.username}
              </h4>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No user</p>
        </div>
      )}
    </div>
  );
}

export default ListUser;
