import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Tag, Layers, Users, Newspaper, Award, Loader2, ShieldCheck, TrendingUp, Clock, ChevronRight, AlertCircle } from 'lucide-react';
import api from '@/api/axios';
import { isSuperAdmin } from '@/api/auth.api';
import MessageStatsChart from '@/components/admin/MessageStatsChart';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    brands: 0,
    certifications: 0,
    users: 0,
    news: 0,
    csr: 0
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const [productsRes, brandsRes, certificationsRes, usersRes, newsRes, csrRes] = await Promise.allSettled([
        api.get('/products'),
        api.get('/brands'),
        api.get('/certifications'),
        api.get('/users'),
        api.get('/news'),
        api.get('/csrs')
      ]);

      const getCount = (res) => {
        if (res.status === 'fulfilled' && res.value?.data?.success) {
          const data = res.value.data.data;
          if (data?.total !== undefined) return data.total;
          if (Array.isArray(data)) return data.length;
          if (data?.data && Array.isArray(data.data)) return data.data.length;
          return 0;
        }
        return 0;
      };

      const getRecentItems = (res, limit = 5) => {
        if (res.status === 'fulfilled' && res.value?.data?.success) {
          const data = res.value.data.data;
          const items = data?.data || (Array.isArray(data) ? data : []);
          return items.slice(0, limit);
        }
        return [];
      };

      setStats({
        products: getCount(productsRes),
        brands: getCount(brandsRes),
        certifications: getCount(certificationsRes),
        users: getCount(usersRes),
        news: getCount(newsRes),
        csr: getCount(csrRes)
      });

      setRecentProducts(getRecentItems(productsRes, 6));
      setRecentNews(getRecentItems(newsRes, 4));

    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('System failed to synchronize operational metrics');
    } finally {
      setLoading(false);
    }
  };

  // Check if user is super admin
  const isAdmin = isSuperAdmin();

  // Memoized stats data - only recalculates when stats object changes
  const statsData = useMemo(() => {
    const allStats = [
      { title: 'Products', value: stats.products, sub: 'Total Produk', icon: Box, color: 'from-amber-500/10 to-transparent' },
      { title: 'Brands', value: stats.brands, sub: 'Total Brand', icon: Tag, color: 'from-blue-500/10 to-transparent' },
      { title: 'Certifications', value: stats.certifications, sub: 'Total Sertifikasi', icon: ShieldCheck, color: 'from-emerald-500/10 to-transparent' },
      { title: 'Users', value: stats.users, sub: 'Total Pengguna', icon: Users, color: 'from-purple-500/10 to-transparent', superAdminOnly: true },
      { title: 'News', value: stats.news, sub: 'Total Berita', icon: Newspaper, color: 'from-rose-500/10 to-transparent' },
      { title: 'CSR', value: stats.csr, sub: 'Total Kegiatan CSR', icon: Award, color: 'from-teal-500/10 to-transparent' },
    ];
    
    // Filter out super admin only cards if not super admin
    return isAdmin ? allStats : allStats.filter(stat => !stat.superAdminOnly);
  }, [stats, isAdmin]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader2 className="animate-spin text-[#3C2F26] mx-auto opacity-20" size={60} />
            <div className="absolute inset-0 flex items-center justify-center">
              <TrendingUp className="text-[#3C2F26] animate-pulse" size={24} />
            </div>
          </div>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Synchronizing Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#F4F2EE] min-h-screen space-y-6 sm:space-y-8 lg:space-y-12">
      {/* HEADER SECTION */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0"
      >
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#3C2F26] tracking-tighter">Operational Nexus</h1>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-[#3C2F26] text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
              <ShieldCheck size={10} /> Tier 1 Access
            </span>
            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">System Online · {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
          </div>
        </div>
      </motion.div>

      {/* ERROR FEEDBACK */}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 font-bold text-xs flex items-center gap-3"
          >
            <AlertCircle size={18} /> {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* METRICS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {statsData.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`relative overflow-hidden bg-white p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl lg:rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-500 group cursor-default`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative space-y-4">
              <div className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center text-[#3C2F26] group-hover:bg-[#3C2F26] group-hover:text-white transition-all duration-500 shadow-inner">
                <stat.icon size={18} />
              </div>
              <div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-black text-[#3C2F26] tracking-tighter tabular-nums">{stat.value}</p>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">{stat.title}</span>
                  <span className="text-[8px] font-bold text-gray-400 tracking-wider group-hover:text-[#3C2F26]/60">{stat.sub}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MESSAGE ANALYTICS CHART */}
      <MessageStatsChart />

      {/* INTELLIGENCE FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* RECENT PRODUCTS */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] p-4 sm:p-6 lg:p-10 border border-gray-100 shadow-sm space-y-4 sm:space-y-6 lg:space-y-8"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-[#3C2F26] rounded-full" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-[#3C2F26] tracking-tight uppercase">Recent Inventories</h2>
            </div>
            <button className="p-3 bg-gray-50 hover:bg-[#3C2F26] text-gray-300 hover:text-white rounded-2xl transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="space-y-2">
            {recentProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Box size={40} className="mx-auto text-gray-100" />
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Zero Inventory Data</p>
              </div>
            ) : (
              recentProducts.map((p, i) => (
                <motion.div 
                  key={p.id || i}
                  whileHover={{ x: 10 }}
                  className="flex items-center group cursor-pointer p-4 hover:bg-gray-50 rounded-2xl transition-all"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center font-black text-[#3C2F26] text-sm mr-4 border border-gray-100">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#3C2F26] truncate">{p.name}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{p.master_category?.name || 'Standard'}</span>
                      <span className="w-1 h-1 bg-gray-200 rounded-full" />
                      <span className="text-[10px] font-bold text-gray-400">{p.material || 'Premium Alloy'}</span>
                    </div>
                  </div>
                  <TrendingUp size={14} className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* LATEST NEWS */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] p-4 sm:p-6 lg:p-10 border border-gray-100 shadow-sm space-y-4 sm:space-y-6 lg:space-y-8"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-[#3C2F26] rounded-full" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-[#3C2F26] tracking-tight uppercase">Public Dissemination</h2>
            </div>
            <button className="p-3 bg-gray-50 hover:bg-[#3C2F26] text-gray-300 hover:text-white rounded-2xl transition-all shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {recentNews.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Newspaper size={40} className="mx-auto text-gray-100" />
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">Zero Feed Data</p>
              </div>
            ) : (
              recentNews.map((n, i) => (
                <div key={n.id || i} className="group p-6 bg-gray-50 rounded-[2rem] hover:bg-[#3C2F26] transition-all duration-500 cursor-default">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#3C2F26] group-hover:text-[#F4F2EE] tracking-[0.2em] transition-colors">
                      <Clock size={12} />
                      {n.created_at ? new Date(n.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'Pending'}
                    </div>
                    {n.is_top_news && (
                      <span className="px-3 py-1 bg-red-500 text-white rounded-lg text-[8px] font-black uppercase tracking-widest animate-pulse shadow-lg shadow-red-500/20">
                        Priority
                      </span>
                    )}
                  </div>
                  <p className="text-lg font-bold text-[#3C2F26] group-hover:text-white transition-colors line-clamp-1">{n.title}</p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
