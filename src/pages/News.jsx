import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNews } from "@/hooks/useNews";
import { NewsCard, TopNewsBanner, NewsPagination } from "@/components/news";

// Animation variant
const sectionFadeInVariant = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" },
  viewport: { once: true, amount: 0.1 },
};

/**
 * News Page - Thin Page Principle
 * All logic in useNews hook, components extracted
 * 429 lines → ~70 lines (84% reduction)
 */
function News() {
  const { t } = useTranslation("news");
  const {
    news,
    topNews,
    loading,
    loadingTopNews,
    pagination,
    currentPage,
    paginationItems,
    handlePreviousPage,
    handleNextPage,
    handlePageClick,
  } = useNews(); // perPage will be dynamic based on currentPage in hook

  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-full h-full py-8 sm:py-10 px-4 sm:px-6 lg:px-12 mt-10 sm:mt-0">
        {/* HEADER */}
        <motion.div
          {...sectionFadeInVariant}
          className="text-center mb-8 sm:mb-12 lg:mb-16 mt-12 sm:mt-16 lg:mt-24"
        >
          <h1
            className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#28221F] font-montserrat"
            dangerouslySetInnerHTML={{
              __html: t("hero.title", {
                interpolation: { escapeValue: false },
              }),
            }}
          />
          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* TOP NEWS BANNER - Only show on page 1 */}
        {currentPage === 1 && !loadingTopNews && <TopNewsBanner topNews={topNews} />}

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center py-16 sm:py-20">
            <Loader2 className="animate-spin text-[#3C2F26]" size={40} />
          </div>
        )}

        {/* NEWS CARDS GRID */}
        {!loading && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            {news.length > 0 ? (
              news.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} t={t} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-20 px-6">
                <div className="relative mb-6">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#F4F2EE] to-[#E8E4DC] flex items-center justify-center shadow-inner">
                    <svg
                      className="w-10 h-10 text-[#C58E47] opacity-80"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#C58E47]/20 animate-[spin_20s_linear_infinite]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[#3C2F26] text-center mb-2">
                  {t("empty.title")}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 text-center max-w-md">
                  {t("empty.subtitle")}
                </p>
              </div>
            )}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && (
          <NewsPagination
            currentPage={currentPage}
            lastPage={pagination.last_page}
            onPageChange={handlePageClick}
          />
        )}
      </div>
    </div>
  );
}

export default News;
