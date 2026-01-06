import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { IMAGES } from "@/assets/assets";

/**
 * NotFound - 404 Page Not Found
 * Displayed when user navigates to a route that doesn't exist
 */
export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F2EE] flex items-center justify-center px-4 py-16 pt-24 sm:pt-28">
      <div className="text-center max-w-lg mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <img
            src={IMAGES.logo}
            alt="Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto object-contain"
          />
        </motion.div>

        {/* 404 Number */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-8xl sm:text-9xl font-extrabold text-[#C58E47] font-montserrat"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl font-bold text-[#28221F] mt-4 font-inter"
        >
          Halaman Tidak Ditemukan
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed"
        >
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
          Silakan kembali ke beranda atau gunakan navigasi untuk menemukan yang Anda butuhkan.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          {/* Go Back Button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#28221F] text-[#28221F] font-medium rounded-lg hover:bg-[#28221F] hover:text-white transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft size={18} />
            Kembali
          </button>

          {/* Home Button */}
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C58E47] text-white font-medium rounded-lg hover:bg-[#A67539] transition-all duration-300"
          >
            <Home size={18} />
            Ke Beranda
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
