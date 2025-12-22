import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IMAGES } from "@/assets/assets";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Navigation, Autoplay } from "swiper/modules";
import { API_URL, getImageUrl } from '@/config';

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

// Custom Swiper Styles
const swiperStyles = `
  .brands-swiper, .certs-swiper {
    padding-bottom: 50px !important;
    padding-left: 50px !important;
    padding-right: 50px !important;
    position: relative;
  }
  .swiper-button-next, .swiper-button-prev {
    color: #cd803a !important;
    background: rgba(255, 255, 255, 0.9);
    width: 40px !important;
    height: 40px !important;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }
  .swiper-button-next::after, .swiper-button-prev::after {
    font-size: 18px !important;
    font-weight: bold;
  }
  .swiper-button-prev {
    left: 0 !important;
  }
  .swiper-button-next {
    right: 0 !important;
  }
  .swiper-pagination-bullet-active {
    background: #cd803a !important;
  }
  .swiper-grid-column > .swiper-wrapper {
    flex-direction: row !important;
  }
  @media (min-width: 640px) {
    .brands-swiper {
      height: 400px;
    }
  }
  @media (min-width: 1024px) {
    .brands-swiper {
      height: 450px;
    }
  }
`;

function WhyUS() {
  const { t } = useTranslation("whyus");
  const [brands, setBrands] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingCerts, setLoadingCerts] = useState(true);

  const API_BASE = `${API_URL}/v1`;

  useEffect(() => {
    fetchBrands();
    fetchCertifications();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_BASE}/brands`);
      const result = await response.json();
      if (result.success) {
        // Handle both simple array and paginated response
        const brandsData = Array.isArray(result.data) ? result.data : result.data.data;
        setBrands(brandsData || []);
      }
    } catch (err) {
      console.error("Error fetching brands:", err);
    } finally {
      setLoadingBrands(false);
    }
  };

  const fetchCertifications = async () => {
    try {
      const response = await fetch(`${API_BASE}/certifications`);
      const result = await response.json();
      if (result.success) {
        // Handle both simple array and paginated response
        const certsData = Array.isArray(result.data) ? result.data : result.data.data;
        setCertifications(certsData || []);
      }
    } catch (err) {
      console.error("Error fetching certifications:", err);
    } finally {
      setLoadingCerts(false);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      <style>{swiperStyles}</style>
      {/* SECTION: HERO */}
      <section
        className="relative w-full min-h-[85vh] sm:min-h-[95vh] md:min-h-[100vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${IMAGES.bg1})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          {...heroTextVariant}
          className="relative z-10 text-center px-4 sm:px-6 w-full max-w-4xl mx-auto flex flex-col items-center justify-center"
        >
          <h1 className="text-white font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight drop-shadow-md">
            {t("whyus.hero.line1")} {t("whyus.hero.line2")}{" "}
            <span className="text-[#e8ddc7]">
              {t("whyus.hero.line3")} {t("whyus.hero.line4")}
            </span>
          </h1>

          <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-6 font-poppins drop-shadow max-w-xl">
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
            {loadingBrands ? (
              <div className="text-center py-12 text-gray-500">
                Loading brands...
              </div>
            ) : brands.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No brands found
              </div>
            ) : (
              <>
                {/* Mobile: Simple Grid (show all) */}
                <div className="grid grid-cols-1 gap-3 sm:hidden">
                  {brands.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemFadeInVariant}
                      initial="initial"
                      whileInView="whileInView"
                      viewport={{ once: true }}
                      className="bg-white rounded-lg shadow-md flex items-center justify-center h-[100px] p-3 transition-all duration-300 hover:shadow-xl"
                    >
                      <img
                        src={getImageUrl(item.image_url)}
                        alt={item.name}
                        className="w-full max-h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=Error"; }}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Tablet+: Swiper */}
                <div className="hidden sm:block">
                  <Swiper
                    modules={[Grid, Pagination, Navigation, Autoplay]}
                    slidesPerView={2}
                    grid={{ rows: 2, fill: "row" }}
                    spaceBetween={20}
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                      1024: { slidesPerView: 3, grid: { rows: 2, fill: "row" }, spaceBetween: 30 },
                    }}
                    className="brands-swiper !pb-12"
                  >
                    {brands.map((item) => (
                      <SwiperSlide key={item.id}>
                        <motion.div
                          variants={itemFadeInVariant}
                          className="bg-white rounded-lg shadow-md flex items-center justify-center w-full h-[140px] md:h-[160px] p-4 transition-all duration-300 hover:shadow-xl hover:scale-[1.05]"
                        >
                          <img
                            src={getImageUrl(item.image_url)}
                            alt={item.name}
                            className="w-full max-h-24 object-contain opacity-80 transition-opacity duration-300 hover:opacity-100"
                            onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=Error"; }}
                          />
                        </motion.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </>
            )}
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

          {loadingCerts ? (
            <div className="text-center py-12 text-gray-500">
              Loading certifications...
            </div>
          ) : certifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No certifications found
            </div>
          ) : (
            <>
              {/* Mobile: Simple Grid (show all) */}
              <div className="grid grid-cols-1 gap-3 sm:hidden">
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    variants={itemFadeInVariant}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="flex items-center justify-center h-24 rounded-xl shadow-sm bg-gray-50/50 p-3"
                  >
                    <img
                      src={getImageUrl(cert.image_url)}
                      alt={cert.name}
                      className="max-h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=Error"; }}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Tablet+: Swiper */}
              <div className="hidden sm:block">
                <Swiper
                  modules={[Pagination, Navigation, Autoplay]}
                  slidesPerView={3}
                  spaceBetween={20}
                  pagination={{ clickable: true }}
                  navigation={true}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  breakpoints={{
                    1024: { slidesPerView: 5, spaceBetween: 30 },
                  }}
                  className="certs-swiper !pb-12"
                >
                  {certifications.map((cert) => (
                    <SwiperSlide key={cert.id}>
                      <motion.div
                        variants={itemFadeInVariant}
                        className="transition-all duration-300 hover:scale-[1.1] w-full flex items-center justify-center h-36 md:h-40 rounded-xl shadow-sm hover:shadow-md bg-gray-50/50"
                      >
                        <img
                          src={getImageUrl(cert.image_url)}
                          alt={cert.name}
                          className="p-5 max-h-40 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=Error"; }}
                        />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default WhyUS;