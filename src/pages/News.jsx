import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { IMAGES } from "@/assets/assets";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// --- Varian Animasi ---
const heroOverlayVariant = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 1 } },
};

const heroTextVariant = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const sectionFadeInVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { once: true, amount: 0.1 },
};

const cardItemVariant = {
  initial: { opacity: 0, y: 40 },
  whileInView: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
    },
  }),
  viewport: { once: true },
};

export default function News() {
  const { t } = useTranslation("news");

  const CARDS_PER_PAGE = 6;
  const totalCards = Array(24).fill(0);
  const totalPages = Math.ceil(totalCards.length / CARDS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const cardsToDisplay = totalCards.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) items.push(i);
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= maxVisible; i++) items.push(i);
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++)
          items.push(i);
      } else {
        for (let i = currentPage - 1; i <= currentPage + 2; i++) items.push(i);
      }
    }

    return items;
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-full h-full py-10 px-4 sm:px-6 lg:px-12">
        {/* -- HEADER -- */}
        <motion.div
          {...sectionFadeInVariant}
          className="text-center mb-12 sm:mb-16 mt-16 sm:mt-24"
        >
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#28221F] font-montserrat"
            dangerouslySetInnerHTML={{
              __html: t("hero.title", {
                interpolation: { escapeValue: false },
              }),
            }}
          />
          <p className="text-gray-600 mt-3 text-base sm:text-lg">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* -- TOP NEWS -- */}
        <Link to={`/news/1`}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-7xl mx-auto mb-12 sm:mb-16 lg:mb-20 px-0"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative w-full h-[220px] sm:h-[280px] md:h-[380px] lg:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg lg:shadow-xl group cursor-pointer"
            >
              <motion.img
                src={IMAGES.csrJpeg}
                alt="Big News"
                className="w-full h-full object-cover transition-all duration-500 ease-out"
                whileHover={{
                  scale: 1.12,
                  filter: "brightness(1.15) contrast(1.25)",
                }}
              />

              <motion.div
                className="
                  absolute inset-0 
                  bg-gradient-to-br from-black/50 via-black/30 to-transparent
                  transition-all duration-300
                  group-hover:from-black/60 group-hover:via-black/40
                "
                whileHover={{ backdropFilter: "blur(3px)" }}
              />

              <div
                className="
                  absolute bottom-4 sm:bottom-6 left-4 sm:left-6
                  text-white 
                  flex flex-col justify-end
                  w-[60%] sm:w-1/2
                  transition-all duration-500
                  group-hover:translate-y-[-6px]
                "
              >
                <h2 className="text-[12px] sm:text-2xl md:text-3xl font-bold leading-snug">
                  {t("bigNews.title")}
                </h2>

                <p className="mt-2 sm:mt-4 text-xs sm:text-sm opacity-90 group-hover:opacity-100">
                  {t("bigNews.date")}
                </p>
              </div>

              <div
                className="
                  absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none 
                  group-hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]
                  transition-all duration-500
                "
              />
            </motion.div>
          </motion.div>
        </Link>

        {/* -- MOBILE CARDS SECTION -- */}
        <div className="lg:hidden max-w-7xl mx-auto mb-10 sm:mb-12">
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {cardsToDisplay.map((_, index) => (
              <Link to={`/csr`} key={startIndex + index} className="w-full">
                <motion.div
                  variants={cardItemVariant}
                  viewport={{ once: true }}
                  whileInView="whileInView"
                  initial="initial"
                  custom={index}
                  className="
                    group 
                    bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden
                    transition-all duration-500 ease-out cursor-pointer 
                    hover:shadow-lg
                    relative 
                    h-[140px] sm:h-[180px]
                    w-full
                  "
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={IMAGES.csrJpeg}
                    className="w-full h-full object-cover"
                    alt={`Collection ${startIndex + index + 1}`}
                  />

                  <div
                    className="
                      absolute inset-0 
                      bg-gradient-to-t from-black/60 via-transparent to-transparent
                      transition-all duration-500 ease-out 
                    "
                  />

                  <div
                    className="
                      absolute bottom-0 inset-x-0 p-2 sm:p-3
                      transition-all duration-500 ease-out 
                      text-white
                      flex flex-col justify-end h-full
                    "
                  >
                    <p className="font-semibold text-[10px] sm:text-xs leading-tight line-clamp-1">
                      {t("card.description")}
                    </p>

                    <div className="flex items-center justify-between mt-1 sm:mt-2 text-[8px] sm:text-[10px] text-gray-200">
                      <span className="line-clamp-1">{t("card.date")}</span>

                      <motion.span
                        whileHover={{ x: 1 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium flex items-center gap-0.5 text-[#CB9147] transition flex-shrink-0 ml-1"
                      >
                        {t("card.readMore")}
                        <ChevronRight size={10} />
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* -- TABLET/DESKTOP CARDS SECTION -- */}
        <div className="hidden lg:block max-w-7xl mx-auto mb-12 sm:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cardsToDisplay.map((_, index) => (
              <Link to={`/csr`} key={startIndex + index} className="w-full">
                <motion.div
                  variants={cardItemVariant}
                  viewport={{ once: true }}
                  whileInView="whileInView"
                  initial="initial"
                  custom={index}
                  className="
                    group 
                    bg-white rounded-xl shadow-lg overflow-hidden
                    transition-all duration-500 ease-out cursor-pointer 
                    hover:shadow-xl hover:scale-[1.05]
                    relative 
                    h-[350px]
                    w-full
                  "
                >
                  <div className="w-full h-[350px] group-hover:h-[230px] transition-all duration-500 ease-out">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      src={IMAGES.csrJpeg}
                      className="w-full h-full object-cover"
                      alt={`Collection ${startIndex + index + 1}`}
                    />
                  </div>

                  <div
                    className="
                      absolute bottom-0 inset-x-0 p-5
                      transition-all duration-500 ease-out 
                      bg-black/20 backdrop-blur-sm 
                      text-white 
                      group-hover:static 
                      group-hover:bg-white 
                      group-hover:text-black 
                      group-hover:backdrop-blur-none
                    "
                  >
                    <p className="font-semibold text-sm leading-snug line-clamp-3">
                      {t("card.description")}
                    </p>

                    <div className="flex items-center justify-between mt-4 text-xs text-gray-200 group-hover:text-gray-600">
                      <span className="text-xs">{t("card.date")}</span>

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
            ))}
          </div>
        </div>

        {/* -- PAGINATION -- */}
        <motion.div
          {...sectionFadeInVariant}
          transition={{ duration: 0.6 }}
          className="mt-12 sm:mt-16 flex justify-center gap-2"
        >
          {/* Prev */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="
              w-8 h-8 rounded-md bg-[#E7E4DF]
              flex items-center justify-center text-gray-700
              hover:bg-[#D9A556] hover:text-white transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <ChevronLeft size={16} />
          </motion.button>

          {/* Numbered */}
          {getPaginationItems().map((num) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              key={num}
              onClick={() => handlePageClick(num)}
              className={`
                w-8 h-8 rounded-md flex items-center justify-center font-medium text-sm
                transition
                ${
                  num === currentPage
                    ? "bg-[#D9A556] text-white"
                    : "bg-white text-gray-700 shadow-sm hover:bg-[#D9A556] hover:text-white"
                }
              `}
            >
              {num}
            </motion.button>
          ))}

          {/* Next */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="
              w-8 h-8 rounded-md bg-[#E7E4DF]
              flex items-center justify-center text-gray-700
              hover:bg-[#D9A556] hover:text-white transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <ChevronRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
