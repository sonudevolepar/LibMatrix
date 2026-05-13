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

  // =========================
  // 📊 STATS
  // =========================
  const totalBooks = books?.length || 0;

  // ✅ Available books
  const availableBooks =
    books?.filter((book) => book.quantity > 0)?.length || 0;

  // ✅ Issued books
  const issuedBooks =
    books?.filter((book) => book.quantity === 0)?.length || 0;

  // =========================
  // 📊 PIE CHART DATA
  // =========================
  const pieData = {
    labels: ["Available", "Issued"],
    datasets: [
      {
        data: [availableBooks, issuedBooks],

        backgroundColor: [
          "#111827", // dark
          "#9CA3AF", // gray
        ],

        borderWidth: 0,
      },
    ],
  };

  // =========================
  // 📊 PIE OPTIONS
  // =========================
  const pieOptions = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",

        labels: {
          color: "#374151",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Admin Dashboard
          </h2>

          <p className="text-sm text-gray-500">
            Welcome back 👋
          </p>
        </div>

        <div className="text-right text-sm text-gray-500">
          <p>{new Date().toLocaleTimeString()}</p>

          <p>{new Date().toDateString()}</p>
        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* ================= LEFT SIDE ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* PIE CHART */}
          <div className="bg-white p-6 rounded-2xl shadow-sm">

            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Books Availability Overview
            </h2>

            <div className="h-[350px] flex items-center justify-center">
              <Pie
                data={pieData}
                options={pieOptions}
              />
            </div>
          </div>

          {/* LEGEND CARD */}
          <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">

            <div className="bg-gray-100 p-3 rounded-xl">
              <img
                src={logo}
                alt="logo"
                className="h-8"
              />
            </div>

            <div className="text-sm text-gray-600">

              <p className="flex items-center gap-2">
                <span className="w-3 h-3 bg-black rounded-full"></span>

                Available Books
              </p>

              <p className="flex items-center gap-2 mt-2">
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>

                Issued Books
              </p>

            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="lg:col-span-2 space-y-6">

          {/* STATS */}
          <div className="space-y-4">

            {/* USERS */}
            <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">

              <div className="bg-gray-100 p-3 rounded-xl">
                <img
                  src={usersIcon}
                  alt="users"
                  className="h-7"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {totalBooks}
                </h2>

                <p className="text-gray-500 text-sm">
                  Total Users
                </p>
              </div>
            </div>

            {/* BOOKS */}
            <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">

              <div className="bg-gray-100 p-3 rounded-xl">
                <img
                  src={bookIcon}
                  alt="books"
                  className="h-7"
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {totalBooks}
                </h2>

                <p className="text-gray-500 text-sm">
                  Total Books
                </p>
              </div>
            </div>

            {/* ISSUED */}
            <div className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-4">

              <div className="bg-gray-100 p-3 rounded-xl text-xl">
                📚
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {issuedBooks}
                </h2>

                <p className="text-gray-500 text-sm">
                  Issued Books
                </p>
              </div>
            </div>
          </div>

          {/* PROFILE CARD */}
          <div className="bg-white p-6 rounded-2xl shadow-sm text-center">

            <img
              src="https://i.pravatar.cc/100"
              alt="admin"
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />

            <h2 className="text-lg font-semibold text-gray-800">
              Admin User
            </h2>

            <p className="text-gray-500 text-sm mt-2 leading-6">
              Welcome to your admin dashboard.
              Here you can manage books,
              monitor activity and view analytics.
            </p>
          </div>
        </div>
      </div>

      {/* ================= QUOTE ================= */}
      <div className="bg-white mt-6 p-6 rounded-2xl shadow-sm text-center">

        <p className="text-gray-700 text-lg italic leading-8">
          "Embarking on the journey of reading fosters personal growth,
          nurturing a path towards excellence and refinement of character."
        </p>

        <p className="text-gray-500 text-sm mt-4">
          ~ BookWorm Team
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;