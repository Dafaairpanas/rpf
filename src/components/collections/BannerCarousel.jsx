import React, { memo, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "@/assets/assets";

/**
 * BannerCarousel - Displays rotating banners
 * Memoized to prevent re-renders from parent state changes
 */
const BannerCarousel = memo(function BannerCarousel({
  banners,
  activeIndex,
  onPrev,
  onNext,
  onSelect,
  loading,
}) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDotClick = useCallback(
    (index) => {
      onSelect(index);
    },
    [onSelect],
  );

  // Handle banner click - navigate to product or external link
  const handleBannerClick = useCallback(
    (banner) => {
      if (!banner.link) return;

      // Check if it's an absolute URL
      if (banner.link.startsWith("http")) {
        try {
          const url = new URL(banner.link);
          const isInternal = url.origin === window.location.origin;

          if (isInternal) {
            // If internal, just take the path + search + hash
            const internalPath = url.pathname + url.search + url.hash;
            navigate(internalPath);
          } else {
            // Truly external link
            window.open(banner.link, "_blank", "noopener,noreferrer");
          }
        } catch (e) {
          // Fallback or invalid URL
          window.open(banner.link, "_blank", "noopener,noreferrer");
        }
      } else {
        // Internal link - use React Router navigate
        navigate(banner.link);
      }
    },
    [navigate],
  );

  return (
    <div className="relative h-[160px] sm:h-[280px] md:h-[350px] lg:h-[400px] rounded-none sm:rounded-2xl overflow-hidden w-[90dvw] mx-auto sm:w-full">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader className="animate-spin text-[#CB9147]" size={32} />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {banners.map(
            (banner, index) =>
              index === activeIndex && (
                <motion.div
                  key={banner.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  onClick={() => handleBannerClick(banner)}
                  className={`absolute inset-0 ${banner.link ? "cursor-pointer" : ""}`}
                >
                  <motion.img
                    src={banner.image || banner.image_url}
                    alt={banner.title || "Banner"}
                    initial={{ scale: 1.02 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.src = IMAGES.csrJpeg;
                    }}
                  />
                </motion.div>
              ),
          )}
        </AnimatePresence>
      )}

      {/* Navigation Arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={onPrev}
        className="absolute left-[-10px] sm:left-6 top-1/2 -translate-y-1/2 z-20 hover:bg-black/70 p-2 rounded-full transition cursor-pointer"
        aria-label="Previous banner"
      >
        <ChevronLeft size={20} className="text-white" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={onNext}
        className="absolute right-[-10px] sm:right-6 top-1/2 -translate-y-1/2 z-20 hover:bg-black/70 p-2 rounded-full transition cursor-pointer"
        aria-label="Next banner"
      >
        <ChevronRight size={20} className="text-white" />
      </motion.button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1 sm:gap-2">
        {banners.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            animate={{
              width:
                index === activeIndex ? (isMobile ? 16 : 24) : isMobile ? 5 : 8,
              backgroundColor: index === activeIndex ? "#CB9147" : "#FFFFFF",
            }}
            className="h-1.5 sm:h-2 rounded-full transition-all cursor-pointer"
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

export default BannerCarousel;
