import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

export default function AdminDashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex bg-[#F4F2EE] min-h-screen font-sans">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <Header 
        isDropdownOpen={isDropdownOpen} 
        setIsDropdownOpen={setIsDropdownOpen}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
      
      {/* Main content - responsive margin */}
      <main className="flex-1 lg:ml-[200px] pt-[70px] overflow-x-auto">
        <div className="w-full lg:max-w-[1300px] lg:mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}