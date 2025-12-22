import { useState, useEffect, useCallback, useMemo } from 'react';
import { getNews, getTopNews } from '@/api/news.api';

/**
 * useNews - Custom hook for news data fetching
 * Handles pagination, top news, and loading states
 */
export function useNews(perPage = 6) {
  const [news, setNews] = useState([]);
  const [topNews, setTopNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTopNews, setLoadingTopNews] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: perPage,
    total: 0
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
      console.error('Error fetching top news:', error);
    } finally {
      setLoadingTopNews(false);
    }
  }, []);

  // Fetch news list
  const fetchNews = useCallback(async (page) => {
    setLoading(true);
    try {
      const response = await getNews({ page, per_page: perPage });
      if (response.data.success) {
        const result = response.data.data;
        setNews(result.data || []);
        setPagination({
          current_page: result.current_page,
          last_page: result.last_page,
          per_page: result.per_page,
          total: result.total
        });
      }
    } catch (error) {
      console.error('Error fetching News:', error);
    } finally {
      setLoading(false);
    }
  }, [perPage]);

  // Initial fetch
  useEffect(() => {
    fetchTopNews();
  }, [fetchTopNews]);

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage, fetchNews]);

  // Pagination handlers
  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  }, [currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < pagination.last_page) setCurrentPage(prev => prev + 1);
  }, [currentPage, pagination.last_page]);

  const handlePageClick = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
  }, []);

  // Generate pagination items (max 4 visible)
  const paginationItems = useMemo(() => {
    const items = [];
    const maxVisible = 4;

    if (pagination.last_page <= maxVisible) {
      for (let i = 1; i <= pagination.last_page; i++) items.push(i);
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= maxVisible; i++) items.push(i);
      } else if (currentPage >= pagination.last_page - 1) {
        for (let i = pagination.last_page - maxVisible + 1; i <= pagination.last_page; i++) items.push(i);
      } else {
        for (let i = currentPage - 1; i <= currentPage + 2; i++) items.push(i);
      }
    }
    return items;
  }, [pagination.last_page, currentPage]);

  // Filter out top news from regular cards
  const regularNews = useMemo(() => 
    news.filter(item => !item.is_top_news),
    [news]
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
    handlePageClick
  };
}

// Format date utility
export const formatNewsDate = (dateString, fallback = 'No date') => {
  if (!dateString) return fallback;
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
