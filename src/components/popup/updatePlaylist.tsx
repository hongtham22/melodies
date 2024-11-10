'use client'
import Image from "next/image";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuPen } from "react-icons/lu";


interface UpdatePlaylistProps {
    onClose: () => void
}
const UpdatePlaylist: React.FC<UpdatePlaylistProps> = ({ onClose }) => {
    const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };
    const [updateName, setUpdateName] = useState('')
    const [updateBio, setUpdateBio] = useState('')
    const songImage = "https://i.scdn.co/image/ab67616d00001e025a6bc1ecf16bbac5734f23da";
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 shadow-md"
            onClick={handleBackgroundClick}
        >
            <div className="bg-[#222222] w-[35%] rounded-lg p-5 border border-primaryColorBlue">
                <div className="flex justify-between items-center w-full mb-5">
                    <h1 className="font-semibold text-[1.3rem]">Edit details</h1>
                    <IoMdClose className="w-[1.5rem] h-[1.5rem] cursor-pointer"
                        onClick={onClose}
                    />
                </div>
                <div className="flex gap-3">
                    <div className="relative w-[180px] h-[180px]">
                        <Image
                            src={selectedImage || songImage}
                            alt="Album Cover"
                            width={180}
                            height={180}
                            priority
                            className="rounded-md object-contain w-full h-full"
                        />
                        <div
                            className='absolute bg-black/60 top-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100'
                            onClick={() => document.getElementById("fileInput")?.click()}
                        >
                            <div className='flex flex-col items-center cursor-pointer gap-1'>
                                <LuPen className='w-[2.8rem] h-[2.8rem]' />
                                <p className='text-[0.95rem] tracking-wide'>Select Photo</p>
                            </div>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="flex flex-col flex-1 justify-between">
                        <div className="relative h-[20%] bg-[#333333] rounded-md px-3 py-1 border border-transparent focus-within:border-gray-400 ">
                            <input
                                className="peer w-full h-full bg-transparent text-white text-sm rounded-md transition duration-300 ease focus:outline-none"
                                onChange={(e) => setUpdateName(e.target.value)}
                                value={updateName}
                                placeholder=" "
                                maxLength={100}
                            />
                            <label className={`absolute cursor-text bg-transparent px-1 left-[0.55rem] text-gray-400 text-sm transition-all transform origin-left 
                                        ${updateName ? "-top-2 left-2 text-xs scale-90 bg-gradient-to-b from-[#222222] to-[#333333]" : "top-[0.55rem] left-3 scale-100"}`}>
                                Name
                            </label>
                        </div>

                        <div className="relative h-[70%] bg-[#333333] rounded-md p-3 border border-transparent focus-within:border-gray-400 ">
                            <textarea
                                className="peer w-full h-full bg-transparent text-white text-sm rounded-md transition duration-300 ease focus:outline-none resize-none"
                                onChange={(e) => setUpdateBio(e.target.value)}
                                value={updateBio}
                                placeholder=" "
                                maxLength={120}
                            />
                            <label className={`absolute cursor-text bg-transparent px-1 left-[0.55rem] text-gray-400 text-sm transition-all transform origin-left 
                                        ${updateBio ? "-top-2 left-2 text-xs scale-90 bg-gradient-to-b from-[#222222] to-[#333333]" : "top-3.5 left-3 scale-100"}`}>
                                Description content
                            </label>
                        </div>

                    </div>
                </div>
                <div className="w-full flex justify-end mt-3">
                    <button className='bg-white font-semibold px-6 py-1 text-black rounded-lg'>Save</button>
                </div>
                <p className="text-wrap text-[0.8rem] mt-3 text-justify font-bold">By continuing, you agree to allow Melodies to access the images you have selected to upload. Please make sure you have permission to upload the images.</p>

            </div>
        </div>
    )
}

export default UpdatePlaylist