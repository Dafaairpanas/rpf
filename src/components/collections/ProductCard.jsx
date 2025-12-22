import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getProductImages } from '@/utils/imageHelpers';

/**
 * ProductCard - Single product display card for grid
 * Memoized to prevent re-renders when other products change
 */
const ProductCard = memo(function ProductCard({ product, onClick }) {
  // Memoize display images
  const displayImages = useMemo(() => {
    const { productImages } = getProductImages(product);
    if (productImages.length >= 2) {
      return productImages.slice(0, 2);
    }
    if (productImages.length === 1) {
      return [productImages[0], productImages[0]];
    }
    return ["/placeholder.png", "/placeholder.png"];
  }, [product]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      onClick={() => onClick(product)}
      className="group border border-[#E5DCC7] rounded-2xl p-3 shadow-sm flex flex-col items-center transition-all duration-300 hover:bg-[#E5DCC7]/70 cursor-pointer"
    >
      <div className="relative w-full h-40 sm:h-72 rounded-xl bg-white overflow-hidden flex items-center justify-center">
        <img
          src={displayImages[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:opacity-0 transition-opacity duration-300"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />
        <img
          src={displayImages[1]}
          alt={`${product.name} - alt`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onError={(e) => (e.target.src = "/placeholder.png")}
        />
      </div>
      <p className="mt-3 text-[16px] sm:text-[20px] font-semibold text-[#1A1A1A] group-hover:text-[#6b4b3a] text-center line-clamp-2">
        {product.name}
      </p>
    </motion.div>
  );
});

export default ProductCard;
