import { useState, useEffect, useCallback, useMemo } from "react";
import { getNews, getTopNews } from "@/api/news.api";
import { generatePagination } from "@/utils/pagination";

/**
 * useNews - Custom hook for news data fetching
 * Handles pagination, top news, and loading states
 * Uses consistent perPage=6 for all pages
 */
export function useNews() {
  const [news, setNews] = useState([]);
  const [topNews, setTopNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTopNews, setLoadingTopNews] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 6,
    total: 0,
  });

  // Fetch top news
  const fetchTopNews = useCallback(async () => {
    setLoadingTopNews(true);
    try {
      const response = await getTopNews();
      if (response.data.success && response.data.data) {
        setTopNews(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching top news:", error);
    } finally {
      setLoadingTopNews(false);
    }
  }, []);

  // Fetch news list
  // Page 1 displays 7 cards, Page 2+ displays 6 cards
  // But pagination is calculated with consistent per_page=6
  const fetchNews = useCallback(
    async (page) => {
      setLoading(true);
      const displayPerPage = page === 1 ? 7 : 6; // Items to display
      const paginationPerPage = 6; // For consistent last_page calculation
      
      try {
        const response = await getNews({ page, per_page: displayPerPage });
        if (response.data.success) {
          const result = response.data.data;
          // Backend now returns array directly, not paginated
          if (Array.isArray(result)) {
            setNews(result);
            // No pagination anymore
            setPagination({
              current_page: 1,
              last_page: 1,
              per_page: result.length,
              total: result.length,
            });
          } else {
            // Paginated response - calculate last_page consistently
            const calculatedLastPage = Math.ceil(result.total / paginationPerPage);
            setNews(result.data || []);
            setPagination({
              current_page: result.current_page,
              last_page: calculatedLastPage, // Use consistent calculation
              per_page: paginationPerPage,
              total: result.total,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching News:", error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Initial fetch
  useEffect(() => {
    fetchTopNews();
  }, [fetchTopNews]);

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, fetchNews]);

  // Pagination handlers
  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < pagination.last_page) setCurrentPage((prev) => prev + 1);
  }, [currentPage, pagination.last_page]);

  const handlePageClick = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  // Generate pagination items with ellipsis
  const paginationItems = useMemo(() => {
    return generatePagination(currentPage, pagination.last_page);
  }, [pagination.last_page, currentPage]);

  // Filter out top news from regular cards
  const regularNews = useMemo(
    () => news.filter((item) => !item.is_top_news),
    [news],
  );

  return {
    news: regularNews,
    topNews,
    loading,
    loadingTopNews,
    pagination,
    currentPage,
    paginationItems,
    handlePreviousPage,
    handleNextPage,
    handlePageClick,
  };
}

// Format date utility
export const formatNewsDate = (dateString, fallback = "No date") => {
  if (!dateString) return fallback;
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
