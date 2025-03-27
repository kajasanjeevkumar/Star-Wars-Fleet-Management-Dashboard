"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchAllStarshipNames } from "../library/fetchAllStarShipNames";
import { fetchStarshipByName } from "@/app/library/fetchStarShipsByName";
import { selectedStarshipsAtom } from "@/app/store/starshipsAtom";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import Link from "next/link";
import { useAtom } from "jotai";

interface Starship {
  name: string;
  model: string;
  manufacturer: string;
  crew: string;
  hyperdrive_rating: string;
}

export default function ComparePage() {
  const [shipNames, setShipNames] = useAtom(selectedStarshipsAtom);

  // Fetch available starship names for dropdown
  const { data: starshipNames = [] } = useQuery({
    queryKey: ["starshipNames"],
    queryFn: fetchAllStarshipNames,
  });

  // Fetch data for selected starships
  const { data: ships = [], refetch } = useQuery({
    queryKey: ["compare", ...shipNames],
    queryFn: async () => {
      const results = await Promise.all(shipNames.filter(Boolean).map(fetchStarshipByName));
      return results.filter(Boolean) as Starship[];
    },
    enabled: false, // Only fetch when "Compare" is clicked
  });

  // Define table columns
  const columns: ColumnDef<Starship>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "model", header: "Model" },
    { accessorKey: "manufacturer", header: "Manufacturer" },
    { accessorKey: "crew", header: "Crew" },
    { accessorKey: "hyperdrive_rating", header: "Hyperdrive Rating" },
  ];

  // Initialize Table Instance
  const table = useReactTable({
    data: ships,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
       {/* Back Button */}
       <div className="mb-4 cursor-pointer">
        <Link href="/">
          <button className="p-2 bg-gray-700 rounded">Back to Home</button>
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Compare Starships</h1>

      {/* Dropdown fields */}
      <div className="flex space-x-2 mb-4">
        {shipNames.map((name, index) => (
          <select
            key={index}
            value={name}
            onChange={(e) => {
              const newNames = [...shipNames];
              newNames[index] = e.target.value;
              setShipNames(newNames);
            }}
            className="p-2 border rounded w-1/3"
          >
            <option value="">Select Starship</option>
            {starshipNames.map((starship:string) => (
              <option className="bg-black" key={starship} value={starship}>{starship}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Compare Button */}
      <button onClick={() => refetch()} className="p-2 bg-blue-600 text-white rounded cursor-pointer">
        Compare
      </button>

      {/* Display Table */}
      {ships.length > 0 && (
        <table className="mt-4 border w-full">
          <thead className="bg-gray-800 text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-2 border">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
