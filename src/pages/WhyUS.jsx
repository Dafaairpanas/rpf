import React from "react";
import { motion } from "framer-motion";
import { IMAGES } from "@/assets/assets";
import { useTranslation } from "react-i18next";

// --- Varian Animasi ---

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
    { src: IMAGES.logo, alt: "Four Hands" },
    { src: IMAGES.logo, alt: "Tikamoon" },
    { src: IMAGES.logo, alt: "Kave Home" },
    { src: IMAGES.logo, alt: "Bridgman" },
    { src: IMAGES.logo, alt: "Harbour" },
    { src: IMAGES.logo, alt: "www" },
  ];

  const certifications = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="w-full overflow-x-hidden">
      {/* SECTION: HERO */}
      <section
        className="relative w-full h-[95vh] sm:h-[100vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${IMAGES.bg1})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          {...heroTextVariant}
          className="
            relative z-10 w-full 
            px-6 sm:px-10 
            text-left 
            flex flex-col 
            items-start       
            justify-start    
            gap-6   
            h-full 
            mx-auto 
            pt-10     
            mt-48
            max-w-std
          "
        >
          <h1
            className="
              font-montserrat font-extrabold text-white
              text-5xl sm:text-5xl md:text-6xl   
              leading-tight
              max-w-[260px] sm:max-w-md     
              
            "
          >
            {t("whyus.hero.line1")} <br />
            {t("whyus.hero.line2")} <br />
            <span className="text-[#e8ddc7]">
              {t("whyus.hero.line3")} <br /> {t("whyus.hero.line4")}
            </span>
          </h1>

          <p className="text-white max-w-xl text-base sm:text-lg leading-relaxed">
            {t("whyus.hero.subtitle")}
          </p>
        </motion.div>
      </section>


      {/* SECTION: BRANDS */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-12 bg-white">
        <motion.div
          {...fadeInVariant}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
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
            className="bg-[#f8faf6] rounded-xl p-6 sm:p-10 max-w-6xl mx-auto"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="
                flex flex-wrap 
                justify-center 
                gap-6 sm:gap-8 lg:gap-10
              "
            >
              {brands.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemFadeInVariant}
                  className="
                    bg-white rounded-lg shadow-md
                    flex items-center justify-center
                    
                    w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px]
                    h-[120px] sm:h-[140px] md:h-[160px]

                    p-4
                    transition-all duration-300
                    hover:shadow-xl hover:scale-[1.05]
                  "
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="
                      w-full
                      max-h-24
                      object-contain opacity-70
                      transition-opacity duration-300 hover:opacity-100
                    "
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: GLOBAL REACH */}
      <section className="w-full bg-[#2a2220] py-20 md:py-24 px-4 sm:px-6 lg:px-12">
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
      <section className="w-full py-16 md:py-20 bg-white px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div {...fadeInVariant}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
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
            className="
            bg-[#f6faf6] rounded-2xl
            p-8 sm:p-10
            flex flex-wrap
            justify-center
            gap-8 sm:gap-10
          "
          >
            {certifications.map((src, idx) => (
              <motion.div
                key={idx}
                variants={itemFadeInVariant}
                className="
                transition-all duration-300 hover:scale-[1.1]

                flex-shrink-0
                w-[150px] sm:w-[170px] md:w-[200px]
                flex items-center justify-center
                h-32 sm:h-36 md:h-40
              "
              >
                <img
                  src={IMAGES.logo}
                  alt={`Certificate ${idx + 1}`}
                  className="max-h-24 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
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