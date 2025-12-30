import React, { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X, Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProductImages } from "@/utils/imageHelpers";

/**
 * ProductModal - Responsive product details modal
 * Mobile: Stacked layout, scrollable content
 * Desktop: Side-by-side layout
 */
const ProductModal = memo(function ProductModal({ product, loading, onClose }) {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);

  // Extract specific image groups
  const { productImages, coverImages, teakImages } = useMemo(
    () =>
      product
        ? getProductImages(product)
        : { productImages: [], coverImages: [], teakImages: [] },
    [product],
  );

  const galleryImages = useMemo(() => {
    const all = [...productImages, ...coverImages, ...teakImages];
    return all.length > 0 ? all : ["/placeholder.png"];
  }, [productImages, coverImages, teakImages]);

  // Indices for navigation mapping
  const coverStartIndex = productImages.length;
  const teakStartIndex = productImages.length + coverImages.length;

  // Stable handlers
  const nextImage = useCallback(() => {
    setImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  }, [galleryImages.length]);

  const selectImage = useCallback((idx) => {
    setImageIndex(idx);
    // Scroll to top of main image for better mobile UX
    const mainImgContainer = document.getElementById("modal-main-image");
    if (mainImgContainer)
      mainImgContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleOrderClick = useCallback(() => {
    // Navigate to contact with product_id for "Order Now" flow
    navigate(`/contact?product_id=${product?.id}`);
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  }, [navigate, product?.id]);

  const handleBackdropClick = useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  // Reset image index when product changes
  React.useEffect(() => {
    setImageIndex(0);
  }, [product?.id]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleBackdropClick}
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4 cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#F4F2EE] rounded-2xl sm:rounded-3xl w-full max-w-5xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden relative border border-[#E5DCC7] mt-2 sm:mt-[8dvh]"
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 z-30 shadow-lg border border-gray-200 transition-all cursor-pointer"
          >
            <X size={18} className="sm:w-5 sm:h-5 text-[#3C2F26]" />
          </motion.button>

          {loading ? (
            <div className="flex items-center justify-center h-[50vh] sm:h-[60vh]">
              <Loader
                size={32}
                className="sm:w-10 sm:h-10 text-[#C58E47] animate-spin"
              />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row h-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto md:overflow-hidden">
              {/* LEFT COLUMN - Main Image + Thumbnails */}
              <div className="w-full md:w-1/2 flex flex-col p-4 sm:p-6 md:p-8 bg-white md:border-r border-[#E5DCC7]">
                {/* Main Image */}
                <div
                  id="modal-main-image"
                  className="relative flex items-center justify-center bg-gray-50 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 overflow-hidden h-[200px] sm:h-[250px] md:h-[300px]"
                >
                  <motion.img
                    key={imageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    src={galleryImages[imageIndex]}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />

                  {galleryImages.length > 1 && (
                    <div className="absolute inset-x-1 sm:inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={prevImage}
                        className="pointer-events-auto bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition cursor-pointer"
                      >
                        <ChevronLeft
                          size={16}
                          className="sm:w-[18px] sm:h-[18px] text-[#3C2F26]"
                        />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={nextImage}
                        className="pointer-events-auto bg-white/90 hover:bg-white p-1.5 sm:p-2 rounded-full shadow-md transition cursor-pointer"
                      >
                        <ChevronRight
                          size={16}
                          className="sm:w-[18px] sm:h-[18px] text-[#3C2F26]"
                        />
                      </motion.button>
                    </div>
                  )}
                </div>

                {/* Product & Teak Thumbnails (Left) */}
                {(productImages.length > 1 || teakImages.length > 0) && (
                  <div className="mb-2 sm:mb-4 px-1">
                    <h3 className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 sm:mb-3">
                      Images & Teak
                    </h3>
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {/* Product Images */}
                      {productImages.map((img, idx) => (
                        <motion.button
                          key={`thumb-prod-${idx}`}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => selectImage(idx)}
                          className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                            idx === imageIndex
                              ? "border-[#C58E47] shadow-md"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </motion.button>
                      ))}

                      {/* Teak Wood (if present) */}
                      {teakImages.length > 0 && (
                        <>
                          <div className="h-8 sm:h-12 w-[1px] bg-gray-300 mx-1 sm:mx-2" />
                          {teakImages.map((img, idx) => (
                            <motion.button
                              key={`thumb-teak-${idx}`}
                              whileHover={{ scale: 1.1 }}
                              onClick={() => selectImage(teakStartIndex + idx)}
                              className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl border-2 overflow-hidden shadow-md transition-all cursor-pointer ${
                                teakStartIndex + idx === imageIndex
                                  ? "border-[#C58E47]"
                                  : "border-white hover:border-gray-300"
                              }`}
                              title="Wood Texture"
                            >
                              <img
                                src={img}
                                alt="Wood Texture"
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </motion.button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN - Product Details */}
              <div className="w-full md:w-1/2 flex flex-col bg-[#F4F2EE] md:h-full md:max-h-[90vh]">
                <div className="flex-grow overflow-y-auto p-4 sm:p-6 md:p-8 custom-scrollbar">
                  {/* Product Info */}
                  <div className="mb-4 sm:mb-6">
                    <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#C58E47]/10 text-[#C58E47] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-2 sm:mb-3">
                      Product Overview
                    </span>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A1A1A] leading-tight mb-2 sm:mb-3">
                      {product.name}
                    </h2>
                    {product.description && (
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-poppins">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Specifications Card */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/40 shadow-sm mb-4 sm:mb-5">
                    <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A] mb-2 sm:mb-3 flex items-center">
                      <span className="w-1 sm:w-1.5 h-3 sm:h-4 bg-[#C58E47] rounded-full mr-2" />
                      Specifications
                    </h4>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      {[
                        { label: "Width", val: product.dimension?.width },
                        { label: "Height", val: product.dimension?.height },
                        { label: "Depth", val: product.dimension?.depth },
                      ].map((dim, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-[9px] sm:text-[10px] text-gray-500 uppercase tracking-tighter mb-0.5 sm:mb-1 font-bold">
                            {dim.label}
                          </span>
                          <span className="text-sm sm:text-base font-extrabold text-[#3C2F26]">
                            {dim.val ?? "-"}{" "}
                            <small className="text-[9px] sm:text-[10px] font-normal">
                              cm
                            </small>
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cover Images Card - Keep on right, interactive */}
                  {coverImages.length > 0 && (
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-white/40 shadow-sm mb-4 sm:mb-5">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1A1A1A] mb-3 sm:mb-4 flex items-center">
                        <span className="w-1 sm:w-1.5 h-3 sm:h-4 bg-[#C58E47] rounded-full mr-2" />
                        Cover Options
                      </h4>
                      <div className="flex flex-wrap gap-3 sm:gap-4">
                        {coverImages.map((img, idx) => (
                          <motion.button
                            key={`cover-${idx}`}
                            whileHover={{ scale: 1.1, y: -2 }}
                            onClick={() => selectImage(coverStartIndex + idx)}
                            className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 overflow-hidden shadow-sm bg-white cursor-pointer ${
                              coverStartIndex + idx === imageIndex
                                ? "border-[#C58E47]"
                                : "border-white"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Cover ${idx + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notice */}
                  {/* <div className="py-2 sm:py-3">
                    <p className="text-[10px] sm:text-[11px] text-gray-400 italic font-poppins">
                      * Handcrafted with precision. Texture and grain may vary naturally.
                    </p>
                  </div> */}
                </div>

                {/* Order Button */}
                <div className="p-3 sm:p-5 md:p-6 bg-white/40 border-t border-[#E5DCC7] mt-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOrderClick}
                    className="w-full bg-[#C58E47] hover:bg-[#B8793A] text-white font-bold text-sm sm:text-base py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-all shadow-xl shadow-[#C58E47]/20 flex items-center justify-center gap-2 sm:gap-3 cursor-pointer"
                  >
                    Order Now
                    <ChevronRight
                      size={16}
                      className="sm:w-[18px] sm:h-[18px]"
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
});

export default ProductModal;
