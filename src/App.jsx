import React, { Suspense } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar/Navbar.jsx";
import Footer from "./components/layouts/Footer.jsx";
import ButtonUp from "./components/buttonUp.jsx";
import Home from "./pages/Home.jsx";

import About from "./pages/About.jsx";
import WhyUS from "./pages/WhyUS.jsx";
import Collections from "./pages/Collections.jsx";
import CSR from "./pages/CSR.jsx";
import News from "./pages/News.jsx";
import Careers from "./pages/Careers.jsx";
import Contact from "./pages/Contact.jsx";
import PopupForm from "./components/PopupForm.jsx";
import { Route, Routes, useLocation } from "react-router-dom";
import DetailCSR from "./pages/DetailCSR.jsx";
import DetailNews from "./pages/DetailNews.jsx";

// Admin views - Lazy loaded for code splitting
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

import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Admin loading fallback - minimal and fast
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

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {!isAdminPage && <Navbar />}

        <div className="flex-grow">
          <Routes>
            {/* Login Route - Lazy loaded with Suspense */}
            <Route
              path="/login"
              element={
                <Suspense fallback={<AdminLoadingFallback />}>
                  <Login />
                </Suspense>
              }
            />

            {/* Admin Routes - Protected & Lazy loaded */}
            <Route
              path="/admin"
              element={
                <Suspense fallback={<AdminLoadingFallback />}>
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                </Suspense>
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

            {/* Public Routes */}
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
          </Routes>
        </div>

        {!isAdminPage && <Footer />}
        {!isAdminPage && <ButtonUp />}
      </div>
    </>
  );
}

export default App;
