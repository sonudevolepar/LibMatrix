import React from "react";
import logo from "../assets/black-logo.png";
import bookIcon from "../assets/book-square.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.book);

  // 📊 Stats
  const totalBooks = books?.length || 0;
  const availableBooks =
    books?.filter((b) => b.available)?.length || 0;
  const issuedBooks =
    books?.filter((b) => !b.available)?.length || 0;

  // 📊 Pie Data
  const data = {
    labels: ["Available", "Issued"],
    datasets: [
      {
        data: [availableBooks, issuedBooks],
        backgroundColor: ["#1f2937", "#9ca3af"],
        borderWidth: 1,
      },
    ],
  };

  return (
    // 👉 Sidebar space
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">

      {/* 🔷 Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">
            {user?.name || "User"}
          </h2>
          <p className="text-sm text-gray-500">User</p>
        </div>

        <div className="text-right text-sm text-gray-500">
          <p>{new Date().toLocaleTimeString()}</p>
          <p>{new Date().toDateString()}</p>
        </div>
      </div>

      {/* 🔷 Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🔹 LEFT SECTION */}
        <div className="lg:col-span-2 space-y-4">

          {/* Action Card */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <img src={bookIcon} className="h-10" />
            <p className="font-medium">
              Your Borrowed Book List
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <img src={returnIcon} className="h-10" />
            <p className="font-medium">
              Your Returned Book List
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <img src={browseIcon} className="h-10" />
            <p className="font-medium">
              Let's browse books inventory
            </p>
          </div>

          {/* Center Big Card */}
          <div className="bg-white h-64 rounded-lg shadow flex flex-col items-center justify-center">
            <img src={logo} className="h-16 mb-2" />
            <h2 className="text-xl font-semibold">
              BookWorm
            </h2>
            <p className="text-gray-500 text-sm">
              Library
            </p>

            <p className="mt-6 text-gray-400 text-sm">
              ~ BookWorm Team
            </p>
          </div>
        </div>

        {/* 🔹 RIGHT SECTION (CHART) */}
        <div className="space-y-4">

          {/* Big Pie Chart */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-sm text-gray-500 mb-2">
              Books Overview
            </h2>

            <div className="h-64">
              <Pie data={data} />
            </div>
          </div>

          {/* Legend Card */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
            <img src={logo} className="h-10" />

            <div className="text-sm">
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
                Total Borrowed Books
              </p>

              <p className="flex items-center gap-2 mt-1">
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                Total Returned Books
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;