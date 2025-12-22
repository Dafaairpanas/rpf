import { useState, useEffect, useCallback, useRef } from 'react';
import api from '@/api/axios';

/**
 * useProducts - Custom hook for fetching products with pagination
 * Handles loading, error states, and prevents duplicate requests
 */
export function useProducts({ 
  page = 1, 
  perPage = 8, 
  categoryId = null, 
  search = '' 
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0
  });

  // Prevent duplicate fetches
  const abortControllerRef = useRef(null);

  const fetchProducts = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const params = { page, per_page: perPage };
      if (categoryId && categoryId !== 'all') {
        params.category_id = categoryId;
      }
      if (search.trim()) {
        params.q = search.trim();
      }

      const res = await api.get('/products', { 
        params,
        signal: abortControllerRef.current.signal
      });

      if (res.data.success) {
        const result = res.data.data;
        const productList = Array.isArray(result) ? result : result.data || [];
        
        setProducts(productList);
        setPagination({
          currentPage: result.current_page || 1,
          lastPage: result.last_page || 1,
          total: result.total || productList.length
        });
      } else {
        setProducts([]);
        setError(res.data.message || 'Failed to fetch products');
      }
    } catch (err) {
      // Ignore aborted/canceled requests (from typing fast, navigating away, etc)
      if (err.name === 'AbortError' || err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
        // Request was intentionally canceled, don't set error
        return;
      }
      console.error('Products fetch error:', err);
      setProducts([]);
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [page, perPage, categoryId, search]);

  // Fetch on dependency change
  useEffect(() => {
    fetchProducts();

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    pagination,
    refetch: fetchProducts
  };
}

/**
 * useProductDetail - Fetch single product details
 */
export function useProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProduct = useCallback(async (productId) => {
    if (!productId) return;
    
    setLoading(true);
    setError(null);

    try {
      const res = await api.get(`/products/${productId}`);
      setProduct(res.data.data || res.data);
    } catch (err) {
      console.error('Product detail error:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearProduct = useCallback(() => {
    setProduct(null);
    setError(null);
  }, []);

  return {
    product,
    loading,
    error,
    fetchProduct,
    clearProduct
  };
}
