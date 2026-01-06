import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar/Navbar.jsx";
import Footer from "./components/layouts/Footer.jsx";
import ButtonUp from "./components/buttonUp.jsx";
import LoadingScreen from "./components/common/LoadingScreen.jsx";

import { Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toaster } from "sonner";

// Public pages - Normal import (loaded once, no lazy loading)
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import WhyUS from "./pages/WhyUS.jsx";
import Collections from "./pages/Collections.jsx";
import CSR from "./pages/CSR.jsx";
import News from "./pages/News.jsx";
import Careers from "./pages/Careers.jsx";
import Contact from "./pages/Contact.jsx";
import DetailCSR from "./pages/DetailCSR.jsx";
import DetailNews from "./pages/DetailNews.jsx";
import NotFound from "./pages/NotFound.jsx";

// Admin views - Still lazy loaded (only loaded when needed)
const AdminDashboard = React.lazy(() => import("./pages/admin/AdminHome.jsx"));
const ProductForm = React.lazy(() => import("./pages/admin/ProductForm.jsx"));
const Dashboard = React.lazy(() => import("./pages/admin/views/Dashboard"));
const Brands = React.lazy(() => import("./pages/admin/views/Brands"));
const Products = React.lazy(() => import("./pages/admin/views/Products"));
const Users = React.lazy(() => import("./pages/admin/views/Users"));
const Roles = React.lazy(() => import("./pages/admin/views/Roles"));
const Certifications = React.lazy(
  () => import("./pages/admin/views/Certifications"),
);
const Csr = React.lazy(() => import("./pages/admin/views/Csr"));
const CsrForm = React.lazy(() => import("./pages/admin/CsrForm.jsx"));
const Banners = React.lazy(() => import("./pages/admin/views/Banners"));
const Contacts = React.lazy(() => import("./pages/admin/views/Contacts"));
const NewsAdmin = React.lazy(() => import("./pages/admin/views/News"));
const NewsForm = React.lazy(() => import("./pages/admin/NewsForm.jsx"));
const Login = React.lazy(() => import("./pages/admin/Login.jsx"));

// Admin loading fallback
const AdminLoadingFallback = () => (
  <div className="min-h-screen bg-[#F4F2EE] flex items-center justify-center">
    <div className="text-center space-y-3">
      <div className="w-10 h-10 border-3 border-[#3C2F26]/20 border-t-[#3C2F26] rounded-full animate-spin mx-auto" />
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
        Loading...
      </p>
    </div>
  </div>
);

function App() {
  const location = useLocation();
  const isAdminPage =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  // Show loading screen only once per session
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("rpf_loaded");
  });

  useEffect(() => {
    if (isLoading) {
      // Show loading screen for minimum 1.5 seconds, then wait for page to be ready
      const timer = setTimeout(() => {
        sessionStorage.setItem("rpf_loaded", "true");
        setIsLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Show loading screen on first visit (public pages only)
  if (isLoading && !isAdminPage) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <div className="min-h-screen flex flex-col">
        {!isAdminPage && <Navbar />}

        <div className="flex-grow">
          <Routes>
            {/* Login Route */}
            <Route
              path="/login"
              element={
                <React.Suspense fallback={<AdminLoadingFallback />}>
                  <Login />
                </React.Suspense>
              }
            />

            {/* Admin Routes - Protected & Lazy loaded */}
            <Route
              path="/admin"
              element={
                <React.Suspense fallback={<AdminLoadingFallback />}>
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                </React.Suspense>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="brands" element={<Brands />} />
              <Route path="products" element={<Products />} />
              <Route
                path="products/create"
                element={<ProductForm isOpen={true} />}
              />
              <Route
                path="products/:id/edit"
                element={<ProductForm isOpen={true} />}
              />

              <Route path="users" element={<Users />} />
              <Route path="roles" element={<Roles />} />
              <Route path="certifications" element={<Certifications />} />
              <Route path="csr" element={<Csr />} />
              <Route path="csr/create" element={<CsrForm />} />
              <Route path="csr/:id/edit" element={<CsrForm />} />
              <Route path="banners" element={<Banners />} />
              <Route path="contacts" element={<Contacts />} />

              <Route path="news" element={<NewsAdmin />} />
              <Route path="news/create" element={<NewsForm />} />
              <Route path="news/:id/edit" element={<NewsForm />} />
            </Route>

            {/* Public Routes - No lazy loading, instant navigation */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/whyus" element={<WhyUS />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/corporate-social-responsibility" element={<CSR />} />
            <Route path="/News" element={<News />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/csr/:id" element={<DetailCSR />} />
            <Route path="/news/:id" element={<DetailNews />} />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {!isAdminPage && <Footer />}
        {!isAdminPage && <ButtonUp />}
      </div>
    </>
  );
}

export default App;
