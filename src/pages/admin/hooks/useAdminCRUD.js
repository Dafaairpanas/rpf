import { useState, useEffect, useCallback, useRef } from 'react';
import api from '@/api/axios';

/**
 * useAdminCRUD hook
 * Hyper-stable version with request-in-progress shielding.
 */
export default function useAdminCRUD(endpoint, options = {}) {
  const { initialParams = {}, transformData = (d) => d, skipFetch = false } = options;
  
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Use refs to store the latest values of props/options without triggering re-renders
  const endpointRef = useRef(endpoint);
  const paramsRef = useRef(initialParams);
  const transformRef = useRef(transformData);
  
  // Guard against overlapping or rapid-fire requests
  const isFetchingRef = useRef(false);
  const lastFetchTimeRef = useRef(0);

  useEffect(() => {
    endpointRef.current = endpoint;
    paramsRef.current = initialParams;
    transformRef.current = transformData;
  }, [endpoint, initialParams, transformData]);

  /**
   * Universal fetch function.
   * Stability: Guaranteed by useCallback([]).
   * Protection: Prevents overlapping calls and enforces a minimum 500ms delay between fetches.
   */
  const fetchData = useCallback(async (params = {}) => {
    const currentEndpoint = endpointRef.current;
    if (!currentEndpoint) return;

    // Rate limit protection: Prevent fetch if one is in progress OR last one was < 500ms ago
    const now = Date.now();
    if (isFetchingRef.current || (now - lastFetchTimeRef.current < 500)) {
      return;
    }

    isFetchingRef.current = true;
    lastFetchTimeRef.current = now;
    setLoading(true);
    setError('');
    
    try {
      const requestParams = { ...paramsRef.current, ...params };
      const config = {};
      if (Object.keys(requestParams).length > 0) {
        config.params = requestParams;
      }

      const res = await api.get(currentEndpoint, config);
      
      if (res.data.success) {
        const rawData = res.data.data;
        const currentTransformer = transformRef.current;
        
        if (rawData && rawData.data && Array.isArray(rawData.data)) {
          setItems(currentTransformer(rawData.data));
          setPagination({
            current_page: rawData.current_page || 1,
            last_page: rawData.last_page || 1,
            total: rawData.total || 0
          });
        } else {
          setItems(currentTransformer(rawData));
        }
      } else {
        // detail error message from success=false response
        const errorMsg = res.data.message || 'Gagal mengambil data';
        console.warn(`[AdminCRUD] Server returned success=false for ${currentEndpoint}:`, res.data);
        setError(`Server returned success=false: ${errorMsg}`);
      }
    } catch (err) {
      const status = err.response?.status;
      const serverMsg = err.response?.data?.message || err.message;
      
      console.error(`[AdminCRUD] Fetch Error (${currentEndpoint}):`, {
        status,
        message: serverMsg,
        data: err.response?.data
      });

      // User-friendly error messages based on status
      if (err.isForbidden) {
        setError('Anda tidak memiliki akses ke resource ini');
      } else if (err.isRateLimited) {
        setError('Terlalu banyak permintaan. Mohon tunggu sebentar.');
      } else if (err.validationErrors) {
        const firstError = Object.values(err.validationErrors)[0];
        setError(Array.isArray(firstError) ? firstError[0] : serverMsg);
      } else {
        setError(`Error ${status || ''}: ${serverMsg}`);
      }
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  const deleteItem = useCallback(async (id) => {
    const currentEndpoint = endpointRef.current;
    if (!window.confirm('Yakin ingin menghapus data ini?')) return false;
    
    setLoading(true);
    setError('');
    try {
      const res = await api.delete(`${currentEndpoint}/${id}`);
      if (res.data.success) {
        setSuccess('Data berhasil dihapus');
        // Small delay before refresh to avoid 429
        setTimeout(() => fetchData(), 500);
        setTimeout(() => setSuccess(''), 3000);
        return true;
      } else {
        setError(res.data.message || 'Gagal menghapus data');
        return false;
      }
    } catch (err) {
      setError(`Error: ${err.response?.data?.message || err.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  const saveData = useCallback(async (data, id = null, isMultipart = false) => {
    const currentEndpoint = endpointRef.current;
    setLoading(true);
    setError('');
    try {
      let res;
      const headers = isMultipart ? { 'Content-Type': 'multipart/form-data' } : {};
      
      // Some endpoints use POST for updates (e.g., banners)
      const usesPostForUpdate = currentEndpoint.includes('/banners');
      
      if (id) {
        if (isMultipart && data instanceof FormData) {
          // Don't append _method=PUT for endpoints that use POST for updates
          if (!usesPostForUpdate) {
            data.append('_method', 'PUT');
          }
          res = await api.post(`${currentEndpoint}/${id}`, data, { headers });
        } else if (usesPostForUpdate) {
          // Use POST for endpoints that don't support PUT
          res = await api.post(`${currentEndpoint}/${id}`, data, { headers });
        } else {
          res = await api.put(`${currentEndpoint}/${id}`, data, { headers });
        }
      } else {
        res = await api.post(currentEndpoint, data, { headers });
      }

      if (res.data.success) {
        setSuccess(id ? 'Data berhasil diupdate' : 'Data berhasil ditambahkan');
        setTimeout(() => fetchData(), 500);
        setTimeout(() => setSuccess(''), 3000);
        return res.data.data;
      } else {
        setError(res.data.message || 'Gagal menyimpan data');
        return null;
      }
    } catch (err) {
      setError(`Error: ${err.response?.data?.message || err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  const getItem = useCallback(async (id) => {
    const currentEndpoint = endpointRef.current;
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`${currentEndpoint}/${id}`);
      return res.data.success ? res.data.data : null;
    } catch (err) {
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on mount (Stability: Verified)
  useEffect(() => {
    if (!skipFetch) {
      fetchData();
    }
  }, [fetchData, skipFetch]);

  return {
    items,
    pagination,
    loading,
    error,
    success,
    setSuccess,
    setError,
    fetchData,
    deleteItem,
    saveData,
    getItem
  };
}
