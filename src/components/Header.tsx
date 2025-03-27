"use client"
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
interface HeaderProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>; // Correctly typed setter
}

export default function Header({searchTerm, setSearchTerm}:HeaderProps){
    const router=useRouter();
    return (
        <header className="flex justify-between items-center p-4 bg-gray-900 text-white">
          <div className="flex space-x-4">
          <button className="p-2 bg-amber-700 rounded cursor-pointer" onClick={() => router.push("/")}>Home</button>
          </div>
          <h1 className="mt-4 ml-50 text-3xl">Star Wars Fleet</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search Starships..."
              className="p-2 rounded bg-gray-800 text-white"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <button className="p-2 bg-blue-500 rounded cursor-pointer" onClick={() => router.push("/filter")}>Filter</button>
            <button className="p-2 bg-green-500 rounded cursor-pointer" onClick={() => router.push("/compare")}>Compare</button>
          </div>
        </header>
      );
}