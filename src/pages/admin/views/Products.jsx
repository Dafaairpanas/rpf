import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Filter } from 'lucide-react';
import useAdminCRUD from '../hooks/useAdminCRUD';
import useDebounce from '@/hooks/useDebounce';
import AdminTable from '../components/AdminTable';
import { getImageUrl } from '@/config';

// Static column definitions
const PRODUCT_COLUMNS = [
  { 
    key: 'name', 
    label: 'Name',
    render: (item) => (
      <div className="flex flex-col">
        <span className="font-bold text-[#3C2F26]">{item.name}</span>
        <span className="text-[10px] text-gray-400 font-medium">
          {item.material || 'No material'} • {item.creator?.name || 'Admin'}
        </span>
      </div>
    )
  },
  { 
    key: 'master_category', 
    label: 'Category',
    render: (item) => (
      <span className="bg-[#3C2F26]/5 px-2 py-1 rounded text-xs font-bold text-[#3C2F26]">
        {item.master_category?.name || '-'}
      </span>
    )
  },
  {
    key: 'product_images',
    label: 'Images',
    render: (item) => (
      <div className="flex -space-x-2">
        {(item.product_images || []).slice(0, 3).map((img, idx) => (
          <img 
            key={idx} 
            src={getImageUrl(img.image_url)} 
            className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
          />
        ))}
        {(item.product_images || []).length > 3 && (
          <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500 shadow-sm">
            +{(item.product_images || []).length - 3}
          </div>
        )}
      </div>
    )
  }
];

const Products = () => {
  const navigate = useNavigate();
  const { 
    items: products, 
    loading, 
    error, 
    success, 
    deleteItem 
  } = useAdminCRUD('/products');

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // MEMOIZED FILTERING
  const filteredProducts = useMemo(() => {
    return products.filter(item => {
      const matchSearch = item.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                         item.master_category?.name?.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchCategory = categoryFilter === '' || item.master_category_id?.toString() === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [products, debouncedSearch, categoryFilter]);

  // HANDLERS - Navigate to full-screen form
  const handleAdd = () => navigate('/admin/products/create');
  const handleEdit = (product) => navigate(`/admin/products/${product.id}/edit`);

  return (
    <div className="p-4 sm:p-8 bg-[#F4F2EE] min-h-screen">
      {(error || success) && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 border ${
          error ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          {error ? <AlertCircle size={20} /> : <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          <p className="text-sm font-medium">{error || success}</p>
        </div>
      )}

      {/* FILTER HEADER */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
          <Filter size={16} className="text-gray-400" />
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-sm font-bold text-[#3C2F26] appearance-none cursor-pointer pr-6"
          >
            <option value="">All Categories</option>
            <option value="1">Indoor</option>
            <option value="2">Outdoor</option>
          </select>
        </div>
      </div>

      <AdminTable
        title="Products"
        data={filteredProducts}
        columns={PRODUCT_COLUMNS}
        loading={loading && products.length === 0}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteItem}
      />
    </div>
  );
};

export default Products;
