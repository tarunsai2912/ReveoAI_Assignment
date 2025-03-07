"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

export default function Table({ data }) {
  const [columns, setColumns] = useState([]);
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnType, setNewColumnType] = useState("text");

  const addColumn = async () => {
    if (!newColumnName) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("https://reveo-ai-backend.vercel.app/api/sheet/add-column", { name: newColumnName, type: newColumnType }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setColumns([...columns, res.data.columns]);
      setNewColumnName("");
      setNewColumnType("text");
      toast.success('Column got added')
    } catch (err) {
      console.error(err);
      toast.error('Error in column addition')
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Column</h2>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Column Name"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            className="w-48"
            required
          />
          <select
            value={newColumnType}
            onChange={(e) => setNewColumnType(e.target.value)}
            className="p-2 border rounded cursor-pointer"
          >
            <option value="text">Text</option>
            <option value="date">Date</option>
          </select>
          <Button onClick={addColumn} className="bg-green-600 hover:bg-green-700 cursor-pointer">
            Add Column
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200">
              {columns.map((col, index) => (
                <th key={index} className="p-3 text-left">
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3">
                    {row[colIndex]}
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