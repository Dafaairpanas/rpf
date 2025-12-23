import React, { memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Loader } from 'lucide-react';
import { IMAGES } from '@/assets/assets';

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
  loading 
}) {
  const handleDotClick = useCallback((index) => {
    onSelect(index);
  }, [onSelect]);

  return (
    <div className="relative h-[140px] sm:h-[280px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden bg-[#2a2420]">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader className="animate-spin text-[#CB9147]" size={32} />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {banners.map((banner, index) =>
            index === activeIndex && (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.img
                  src={banner.image || banner.image_url}
                  alt={banner.title || "Banner"}
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-contain sm:object-cover"
                  onError={(e) => { 
                    e.target.src = IMAGES.csrJpeg; 
                  }}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      )}

      {/* Navigation Arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={onPrev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
        aria-label="Previous banner"
      >
        <ChevronLeft size={20} className="text-white" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        onClick={onNext}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
        aria-label="Next banner"
      >
        <ChevronRight size={20} className="text-white" />
      </motion.button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => handleDotClick(index)}
            animate={{
              width: index === activeIndex ? 24 : 8,
              backgroundColor: index === activeIndex ? "#CB9147" : "#FFFFFF",
            }}
            className="h-2 rounded-full transition-all"
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

export default BannerCarousel;
