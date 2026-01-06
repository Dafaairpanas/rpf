import { motion } from "framer-motion";
import { IMAGES } from "@/assets/assets";

/**
 * LoadingScreen - Full page loading screen with animated logo
 * Shows when lazy loaded components are being fetched
 */
export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[99999] bg-[#F4F2EE] flex flex-col items-center justify-center">
      {/* Logo with pulse animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      >
        <motion.img
          src={IMAGES.logo}
          alt="Rajawali Perkasa Furniture"
          className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Brand name */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-4 text-center"
      >
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 font-inter">
          Rajawali Perkasa <span className="text-[#6B3F21]">Furniture</span>
        </h1>
      </motion.div>

      {/* Loading spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="mt-6"
      >
        <div className="w-8 h-8 border-3 border-[#E5DCC7] border-t-[#C58E47] rounded-full animate-spin" />
      </motion.div>
    </div>
  );
}
