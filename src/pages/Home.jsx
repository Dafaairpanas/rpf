import { motion } from "framer-motion";
import { IMAGES } from "@/assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const mainVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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

function Home() {
  const { t } = useTranslation("home");
  const navigate = useNavigate();

  const goToCollection = (type) => {
    navigate(`/collections?type=${type}`);
  };

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
          className="
            relative z-10 w-full 
            px-6 sm:px-10 
            text-left 
            flex flex-col 
            items-start       // ⬅️ nempel kiri
            justify-start    // ⬅️ naik ke atas
            gap-6   
            h-full 
            mx-auto 
            pt-10     
            mt-48
            max-w-std

      // ⬅️ opsional biar tidak kepentok banget
          "
        >
          <h1
            className="
              font-montserrat font-bold text-white
              text-5xl sm:text-5xl md:text-6xl     // ⬅️ mobile lebih kecil
              leading-snug                          // ⬅️ jarak baris lebih lega
              max-w-[260px] sm:max-w-md      
              mb-[5rem] sm:mb-0   // ⬅️ mobile wadah lebih kecil supaya wrap bagus
            "
          >

            {t("section1.line1")} <br />
            {t("section1.line2")} <br />
            <span className="text-[#EEE4C8]">
              {t("section1.highlight")}&nbsp;
            </span>
            {t("section1.line3")} <br />
            {t("section1.line4")} <br />
            {t("section1.line5")}
          </h1>


          <motion.a
            href="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="
              w-fit px-20 sm:px-32 mt-12 mb-16 px-8 py-3 text-gray-900 font-inter font-semibold 
              rounded-xl shadow-lg text-center
              bg-gradient-to-r from-[#DFD7BF] to-[#A6A6A6]
              transition-all duration-500 ease-out
              hover:bg-[#CB9147] hover:from-transparent hover:to-transparent 
              hover:text-white hover:translate-y-[-5px]
            "
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
        className="py-20 px-5 sm:px-10 md:px-24 bg-[#FDFBF7]"
      >
        <motion.div
          variants={cardItem}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <h3 className="text-[#B48A4A] font-inter font-bold text-xl sm:text-2xl">
            {t("section2.title")}
          </h3>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-montserrat font-extrabold mt-3">
            {t("section2.subtitle")}
          </h2>

          <p className="text-gray-600 mt-5 text-sm sm:text-base max-w-3xl mx-auto font-poppins">
            {t("section2.desc")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
          <motion.div
            onClick={() => goToCollection("indoor")}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.2 },
              },
            }}
            className="relative rounded-xl overflow-visible shadow-lg bg-white group cursor-pointer"
          >
            <img
              src={IMAGES.indoor}
              alt="Indoor furniture"
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            />
            <span
              className="
              absolute top-4 left-4
              bg-gradient-to-r from-[#343130] to-[#654823] text-white px-6 py-3 rounded-md
              text-xs sm:text-sm font-poppins
              transition-all duration-500
              group-hover:-top-6 group-hover:left-8
            "
            >
              {t("section2.indoor")}
            </span>
          </motion.div>

          <motion.div
            onClick={() => goToCollection("outdoor")}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: 0.4 },
              },
            }}
            className="relative rounded-xl overflow-visible shadow-lg bg-white group cursor-pointer"
          >
            <img
              src={IMAGES.outdoor}
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            />
            <span
              className="
              absolute top-4 left-4
              bg-gradient-to-r from-[#343130] to-[#654823] text-white px-6 py-3 rounded-md
              text-xs sm:text-sm font-poppins
              transition-all duration-500
              group-hover:-top-6 group-hover:left-8"
            >
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
        className="w-full px-5 sm:px-10 md:px-16 py-20 bg-[#1c1511] text-white"
      >
        <motion.div
          variants={cardItem}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-14">
          {[1, 2, 3, 4].map((id, index) => (
            <motion.div
              key={id}
              variants={cardItem}
              className="group bg-[#2b2727] rounded-xl flex flex-col justify-center py-6 h-fit hover:scale-110 transition-transform duration-500 cursor-pointer"
            >
              <img
                src={IMAGES.chairSvg}
                onClick={() => navigate("/collections")}
                alt={`Collection item ${id}`}
                className="object-fit h-40 sm:h-64 hover:rotate-3 transition-transform duration-300"
              />

              <p className="text-sm sm:text-base text-gray-300 group-hover:text-[#CB9147] transition-colors duration-300 text-center mt-4 font-poppins font-medium">
                {t("section3.item")} {id}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
        className="w-full py-20 sm:py-24 px-5 sm:px-10 md:px-16 bg-gradient-to-b from-[#F5F2E9] to-[#F8F6F1] text-center"
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-montserrat font-extrabold text-[#1A1A1A]">
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
          className="w-full max-w-2xl mx-auto h-54 sm:h-56 md:h-64 rounded-xl mt-12 sm:mt-16 mb-12"
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
          className="px-10 sm:px-12 py-3 sm:py-4 bg-[#915E23] text-white font-semibold text-lg sm:text-xl rounded-xl shadow-md transform transition hover:-translate-y-6 hover:bg-[#CB9147] font-poppins hover:scale-105 inline-block duration-500"
        >
          {t("section4.button")}
        </motion.a>
      </motion.section>
    </div>
  );
}

export default Home;
