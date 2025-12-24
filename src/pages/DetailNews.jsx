import React, { useState, useEffect } from "react";
import { IMAGES } from "@/assets/assets";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { getNewsById } from "@/api/news.api";

export default function DetailNews() {
  const { t } = useTranslation("news");
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [news, setNews] = useState(null);
  const [prevNews, setPrevNews] = useState(null);
  const [nextNews, setNextNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch News Detail
  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getNewsById(id);
      if (response.data.success) {
        setNews(response.data.data);
        
        // Fetch adjacent News for navigation titles
        const prevId = parseInt(id) - 1;
        const nextId = parseInt(id) + 1;
        
        try {
          if (prevId >= 1) {
            const prevResponse = await getNewsById(prevId);
            if (prevResponse.data.success) {
              setPrevNews(prevResponse.data.data);
            } else {
              setPrevNews(null);
            }
          } else {
            setPrevNews(null);
          }
        } catch {
          setPrevNews(null);
        }
        
        try {
          const nextResponse = await getNewsById(nextId);
          if (nextResponse.data.success) {
            setNextNews(nextResponse.data.data);
          } else {
            setNextNews(null);
          }
        } catch {
          setNextNews(null);
        }
      } else {
        setError('News not found');
      }
    } catch (err) {
      console.error('Error fetching News detail:', err);
      setError('Failed to load News details');
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // helper: copy to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert(t("share.alert_copied"));
    } catch (e) {
      console.error("copy failed", e);
    }
  };

  const openShare = (type) => {
    const url = encodeURIComponent(window.location.href);
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

  // helper: extract initials
  const getInitials = (name) => {
    if (!name) return 'A';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  // Share buttons component
  const shareButtons = [
    { label: t("share.copy_link"), action: () => copyToClipboard() },
    { label: t("share.twitter"), action: () => openShare("twitter") },
    { label: t("share.facebook"), action: () => openShare("facebook") },
    { label: t("share.linkedin"), action: () => openShare("linkedin") },
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
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a4 4 0 014-4h4" />
          <path d="M17 16a4 4 0 01-4 4h-4" />
          <path d="M8 12h8" />
        </svg>
      )}
      {index === 1 && (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2H15L9 10L3 2H0L7.5 12L0 22H3L9 14L15 22H18L10.5 12L18 2Z" />
        </svg>
      )}
      {index === 2 && (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1.2-3.1 3-3.1c.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.8h2.6l-.4 3h-2.2v7A10 10 0 0022 12z" />
        </svg>
      )}
      {index === 3 && (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5S1.9 1.5 3 1.5S4.98 2.4 4.98 3.5zM1.5 8h3V22h-3V8zm7.5 0h2.9v1.9h.1c.4-.7 1.6-2 3.6-2c3.8 0 4.5 2.5 4.5 5.8V22h-3v-7.3c0-1.7 0-3.8-2.3-3.8c-2.3 0-2.7 1.8-2.7 3.7V22h-3V8z" />
        </svg>
      )}
    </motion.button>
  ));

  return (
    <div className="min-h-screen bg-[#f3f4f6] text-[#111827] font-poppins ">
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="animate-spin text-[#3C2F26]" size={64} />
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h2 className="text-2xl font-bold text-red-600 mb-4">{error}</h2>
          <button
            onClick={() => navigate('/News')}
            className="px-6 py-3 bg-[#3C2F26] text-white rounded-lg hover:bg-[#52453B] transition"
          >
            Kembali ke Daftar News
          </button>
        </div>
      )}

      {/* Content */}
      {news && !loading && (
        <>
          {/* Header */}
          <header className="max-w-7xl mx-auto py-12 px-6 pt-32">
            <motion.div
              className="bg-[#f3f4f6]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1
                className="text-2xl md:text-4xl font-extrabold leading-tight mb-6 font-montserrat text-[#28221F]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {news.title}
              </motion.h1>

              <motion.div
                className="flex items-center gap-4 text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="w-10 h-10 bg-[#3C2F26] text-white rounded-xl flex items-center justify-center font-bold shadow-sm">
                  {getInitials(news.creator?.name || 'Administrator')}
                </div>
                <div>
                  <div className="font-medium text-[#28221F]">{news.creator?.name || 'Administrator'}</div>
                  <div className="text-sm opacity-70">{formatDate(news.created_at)}</div>
                </div>
              </motion.div>
            </motion.div>
          </header>

          {/* Divider between header and content */}
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-b border-gray-200 my-6"></div>
          </div>

          {/* Main content container */}
          <main className="max-w-7xl mx-auto px-6 py-6">
            {/* News Content - Nested structure */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              {/* ✅ Extract nested content.content */}
              <div
                className="ck-content"
                dangerouslySetInnerHTML={{
                  __html: news.content?.content || '<p>Tidak ada konten tersedia</p>'
                }}
              />
            </motion.section>

            {/* Footer navigation and share */}
            <footer className="py-8 mt-10">
              {/* Desktop Layout: Sebelumnya | Share | Selanjutnya */}
              <div className="hidden md:flex items-center justify-between gap-6">
                {/* Previous */}
                {prevNews ? (
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
                    <button
                      onClick={() => navigate(`/news/${parseInt(id) - 1}`)}
                      className="w-full bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3 hover:shadow-md transition-all duration-500 group hover:bg-[#343130]"
                    >
                      <ChevronLeft
                        size={32}
                        className="text-gray-600 group-hover:text-white/60 flex-shrink-0"
                      />
                      <div className="text-left min-w-0">
                        <div className="text-sm text-gray-500 mb-1 group-hover:text-white/60">
                          {t("detail.previous")}
                        </div>
                        <div className="text-sm text-black font-poppins font-medium group-hover:text-[#DFD7BF] line-clamp-1">
                          {prevNews.title}
                        </div>
                      </div>
                    </button>
                  </motion.div>
                ) : <div className="flex-1" />}

                {/* Share - Center */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="mb-3 text-gray-600 font-medium">
                    {t("detail.share")}
                  </div>
                  <div className="flex items-center gap-5 text-[#6b4b3a]">
                    {shareButtons}
                  </div>
                </div>

                {/* Next */}
                {nextNews ? (
                  <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
                    <button
                      onClick={() => navigate(`/news/${parseInt(id) + 1}`)}
                      className="w-full bg-white p-5 rounded-lg shadow-sm border border-gray-200 text-right flex items-center justify-end gap-3 hover:shadow-md transition-all duration-500 hover:bg-[#343130] group hover:text-white"
                    >
                      <div className="text-right min-w-0">
                        <div className="text-sm text-gray-500 mb-1 group-hover:text-white/60">
                          {t("detail.next")}
                        </div>
                        <div className="text-sm text-black font-poppins font-medium group-hover:text-[#DFD7BF] line-clamp-1">
                          {nextNews.title}
                        </div>
                      </div>
                      <ChevronRight
                        size={32}
                        className="text-gray-600 group-hover:text-white/60 flex-shrink-0"
                      />
                    </button>
                  </motion.div>
                ) : <div className="flex-1" />}
              </div>

              {/* Mobile Layout: Share + Navigation below */}
              <div className="md:hidden">
                {/* Share - Top */}
                <div className="flex flex-col items-center mb-6">
                  <div className="mb-3 text-gray-600 font-medium">
                    {t("detail.share")}
                  </div>
                  <div className="flex items-center gap-5 text-[#6b4b3a]">
                    {shareButtons}
                  </div>
                </div>

                {/* Navigation Buttons - Below Share */}
                <div className="flex flex-row gap-3">
                  {/* Previous */}
                  {prevNews && (
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
                      <button
                        onClick={() => navigate(`/news/${parseInt(id) - 1}`)}
                        className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-2 hover:shadow-md transition-all duration-500 group hover:bg-[#343130] min-h-[80px]"
                      >
                        <ChevronLeft
                          size={24}
                          className="text-gray-600 group-hover:text-white/60 flex-shrink-0"
                        />
                        <div className="text-left min-w-0">
                          <div className="text-xs text-gray-500 mb-1 group-hover:text-white/60">
                            {t("detail.previous")}
                          </div>
                          <div className="text-xs text-black font-poppins font-medium group-hover:text-[#DFD7BF] line-clamp-2">
                            {prevNews.title}
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  )}

                  {/* Next */}
                  {nextNews && (
                    <motion.div className="flex-1" whileHover={{ scale: 1.02 }}>
                      <button
                        onClick={() => navigate(`/news/${parseInt(id) + 1}`)}
                        className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200 text-right flex items-center justify-end gap-2 hover:shadow-md transition-all duration-500 hover:bg-[#343130] group hover:text-white min-h-[80px]"
                      >
                        <div className="text-right min-w-0">
                          <div className="text-xs text-gray-500 mb-1 group-hover:text-white/60">
                            {t("detail.next")}
                          </div>
                          <div className="text-xs text-black font-poppins font-medium group-hover:text-[#DFD7BF] line-clamp-2">
                            {nextNews.title}
                          </div>
                        </div>
                        <ChevronRight
                          size={24}
                          className="text-gray-600 group-hover:text-white/60 flex-shrink-0"
                        />
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </footer>
          </main>
        </>
      )}
    </div>
  );
}
