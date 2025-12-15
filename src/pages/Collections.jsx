import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { IMAGES, PRODUCTS } from "@/assets/assets";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const heroSectionVariant = {
  initial: { opacity: 0, scale: 1.1 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

const heroOverlayVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.4, duration: 1 } },
};

const heroTitleVariant = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { delay: 0.6, duration: 0.9 } },
};

const heroSubtitleVariant = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { delay: 0.9, duration: 0.9 } },
};

const viewFadeInTopVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7 },
  viewport: { once: true, amount: 0.1 },
};

const productGridItemVariant = {
  initial: { scale: 0.85 },
  whileInView: (id) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.1, delay: id * 0.1 },
  }),
  viewport: { once: true },
};

const ITEMS_PER_PAGE = 8;

export default function Collections() {
  const { t } = useTranslation("collections");
  const location = useLocation();

  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [activeBanner, setActiveBanner] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);

  const banners = [
    {
      id: 1,
      image: IMAGES.csrJpeg,
    },
    {
      id: 2,
      image: IMAGES.indoor,
    },
    {
      id: 3,
      image: IMAGES.outdoor,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");

    if (type === "indoor" || type === "outdoor") {
      setActiveFilter(type);
      setActivePage(1);
    }
  }, [location.search]);

  const productData = [
    {
      id: 1,
      name: "Cordele Dining Chair",
      category: "indoor",
      image: PRODUCTS.cordeleDiningChair1,
      images: [PRODUCTS.cordeleDiningChair1, PRODUCTS.cordeleDiningChair],
      width: "100",
      height: "100",
      depth: "100",
      material:
        "Solid Wood with natural finish, ergonomic design for comfort and durability",
    },
    {
      id: 2,
      name: "Cordele Dining Table",
      category: "indoor",
      image: PRODUCTS.cordeleDiningTable1,
      images: [PRODUCTS.cordeleDiningTable1, PRODUCTS.cordeleDiningTable],
      width: "180",
      height: "75",
      depth: "100",
      material:
        "Sustainable timber with premium finish, spacious surface for family gatherings",
    },
    {
      id: 3,
      name: "Edgewood Coffee Table",
      category: "indoor",
      image: PRODUCTS.edgewoodCoffeeTable1,
      images: [PRODUCTS.edgewoodCoffeeTable1, PRODUCTS.edgewoodCoffeeTable],
      width: "120",
      height: "45",
      depth: "70",
      material:
        "High-quality wood with modern design, perfect for contemporary living spaces",
    },
    {
      id: 4,
      name: "Edgewood Lounge Chair",
      category: "indoor",
      image: PRODUCTS.edgewoodLoungeChair1,
      images: [PRODUCTS.edgewoodLoungeChair1, PRODUCTS.edgewoodLoungeChair],
      width: "90",
      height: "110",
      depth: "95",
      material:
        "Premium upholstered seat with wooden frame, ideal for relaxation zones",
    },
    {
      id: 5,
      name: "Edgewood Lounging Set",
      category: "indoor",
      image: PRODUCTS.edgewoodLounggingSet1,
      images: [PRODUCTS.edgewoodLounggingSet1, PRODUCTS.edgewoodLounggingSet],
      width: "250",
      height: "85",
      depth: "100",
      material:
        "Complete modular set with cushioned seating, versatile for any room layout",
    },
    {
      id: 6,
      name: "Edgewood Sofa 2 Seater",
      category: "indoor",
      image: PRODUCTS.edgewoodSofa2Seater1,
      images: [PRODUCTS.edgewoodSofa2Seater1, PRODUCTS.edgewoodSofa2Seater],
      width: "160",
      height: "85",
      depth: "90",
      material:
        "Durable upholstered sofa with wooden legs, compact yet comfortable seating",
    },
    {
      id: 7,
      name: "Oregon Coffee Table",
      category: "outdoor",
      image: PRODUCTS.oregonCoffeeTable1,
      images: [PRODUCTS.oregonCoffeeTable1, PRODUCTS.oregonCoffeeTable],
      width: "130",
      height: "50",
      depth: "80",
      material:
        "Weather-resistant wood, designed for outdoor resilience and elegance",
    },
    {
      id: 8,
      name: "Oregon Lounge Chair",
      category: "outdoor",
      image: PRODUCTS.oregonLoungeChair1,
      images: [PRODUCTS.oregonLoungeChair1, PRODUCTS.oregonLoungeChair],
      width: "95",
      height: "115",
      depth: "100",
      material:
        "All-weather upholstery with stainless steel frame, perfect for outdoor comfort",
    },
    {
      id: 9,
      name: "Oregon Lounge Set",
      category: "outdoor",
      image: PRODUCTS.oregonLoungeSet1,
      images: [PRODUCTS.oregonLoungeSet1, PRODUCTS.oregonLoungeSet],
      width: "280",
      height: "90",
      depth: "110",
      material:
        "Complete outdoor set with weather-resistant cushions, ideal for patios and gardens",
    },
    {
      id: 10,
      name: "Oregon Side Table",
      category: "outdoor",
      image: PRODUCTS.oregonSideTable1,
      images: [PRODUCTS.oregonSideTable1, PRODUCTS.oregonSideTable],
      width: "60",
      height: "55",
      depth: "60",
      material: "Lightweight durable wood, perfect for outdoor accent pieces",
    },
    {
      id: 11,
      name: "Oregon Sofa 2 Seater",
      category: "outdoor",
      image: PRODUCTS.oregonSofa2Seater1,
      images: [PRODUCTS.oregonSofa2Seater1, PRODUCTS.oregonSofa2Seater],
      width: "170",
      height: "90",
      depth: "95",
      material:
        "Water-resistant upholstery with sturdy frame, designed for harsh outdoor conditions",
    },
    {
      id: 12,
      name: "Rochester Dining Bench",
      category: "indoor",
      image: PRODUCTS.rochesterDiningBench1,
      images: [PRODUCTS.rochesterDiningBench1, PRODUCTS.rochesterDiningBench],
      width: "150",
      height: "50",
      depth: "50",
      material:
        "Solid oak construction with natural finish, excellent for dining areas",
    },
    {
      id: 13,
      name: "Rochester Dining Table",
      category: "indoor",
      image: PRODUCTS.rochesterDiningTable1,
      images: [PRODUCTS.rochesterDiningTable1, PRODUCTS.rochesterDiningTable],
      width: "200",
      height: "78",
      depth: "105",
      material:
        "Premium hardwood with refined craftsmanship, statement piece for dining rooms",
    },
    {
      id: 14,
      name: "Cordele Dining Chair Alt",
      category: "indoor",
      image: PRODUCTS.cordeleDiningChair,
      images: [PRODUCTS.cordeleDiningChair, PRODUCTS.cordeleDiningChair1],
      width: "100",
      height: "100",
      depth: "100",
      material:
        "Alternative finish available, maintains same ergonomic excellence",
    },
    {
      id: 15,
      name: "Cordele Dining Table Alt",
      category: "indoor",
      image: PRODUCTS.cordeleDiningTable,
      images: [PRODUCTS.cordeleDiningTable, PRODUCTS.cordeleDiningTable1],
      width: "180",
      height: "75",
      depth: "100",
      material: "Extended surface option with premium protection",
    },
    {
      id: 16,
      name: "Edgewood Coffee Table Alt",
      category: "indoor",
      image: PRODUCTS.edgewoodCoffeeTable,
      images: [PRODUCTS.edgewoodCoffeeTable, PRODUCTS.edgewoodCoffeeTable1],
      width: "120",
      height: "45",
      depth: "70",
      material: "Contemporary style variant for modern interiors",
    },
  ];

  const filtered = productData
    .filter((p) =>
      activeFilter === "all" ? true : p.category === activeFilter,
    )
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginatedProducts = filtered.slice(
    (activePage - 1) * ITEMS_PER_PAGE,
    activePage * ITEMS_PER_PAGE,
  );

  const handlePrev = () => setActivePage((p) => (p > 1 ? p - 1 : p));

  const handleNext = () => setActivePage((p) => (p < totalPages ? p + 1 : p));

  const handleBannerPrev = () => {
    setActiveBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleBannerNext = () => {
    setActiveBanner((prev) => (prev + 1) % banners.length);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setImageIndex(0);
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProduct) {
      setImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct) {
      setImageIndex(
        (prev) =>
          (prev - 1 + selectedProduct.images.length) %
          selectedProduct.images.length,
      );
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <motion.section
        {...heroSectionVariant}
        className="relative w-full min-h-[95vh] sm:min-h-[100vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${IMAGES.bg1})` }}
      >
        <motion.div
          {...heroOverlayVariant}
          className="absolute inset-0 bg-black/40"
        />

        <div className="relative z-10 text-center px-6 w-std h-full mx-auto">
          <motion.h1
            {...heroTitleVariant}
            className="font-montserrat text-white font-extrabold text-5xl sm:text-6xl leading-tight drop-shadow-md"
          >
            {t("collections.hero.title")}{" "}
            <span className="text-[#EEE4C8]">
              {t("collections.hero.titleHighlight")}
            </span>
          </motion.h1>

          <motion.p
            {...heroSubtitleVariant}
            className="text-gray-200 text-base sm:text-lg md:text-xl mt-6 drop-shadow font-poppins"
          >
            {t("collections.hero.subtitle")}
          </motion.p>
        </div>
      </motion.section>

      {/* BANNER CAROUSEL SECTION */}
      <div className="w-full bg-[#F4F2EE] py-20 px-4 sm:px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl mx-auto relative"
        >
          <div className="relative h-[240px] sm:h-[320px] md:h-[400px] rounded-2xl overflow-hidden">
            {banners.map((banner, index) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: index === activeBanner ? 1 : 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <motion.img
                  src={banner.image}
                  alt="Banner"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}

            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleBannerPrev}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
            >
              <ChevronLeft size={20} className="text-white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleBannerNext}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 p-2 rounded-full transition"
            >
              <ChevronRight size={20} className="text-white" />
            </motion.button>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {banners.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveBanner(index)}
                  animate={{
                    width: index === activeBanner ? 24 : 8,
                    backgroundColor:
                      index === activeBanner ? "#CB9147" : "#FFFFFF",
                  }}
                  className="h-2 rounded-full transition-all"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* MAIN */}
      <div className="w-full bg-[#F4F2EE]  px-4 sm:px-6 md:px-16">
        <motion.h2
          {...viewFadeInTopVariant}
          className="mb-20 text-center text-2xl sm:text-3xl md:text-5xl font-bold text-[#28221F]"
        >
          {t("collections.main.title")}{" "}
          <span className="text-[#C58E47]">
            {t("collections.main.titleHighlight")}
          </span>{" "}
          {t("collections.main.titleSuffix")}
        </motion.h2>

        {/* FILTER */}
        <motion.div
          {...viewFadeInTopVariant}
          className="mt-10 flex flex-col md:flex-row items-center justify-between mx-auto w-[77%]"
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center md:justify-start w-std mb-4">
            <motion.button
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                setActiveFilter("all");
                setActivePage(1);
              }}
              className={`px-6 py-2 rounded-xl font-semibold shadow-md ${
                activeFilter === "all"
                  ? "bg-[#3C2F26] text-white"
                  : "bg-white border border-[#A6A099]"
              }`}
            >
              {t("collections.filters.all")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                setActiveFilter("indoor");
                setActivePage(1);
              }}
              className={`px-6 py-2 rounded-xl border border-[#A6A099] font-semibold text-[#28221F] shadow-sm ${
                activeFilter === "indoor"
                  ? "bg-[#3C2F26] text-white"
                  : "bg-white"
              }`}
            >
              {t("collections.filters.indoor")}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                setActiveFilter("outdoor");
                setActivePage(1);
              }}
              className={`px-6 py-2 rounded-xl border border-[#A6A099] font-semibold shadow-sm ${
                activeFilter === "outdoor"
                  ? "bg-[#3C2F26] text-white"
                  : "bg-white"
              }`}
            >
              {t("collections.filters.outdoor")}
            </motion.button>
          </div>

          <motion.input
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            type="text"
            placeholder={t("collections.filters.searchPlaceholder")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setActivePage(1);
            }}
            className="w-82 md:w-[100vh] px-4 py-3 border border-[#3C2F26] rounded-xl bg-transparent focus:outline-none"
          />
        </motion.div>

        {/* PRODUCT GRID */}
        <div className="w-[80%] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-7 mt-10">
          {paginatedProducts.map((item) => (
            <motion.div
              key={item.id}
              custom={item.id}
              variants={productGridItemVariant}
              whileInView="whileInView"
              initial="initial"
              whileHover={{ y: -6 }}
              onClick={() => openProductModal(item)}
              className="group border border-[#E5DCC7] rounded-2xl p-3 shadow-sm flex flex-col items-center justify-start transition-all duration-300 hover:bg-[#E5DCC7]/70 w-full cursor-pointer"
            >
              <div className="relative w-full h-40 sm:h-72 rounded-xl overflow-hidden flex items-center justify-center bg-white">
                {/* Image 1 - Default */}
                <motion.img
                  src={item.images[0]}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-contain p-4 group-hover:opacity-0 transition-opacity duration-300"
                />

                {/* Image 2 - Hover */}
                <motion.img
                  src={item.images[1]}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-contain p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>

              <p className="mt-3 text-[16px] sm:text-[20px] font-semibold text-[#1A1A1A] group-hover:text-[#6b4b3a] text-center">
                {item.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* PAGINATION */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mt-12 p-10 pb-20"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handlePrev}
            className="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-400"
          >
            <ChevronLeft size={16} />
          </motion.button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <motion.button
              whileHover={{ scale: 1.12 }}
              key={num}
              onClick={() => setActivePage(num)}
              className={`w-8 h-8 rounded-sm flex items-center justify-center border text-sm font-bold ${
                num === activePage
                  ? "bg-[#C58E47] text-white border-[#C58E47]"
                  : "border-gray-400 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {num}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleNext}
            className="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-400"
          >
            <ChevronRight size={16} />
          </motion.button>
        </motion.div>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProductModal}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F4F2EE] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10">
                {/* LEFT SIDE - Images */}
                <div className="flex flex-col gap-4">
                  <div className="relative bg-white rounded-2xl overflow-hidden h-[350px] md:h-[450px] flex items-center justify-center">
                    <motion.img
                      key={imageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      src={selectedProduct.images[imageIndex]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>

                  {/* Image Navigation */}
                  <div className="flex gap-2 justify-center">
                    <div className="flex gap-2">
                      {selectedProduct.images.map((_, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => setImageIndex(idx)}
                          animate={{
                            width: idx === imageIndex ? 24 : 8,
                            backgroundColor:
                              idx === imageIndex ? "#C58E47" : "#E5E5E5",
                          }}
                          className="h-2 rounded-full transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  <div className="flex gap-2">
                    {selectedProduct.images.map((img, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => setImageIndex(idx)}
                        className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${
                          idx === imageIndex
                            ? "border-[#C58E47]"
                            : "border-[#E5DCC7]"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${selectedProduct.name} ${idx + 1}`}
                          className="w-full h-full object-contain p-1"
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* RIGHT SIDE - Details */}
                <div className="flex flex-col justify-start relative">
                  {/* Close Button - Top Right Corner */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={closeProductModal}
                    className="absolute -top-4 -right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2 z-20 shadow-lg"
                  >
                    <X size={24} />
                  </motion.button>

                  {/* Title - Paling Atas */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6 pr-8">
                    {selectedProduct.name}
                  </h1>

                  {/* Dimensions */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 mt-[6dvh]">
                    <h2 className="text-lg sm:text-2xl font-bold text-[#1A1A1A] mb-3 sm:mb-4">
                      Dimensions
                    </h2>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4">
                      <div className="text-center">
                        <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
                          Width
                        </p>
                        <p className="text-base sm:text-xl font-bold text-[#1A1A1A]">
                          {selectedProduct.width} Cm
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
                          Height
                        </p>
                        <p className="text-base sm:text-xl font-bold text-[#1A1A1A]">
                          {selectedProduct.height} Cm
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-600 text-xs sm:text-sm mb-1 sm:mb-2">
                          Depth
                        </p>
                        <p className="text-base sm:text-xl font-bold text-[#1A1A1A]">
                          {selectedProduct.depth} Cm
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Materials */}
                  <div className="bg-white rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-2xl font-bold text-[#1A1A1A] mb-3 sm:mb-4">
                      Materials
                    </h2>
                    <p className="text-xs sm:text-base text-gray-700 leading-relaxed">
                      {selectedProduct.material}
                    </p>
                  </div>

                  {/* Order Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#C58E47] hover:bg-[#B8793A] text-white font-bold text-base sm:text-lg md:text-xl py-3 sm:py-4 mt-[2vh] rounded-xl sm:rounded-2xl transition-all w-full"
                  >
                    Order Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
