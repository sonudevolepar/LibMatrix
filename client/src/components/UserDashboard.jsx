import React, { useEffect } from "react";
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

import { useSelector, useDispatch } from "react-redux";

import { fetchAllUsers } from "../store/slices/userSlice";
import { fetchBooks } from "../store/slices/bookSlice";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const UserDashboard = () => {

  const dispatch = useDispatch();

  // 🔥 Redux State
  const { user } = useSelector(
    (state) => state.auth
  );

  const { books = [] } = useSelector(
    (state) => state.book
  );

  const { users = [] } = useSelector(
    (state) => state.user
  );
  console.log(books);

  // 🔥 Fetch Data
  useEffect(() => {

    dispatch(fetchAllUsers());

    dispatch(fetchBooks());

  }, [dispatch]);

  // 📊 Stats

  const totalBooks = books.length;

  // ✅ FIXED HERE
  const availableBooks = books.filter(b => b.availability).length;
const issuedBooks = books.filter(b => !b.availability).length;

  const totalUsers = users.length;

  // ✅ FIXED ROLE
  const totalAdmins =
    users.filter(
      (u) =>
        u.role?.toLowerCase() === "admin"
    ).length;

  // 📊 PIE CHART
  const data = {
    labels: ["Available", "Issued"],

    datasets: [
      {
        data: [
          availableBooks,
          issuedBooks,
        ],

        backgroundColor: [
          "rgba(15, 5, 5, 0.72)",
          "rgb(117, 124, 118)",
          
          
        ],

        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="ml-64 p-6 bg-gray-100 min-h-screen">

      {/* 🔷 TOP BAR */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-lg font-semibold">
            {user?.name || "User"}
          </h2>

          <p className="text-sm text-gray-500">
            Admin
          </p>
        </div>

        <div className="text-right text-sm text-gray-500">
          <p>
            {new Date().toLocaleTimeString()}
          </p>

          <p>
            {new Date().toDateString()}
          </p>
        </div>

      </div>

      {/* 🔷 TOP STATS */}
      <div className="grid grid-cols-5 gap-4 mb-6">

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm">
            Total Books
          </p>

          <h2 className="text-xl font-bold">
            {totalBooks}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm">
            Available
          </p>

          <h2 className="text-xl font-bold text-green-600">
            {availableBooks}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm">
            Issued
          </p>

          <h2 className="text-xl font-bold text-red-500">
            {issuedBooks}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm">
            Total Users
          </p>

          <h2 className="text-xl font-bold">
            {totalUsers}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-500 text-sm">
            Total Admins
          </p>

          <h2 className="text-xl font-bold">
            {totalAdmins}
          </h2>
        </div>

      </div>

      {/* 🔷 MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🔹 LEFT */}
        <div className="lg:col-span-2 space-y-4">

          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4 hover:shadow-xl transition">

            <img
              src={bookIcon}
              className="h-10"
            />

            <p className="font-medium">
              Your Borrowed Book List
            </p>

          </div>

          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4 hover:shadow-xl transition">

            <img
              src={returnIcon}
              className="h-10"
            />

            <p className="font-medium">
              Your Returned Book List
            </p>

          </div>

          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4 hover:shadow-xl transition">

            <img
              src={browseIcon}
              className="h-10"
            />

            <p className="font-medium">
              Browse Books Inventory
            </p>

          </div>

          {/* LOGO CARD */}
          <div className="bg-white h-64 rounded-lg shadow flex flex-col items-center justify-center">

            <img
              src={logo}
              className="h-16 mb-2"
            />

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

        {/* 🔹 RIGHT */}
        <div className="space-y-4">

          {/* PIE CHART */}
          <div className="bg-white p-4 rounded-lg shadow">

            <h2 className="text-sm text-gray-500 mb-2">
              Books Overview
            </h2>

            <div className="h-64 flex items-center justify-center">
              <Pie data={data} />
            </div>

          </div>

          {/* LEGEND */}
          <div className="bg-white p-4 rounded-lg shadow">

            <div className="flex items-center gap-2 mb-3">

              <span className="w-3 h-3 bg-gray-900 rounded-full"></span>

              <p className="text-sm">
                Available Books ({availableBooks})
              </p>

            </div>

            <div className="flex items-center gap-2">

              <span className="w-3 h-3 bg-gray-400 rounded-full"></span>

              <p className="text-sm">
                Issued Books ({issuedBooks})
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserDashboard;