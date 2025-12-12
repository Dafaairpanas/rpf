import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { IMAGES } from "@/assets/assets";
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

const featuredCardVariant = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 1 } },
  viewport: { once: true, amount: 0.1 },
};

const featuredImageVariant = {
  initial: { opacity: 0, y: 40, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.5, duration: 1 },
  },
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type");

    if (type === "indoor" || type === "outdoor") {
      setActiveFilter(type);
      setActivePage(1);
    }
  }, [location.search]);

  const productData = [
    { id: 1, name: t("collections.products.indoor.1"), category: "indoor" },
    { id: 2, name: t("collections.products.outdoor.1"), category: "outdoor" },
    { id: 3, name: t("collections.products.indoor.2"), category: "indoor" },
    { id: 4, name: t("collections.products.outdoor.2"), category: "outdoor" },
    { id: 5, name: t("collections.products.indoor.3"), category: "indoor" },
    { id: 6, name: t("collections.products.outdoor.3"), category: "outdoor" },
    { id: 7, name: t("collections.products.indoor.4"), category: "indoor" },
    { id: 8, name: t("collections.products.outdoor.4"), category: "outdoor" },
    { id: 9, name: t("collections.products.indoor.5"), category: "indoor" },
    { id: 10, name: t("collections.products.outdoor.5"), category: "outdoor" },
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

  return (
    <div className="w-full overflow-x-hidden">
      {/* HERO */}
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

      {/* MAIN */}
      <div className="w-full bg-[#F4F2EE] py-16 px-4 sm:px-6 md:px-16">
        <motion.h2
          {...viewFadeInTopVariant}
          className="mb-20 text-center text-2xl sm:text-3xl md:text-5xl font-bold text-[#1A1A1A]"
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
          className="mt-10 flex flex-col md:flex-row items-center justify-between mx-auto w-[77%] "
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center md:justify-start w-std mb-4">
            <motion.button
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                setActiveFilter("indoor");
                setActivePage(1);
              }}
              className={`px-6 py-2 rounded-xl border border-[#A6A099] font-semibold shadow-sm ${
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

            <motion.button
              whileHover={{ scale: 1.08 }}
              onClick={() => {
                setActiveFilter("all");
                setActivePage(1);
              }}
              className={`px-6 py-2 rounded-xl font-semibold shadow-md ${
                activeFilter === "all"
                  ? "bg-[#3C2F26] text-white"
                  : "bg-white border border-[#A6A099] " 
              }`}
            >
              {t("collections.filters.all")}
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
            className="w-82 md:w-[100vh] px-4 py-3 border border-[#3C2F26] rounded-xl bg-transparent focus:outline-none "
          />
        </motion.div>

        {/* PRODUCT GRID */}
        <div
          className="
            w-[80%] mx-auto
            grid 
            grid-cols-2 sm:grid-cols-3 md:grid-cols-4
            gap-5 md:gap-7
            mt-10
          "
        >
          {paginatedProducts.map((item) => (
            <motion.div
              key={item.id}
              custom={item.id}
              variants={productGridItemVariant}
              whileInView="whileInView"
              initial="initial"
              whileHover={{ y: -6 }}
              className="
                group border border-[#E5DCC7]
                rounded-2xl p-3 shadow-sm flex flex-col
                items-center justify-start transition-all duration-300
                hover:bg-[#E5DCC7]/70
                w-full
              "
            >
              <div className="relative w-full h-56 sm:h-72 rounded-xl overflow-hidden flex items-center justify-center">
                <motion.img
                  src={IMAGES.chairSvg}
                  className="absolute inset-0 w-full h-full object-contain group-hover:opacity-0 transition-opacity duration-300"
                />
                <motion.img
                  src={IMAGES.chair2}
                  className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
          className="flex items-center justify-center gap-3 mt-12"
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
    </div>
  );
}