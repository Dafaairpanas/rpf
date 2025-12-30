import { memo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * NewsPagination - Pagination controls for news list
 */
const NewsPagination = memo(function NewsPagination({
  currentPage,
  lastPage,
  paginationItems,
  onPrevious,
  onNext,
  onPageClick,
}) {
  if (lastPage <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center gap-3 mt-12 p-10 pb-20"
    >
      <motion.button
        whileHover={{ scale: currentPage > 1 ? 1.1 : 1 }}
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-400 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={16} />
      </motion.button>

      {paginationItems.map((num, idx) =>
        num === "..." ? (
          <span
            key={`dots-${idx}`}
            className="w-8 h-8 flex items-center justify-center text-gray-500"
          >
            ...
          </span>
        ) : (
          <motion.button
            key={num}
            whileHover={{ scale: 1.12 }}
            onClick={() => onPageClick(num)}
            className={`w-8 h-8 rounded-sm flex items-center justify-center border text-sm font-bold transition-all ${
              num === currentPage
                ? "bg-[#C58E47] text-white border-[#C58E47]"
                : "border-gray-400 text-gray-500 hover:bg-[#C58E47] hover:text-white"
            }`}
          >
            {num}
          </motion.button>
        ),
      )}

      <motion.button
        whileHover={{ scale: currentPage < lastPage ? 1.1 : 1 }}
        onClick={onNext}
        disabled={currentPage === lastPage}
        className="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-400 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <ChevronRight size={16} />
      </motion.button>
    </motion.div>
  );
});

export default NewsPagination;
