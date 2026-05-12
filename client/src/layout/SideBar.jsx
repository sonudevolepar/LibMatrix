import React, { useEffect } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Bot,
  Library,
  Sparkles,
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

  // 🎯 MENU ITEM
  const MenuItem = ({ icon: Icon, label, value }) => {
    const active = selectedComponent === value;

    return (
      <button
        onClick={() => setSelectedComponent(value)}
        className={`group w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden
        ${
          active
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-xl scale-[1.03]"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }`}
      >
        {/* glow effect */}
        {active && (
          <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl"></span>
        )}

        <Icon
          className={`w-5 h-5 relative z-10 ${
            active
              ? "text-white"
              : "text-gray-400 group-hover:text-white"
          }`}
        />

        <span className="font-medium relative z-10">{label}</span>
      </button>
    );
  };

  return (
    <>
      <aside
        className={`${isSideBarOpen ? "left-0" : "-left-full"} 
        md:left-0 fixed z-20 w-64 h-full glass text-white flex flex-col 
        transition-all duration-500 shadow-2xl border-r border-white/10`}
      >
        {/* 🔥 LOGO */}
        <div className="px-6 py-6 border-b border-white/10 flex items-center gap-2">
          <Sparkles className="text-purple-400" />
          <h1 className="text-xl font-bold gradient-text">
            Library AI
          </h1>
        </div>

        {/* 🚀 MENU */}
        <nav className="flex-1 px-4 py-6 space-y-2">

          <MenuItem
            icon={LayoutDashboard}
            label="Dashboard"
            value="Dashboard"
          />

          <MenuItem
            icon={BookOpen}
            label="Books"
            value="Books"
          />

          <MenuItem
            icon={Library}
            label="Catalog"
            value="Catalog"
          />

          <MenuItem
            icon={Users}
            label="Users"
            value="Users"
          />

          {/* 🤖 AI */}
          <MenuItem
            icon={Bot}
            label="AI Assistant"
            value="AI"
          />

          {/* 👤 USER */}
          {isAuthenticated && user?.role === "User" && (
            <MenuItem
              icon={Library}
              label="My Borrowed Books"
              value="My Borrowed Books"
            />
          )}

          {/* ⚙️ SETTINGS */}
          <MenuItem
            icon={Settings}
            label="Settings"
            value="Settings"
            onClick={() => dispatch(toggleSettingPopup())}
          />

          {/* 👑 ADMIN BUTTON */}
          {user?.role === "Admin" && (
            <button
              onClick={() => dispatch(toggleAddNewAdminPopup())}
              className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold hover:scale-105 transition shadow-lg"
            >
              + Add Admin
            </button>
          )}
        </nav>

        {/* 🚪 LOGOUT */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/90 hover:bg-red-600 transition shadow-lg"
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