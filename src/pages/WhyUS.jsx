import React from "react";
import { motion } from "framer-motion";
import { IMAGES, BRANDS, CERTIFICATIONS } from "@/assets/assets";
import { useTranslation } from "react-i18next";

const fadeInVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true, amount: 0.1 },
};

const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemFadeInVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const heroTextVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, delay: 0.3 },
};

function WhyUS() {
  const { t } = useTranslation("whyus");

  const brands = [
    { src: BRANDS.brands1, alt: "Four Hands" },
    { src: BRANDS.brands2, alt: "Tikamoon" },
    { src: BRANDS.brands3, alt: "Kave Home" },
    { src: BRANDS.brands4, alt: "Bridgman" },
    { src: BRANDS.brands5, alt: "Harbour" },
    { src: BRANDS.brands6, alt: "www" },
  ];

  const certifications = [
    { src: CERTIFICATIONS.certi1, alt: "ISO 9001" },
    { src: CERTIFICATIONS.certi2, alt: "FSC Certified" },
    { src: CERTIFICATIONS.certi3, alt: "Green Building" },
    { src: CERTIFICATIONS.certi4, alt: "Quality Assurance" },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* SECTION: HERO */}
      <section
        className="relative w-full min-h-[95vh] sm:min-h-[100vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${IMAGES.bg1})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          {...heroTextVariant}
          className="relative z-10 text-center px-6 w-[95dvh] h-full mx-auto flex flex-col items-center justify-center"
        >
          <h1 className="text-white font-montserrat font-extrabold text-5xl sm:text-6xl leading-tight drop-shadow-md">
            {t("whyus.hero.line1")} {t("whyus.hero.line2")}{" "}
            <span className="text-[#e8ddc7]">
              {t("whyus.hero.line3")} {t("whyus.hero.line4")}
            </span>
          </h1>

          <p className="text-gray-200 text-base sm:text-lg md:text-xl mt-6 font-poppins drop-shadow max-w-xl">
            {t("whyus.hero.subtitle")}
          </p>
        </motion.div>
      </section>

      {/* SECTION: BRANDS */}
      <section className="w-full py-10 px-4 sm:px-6 lg:px-12 bg-white">
        <motion.div
          {...fadeInVariant}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[#28221F]">
            {t("whyus.brands.title")}{" "}
            <span className="text-[#cd803a]">
              {t("whyus.brands.titleHighlight")}
            </span>
          </h2>

          <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg">
            {t("whyus.brands.subtitle")}
          </p>
        </motion.div>

        <div className="mt-12 sm:mt-16 px-4">
          <motion.div
            {...fadeInVariant}
            viewport={{ once: true, amount: 0.1 }}
            className="rounded-xl p-6 sm:p-10 max-w-6xl mx-auto"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-10"
            >
              {brands.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemFadeInVariant}
                  className="bg-white rounded-lg shadow-md flex items-center justify-center w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] h-[120px] sm:h-[140px] md:h-[160px] p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.05]"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full max-h-24 object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: GLOBAL REACH */}
      <section className="w-full bg-[#2a2220] py-20 md:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-white"
          >
            <p className="text-[#cd803a] font-medium text-lg mb-2">
              {t("whyus.globalReach.subtitle")}
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {t("whyus.globalReach.title")}
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {t("whyus.globalReach.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white rounded-2xl shadow-xl w-full overflow-hidden"
          >
            <img
              src={IMAGES.mapWebp}
              alt="Global Export Map"
              className="w-full h-auto object-contain transition-all duration-300 hover:scale-[1.03]"
            />
          </motion.div>
        </div>
      </section>

      {/* SECTION: CERTIFICATIONS */}
      <section className="w-full py-10 bg-white px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeInVariant}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#28221F]">
              {t("whyus.certifications.title")}{" "}
              <span className="text-[#cd803a]">
                {t("whyus.certifications.titleHighlight")}
              </span>
            </h2>

            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto mb-12 md:mb-16">
              {t("whyus.certifications.subtitle")}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="rounded-2xl p-8 sm:p-10 flex flex-wrap justify-center gap-8 sm:gap-10"
          >
            {certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                variants={itemFadeInVariant}
                className="transition-all duration-300 hover:scale-[1.1] flex-shrink-0 w-[150px] sm:w-[170px] md:w-[200px] flex items-center justify-center h-32 sm:h-36 md:h-40 rounded-xl shadow-sm hover:shadow-md"
              >
                <img
                  src={cert.src}
                  alt={cert.alt}
                  className="p-5 max-h-40 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default WhyUS;
