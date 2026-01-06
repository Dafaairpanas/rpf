import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generatePagination } from "@/utils/pagination";

/**
 * Pagination - Reusable pagination component
 * Uses Sliding Window Pagination pattern
 * 
 * Desktop: delta=2 (max ~8 buttons)
 * Mobile: delta=1 (max ~5 buttons)
 * 
 * @param {number} currentPage - Current active page
 * @param {number} lastPage - Total number of pages
 * @param {function} onPageChange - Callback when page changes, receives new page number
 * @param {string} className - Additional classes for the container
 */
const Pagination = memo(function Pagination({
  currentPage,
  lastPage,
  onPageChange,
  className = "",
}) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size for responsive delta
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (lastPage <= 1) return null;

  // Delta: 1 for mobile (max ~5 buttons), 2 for desktop (max ~8 buttons)
  const delta = isMobile ? 1 : 2;
  const paginationItems = generatePagination(currentPage, lastPage, delta);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center justify-center gap-1.5 sm:gap-2 mt-8 sm:mt-12 ${className}`}
    >
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: currentPage > 1 ? 1.1 : 1 }}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md border border-gray-400 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
      </motion.button>

      {/* Page Numbers */}
      {paginationItems.map((item, idx) =>
        item === "..." ? (
          <span
            key={`dots-${idx}`}
            className="w-5 h-8 sm:w-7 sm:h-9 flex items-center justify-center text-gray-500 text-xs sm:text-sm"
          >
            ...
          </span>
        ) : (
          <motion.button
            key={item}
            whileHover={{ scale: 1.1 }}
            onClick={() => onPageChange(item)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-md flex items-center justify-center border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              item === currentPage
                ? "bg-[#C58E47] text-white border-[#C58E47]"
                : "border-gray-400 text-gray-500 hover:bg-[#C58E47] hover:text-white hover:border-[#C58E47]"
            }`}
            aria-label={`Page ${item}`}
            aria-current={item === currentPage ? "page" : undefined}
          >
            {item}
          </motion.button>
        )
      )}

      {/* Next Button */}
      <motion.button
        whileHover={{ scale: currentPage < lastPage ? 1.1 : 1 }}
        onClick={handleNext}
        disabled={currentPage === lastPage}
        className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-md border border-gray-400 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
        aria-label="Next page"
      >
        <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
      </motion.button>
    </motion.div>
  );
});

export default Pagination;
