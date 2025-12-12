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

function Collections() {
  const { t } = useTranslation("csr");
  
  // ========== KONFIGURASI ==========
  const CARDS_PER_PAGE = 6; // Ubah jumlah card per halaman di sini
  const totalCards = Array(24).fill(0); // Total 24 card (4 halaman x 6 card)
  const totalPages = Math.ceil(totalCards.length / CARDS_PER_PAGE);
  
  // ========== STATE PAGINATION ==========
  const [currentPage, setCurrentPage] = useState(1);
  
  // Hitung card yang ditampilkan di halaman saat ini
  const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
  const endIndex = startIndex + CARDS_PER_PAGE;
  const cardsToDisplay = totalCards.slice(startIndex, endIndex);
  
  // ========== HANDLER PAGINATION ==========
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Generate pagination items (tampilkan max 4 halaman)
  const getPaginationItems = () => {
    const items = [];
    const maxVisible = 4;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= maxVisible; i++) {
          items.push(i);
        }
      } else if (currentPage >= totalPages - 1) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        for (let i = currentPage - 1; i <= currentPage + 2; i++) {
          items.push(i);
        }
      }
    }
    
    return items;
  };

  return (
    <div className="w-full">
      {/* SECTION: HERO */}
      <section
        className="relative w-full h-[100vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${IMAGES.bg1})` }}
      >
        <motion.div
          {...heroOverlayVariant}
          className="absolute inset-0 bg-black/40"
        />

        <motion.div
          {...heroTextVariant}
          className="relative z-10 text-center px-6 max-w-172"
        >
          <h1
            className="text-white font-montserrat font-extrabold text-4xl sm:text-5xl md:text-7xl leading-tight drop-shadow-md">
            {t("hero.title1")}{" "}
            <span className="text-[#C58E47]">{t("hero.highlight")}</span>{" "}
            <span>{t("hero.title2")}</span>
          </h1>

          <p className="text-gray-200 text-lg md:text-xl mt-6 drop-shadow">
            {t("hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* --- */}

      {/* SECTION: CONTENT (COLLECTIONS HIGHLIGHTS) */}
      <div className="w-full bg-[#F1EEE7] py-20 px-6">
        {/* HEADING */}
        <motion.div {...sectionFadeInVariant} className="text-center mb-16">
          <h1
            className="text-4xl font-bold text-gray-800"
            dangerouslySetInnerHTML={{
              __html: t("content.title", {
                interpolation: { escapeValue: false },
              }),
            }}
          />

          <p className="text-gray-600 mt-3 text-lg">{t("content.subtitle")}</p>
        </motion.div>

        {/* CARDS - FLEX LAYOUT */}
        <div className="max-w-[100] mx-auto flex flex-wrap justify-center gap-10">
          {cardsToDisplay.map((_, index) => (
            <Link to={`/csr`} key={startIndex + index}>
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
                  hover:shadow-xl 
                  relative 
                  h-[350px]
                  w-[400px]
                  group-hover:h-[480px]
                  group-hover:bg-white
                  transform scale-100
                  group-hover:scale-[1.05]
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
                  <p className="font-semibold leading-snug">
                    {t("card.description")}
                  </p>

                  <div className="flex items-center justify-between mt-4 text-sm text-gray-200 group-hover:text-black">
                    <span>{t("card.date")}</span>

                    <motion.span
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                      className="font-medium flex items-center gap-1 text-[#CB9147] hover:text-[#8B5B24] transition"
                    >
                      {t("content.readMore")}
                      <ChevronRight size={16} />
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* PAGINATION */}
        <motion.div
          {...sectionFadeInVariant}
          transition={{ duration: 0.6 }}
          className="mt-16 flex justify-center gap-2"
        >
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
            aria-label={t("content.pagination.previous")}
          >
            <ChevronLeft size={16} />
          </motion.button>

          {getPaginationItems().map((num) => (
            <motion.button
              whileHover={{ scale: 1.1 }}
              key={num}
              onClick={() => handlePageClick(num)}
              className={`
                w-8 h-8 rounded-md flex items-center justify-center font-medium
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
            aria-label={t("content.pagination.next")}
          >
            <ChevronRight size={16} />
          </motion.button>
        </motion.div>

    
      </div>
    </div>
  );
}

export default Collections;