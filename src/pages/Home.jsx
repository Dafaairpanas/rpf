import { motion } from "framer-motion";
import { IMAGES } from "@/assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useMemo, useCallback } from "react";
import api from "@/api/axios";
import { getProductDisplayImage } from "@/utils/imageHelpers";

// ============ ANIMATION VARIANTS (Module Level - Never Recreated) ============
const mainVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

// Inline variants moved to module level
const indoorVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const outdoorVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } },
};

const section4Variant = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// ============ CONSTANTS ============
const FALLBACK_ITEMS = [1, 2, 3, 4];

function Home() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Fetch products without featured filter (backend might not support it yet)
        const res = await api.get('/products', { params: { limit: 8 } });
        if (res.data.success) {
          const data = res.data.data;
          const products = Array.isArray(data) ? data : data.data || [];
          setFeaturedProducts(products.slice(0, 8));
        }
      } catch (err) {
        console.error("Error fetching featured products:", err);
        setFeaturedProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  // Stable navigation handler
  const goToCollection = useCallback((type) => {
    navigate(`/collections?type=${type}`);
  }, [navigate]);

  // Memoized carousel items - prevents recreation every render
  const carouselItems = useMemo(() => {
    if (featuredProducts.length > 0) return featuredProducts;
    return FALLBACK_ITEMS.map(id => ({ id, name: `Item ${id}`, isFallback: true }));
  }, [featuredProducts]);

  // Memoized tripled array for infinite scroll effect
  const tripledItems = useMemo(() => 
    [...carouselItems, ...carouselItems, ...carouselItems],
    [carouselItems]
  );

  return (
    <div className="w-full overflow-x-hidden">
      <section
        className="relative w-full h-[95vh] sm:h-[100vh] bg-cover bg-center flex items-center"
        style={{ backgroundImage: `url(${IMAGES.bg1})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={mainVariant}
          className="relative z-10 w-full px-6 sm:px-10 text-left flex flex-col items-start justify-center gap-6 h-full mx-auto pt-10 max-w-std"
        >
          <h1 className="font-montserrat font-bold text-white text-5xl sm:text-5xl md:text-6xl leading-snug max-w-[260px] sm:max-w-[70%] mb-[5rem] sm:mb-0">
            {t("section1.line1")} {t("section1.line2")}{" "}
            <span className="text-[#EEE4C8]">
              {t("section1.highlight")}&nbsp;
            </span>{" "}
            {t("section1.line3")} {t("section1.line4")} {t("section1.line5")}
          </h1>

          <motion.a
            href="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="w-fit px-16 py-3 mt-12 mb-16 text-[#28221F] text-2xl font-inter font-semibold rounded-xl shadow-lg text-center bg-[#CB9147] transition-all duration-500 ease-out hover:bg-[#28221F]  hover:from-transparent hover:text-white hover:translate-y-[-2px] hover:scale-105"
          >
            {t("section1.button")}
          </motion.a>
        </motion.div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={cardContainer}
        className="py-10 px-5 sm:px-10 md:px-24 bg-[#FDFBF7]"
      >
        <motion.div
          variants={cardItem}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <h3 className="text-[#B48A4A] font-inter font-bold text-xl sm:text-2xl">
            {t("section2.title")}
          </h3>

          <h2 className="text-[#28221F] text-2xl sm:text-4xl md:text-5xl font-montserrat font-extrabold mt-3">
            {t("section2.subtitle")}
          </h2>

          <p className="text-gray-600 mt-5 text-sm sm:text-base max-w-3xl mx-auto font-poppins">
            {t("section2.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
          <motion.div
            onClick={() => goToCollection("indoor")}
            variants={indoorVariant}
            className="relative rounded-xl overflow-visible shadow-lg bg-white group cursor-pointer"
          >
            <img
              src={IMAGES.indoor}
              alt="Indoor furniture"
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 left-4 bg-gradient-to-r from-[#343130] to-[#654823] text-white px-6 py-3 rounded-md text-xs sm:text-sm font-poppins transition-all duration-500 group-hover:-top-6 group-hover:left-8">
              {t("section2.indoor")}
            </span>
          </motion.div>

          <motion.div
            onClick={() => goToCollection("outdoor")}
            variants={outdoorVariant}
            className="relative rounded-xl overflow-visible shadow-lg bg-white group cursor-pointer"
          >
            <img
              src={IMAGES.outdoor}
              alt="Outdoor furniture"
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 left-4 bg-gradient-to-r from-[#343130] to-[#654823] text-white px-6 py-3 rounded-md text-xs sm:text-sm font-poppins transition-all duration-500 group-hover:-top-6 group-hover:left-8">
              {t("section2.outdoor")}
            </span>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={cardContainer}
        className="w-full px-5 sm:px-10 md:px-16 py-10 bg-[#1c1511] text-white overflow-hidden"
      >
        <motion.div
          variants={cardItem}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-14 "
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-inter font-bold">
            {t("section3.title")}
          </h2>

          <a
            href="collections"
            className="text-base sm:text-lg text-[#e6d6b8] hover:bg-[#e6d6b8] hover:text-black py-2 px-4 rounded-full transition-all duration-300 w-max hover:translate-y-[5px] font-poppins font-medium"
          >
            {t("section3.button")}
          </a>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{
              x: -2400,
              transition: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
            className="flex gap-6 sm:gap-8 w-max"
          >
            {tripledItems.map((item, index) => (
              <motion.div
                key={`card-${item.id}-${index}`}
                onClick={() => {
                  if (item.isFallback) {
                    navigate("/collections");
                  } else {
                    navigate(`/collections?product_id=${item.id}`);
                  }
                }}
                className="group bg-white rounded-xl flex flex-col justify-center py-6 h-fit flex-shrink-0 w-[160px] sm:w-[220px] md:w-[260px] cursor-pointer"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="overflow-hidden rounded-lg flex items-center justify-center h-32 sm:h-48 md:h-56">
                  <motion.img
                    src={item.isFallback ? IMAGES.chairSvg : getProductDisplayImage(item, IMAGES.chairSvg)}
                    alt={item.name || `Product ${item.id}`}
                    loading="lazy"
                    className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = IMAGES.chairSvg }}
                  />
                </div>

                <p className="text-xs sm:text-sm md:text-base text-black group-hover:text-[#CB9147] transition-colors duration-300 text-center mt-4 font-poppins font-medium px-2 truncate">
                  {item.name}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="absolute left-0 top-0 w-20 sm:w-32 h-full bg-gradient-to-r from-[#1c1511] to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 w-20 sm:w-32 h-full bg-gradient-to-l from-[#1c1511] to-transparent pointer-events-none z-10"></div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={section4Variant}
        className="w-full py-10 pb-20 px-5 sm:px-10 md:px-16 bg-[#F5F5F5] text-center"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-montserrat font-extrabold text-[#28221F]">
          {t("section4.title")}
        </h2>

        <p className="text-gray-600 mt-4 text-sm sm:text-lg max-w-2xl mx-auto font-poppins">
          {t("section4.desc")}
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className="w-full max-w-4xl mx-auto h-54 sm:h-82 rounded-xl mt-12 sm:mt-16 mb-24 "
        >
          <iframe
            className="w-full h-full rounded-xl"
            src="https://www.youtube.com/embed/LawktYYAPko?si=jAbW1o8dMBoph_4r"
            title="YouTube video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </motion.div>

        <motion.a
          href="contact"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
          className="w-fit px-16 py-6  text-[#28221F] text-2xl font-montserrat font-bold rounded-xl shadow-lg text-center bg-[#CB9147]  transition-all duration-500 ease-out hover:bg-[#28221F] hover:text-white hover:translate-y-[-2px] hover:scale-105 "
        >
          {t("section4.button")}
        </motion.a>
      </motion.section>
    </div>
  );
}

export default Home;
