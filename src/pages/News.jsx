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
    handlePageClick
  } = useNews(6);

  return (
    <div className="w-full overflow-x-hidden">
      <div className="w-full h-full py-8 sm:py-10 px-4 sm:px-6 lg:px-12">
        {/* HEADER */}
        <motion.div {...sectionFadeInVariant} className="text-center mb-8 sm:mb-12 lg:mb-16 mt-12 sm:mt-16 lg:mt-24">
          <h1
            className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#28221F] font-montserrat"
            dangerouslySetInnerHTML={{
              __html: t("hero.title", { interpolation: { escapeValue: false } }),
            }}
          />
          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* TOP NEWS BANNER */}
        {!loadingTopNews && <TopNewsBanner topNews={topNews} />}

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center py-16 sm:py-20">
            <Loader2 className="animate-spin text-[#3C2F26]" size={40} />
          </div>
        )}

        {/* NEWS CARDS GRID */}
        {!loading && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12 lg:mb-16">
            {news.length > 0 ? (
              news.map((item, index) => (
                <NewsCard key={item.id} item={item} index={index} t={t} />
              ))
            ) : (
              <div className="col-span-full text-center py-16 sm:py-20 text-gray-500">
                <p>Belum ada data news tersedia</p>
              </div>
            )}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && (
          <NewsPagination
            currentPage={currentPage}
            lastPage={pagination.last_page}
            paginationItems={paginationItems}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            onPageClick={handlePageClick}
          />
        )}
      </div>
    </div>
  );
}

export default News;
