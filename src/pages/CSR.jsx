import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft, Loader2 } from "lucide-react";
import { IMAGES, HERO_BACKGROUNDS } from "@/assets/assets";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCsrs } from "@/api/csr.api";
import { generatePagination } from "@/utils/pagination";

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

function CSR() {
  const { t } = useTranslation("csr");

  // ========== STATE ==========
  const [csrs, setCsrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 6,
    total: 0,
  });

  // ========== FETCH CSR DATA ==========
  useEffect(() => {
    fetchCsrs(currentPage);
  }, [currentPage]);

  const fetchCsrs = async (page) => {
    setLoading(true);
    try {
      const response = await getCsrs({ page, per_page: 6 });
      if (response.data.success) {
        const result = response.data.data;
        // Backend now returns array directly, not paginated
        if (Array.isArray(result)) {
          setCsrs(result);
          // No pagination anymore
          setPagination({
            current_page: 1,
            last_page: 1,
            per_page: result.length,
            total: result.length,
          });
        } else {
          // Fallback for old paginated response
          setCsrs(result.data || []);
          setPagination({
            current_page: result.current_page,
            last_page: result.last_page,
            per_page: result.per_page,
            total: result.total,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching CSRs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ========== HANDLER PAGINATION ==========
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.last_page) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination items with ellipsis
  const getPaginationItems = () => {
    return generatePagination(currentPage, pagination.last_page);
  };

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return t("card.date");
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full">
      {/* SECTION: HERO */}
      <motion.section
        {...heroVariants.section}
        className="relative w-full hero-full bg-cover bg-center flex items-center justify-center text-center"
        style={{ backgroundImage: `url(${HERO_BACKGROUNDS.csr})` }}
      >
        <motion.div
          {...heroVariants.overlay}
          className="absolute inset-0 bg-black/40"
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mt-16 sm:mt-0 smooth-responsive">
          <motion.h1
            {...heroVariants.title}
            className="text-white font-montserrat font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight drop-shadow-md smooth-responsive"
          >
            {t("hero.title1")}{" "}
            <span className="text-[#DFD7BF]">{t("hero.highlight")}</span>{" "}
            <span>{t("hero.title2")}</span>
          </motion.h1>

          <motion.p
            {...heroVariants.subtitle}
            className="text-gray-200 text-sm sm:text-lg md:text-xl mt-4 sm:mt-6 drop-shadow font-poppins"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </motion.section>

      {/* --- */}

      {/* SECTION: CONTENT (CSR LIST) */}
      <div className="w-full bg-[#F1EEE7] py-20 px-6">
        {/* HEADING */}
        <motion.div {...sectionFadeInVariant} className="text-center mb-16">
          <h1
            className="text-4xl font-bold text-[#28221F]"
            dangerouslySetInnerHTML={{
              __html: t("content.title", {
                interpolation: { escapeValue: false },
              }),
            }}
          />

          <p className="text-gray-600 mt-3 text-lg">{t("content.subtitle")}</p>
        </motion.div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-[#3C2F26]" size={48} />
          </div>
        )}

        {/* CARDS - FLEX LAYOUT */}
        {!loading && (
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {csrs.length > 0 ? (
              csrs.map((csr, index) => (
                <Link
                  to={`/csr/${csr.id}`}
                  key={csr.id}
                  className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-27px)] max-w-[400px]"
                >
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
                      w-full
                      group-hover:h-[480px]
                      group-hover:bg-white
                      transform scale-100
                      group-hover:scale-[1.05]
                    "
                  >
                    <div className="w-full h-[350px] group-hover:h-[230px] transition-all duration-500 ease-out bg-gray-200 flex items-center justify-center">
                      {csr.thumbnail_url ? (
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                          src={csr.thumbnail_url}
                          className="w-full h-full object-cover"
                          alt={csr.title}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-500 px-6 text-center">
                          <svg
                            className="w-16 h-16 mb-3 text-gray-400"
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
                          <p className="font-medium">{t("empty.noImage")}</p>
                        </div>
                      )}
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
                      <p className="font-semibold leading-snug line-clamp-2">
                        {csr.title}
                      </p>

                      <div className="flex items-center justify-between mt-4 text-sm text-gray-200 group-hover:text-black">
                        <span>{formatDate(csr.created_at)}</span>

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
              ))
            ) : (
              <div className="w-full flex justify-center">
                <div className="flex flex-col items-center justify-center py-16 sm:py-20 px-6">
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
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#C58E47]/20 animate-[spin_20s_linear_infinite]" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#3C2F26] text-center mb-2">
                    {t("empty.title")}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-500 text-center max-w-md">
                    {t("empty.subtitle")}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && pagination.last_page > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mt-12 p-10 pb-20"
          >
            <motion.button
              whileHover={{ scale: currentPage > 1 ? 1.1 : 1 }}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-400 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </motion.button>

            {getPaginationItems().map((num, idx) =>
              num === "..." ? (
                <span
                  key={`dots-${idx}`}
                  className="w-8 h-8 flex items-center justify-center text-gray-500"
                >
                  ...
                </span>
              ) : (
                <motion.button
                  key={num}
                  whileHover={{ scale: 1.12 }}
                  onClick={() => handlePageClick(num)}
                  className={`w-8 h-8 rounded-sm flex items-center justify-center border text-sm font-bold transition-all ${
                    num === currentPage
                      ? "bg-[#C58E47] text-white border-[#C58E47]"
                      : "border-gray-400 text-gray-500 hover:bg-[#C58E47] hover:text-white"
                  }`}
                >
                  {num}
                </motion.button>
              ),
            )}

            <motion.button
              whileHover={{
                scale: currentPage < pagination.last_page ? 1.1 : 1,
              }}
              onClick={handleNextPage}
              disabled={currentPage === pagination.last_page}
              className="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-400 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default CSR;
