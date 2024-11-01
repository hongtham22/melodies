import ListUser from "@/components/listUser";
import { BiUser } from "react-icons/bi";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { TbUserCheck } from "react-icons/tb";
function Page() {
  return (
    <div className="w-full my-20 m-6 p-8 flex flex-col items-center justify-center ">
      <div className="w-full flex justify-around items-center px-4">
        <div className="w-1/5 flex justify-center items-center gap-4 px-4 py-1 bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md">
          <div className="w-18 h-18 bg-primaryColorBg rounded-full flex items-center justify-center">
            <BiUser className="w-10 h-10 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig">Total Users</p>
            <p className="text-h2 text-primaryColorBlue">352</p>
          </div>
        </div>
        <div className="w-1/5 flex justify-center items-center gap-4 px-4 py-1 bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md">
          <div className="w-18 h-18 bg-primaryColorBg rounded-full flex items-center justify-center">
            <MdOutlineWorkspacePremium className="w-10 h-10 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig">Premium Users</p>
            <p className="text-h2 text-primaryColorBlue">352</p>
          </div>
        </div>
        <div className="w-1/5 flex justify-center items-center gap-3 px-4 py-1 bg-secondColorBg shadow-sm shadow-primaryColorBlue rounded-md">
          <div className="w-18 h-18 bg-primaryColorBg rounded-full flex items-center justify-center">
            <TbUserCheck className="w-10 h-10 text-primaryColorPink" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-textBig">Regular Users</p>
            <p className="text-h2 text-primaryColorBlue">352</p>
          </div>
        </div>
      </div>
      <ListUser />
    </div>
  );
}

export default Page;
