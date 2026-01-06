import { memo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { formatNewsDate } from "@/hooks/useNews";

/**
 * TopNewsBanner - Featured top news banner
 * Memoized to prevent re-renders when news list changes
 */
const TopNewsBanner = memo(function TopNewsBanner({ topNews }) {
  const { t } = useTranslation("news");

  if (!topNews) return null;

  return (
    <Link to={`/news/${topNews.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="max-w-8xl mx-auto mb-8 sm:mb-12 lg:mb-16"
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full h-[180px] sm:h-[250px] md:h-[350px] lg:h-[400px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
        >
          {/* Image */}
          {topNews.thumbnail_url ? (
            <motion.img
              src={topNews.thumbnail_url}
              alt={topNews.title}
              className="w-full h-full object-cover transition-all duration-500 ease-out"
              whileHover={{
                scale: 1.12,
                filter: "brightness(1.15) contrast(1.25)",
              }}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <svg
                className="w-16 sm:w-24 h-16 sm:h-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          )}

          {/* Gradient Overlay */}
          <motion.div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent transition-all duration-300 group-hover:from-black/60 group-hover:via-black/40" />

          {/* Content */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-3 sm:left-4 md:left-6 text-white flex flex-col justify-end w-[85%] sm:w-3/4 lg:w-2/3 transition-all duration-500 group-hover:translate-y-[-4px] sm:group-hover:translate-y-[-6px]">
            <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-red-600 text-white text-[10px] sm:text-xs font-bold rounded-md mb-2 sm:mb-3 w-fit">
              {t("topNews")}
            </span>

            <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold leading-snug line-clamp-2">
              {topNews.title}
            </h2>

            <p className="mt-1 sm:mt-2 md:mt-4 text-[10px] sm:text-xs md:text-sm opacity-90 group-hover:opacity-100">
              {topNews.creator?.name} • {formatNewsDate(topNews.created_at)}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
});

export default TopNewsBanner;
