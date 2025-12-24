import { memo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * NewsPagination - Pagination controls for news list
 */
const NewsPagination = memo(function NewsPagination({
  currentPage,
  lastPage,
  paginationItems,
  onPrevious,
  onNext,
  onPageClick
}) {
  if (lastPage <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-8 sm:mt-12 lg:mt-16 flex justify-center gap-1.5 sm:gap-2"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#E7E4DF] flex items-center justify-center text-gray-700 hover:bg-[#D9A556] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
      </motion.button>

      {paginationItems.map((num, idx) => (
        num === '...' ? (
          <span key={`dots-${idx}`} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-gray-500">
            ...
          </span>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            key={num}
            onClick={() => onPageClick(num)}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center font-medium text-xs sm:text-sm transition cursor-pointer ${
              num === currentPage
                ? "bg-[#D9A556] text-white"
                : "bg-white text-gray-700 shadow-sm hover:bg-[#D9A556] hover:text-white"
            }`}
          >
            {num}
          </motion.button>
        )
      ))}

      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={onNext}
        disabled={currentPage === lastPage}
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#E7E4DF] flex items-center justify-center text-gray-700 hover:bg-[#D9A556] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        <ChevronRight size={14} className="sm:w-4 sm:h-4" />
      </motion.button>
    </motion.div>
  );
});

export default NewsPagination;
