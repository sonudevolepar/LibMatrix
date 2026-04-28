import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Sidebar from "../layout/SideBar";   // ✅ fixed
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog";
import MyBorrowedBooks from "../components/MyBorrowedBooks"; // ✅ fixed
import Users from "../components/Users";

const Home = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard"); // ✅ default

  const { user, isAuthenticated } = useSelector((state) => state.auth || {});

  
  if (!isAuthenticated) {
  
 return <Navigate to={"/login"}/>;
  }

  return (
    <>
      <div className="relative md:p-1 flex min-h-screen bg-gray-100">
        
        <div className="md:hidden z-10 absolute right-6 top-4 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
          <GiHamburgerMenu
            className="text-2xl"   // ✅ fixed
            onClick={() => setIsSideBarOpen(!isSideBarOpen)}
          />
        </div>

        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
        />

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
              if (user?.role === "Admin") {
                return <Catalog />;
              }
              return null;

            case "Users":
              if (user?.role === "Admin") {
                return <Users />;
              }
              return null;

            case "My Borrowed Books":
              return <MyBorrowedBooks />; // ✅ fixed

            default:
              return user?.role === "User" ? (
                <UserDashboard />
              ) : (
                <AdminDashboard />
              );
          }
        })()}
      </div>
    </>
  );
};

export default Home;