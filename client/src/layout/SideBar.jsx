import React, { useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Bot,
  Library,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import {
  toggleAddNewAdminPopup,
  toggleSettingPopup,
} from "../store/slices/popUpSlice";

import AddNewAdmin from "../popups/AddNewAdmin";
import SettingPopup from "../popups/SettingPopup.jsx";

const SideBar = ({
  isSideBarOpen,
  setIsSideBarOpen,
  selectedComponent,
  setSelectedComponent,
}) => {
  const dispatch = useDispatch();

  const { addNewAdminPopup, settingPopup } = useSelector(
    (state) => state.popup
  );

  const { error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (error) toast.error(error);
    if (message) toast.success(message);
  }, [error, message]);

  const handleLogout = () => {
    dispatch(logout());
  };

  // 🎯 reusable button
  const MenuItem = ({ icon: Icon, label, value, onClick }) => {
    const active = selectedComponent === value;

    return (
      <button
        onClick={onClick}
        className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
        ${
          active
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        <Icon
          className={`w-5 h-5 ${
            active ? "text-white" : "text-gray-400 group-hover:text-white"
          }`}
        />
        <span className="font-medium">{label}</span>
      </button>
    );
  };

  return (
    <>
      <aside
        className={`${
          isSideBarOpen ? "left-0" : "-left-full"
        } md:left-0 fixed z-20 w-64 h-full backdrop-blur-xl bg-black/80 border-r border-white/10 text-white flex flex-col transition-all duration-500`}
      >
        {/* 🔥 LOGO */}
        <div className="px-6 py-6 border-b border-white/10">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Library AI
          </h1>
        </div>

        {/* 🚀 MENU */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          <MenuItem
            icon={LayoutDashboard}
            label="Dashboard"
            value="Dashboard"
            onClick={() => setSelectedComponent("Dashboard")}
          />

          <MenuItem
            icon={BookOpen}
            label="Books"
            value="Books"
            onClick={() => setSelectedComponent("Books")}
          />

          <MenuItem
            icon={Library}
            label="Catalog"
            value="Catalog"
            onClick={() => setSelectedComponent("Catalog")}
          />

          <MenuItem
            icon={Users}
            label="Users"
            value="Users"
            onClick={() => setSelectedComponent("Users")}
          />

          {/* 🤖 AI Assistant (NEW 🔥🔥🔥) */}
          <MenuItem
            icon={Bot}
            label="AI Assistant"
            value="AI"
            onClick={() => setSelectedComponent("AI")}
          />

          {/* 👤 User Only */}
          {isAuthenticated && user?.role === "User" && (
            <MenuItem
              icon={Library}
              label="My Borrowed Books"
              value="My Borrowed Books"
              onClick={() =>
                setSelectedComponent("My Borrowed Books")
              }
            />
          )}

          {/* ⚙️ SETTINGS */}
          <MenuItem
            icon={Settings}
            label="Settings"
            value="Settings"
            onClick={() => dispatch(toggleSettingPopup())}
          />

          {/* 👑 ADD ADMIN */}
          {user?.role === "Admin" && (
            <button
              onClick={() => dispatch(toggleAddNewAdminPopup())}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold hover:scale-105 transition"
            >
              + Add Admin
            </button>
          )}
        </nav>

        {/* 🚪 LOGOUT */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/90 hover:bg-red-600 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* ❌ MOBILE CLOSE */}
        <button
          onClick={() => setIsSideBarOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white text-xl"
        >
          ✕
        </button>
      </aside>

      {/* POPUPS */}
      {addNewAdminPopup && <AddNewAdmin />}
      {settingPopup && <SettingPopup />}
    </>
  );
};

export default SideBar;