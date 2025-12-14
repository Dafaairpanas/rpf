import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { IMAGES } from "@/assets/assets";
import { useTranslation } from "react-i18next";

// --- ANIMATION VARIANTS ---

// Hero Text Variant (Slide Up & Fade In)
const heroTextVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// Hero Paragraph Variant
const heroParagraphVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25 } },
};

// Varian untuk Section Heading/Title (Fade In dari atas)
const sectionHeadingVariant = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true, amount: 0.1 },
};

// Varian untuk Job Card (Staggered Slide Up & Fade In)
const jobCardVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: index * 0.1 },
  }),
  viewport: { once: true },
};

// Varian untuk Pagination (Global Fade In)
const paginationVariant = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { duration: 0.6 } },
  viewport: { once: true },
};

function Careers() {
  const { t } = useTranslation("careers");

  // All jobs data
  const allJobs = [
    "Tailor",
    "Engraver",
    "Painter",
    "Driver",
    "Software Engineer",
    "Network Engineer",
    "Tailor",
    "Engraver",
    "Painter",
    "Driver",
    "Software Engineer",
    "Network Engineer",
  ];

  const skillTags = [
    "Full Day woyla coding",
    "Expert",
    "Full Day",
    "Expert",
    "Full Day",
    "Expert",
    "Full Day",
    "Expert",
    "Full Day",
    "Expert",
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(allJobs.length / itemsPerPage);
  const [activePage, setActivePage] = useState(1);

  // Calculate which jobs to display on current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageJobs = allJobs.slice(startIndex, endIndex);

  // Generate pagination items
  const paginationItems = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
      // Scroll to job section
      window.scrollTo({ top: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* SECTION: HERO */}
      <section
        className="relative w-full min-h-[95vh] sm:min-h-[100vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${IMAGES.bg1})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.h1
            {...heroTextVariant}
            className="text-white font-montserrat font-extrabold text-5xl sm:text-6xl leading-tight drop-shadow-md"
          >
            {t("hero.title")}{" "}
            <span className="text-[#EEE4C8]">{t("hero.title_highlight")}</span>
          </motion.h1>

          <motion.p
            {...heroParagraphVariant}
            className="text-gray-200 text-base sm:text-lg md:text-xl mt-6 drop-shadow"
          >
            {t("hero.subtitle")}
          </motion.p>
        </div>
      </section>

      {/* SECTION: MAIN CONTENT (JOB LIST) */}
      <section className="relative w-full py-20 px-6 sm:px-10 md:px-20">
                {/* HEADING */}
        <motion.div className="text-center mb-16" {...sectionHeadingVariant}>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 ">
            {t("section_main.title_start")}{" "}
            <span className="text-[#D9A556]">
              {t("section_main.title_highlight")}
            </span>{" "}
            {t("section_main.title_end")}
          </h1>
          <p className="mt-3 text-gray-600 text-base sm:text-lg">
            {t("section_main.subtitle")}
          </p>
        </motion.div>

        {/* JOB GRID */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {currentPageJobs.map((jobKey, index) => (
            <motion.div
              key={`${activePage}-${index}`}
              className="rounded-xl shadow-md border border-gray-200 bg-gradient-to-b from-[#DFD7BF] to-[#F5F5F5] p-6 sm:p-7 lg:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              custom={index}
              variants={jobCardVariant}
              whileInView="whileInView"
              initial="initial"
            >
              <div className="mb-4">
                <span className="text-xs bg-[#F5F5F5] px-3 py-1 rounded-md text-gray-800 font-semibold">
                  {t("card.date")}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-8 lg:mb-12">
                {t(`jobs.${jobKey}`)}
              </h2>

              <div className="flex flex-wrap gap-2 mb-8">
                {skillTags.map((tagKey, i) => (
                  <motion.span
                    key={i}
                    className="border border-gray-900 rounded-md px-3 py-1 text-sm text-gray-900 font-medium w-fit break-words hover:bg-gray-900 hover:text-white transition font-poppins"
                    whileHover={{ scale: 1.05 }}
                  >
                    {t(`skills.${tagKey}`)}
                  </motion.span>
                ))}
              </div>

              <motion.button
                className="w-35 bg-[#54504E] text-white py-2 rounded-md font-semibold font-inter hover:bg-white hover:text-[#54504E] hover:border-2 hover:border-[#54504E] transition"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("card.button_apply")}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* PAGINATION */}
        <motion.div
          className="mt-16 flex justify-center gap-2"
          {...paginationVariant}
        >
          <motion.button
            className="w-8 h-8 rounded-md bg-[#E7E4DF] flex items-center justify-center text-gray-700 hover:bg-[#D9A556] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(activePage - 1)}
            disabled={activePage === 1}
            aria-label="Previous Page"
          >
            <ChevronLeft size={16} />
          </motion.button>

          {paginationItems.map((num) => (
            <motion.button
              key={num}
              className={`${
                num === activePage
                  ? "bg-[#D9A556] text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:bg-[#D9A556] hover:text-white"
              } w-8 h-8 rounded-md flex items-center justify-center font-medium transition`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(num)}
              aria-label={`Go to page ${num}`}
              aria-current={num === activePage ? "page" : undefined}
            >
              {num}
            </motion.button>
          ))}

          <motion.button
            className="w-8 h-8 rounded-md bg-[#E7E4DF] flex items-center justify-center text-gray-700 hover:bg-[#D9A556] hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handlePageChange(activePage + 1)}
            disabled={activePage === totalPages}
            aria-label="Next Page"
          >
            <ChevronRight size={16} />
          </motion.button>
        </motion.div>
      </section>

      </div>
  );  
}

export default Careers;
