import React from "react";
import { IMAGES } from "@/assets/assets";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next"; // 1. Import hook

export default function DetailCSR() {
  // 2. Gunakan namespace 'articleNav' (sesuai nama key di resources i18n index.js)
  const { t } = useTranslation("articleNav");

  // helper: copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // Translate alert message
      alert(t("share.alert_copied"));
    } catch (e) {
      console.error("copy failed", e);
    }
  };

  const openShare = (type) => {
    const url = encodeURIComponent(window.location.href);
    // Translate default text
    const text = encodeURIComponent(document.title || t("share.default_text"));

    if (type === "twitter")
      window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        "_blank",
      );
    if (type === "facebook")
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank",
      );
    if (type === "linkedin")
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank",
      );
  };

  const iconButtonVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.12,
      rotate: 8,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#111827] font-sans ">
      {/* Header */}
      <header className="max-w-7xl mx-auto py-12 px-6 pt-32">
        <motion.div
          className="bg-[#f3f4f6]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-2xl md:text-4xl font-extrabold leading-tight mb-6 max-w-6xl font-montserrat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {/* Translate Title */}
            {t("header.title")}
          </motion.h1>

          <motion.div
            className="flex items-center gap-4 text-gray-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="w-8 h-8 bg-[#ebecef] rounded-md" />
            <div>
              {/* Translate Author & Date */}
              <div className="font-medium">{t("header.author")}</div>
              <div className="text-sm">{t("header.date")}</div>
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* Hero image full width box */}
      <motion.div
        className="w-full relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src={IMAGES.csrJpeg}
          alt="hero"
          className="w-full h-96 md:h-108 object-cover hover:scale-[1.02] transition-all duration-500"
        />
        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Main content container */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid gap-10">
        {/* Top card */}
        <motion.section
          className="grid md:grid-cols-3 gap-8 items-start"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="md:col-span-1">
            <motion.div
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500"
              whileHover={{ scale: 1.03 }}
            >
              <img
                src={IMAGES.csrJpeg}
                alt="thumb"
                className="w-full h-44 object-cover"
              />
            </motion.div>
          </div>

          <div className="md:col-span-2 text-gray-700">
            <p className="text-base leading-relaxed font-poppins">
              {/* Translate Paragraph 1 */}
              {t("body.paragraph_1")}
            </p>
          </div>
        </motion.section>

        {/* Paragraph */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-700 leading-relaxed font-poppins">
            {/* Translate Paragraph 2 */}
            {t("body.paragraph_2")}
          </p>
        </motion.section>

        {/* Gallery */}
        <section className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <motion.div
              key={i}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 relative"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img
                src={IMAGES.csrJpeg}
                alt={`gallery${i}`}
                className="w-full h-48 object-cover"
              />

              {/* hover reveal caption */}
              <motion.div
                className="absolute inset-0 flex items-end p-4"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <div className="bg-gradient-to-t from-black/60 via-black/30 to-transparent text-white rounded-md p-3 text-sm backdrop-blur-sm">
                  {/* Translate Gallery Caption */}
                  {t("body.gallery_caption")} {i}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </section>

        {/* Extra Paragraph */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-700 leading-relaxed font-poppins">
            {/* Translate Paragraph 3 */}
            {t("body.paragraph_3")}
          </p>
        </motion.section>

        {/* Footer navigation and share */}
        <footer className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
          {/* Previous */}
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
            <div
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3 hover:shadow-md transition-all duration-500
            group hover:bg-[#343130]"
            >
              <ChevronLeft
                size={48}
                className="text-gray-600 group-hover:text-white/60"
              />
              <div>
                <div className="text-sm text-gray-500 mb-1 group-hover:text-white/60">
                  {/* Translate Prev Label */}
                  {t("navigation.prev_label")}
                </div>
                <div className="text-xs text-black font-poppins font-medium group-hover:text-[#DFD7BF]">
                  {/* Translate Prev Title */}
                  {t("navigation.prev_title")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Share */}
          <div className="flex-1 flex flex-col items-center">
            {/* Translate Share Label */}
            <div className="mb-3 text-gray-600 font-medium">
              {t("share.label")}
            </div>
            <div className="flex items-center gap-5 text-[#6b4b3a]">
              {/** Share Buttons */}
              {[
                {
                  label: t("share.copy_link"),
                  action: () => copyToClipboard(),
                },
                {
                  label: t("share.twitter"),
                  action: () => openShare("twitter"),
                },
                {
                  label: t("share.facebook"),
                  action: () => openShare("facebook"),
                },
                {
                  label: t("share.linkedin"),
                  action: () => openShare("linkedin"),
                },
              ].map((item, index) => (
                <motion.button
                  key={index}
                  className="hover:scale-110 transition cursor-pointer bg-white p-2 rounded-full shadow-sm hover:bg-[#6b4b3a] hover:text-white"
                  variants={iconButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  onClick={item.action}
                  title={item.label}
                  aria-label={item.label}
                >
                  {index === 0 && (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 12a4 4 0 014-4h4" />
                      <path d="M17 16a4 4 0 01-4 4h-4" />
                      <path d="M8 12h8" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18 2H15L9 10L3 2H0L7.5 12L0 22H3L9 14L15 22H18L10.5 12L18 2Z" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3.1 3-3.1c.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.8h2.6l-.4 3h-2.2v7A10 10 0 0022 12z" />
                    </svg>
                  )}
                  {index === 3 && (
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5S1.9 1.5 3 1.5S4.98 2.4 4.98 3.5zM1.5 8h3V22h-3V8zm7.5 0h2.9v1.9h.1c.4-.7 1.6-2 3.6-2c3.8 0 4.5 2.5 4.5 5.8V22h-3v-7.3c0-1.7 0-3.8-2.3-3.8c-2.3 0-2.7 1.8-2.7 3.7V22h-3V8z" />
                    </svg>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Next */}
          <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
            <div
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 text-right flex items-center justify-end gap-3 hover:shadow-md transition-all duration-500
            hover:bg-[#343130] group hover:text-white"
            >
              <div>
                <div className="text-sm text-gray-500 mb-1 group-hover:text-white/60">
                  {/* Translate Next Label */}
                  {t("navigation.next_label")}
                </div>
                <div className="text-xs text-black font-poppins font-medium group-hover:text-[#DFD7BF]">
                  {/* Translate Next Title */}
                  {t("navigation.next_title")}
                </div>
              </div>
              <ChevronRight
                size={48}
                className="text-gray-600 group-hover:text-white/60"
              />
            </div>
          </motion.div>
        </footer>
      </main>
    </div>
  );
}
