import React, { useState, useEffect } from "react";
import {
  Home,
  Box,
  Tag,
  Users,
  Shield,
  Award,
  Heart,
  Newspaper,
  Image,
  MessageSquare,
  X,
  Menu,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA MENU ---
const menuItems = [
  { name: "Dashboard", icon: Home, path: "/admin/dashboard" },
  { name: "Products", icon: Box, path: "/admin/products" },
  { name: "Brands", icon: Tag, path: "/admin/brands" },
  { name: "Certifications", icon: Award, path: "/admin/certifications" },
  { name: "CSR", icon: Heart, path: "/admin/csr" },
  { name: "News", icon: Newspaper, path: "/admin/news" },
  { name: "Banners", icon: Image, path: "/admin/banners" },
  { name: "Contacts", icon: MessageSquare, path: "/admin/contacts" },
];

// Management menu - only for Super Admin
const managementItems = [
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Roles", icon: Shield, path: "/admin/roles" },
];

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isSuperAdmin = user?.role?.name === "Super Admin";

  const isActive = (path) => {
    if (
      path === "/admin/dashboard" &&
      (location.pathname === "/admin" || location.pathname === "/admin/")
    )
      return true;
    return location.pathname === path;
  };

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (window.innerWidth < 1024 && isOpen) {
      onClose?.();
    }
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  const MenuItem = ({ item }) => (
    <div
      onClick={() => handleNavigation(item.path)}
      className={`flex items-center p-3 rounded-md cursor-pointer transition-all duration-200 mb-1 ${
        isActive(item.path)
          ? "bg-[#E7E7E7] text-[#3C2F26] font-bold shadow-md transform scale-[1.02]"
          : "hover:bg-[#4d3d33] text-[#A6A099] hover:text-white"
      }`}
    >
      <item.icon size={18} className="mr-3" />
      <span>{item.name}</span>
    </div>
  );

  // Sidebar content (shared between desktop and mobile)
  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4 h-[64px] border-b border-[#52453B]">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center font-bold text-[#3C2F26] mr-2 shadow-lg">
            {isSuperAdmin ? "SA" : "AD"}
          </div>
          <span className="text-lg font-semibold tracking-wide">
            {isSuperAdmin ? "Super Admin" : "Admin"}
          </span>
        </div>
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-1 hover:bg-[#52453B] rounded-md transition"
        >
          <X size={20} className="text-[#A6A099]" />
        </button>
      </div>

      <div className="p-2 overflow-y-auto flex-1 custom-scrollbar">
        {/* Menu Section */}
        <div className="text-xs text-[#A6A099] uppercase mb-1 px-2 mt-2 font-medium tracking-wider">
          Menu
        </div>
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}

        {/* Management Section - Super Admin Only */}
        {isSuperAdmin && (
          <>
            <div className="text-xs text-[#A6A099] uppercase mb-1 px-2 mt-6 font-medium tracking-wider">
              Management
            </div>
            {managementItems.map((item, index) => (
              <MenuItem key={`mgmt-${index}`} item={item} />
            ))}
          </>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar - Fixed */}
      <div className="hidden lg:flex w-[200px] h-full bg-[#3C2F26] text-[#E7E7E7] flex-col fixed top-0 left-0 z-20 shadow-xl">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar - Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed top-0 left-0 w-[280px] h-full bg-[#3C2F26] text-[#E7E7E7] flex flex-col z-50 shadow-2xl"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
