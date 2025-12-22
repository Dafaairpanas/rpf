import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { formatNewsDate } from '@/hooks/useNews';

// Animation variant
const cardItemVariant = {
  initial: { opacity: 0, y: 40 },
  whileInView: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
  viewport: { once: true },
};

/**
 * NewsCard - Individual news card component
 * Memoized to prevent unnecessary re-renders
 */
const NewsCard = memo(function NewsCard({ item, index, t }) {
  return (
    <Link to={`/news/${item.id}`}>
      <motion.div
        variants={cardItemVariant}
        viewport={{ once: true }}
        whileInView="whileInView"
        initial="initial"
        custom={index}
        className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-out cursor-pointer hover:shadow-xl hover:scale-[1.05] relative h-[350px] w-full"
      >
        {/* Image */}
        <div className="w-full h-[350px] group-hover:h-[230px] transition-all duration-500 ease-out bg-gray-200 flex items-center justify-center">
          {item.thumbnail_url ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              src={item.thumbnail_url}
              className="w-full h-full object-cover"
              alt={item.title}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 px-6 text-center">
              <svg className="w-16 h-16 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="font-medium text-sm">Tidak ada gambar</p>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 transition-all duration-500 ease-out bg-black/20 backdrop-blur-sm text-white group-hover:static group-hover:bg-white group-hover:text-black group-hover:backdrop-blur-none">
          <p className="font-semibold text-sm leading-snug line-clamp-3">
            {item.title}
          </p>

          <div className="flex items-center justify-between mt-3 sm:mt-4 text-xs text-gray-200 group-hover:text-gray-600">
            <span>{formatNewsDate(item.created_at)}</span>

            <motion.span
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="font-medium flex items-center gap-1 text-[#CB9147] hover:text-[#8B5B24] transition flex-shrink-0"
            >
              {t("card.readMore")}
              <ChevronRight size={16} />
            </motion.span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
});

export default NewsCard;
