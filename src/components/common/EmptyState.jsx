import React from "react";
import { motion } from "framer-motion";
import {
  Package,
  Newspaper,
  Heart,
  Image as ImageIcon,
  Search,
  Inbox,
} from "lucide-react";

// Icon mapping for different content types
const ICON_MAP = {
  products: Package,
  news: Newspaper,
  csr: Heart,
  images: ImageIcon,
  search: Search,
  default: Inbox,
};

/**
 * EmptyState Component
 * Displays a friendly empty state with icon and message
 *
 * @param {string} type - Type of content (products, news, csr, images, search)
 * @param {string} title - Main title text
 * @param {string} description - Optional description text
 * @param {string} className - Additional CSS classes
 */
const EmptyState = ({
  type = "default",
  title = "Tidak ada data",
  description = "",
  className = "",
}) => {
  const IconComponent = ICON_MAP[type] || ICON_MAP.default;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center py-16 sm:py-20 px-6 ${className}`}
    >
      {/* Icon Container */}
      <div className="relative mb-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#F4F2EE] to-[#E8E4DC] flex items-center justify-center shadow-inner">
          <IconComponent
            size={40}
            className="text-[#C58E47] opacity-80"
            strokeWidth={1.5}
          />
        </div>
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#C58E47]/20 animate-[spin_20s_linear_infinite]" />
      </div>

      {/* Title */}
      <h3 className="text-lg sm:text-xl font-semibold text-[#3C2F26] text-center mb-2">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-sm sm:text-base text-gray-500 text-center max-w-md">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default EmptyState;
