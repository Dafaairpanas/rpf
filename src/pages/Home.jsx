import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { IMAGES, HERO_BACKGROUNDS } from "@/assets/assets.js";
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

// Background slideshow animation - optimized for faster initial load
const bgSlideVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
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
const SLIDESHOW_INTERVAL = 2000; // 2 detik

function Home() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [activeBgIndex, setActiveBgIndex] = useState(0);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);

  // Background slideshow effect
  const heroImages = HERO_BACKGROUNDS.home;
  
  // Preload all hero images for smoother transitions
  useEffect(() => {
    if (!Array.isArray(heroImages)) return;
    
    const preloadImages = heroImages.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });
    
    // Mark as preloaded when first image loads (for faster initial display)
    if (preloadImages[0]) {
      preloadImages[0].onload = () => setImagesPreloaded(true);
    }
  }, [heroImages]);
  
  useEffect(() => {
    if (!Array.isArray(heroImages) || heroImages.length <= 1) return;

    const interval = setInterval(() => {
      setActiveBgIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDESHOW_INTERVAL);

    return () => clearInterval(interval);
  }, [heroImages]);

  // Fetch featured products
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Fetch products without featured filter (backend might not support it yet)
        const res = await api.get("/products", { params: { limit: 8 } });
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
  const goToCollection = useCallback(
    (type) => {
      navigate(`/collections?type=${type}`);
    },
    [navigate],
  );

  // Memoized carousel items - prevents recreation every render
  const carouselItems = useMemo(() => {
    if (featuredProducts.length > 0) return featuredProducts;
    return FALLBACK_ITEMS.map((id) => ({
      id,
      name: `Item ${id}`,
      isFallback: true,
    }));
  }, [featuredProducts]);

  // Memoized multiplied array for infinite scroll effect (10x to prevent gaps on zoom out)
  const multipliedItems = useMemo(() => {
    const items = carouselItems;
    return [
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
      ...items,
    ];
  }, [carouselItems]);

  // Get current background image
  const currentBgImage = Array.isArray(heroImages)
    ? heroImages[activeBgIndex]
    : heroImages;

  return (
    <div className="w-full overflow-x-hidden ">
      <motion.section
        {...heroVariants.section}
        className="relative w-full hero-full flex items-center overflow-hidden"
      >
        {/* Static first background (always visible for instant load) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImages?.[0] || currentBgImage})` }}
        />
        
        {/* Slideshow Background (fades on top) */}
        <AnimatePresence mode="sync">
          <motion.div
            key={activeBgIndex}
            variants={bgSlideVariants}
            initial={activeBgIndex === 0 ? "animate" : "initial"}
            animate="animate"
            exit="exit"
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentBgImage})` }}
          />
        </AnimatePresence>

        <motion.div
          {...heroVariants.overlay}
          className="absolute inset-0 bg-black/40 z-[1]"
        />

        <div className="relative z-10 w-std mx-auto px-6 h-full flex items-center mt-16 sm:mt-0 smooth-responsive">
          <div className="max-w-6xl text-left">
            <motion.h1
              {...heroVariants.title}
              className="font-montserrat font-extrabold text-white text-3xl sm:text-5xl md:text-6xl leading-tight drop-shadow-md smooth-responsive"
            >
              {t("section1.line1")} {t("section1.line2")}{" "}
              <span className="text-[#EEE4C8]">
                {t("section1.highlight")}&nbsp;
              </span>
              {t("section1.line3")} {t("section1.line4")} {t("section1.line5")}
            </motion.h1>

            <motion.div {...heroVariants.subtitle}>
              <a
                href="/about"
                className="inline-block w-fit px-8 sm:px-16 py-2 sm:py-3 mt-6 sm:mt-10 text-[#28221F] text-base sm:text-2xl font-inter font-semibold rounded-xl shadow-lg text-center bg-[#CB9147] transition-all duration-500 ease-out hover:bg-[#28221F] hover:text-white hover:translate-y-[-2px] hover:scale-105 cursor-pointer"
              >
                {t("section1.button")}
              </a>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 left-4 bg-gradient-to-r from-[#343130] to-[#654823] text-white px-6 py-3 rounded-md text-xs sm:text-sm font-poppins transition-all duration-500 group-hover:-top-6 group-hover:left-6">
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
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 left-4 bg-gradient-to-r from-[#343130] to-[#654823] text-white px-6 py-3 rounded-md text-xs sm:text-sm font-poppins transition-all duration-500 group-hover:-top-5 group-hover:left-6">
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
        <motion.div variants={cardItem} className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-inter font-bold">
            {t("section3.title")}
          </h2>
        </motion.div>

        <div className="relative w-full overflow-hidden">
          {/* CSS-based infinite scroll for smoother animation */}
          <style>
            {`
              @keyframes scrollCarousel {
                0% { transform: translateX(0); }
                100% { transform: translateX(-10%); }
              }
              .carousel-track {
                animation: scrollCarousel 10s linear infinite;
              }
              .carousel-track:hover {
                animation-play-state: paused;
              }
            `}
          </style>  

          {/* Centered wrapper */}
          <div className="flex justify-center w-full">
            <div className="carousel-track flex gap-6 sm:gap-8">
              {multipliedItems.map((item, index) => (
                <motion.div
                  key={`card-${item.id}-${index}`}
                  onClick={() => {
                    if (item.isFallback) {
                      navigate("/collections");
                    } else {
                      navigate(`/collections?product_id=${item.id}`);
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  className="group bg-white rounded-xl flex flex-col justify-center py-6 h-fit flex-shrink-0 w-[160px] sm:w-[220px] md:w-[260px] cursor-pointer"
                  style={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="flex items-center justify-center h-32 sm:h-48 md:h-56 px-2">
                    <motion.img
                      src={
                        item.isFallback
                          ? IMAGES.chairSvg
                          : getProductDisplayImage(item, IMAGES.chairSvg)
                      }
                      alt={item.name || `Product ${item.id}`}
                      loading="lazy"
                      className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = IMAGES.chairSvg;
                      }}
                    />
                  </div>

                  <p className="text-xs sm:text-sm md:text-base text-black group-hover:text-[#CB9147] transition-colors duration-300 text-center mt-4 font-poppins font-medium px-2 truncate">
                    {item.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute left-0 top-0  sm:w-32 h-full bg-gradient-to-r from-[#1c1511] to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 sm:w-32 h-full bg-gradient-to-l from-[#1c1511] to-transparent pointer-events-none z-10"></div>
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={section4Variant}
        className="w-full py-10 pb-12 px-5 sm:px-10 md:px-16 bg-[#F5F5F5] text-center"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-montserrat font-extrabold text-[#28221F]">
          {t("section4.title")}
        </h2>

        <p className="text-gray-600 mt-4 text-sm sm:text-lg max-w-2xl mx-auto font-poppins ">
          {t("section4.desc")}
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className="w-full max-w-4xl mx-auto h-52 sm:h-126 rounded-xl mt-12 mb-12 "
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
          href="/contact"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
          className="w-fit px-8 sm:px-12 md:px-16 py-3 sm:py-4 md:py-6 text-base sm:text-xl md:text-2xl font-montserrat font-bold rounded-md sm:rounded-xl shadow-lg text-center bg-[#CB9147] text-[#28221F] transition-all duration-500 ease-out hover:bg-[#28221F] hover:text-white hover:translate-y-[-2px] hover:scale-105"
        >
          {t("section4.button")}
        </motion.a>
      </motion.section>
    </div>
  );
}

export default Home;
