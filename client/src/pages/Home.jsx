import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Sidebar from "../layout/SideBar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import MyBorrowedBooks from "../components/MyBorrowedBooks";
import Users from "../components/Users";
import AIChat from "../components/AIChat"; // ✅ import

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const { user, isAuthenticated } = useSelector((state) => state.auth || {});

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="relative md:p-1 flex min-h-screen bg-gray-100">

        {/* Mobile Menu */}
        <div className="md:hidden z-10 absolute right-6 top-4 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
          <GiHamburgerMenu
            className="text-2xl"
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />
        </div>

        {/* Sidebar */}
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
        />

        {/* Main Content */}
        {(() => {
  switch (selectedComponent) {

    case "Dashboard":
      return user?.role === "User" ? (
        <UserDashboard />
      ) : (
        <AdminDashboard />
      );

    case "Books":
      return <BookManagement />;

    case "Catalog":
      return <Catalog />;

    case "Users":
      return <Users />;

    case "AI":
      return <AIChat />;   // 🔥 yaha add karna hai

    case "My Borrowed Books":
      return <MyBorrowedBooks />;

    default:
      return user?.role === "User" ? (
        <UserDashboard />
      ) : (
        <AdminDashboard />
      );
  }
})()}
        {/* 🤖 AI CHAT (IMPORTANT 🔥)
        <AIChat /> */}

      </div>
    </>
  );
};

export default Home;