import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, SquareUser, Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import api from "../../../api/axios";

const Header = ({ isDropdownOpen, setIsDropdownOpen, onMenuClick }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    // Call API logout untuk invalidate token di backend
    api.post("/logout").catch((err) => console.error("Logout error:", err));

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[200px] bg-white h-[64px] flex items-center justify-between lg:justify-end px-4 lg:px-6 shadow-sm z-10 border-b border-gray-200">
      {/* Mobile: Hamburger Menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <Menu size={24} className="text-[#3C2F26]" />
      </button>

      {/* User Dropdown */}
      <div
        className="relative flex items-center cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center text-sm font-medium border border-gray-200 rounded-full pl-1 pr-2 sm:pr-3 py-1 bg-white hover:bg-gray-50 transition shadow-sm">
          <div className="w-8 h-8 bg-[#3C2F26] rounded-full flex items-center justify-center text-white mr-1 sm:mr-2">
            <SquareUser size={16} />
          </div>
          <span className="text-gray-700 hidden sm:inline max-w-[100px] truncate">
            {user.name || "Admin"}
          </span>
          <ChevronDown size={14} className="ml-1 sm:ml-2 text-gray-400" />
        </div>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 z-30 origin-top-right"
            >
              <div className="px-4 py-2 border-b border-gray-100 mb-1">
                <p className="text-sm font-bold text-[#3C2F26] truncate">
                  {user.name || "Super Admin"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.email || "admin@furniture.com"}
                </p>
              </div>
              <div className="border-t border-gray-100 my-1"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left"
              >
                <LogOut size={16} className="mr-2" /> Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
