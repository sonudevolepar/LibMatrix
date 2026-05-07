import React, { useEffect } from "react";
import usersIcon from "../assets/people-black.png";
import bookIcon from "../assets/book-square.png";
import logo from "../assets/black-logo.png";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slices/bookSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.book);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // 📊 Stats
  const totalBooks = books?.length || 0;
  const availableBooks =
    books?.filter((b) => b.available)?.length || 0;
  const issuedBooks = totalBooks - availableBooks;

  // 📊 Chart Data
  const pieData = {
    labels: ["Available", "Issued"],
    datasets: [
      {
        data: [availableBooks, issuedBooks],
        backgroundColor: ["#111827", "#e5e7eb"], // black + light gray
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">

      {/* 🔷 Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Admin</h2>
          <p className="text-sm text-gray-500">Dashboard</p>
        </div>

        <div className="text-right text-sm text-gray-500">
          <p>{new Date().toLocaleTimeString()}</p>
          <p>{new Date().toDateString()}</p>
        </div>
      </div>

      {/* 🔷 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* 🔹 LEFT SIDE (Chart + Legend) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-sm text-gray-500 mb-4">
              Total Borrowed Books vs Returned
            </h2>

            <div className="h-[350px] flex items-center justify-center">
              <Pie data={pieData} />
            </div>
          </div>

          {/* Legend */}
          <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
            <div className="bg-gray-200 p-3 rounded-lg">
              <img src={logo} className="h-6" />
            </div>

            <div className="text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-black rounded-full"></span>
                Total Borrowed Books
              </p>

              <p className="flex items-center gap-2 mt-1">
                <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                Total Returned Books
              </p>
            </div>
          </div>

        </div>

        {/* 🔹 RIGHT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Stats Cards */}
          <div className="space-y-4">

            {/* Users */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="bg-gray-200 p-3 rounded-lg">
                <img src={usersIcon} className="h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{totalBooks}</h2>
                <p className="text-gray-500 text-sm">Total User Base</p>
              </div>
            </div>

            {/* Books */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="bg-gray-200 p-3 rounded-lg">
                <img src={bookIcon} className="h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{totalBooks}</h2>
                <p className="text-gray-500 text-sm">Total Book Count</p>
              </div>
            </div>

            {/* Issued */}
            <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
              <div className="bg-gray-200 p-3 rounded-lg">
                📚
              </div>
              <div>
                <h2 className="text-xl font-bold">{issuedBooks}</h2>
                <p className="text-gray-500 text-sm">Issued Books</p>
              </div>
            </div>

          </div>

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <img
              src="https://i.pravatar.cc/100"
              className="w-20 h-20 rounded-full mx-auto mb-3"
            />

            <h2 className="text-lg font-semibold">Admin User</h2>

            <p className="text-gray-500 text-sm mt-2">
              Welcome to your admin dashboard. Here you can manage
              all the settings and monitor statistics.
            </p>
          </div>

        </div>
      </div>

      {/* 🔹 Bottom Quote */}
      <div className="bg-white mt-6 p-6 rounded-xl shadow-sm text-center">
        <p className="text-gray-700 text-lg italic">
          "Embarking on the journey of reading fosters personal growth,
          nurturing a path towards excellence and the refinement of character."
        </p>

        <p className="text-gray-500 text-sm mt-4">
          ~ BookWorm Team
        </p>
      </div>

    </div>
  );
};

export default AdminDashboard;