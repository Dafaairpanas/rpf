import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IMAGES, HERO_BACKGROUNDS } from "@/assets/assets";
import { getBanners } from "@/api/banner.api";
import useDebounce from "@/hooks/useDebounce";
import { useProducts, useProductDetail } from "@/hooks/useProducts";
import {
  ProductModal,
  ProductCard,
  BannerCarousel,
} from "@/components/collections";
import Pagination from "@/components/common/Pagination";

// ============ CONSTANTS (Module Level - Never Recreated) ============
const ITEMS_PER_PAGE = 8;

const FALLBACK_BANNERS = [
  { id: 1, image: IMAGES.csrJpeg, title: "Collection Banner 1" },
  { id: 2, image: IMAGES.indoor, title: "Indoor Collection" },
  { id: 3, image: IMAGES.outdoor, title: "Outdoor Collection" },
];

// ============ ANIMATION VARIANTS (Module Level) ============
const heroVariants = {
  section: {
    initial: { opacity: 0, scale: 1.1 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  },
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.4, duration: 1 } },
  },
  title: {
    initial: { y: 40, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.6, duration: 0.9 } },
  },
  subtitle: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { delay: 0.9, duration: 0.9 } },
  },
};

const fadeInTop = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
  viewport: { once: true, amount: 0.1 },
};

// ============ MAIN COMPONENT (Thin Page - Orchestration Only) ============
export default function Collections() {
  const { t } = useTranslation("collections");
  const location = useLocation();

  // -------- Filter & Pagination State --------
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 400);

  // -------- Static Categories (with i18n keys) --------
  const STATIC_CATEGORIES = [
    { id: 1, slug: "indoor", labelKey: "collections.filters.indoor" },
    { id: 2, slug: "outdoor", labelKey: "collections.filters.outdoor" },
  ];

  // -------- Banner State --------
  const [banners, setBanners] = useState(FALLBACK_BANNERS);
  const [activeBanner, setActiveBanner] = useState(0);
  const [loadingBanners, setLoadingBanners] = useState(true);

  // -------- Products Hook (Centralized Data Fetching) --------
  const {
    products,
    loading: loadingProducts,
    pagination,
  } = useProducts({
    page: currentPage,
    perPage: ITEMS_PER_PAGE,
    categoryId: activeFilter,
    search: debouncedSearch,
  });

  // -------- Product Detail Hook --------
  const {
    product: selectedProduct,
    loading: loadingDetail,
    fetchProduct,
    clearProduct,
  } = useProductDetail();

  // ============ DATA FETCHING ============

  // Fetch banners on mount
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const response = await getBanners();
        if (response.data.success && response.data.data?.length > 0) {
          setBanners(response.data.data);
        }
      } catch (err) {
        console.error("Banner fetch error:", err);
      } finally {
        setLoadingBanners(false);
      }
    })();

    return () => controller.abort();
  }, []);

  // URL query params - handle type from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");
    if (type) {
      const matched = STATIC_CATEGORIES.find(
        (cat) => cat.slug === type.toLowerCase(),
      );
      setActiveFilter(matched ? matched.id : "all");
      setCurrentPage(1);
    }
  }, [location.search]);

  // Auto-open product modal from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get("product_id");

    if (productId && !isNaN(parseInt(productId))) {
      // Fetch and open modal
      fetchProduct(parseInt(productId));

      // Clean URL parameter for better UX
      const newParams = new URLSearchParams(location.search);
      newParams.delete("product_id");
      const newSearch = newParams.toString();
      window.history.replaceState(
        {},
        "",
        `${location.pathname}${newSearch ? "?" + newSearch : ""}`,
      );
    }
  }, [location.search, fetchProduct]);

  // Auto-rotate banners
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // ============ HANDLERS (Stable References) ============

  const handleFilterChange = useCallback((filterId) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 1 && newPage <= pagination.lastPage) {
        setCurrentPage(newPage);
        // Scroll to products grid, not the very top
        const productsSection = document.getElementById("products-grid");
        if (productsSection) {
          productsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    },
    [pagination.lastPage],
  );

  const handleBannerPrev = useCallback(() => {
    setActiveBanner((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  const handleBannerNext = useCallback(() => {
    setActiveBanner((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const handleProductClick = useCallback(
    (product) => {
      fetchProduct(product.id);
    },
    [fetchProduct],
  );

  const handleCloseModal = useCallback(() => {
    clearProduct();
  }, [clearProduct]);

  // ============ RENDER ============

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <motion.section
        {...heroVariants.section}
        className="relative w-full hero-full bg-cover bg-center flex items-center justify-center "
        style={{ backgroundImage: `url(${HERO_BACKGROUNDS.collections})` }}
      >
        <motion.div
          {...heroVariants.overlay}
          className="absolute inset-0 bg-black/40"
        />
        <div className="relative z-10 text-center px-6 w-std mx-auto flex flex-col items-center justify-center h-full smooth-responsive">
          <motion.h1
            {...heroVariants.title}
            className="font-montserrat text-white font-extrabold text-3xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight drop-shadow-md smooth-responsive"
          >
            {t("collections.hero.title")}{" "}
            <span className="text-[#EEE4C8]">
              {t("collections.hero.titleHighlight")}
            </span>
          </motion.h1>
          <motion.p
            {...heroVariants.subtitle}
            className="text-gray-200 text-sm sm:text-lg md:text-xl mt-4 sm:mt-6 drop-shadow font-poppins max-w-2xl mx-auto"
          >
            {t("collections.hero.subtitle")}
          </motion.p>
        </div>
      </motion.section>

      {/* BANNER CAROUSEL */}
      <div className="w-full bg-[#F4F2EE] pt-0 sm:pt-10 px-0 sm:px-6 md:px-16 pb-0 mb-0">
        <motion.div {...fadeInTop} className="max-w-7xl mx-auto relative">
          <BannerCarousel
            banners={banners}
            activeIndex={activeBanner}
            onPrev={handleBannerPrev}
            onNext={handleBannerNext}
            onSelect={setActiveBanner}
            loading={loadingBanners}
          />
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <div className="w-full bg-[#F4F2EE] px-4 sm:px-6 md:px-16 sm:py-10 py-0 ">
        <motion.h2
          {...fadeInTop}
          className="mb-5 sm:mb-10 text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#28221F]"
        >
          {t("collections.main.title")}{" "}
          <span className="text-[#C58E47]">
            {t("collections.main.titleHighlight")}
          </span>{" "}
          {t("collections.main.titleSuffix")}
        </motion.h2>

        {/* FILTERS & SEARCH */}
        <motion.div
          {...fadeInTop}
          className="mt-0 sm:mt-6 sm:mt-10 flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-6 mx-auto w-full max-w-[70rem] px-2 sm:px-0"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.08 }}
              onClick={() => handleFilterChange("all")}
              className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-semibold shadow-md transition-all text-xs sm:text-sm cursor-pointer ${
                activeFilter === "all"
                  ? "bg-[#3C2F26] text-white"
                  : "bg-white border border-[#A6A099] text-[#28221F]"
              }`}
            >
              {t("collections.filters.all")}
            </motion.button>
            {STATIC_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.08 }}
                onClick={() => handleFilterChange(cat.id)}
                className={`px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl font-semibold shadow-sm transition-all text-xs sm:text-sm cursor-pointer ${
                  activeFilter === cat.id
                    ? "bg-[#3C2F26] text-white"
                    : "bg-white border border-[#A6A099] text-[#28221F]"
                }`}
              >
                {t(cat.labelKey)}
              </motion.button>
            ))}
          </div>
          <input
            type="text"
            placeholder={t("collections.filters.searchPlaceholder")}
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full sm:w-auto lg:w-72 px-3 sm:px-4 py-1.5 sm:py-2 border border-[#3C2F26] rounded-lg sm:rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-[#C58E47] transition-all text-xs sm:text-sm"
          />
        </motion.div>

        {/* PRODUCTS GRID */}
        {loadingProducts ? (
          <div className="flex items-center justify-center h-96">
            <Loader size={40} className="text-[#C58E47] animate-spin" />
          </div>
        ) : (
          <>
            <div
              id="products-grid"
              className="w-full max-w-[70rem] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5 md:gap-7 mt-6 sm:mt-10 px-2 sm:px-0 sm:pb-5 pb-10"
            >
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={handleProductClick}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-20 px-6">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#F4F2EE] to-[#E8E4DC] flex items-center justify-center shadow-inner">
                      <svg
                        className="w-10 h-10 text-[#C58E47] opacity-80"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#C58E47]/20 animate-[spin_20s_linear_infinite]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#3C2F26] text-center mb-2">
                    {t("collections.empty.title")}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 text-center max-w-md">
                    {t("collections.empty.subtitle")}
                  </p>
                </div>
              )}
            </div>

            {/* PAGINATION */}
            <Pagination
              currentPage={currentPage}
              lastPage={pagination.lastPage}
              onPageChange={handlePageChange}
              className="mb-5"
            />
          </>
        )}
      </div>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          loading={loadingDetail}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
