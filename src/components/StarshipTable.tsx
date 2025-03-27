"use client"; 
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { fetchStarships } from "@/app/library/fetchShips";

interface Starship {
    name: string;
    model: string;
    manufacturer: string;
    crew: string;
    passengers: string;
  }
  
export default function StarshipTable({ searchTerm }: { searchTerm: string }) {
    const { data: starships, isLoading, error } = useQuery({
        queryKey: ["starships"],
        queryFn: fetchStarships,
      });

       // Filter starships based on search term
       const filteredStarships = useMemo(() => {
        return starships?.filter((ship:Starship) =>
          ship.name?.toLowerCase().includes(searchTerm?.toLowerCase() || "")
        ) || [];
      }, [starships, searchTerm]);
      const columns = [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "model", header: "Model" },
        { accessorKey: "manufacturer", header: "Manufacturer" },
        { accessorKey: "crew", header: "Crew" },
        { accessorKey: "passengers", header: "Passengers" },
      ];
      const table = useReactTable({
        data: filteredStarships || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
      });
      if (isLoading) return <p className="text-center">Loading starships...</p>;
  if (error) return <p className="text-center text-red-500">Error loading ships!</p>;

    return(
        <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Starships</h2>
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