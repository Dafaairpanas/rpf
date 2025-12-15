import React from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

// --- ANIMATION VARIANTS ---
// Varian Container untuk mengatur stagger effect pada komponen anak-anak
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

// Varian Item untuk elemen yang muncul dari bawah (y: 20)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// --- KOMPONEN INPUT FIELD ---
const InputField = ({ label, type, placeholder, isTextarea }) => (
  <div className="mb-7">
    <label className="block text-white text-sm font-medium mb-2 pl-1 font-poppins">
      {label}
    </label>
    {isTextarea ? (
      <textarea
        className="w-full p-3.5 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BF9054] transition duration-200 h-34 resize-none text-sm"
        placeholder={placeholder}
      ></textarea>
    ) : (
      <input
        type={type}
        className="w-full p-3.5 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BF9054] transition duration-200 text-sm"
        placeholder={placeholder}
      />
    )}
  </div>
);

// --- KOMPONEN ITEM INFORMASI KONTAK ---
const ContactInfoItem = ({ icon, label, children }) => (
  <motion.div className="flex items-start mb-6" variants={itemVariants}>
    <div className="text-[#BF9054] text-xl mt-1 mr-4 shrink-0 transition-colors duration-300 group-hover:text-yellow-600">
      {icon}
    </div>
    <div className="text-[#332C26] font-medium text-sm sm:text-base leading-relaxed">
      {label && (
        <span className="font-semibold text-[#2C241E] mr-2">{label}:</span>
      )}
      {children}
    </div>
  </motion.div>
);

const ContactUs = () => {
  const { t } = useTranslation("contact");

  return (
    <div className="min-h-screen bg-[#F8F8F8] py-8 px-4 sm:px-6 lg:px-8 font-sans mt-24">
      {/* Header dengan Animasi */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center text-[#332C26] mb-12 tracking-tight font-montserrat"
      >
        {t("header.title")}
      </motion.h1>

      {/* Kontainer Utama dengan Animasi Stagger */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 1. Kartu Formulir (Kiri) */}
        <motion.div
          className="bg-[#2C241E] rounded-[20px] p-8 sm:p-10 shadow-2xl"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-inter">
            {t("form.title")}
          </h2>
          <form className="sm:mt-[6vh]">
            <InputField
              label={t("form.labels.fullName")}
              type="text"
              placeholder={t("form.placeholders.fullName")}
            />
            <InputField
              label={t("form.labels.email")}
              type="email"
              placeholder={t("form.placeholders.email")}
            />
            <InputField
              label={t("form.labels.phone")}
              type="tel"
              placeholder={t("form.placeholders.phone")}
            />
            <InputField
              label={t("form.labels.message")}
              isTextarea={true}
              placeholder={t("form.placeholders.message")}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-[#C6934B] text-white font-semibold text-lg py-3.5 rounded-md mt-4 transition duration-300 shadow-lg transform hover:bg-[#DFD7BF] hover:text-[#28221F] font-poppins"
            >
              {t("form.button")}
            </motion.button>
          </form>
        </motion.div>

        {/* 2. Kartu Informasi Kontak (Kanan) */}
        <motion.div
          className="bg-white rounded-[20px] p-8 sm:p-10 shadow-xl border border-gray-100 flex flex-col h-full"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#332C26] mb-8 font-inter">
            {t("contactInfo.title")}
          </h2>

          <motion.div
            className="space-y-4 flex-grow"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Phone Information */}
            <ContactInfoItem
              icon={<FaPhoneAlt className="mr-2 w-8 h-8" />}
              label={t("contactInfo.phone.label")}
            >
              <div>
                {t("contactInfo.phone.numbers", { returnObjects: true }).map(
                  (number, index) => (
                    <p className="font-poppins" key={index}>
                      {number}
                    </p>
                  ),
                )}
              </div>
            </ContactInfoItem>

            {/* Email Information */}
            <ContactInfoItem
              icon={<FaEnvelope className="mr-2 w-8 h-8" />}
              label={t("contactInfo.email.label")}
            >
              <div className="flex flex-col font-poppins">
                <a
                  className="hover:text-[#C6934B]"
                  href="mailto:info@rajpf.com"
                >
                  info@rajpf.com
                </a>
                <a
                  className="hover:text-[#C6934B]"
                  href="mailto:marketing@rajpf.com"
                >
                  marketing@rajpf.com
                </a>
              </div>
            </ContactInfoItem>

            {/* Address Information */}
            <ContactInfoItem
              icon={<FaMapMarkerAlt size={40} />}
              label={t("contactInfo.address.label")}
            >
              <div>
                {t("contactInfo.address.lines", { returnObjects: true }).map(
                  (line, index) => (
                    <p className="font-poppins" key={index}>
                      {line}
                    </p>
                  ),
                )}
              </div>
            </ContactInfoItem>
          </motion.div>

          {/* Embed Google Maps */}
          <motion.div
            className="mt-8 rounded-xl overflow-hidden h-64 w-full shadow-md border border-gray-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d130591.67524387666!2d111.1064882241782!3d-6.729969034336803!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e772c604a182293%3A0xb8927dcc8b6e7c97!2sPT%20Rajawali%20Perkasa%20Furniture!5e1!3m2!1sen!2sid!4v1765242757988!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
