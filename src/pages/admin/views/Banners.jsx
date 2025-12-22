import React, { useState } from 'react';
import { AlertCircle, Loader2, Link as LinkIcon, Eye, EyeOff } from 'lucide-react';
import useAdminCRUD from '../hooks/useAdminCRUD';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';
import AdminImageUploader from '../components/AdminImageUploader';
import { API_BASE_URL } from '@/config';

const Banners = () => {

  // HOOKS
  const {
    items: banners,
    loading,
    error,
    success,
    deleteItem,
    saveData
  } = useAdminCRUD('/admin/banners');

  const [searchTerm, setSearchTerm] = useState('');

  // FORM STATE
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    order: 1,
    is_active: true
  });
  const [newImage, setNewImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // HANDLERS
  const handleOpenModal = (banner = null) => {
    if (banner) {
      setEditingId(banner.id);
      setFormData({
        title: banner.title || '',
        link: banner.link || '',
        order: banner.order || 1,
        is_active: !!banner.is_active
      });
      setExistingImage(banner.image ? (banner.image.startsWith('http') ? banner.image : `${API_BASE_URL}${banner.image.startsWith('/') ? '' : '/'}${banner.image}`) : null);
    } else {
      setEditingId(null);
      setFormData({ title: '', link: '', order: 1, is_active: true });
      setExistingImage(null);
    }
    setNewImage(null);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim()) return;

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('link', formData.link || '');
    submitData.append('order', formData.order || 1);
    submitData.append('is_active', formData.is_active ? 1 : 0);
    
    if (newImage) {
      submitData.append('image', newImage);
    }

    const result = await saveData(submitData, editingId, true);
    if (result) setShowModal(false);
  };

  // TABLE COLUMNS
  const columns = [
    {
      key: 'image',
      label: 'Preview',
      render: (item) => (
        <img
          src={item.image ? (item.image.startsWith('http') ? item.image : `${API_BASE_URL}${item.image.startsWith('/') ? '' : '/'}${item.image}`) : 'https://via.placeholder.com/80x48?text=No+Image'}
          alt={item.title}
          className="w-20 h-12 rounded-lg object-cover border border-gray-100 shadow-sm"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/80x48?text=Error'; }}
        />
      )
    },
    {
      key: 'title',
      label: 'Info',
      render: (item) => (
        <div className="flex flex-col">
          <span className="font-bold text-[#3C2F26]">{item.title}</span>
          {item.link && (
            <span className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
              <LinkIcon size={10} /> {item.link}
            </span>
          )}
        </div>
      )
    },
    {
      key: 'order',
      label: 'Order',
      render: (item) => (
        <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
          #{item.order}
        </span>
      )
    },
    {
      key: 'is_active',
      label: 'Status',
      render: (item) => (
        item.is_active ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-[10px] uppercase tracking-wider">
            <Eye size={10} /> Visible
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-400 rounded-lg font-bold text-[10px] uppercase tracking-wider">
            <EyeOff size={10} /> Hidden
          </span>
        )
      )
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#F4F2EE] min-h-screen">
      {(error || success) && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-2 border ${
          error ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          {error ? <AlertCircle size={20} /> : <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          <p className="text-sm font-medium">{error || success}</p>
        </div>
      )}

      <AdminTable
        title="Banner Management"
        data={banners}
        columns={columns}
        loading={loading && banners.length === 0}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={() => handleOpenModal()}
        onEdit={handleOpenModal}
        onDelete={deleteItem}
      />

      <AdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? 'Edit Banner' : 'Create New Banner'}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Banner Heading</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Premium Teak Collection"
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-transparent rounded-xl sm:rounded-2xl focus:bg-white focus:border-[#3C2F26]/20 transition-all font-bold text-base sm:text-lg text-[#3C2F26] placeholder:text-gray-300"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Target Link (Optional)</label>
              <div className="relative">
                <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="/collections/featured"
                  className="w-full pl-10 sm:pl-12 pr-4 sm:pr-5 py-3 sm:py-3.5 bg-gray-50 border border-transparent rounded-xl sm:rounded-2xl focus:bg-white focus:border-[#3C2F26]/20 transition-all font-medium text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Display Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-transparent rounded-xl sm:rounded-2xl focus:bg-white focus:border-[#3C2F26]/20 transition-all font-mono font-bold text-[#3C2F26]"
              />
            </div>

            <div className="flex items-end pb-3.5">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${formData.is_active ? 'bg-[#3C2F26]' : 'bg-gray-200'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${formData.is_active ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="hidden"
                />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#3C2F26] transition-colors">
                  {formData.is_active ? 'Visible on Site' : 'Hidden from Site'}
                </span>
              </label>
            </div>
          </div>

          <div>
            <AdminImageUploader
              label="Banner Image Asset"
              existingImages={existingImage ? [existingImage] : []}
              newImages={newImage ? [newImage] : []}
              onUpload={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setNewImage(files[0]);
                }
              }}
              onRemoveExisting={() => setExistingImage(null)}
              onRemoveNew={() => setNewImage(null)}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 text-gray-500 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-200 transition-all text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-[#3C2F26] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-[#2a1f18] disabled:bg-gray-400 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              {editingId ? 'Update Banner' : 'Publish Banner'}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default Banners;
