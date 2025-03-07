"use client";

import Table from "./Table";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [sheetData, setSheetData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://reveo-ai-backend.vercel.app/api/sheet/sheet-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSheetData(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <Table data={sheetData} />
      </div>
    </div>
  );
}