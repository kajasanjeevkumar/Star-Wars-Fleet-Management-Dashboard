"use client"
import { useState } from "react";
import Header from "@/components/Header";
import StarshipTable from "@/components/StarshipTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();
export default function Home() {
  const [searchTerm,setSearchTerm]=useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-gray-900 min-h-screen text-white">
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        <StarshipTable searchTerm={searchTerm}/>
      </div>
    </QueryClientProvider>
  );
}