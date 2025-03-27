"use client";
import { useState, useMemo } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { fetchStarships } from "@/app/library/fetchShips";
import Link from "next/link";

// Define Starship type
interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  crew: string;
  hyperdrive_rating: string;
}




const FilterPageContent = () => {
    const { data: starships, isLoading, error } = useQuery({
      queryKey: ["starships"],
      queryFn: fetchStarships,
    });
  

  // State for filters
  const [selectedHyperdrive, setSelectedHyperdrive] = useState<string>("");
  const [selectedCrew, setSelectedCrew] = useState<string>("");

  // Filter starships based on selected criteria
  // **UseMemo to prevent unnecessary re-filtering**
  const filteredStarships = useMemo(() => {
    if (!starships) return [];

    return starships.filter((ship:Starship) => {
      const hyperdrive = parseFloat(ship.hyperdrive_rating);
      const crew = parseInt(ship.crew.replace(/[^0-9]/g, "")) || 0;

      const matchesHyperdrive =
        !selectedHyperdrive ||
        (selectedHyperdrive === "<1.0" && hyperdrive < 1.0) ||
        (selectedHyperdrive === "1.0-2.0" && hyperdrive >= 1.0 && hyperdrive <= 2.0) ||
        (selectedHyperdrive === ">2.0" && hyperdrive > 2.0);

      const matchesCrew =
        !selectedCrew ||
        (selectedCrew === "1-5" && crew >= 1 && crew <= 5) ||
        (selectedCrew === "6-50" && crew >= 6 && crew <= 50) ||
        (selectedCrew === "50+" && crew > 50);

      return matchesHyperdrive && matchesCrew;
    });
  }, [starships, selectedHyperdrive, selectedCrew]); // **Recalculate only when filters change**

  // Table columns
  const columns = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "manufacturer", header: "Manufacturer" },
    { accessorKey: "crew", header: "Crew" },
    { accessorKey: "hyperdrive_rating", header: "Hyperdrive Rating" },
  ];

  const table = useReactTable({
    data: filteredStarships || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p className="text-center">Loading starships...</p>;
  if (error) return <p className="text-center text-red-500">Error loading ships!</p>;

  return (
    <div className="bg-gray-900 min-h-screen text-white p-4">
      {/* Back Button */}
      <div className="mb-4 cursor-pointer">
        <Link href="/">
          <button className="p-2 bg-gray-700 rounded">Back to Home</button>
        </Link>
      </div>

      <h1 className="text-2xl text-center mb-4">Filter Starships</h1>

      {/* Filter Options */}
      <div className="flex space-x-4 mb-4">
        {/* Hyperdrive Rating Filter */}
        <select
          className="p-2 bg-gray-800 rounded text-white"
          value={selectedHyperdrive}
          onChange={(e) => setSelectedHyperdrive(e.target.value)}
        >
          <option value="">Select Hyperdrive Rating</option>
          <option value="<1.0">{"<1.0"}</option>
          <option value="1.0-2.0">1.0 - 2.0</option>
          <option value=">2.0">{">2.0"}</option>
        </select>

        {/* Crew Size Filter */}
        <select
          className="p-2 bg-gray-800 rounded text-white"
          value={selectedCrew}
          onChange={(e) => setSelectedCrew(e.target.value)}
        >
          <option value="">Select Crew Size</option>
          <option value="1-5">1 - 5</option>
          <option value="6-50">6 - 50</option>
          <option value="50+">50+</option>
        </select>
      </div>

      {/* Display Filtered Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-700">
          <thead className="bg-gray-800 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 border border-gray-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="odd:bg-gray-700 even:bg-gray-800">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border border-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
// Wrap the component with QueryClientProvider
const queryClient = new QueryClient();
export default function FilterPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterPageContent />
    </QueryClientProvider>
  );
}