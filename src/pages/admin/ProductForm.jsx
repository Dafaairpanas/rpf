// ProductForm.jsx — FULL SCREEN PRODUCT CREATE/EDIT PAGE
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Loader2, X, Upload } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/api/axios";
import { getImageUrl, API_BASE_URL } from '@/config';

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Dimensions list
  const [dimensions, setDimensions] = useState([]);
  const [showNewDimension, setShowNewDimension] = useState(false);
  const [newDimension, setNewDimension] = useState({ width: '', height: '', depth: '' });
  const [creatingDimension, setCreatingDimension] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    material: '',
    master_category_id: '1',
    dimension_id: '',
  });

  // Images state
  const [selectedImages, setSelectedImages] = useState({ cover: [], product: [], teak: [] });
  const [existingImages, setExistingImages] = useState({ cover: [], product: [], teak: [] });
  const [deletedImageIds, setDeletedImageIds] = useState({ cover: [], product: [], teak: [] });

  // Fetch dimensions list on mount
  useEffect(() => {
    api.get('/dimensions')
      .then(res => {
        if (res.data.success) {
          const data = res.data.data;
          setDimensions(Array.isArray(data) ? data : data.data || []);
        }
      })
      .catch(err => console.error('Error fetching dimensions:', err));
  }, []);

  // Fetch product data if editing
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api.get(`/products/${id}`)
        .then(res => {
          if (res.data.success) {
            const product = res.data.data;
            setFormData({
              name: product.name || '',
              material: product.material || '',
              master_category_id: product.master_category_id || '1',
              dimension_id: product.dimension_id || '',
            });
            setExistingImages({
              cover: product.cover_images || [],
              product: product.product_images || [],
              teak: product.teak_images || [],
            });
          }
        })
        .catch(err => {
          console.error('Error fetching product:', err);
          setError('Failed to load product');
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  // Handle image upload
  const handleImageChange = (e, type) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prev => ({
      ...prev,
      [type]: [...prev[type], ...files]
    }));
  };

  // Remove new image
  const removeNewImage = (type, index) => {
    setSelectedImages(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  // Remove existing image (track for deletion)
  const removeExistingImage = (type, imageId) => {
    setExistingImages(prev => ({
      ...prev,
      [type]: prev[type].filter(img => img.id !== imageId)
    }));
    // Track deleted image IDs for API
    setDeletedImageIds(prev => ({
      ...prev,
      [type]: [...prev[type], imageId]
    }));
  };

  // Handle save
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }

    setSaving(true);
    setError('');

    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('material', formData.material);
    fd.append('master_category_id', formData.master_category_id);
    if (formData.dimension_id) {
      fd.append('dimension_id', formData.dimension_id);
    }

    // New Images
    selectedImages.cover.forEach(file => fd.append('cover_images[]', file));
    selectedImages.product.forEach(file => fd.append('product_images[]', file));
    selectedImages.teak.forEach(file => fd.append('teak_images[]', file));

    // Deleted Images (for edit) - send IDs to delete
    if (isEditing) {
      fd.append('_method', 'PUT');
      
      // Send deleted image IDs
      deletedImageIds.cover.forEach(id => fd.append('cover_images_delete[]', id));
      deletedImageIds.product.forEach(id => fd.append('product_images_delete[]', id));
      deletedImageIds.teak.forEach(id => fd.append('teak_images_delete[]', id));
    }

    try {
      const url = isEditing ? `/products/${id}` : '/products';
      const method = isEditing ? 'post' : 'post';
      await api[method](url, fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/admin/products');
    } catch (err) {
      console.error('Save error:', err);
      setError(err.response?.data?.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F2EE] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#3C2F26]" />
      </div>
    );
  }

  return (
    <div className=" bg-[#F4F2EE]">
      {/* Header - Clean with back button only */}
      <div className="px-3 sm:px-6 py-4 flex items-center gap-3">
        <button 
          onClick={() => navigate('/admin/products')}
          className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition active:scale-95 cursor-pointer"
          title="Back to products"
        >
          <ArrowLeft size={20} className="text-[#3C2F26]" />
        </button>
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-[#3C2F26]">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-[10px] sm:text-xs text-gray-400 font-medium">Manage your product catalog</p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 sm:mx-6 mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
          <X size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="px-4 sm:px-6 py-3 max-w-7xl mx-auto">
        {/* Main Content - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* LEFT COLUMN - Basic Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 min-h-[500px] flex flex-col">
            <h2 className="text-base font-bold text-[#3C2F26] mb-5 flex items-center gap-2">
              <span className="w-6 h-6 bg-[#3C2F26] text-white rounded-full flex items-center justify-center text-xs">1</span>
              Product Information
            </h2>
            
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Product Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 focus:border-[#3C2F26] transition-all"
                  placeholder="e.g. Teak Lounge Chair"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Category *</label>
                <select
                  required
                  value={formData.master_category_id}
                  onChange={(e) => setFormData({ ...formData, master_category_id: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 focus:border-[#3C2F26] transition-all appearance-none cursor-pointer"
                >
                  <option value="1">Indoor</option>
                  <option value="2">Outdoor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Material</label>
                <input
                  type="text"
                  value={formData.material}
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 focus:border-[#3C2F26] transition-all"
                  placeholder="e.g. Teak Wood"
                />
              </div>

              {/* Dimensions */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1.5">Dimensions</label>
                
                {!showNewDimension ? (
                  <div className="flex gap-2">
                    <select
                      value={formData.dimension_id}
                      onChange={(e) => setFormData({ ...formData, dimension_id: e.target.value })}
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 focus:border-[#3C2F26] transition-all appearance-none cursor-pointer"
                    >
                      <option value="">No Dimension</option>
                      {dimensions.map(dim => (
                        <option key={dim.id} value={dim.id}>
                          {dim.width} x {dim.height} x {dim.depth} cm
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => setShowNewDimension(true)}
                      className="px-4 py-2 bg-[#3C2F26] text-white rounded-xl text-sm font-medium hover:bg-[#2a1f18] transition-colors whitespace-nowrap"
                    >
                      + New
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-3">
                    <p className="text-sm font-medium text-gray-700">Create New Dimension (cm)</p>
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="number"
                        value={newDimension.width}
                        onChange={(e) => setNewDimension({ ...newDimension, width: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-center text-sm"
                        placeholder="Width"
                      />
                      <input
                        type="number"
                        value={newDimension.height}
                        onChange={(e) => setNewDimension({ ...newDimension, height: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-center text-sm"
                        placeholder="Height"
                      />
                      <input
                        type="number"
                        value={newDimension.depth}
                        onChange={(e) => setNewDimension({ ...newDimension, depth: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-center text-sm"
                        placeholder="Depth"
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowNewDimension(false);
                          setNewDimension({ width: '', height: '', depth: '' });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={creatingDimension || !newDimension.width}
                        onClick={async () => {
                          setCreatingDimension(true);
                          try {
                            const res = await api.post('/dimensions', newDimension);
                            if (res.data.success) {
                              const created = res.data.data;
                              setDimensions(prev => [...prev, created]);
                              setFormData({ ...formData, dimension_id: created.id.toString() });
                              setShowNewDimension(false);
                              setNewDimension({ width: '', height: '', depth: '' });
                            }
                          } catch (err) {
                            console.error('Create dimension error:', err);
                            setError('Failed to create dimension');
                          } finally {
                            setCreatingDimension(false);
                          }
                        }}
                        className="flex-1 px-4 py-2 bg-[#3C2F26] text-white rounded-lg text-sm font-medium hover:bg-[#2a1f18] transition-colors disabled:opacity-50"
                      >
                        {creatingDimension ? 'Creating...' : 'Create & Select'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between flex-shrink-0">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-[#3C2F26] text-white px-8 py-2.5 rounded-xl font-bold hover:bg-[#2a1f18] transition-colors disabled:opacity-50 shadow-lg"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                {saving ? 'Saving...' : isEditing ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - Images Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 space-y-5 min-h-[500px]">
            <h2 className="text-base font-bold text-[#3C2F26] flex items-center gap-2">
              <span className="w-6 h-6 bg-[#3C2F26] text-white rounded-full flex items-center justify-center text-xs">2</span>
              Product Images
            </h2>

            {/* Product Images - FIRST */}
            <ImageUploader
              label="Product Images"
              description="Main gallery images for the product"
              existingImages={existingImages.product}
              newImages={selectedImages.product}
              onUpload={(e) => handleImageChange(e, 'product')}
              onRemoveNew={(idx) => removeNewImage('product', idx)}
              onRemoveExisting={(id) => removeExistingImage('product', id)}
            />

            {/* Cover Images */}
            <ImageUploader
              label="Cover Images"
              description="Thumbnail images for catalog display"
              existingImages={existingImages.cover}
              newImages={selectedImages.cover}
              onUpload={(e) => handleImageChange(e, 'cover')}
              onRemoveNew={(idx) => removeNewImage('cover', idx)}
              onRemoveExisting={(id) => removeExistingImage('cover', id)}
            />

            {/* Teak Images */}
            <ImageUploader
              label="Teak Finish Images"
              description="Wood texture and finish options"
              existingImages={existingImages.teak}
              newImages={selectedImages.teak}
              onUpload={(e) => handleImageChange(e, 'teak')}
              onRemoveNew={(idx) => removeNewImage('teak', idx)}
              onRemoveExisting={(id) => removeExistingImage('teak', id)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

// Image Uploader Component
function ImageUploader({ label, description, existingImages, newImages, onUpload, onRemoveNew, onRemoveExisting }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-700 uppercase">{label}</h3>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
        <label className="flex items-center gap-2 px-4 py-2 bg-[#3C2F26] text-white rounded-lg cursor-pointer hover:bg-[#2a1f18] transition-colors text-sm font-medium">
          <Upload size={16} />
          Upload
          <input type="file" multiple accept="image/*" onChange={onUpload} className="hidden" />
        </label>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        {existingImages.map((img) => (
          <motion.div
            key={`existing-${img.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group aspect-square"
          >
            <img
              src={getImageUrl(img.image_url)}
              alt=""
              className="w-full h-full object-cover rounded-lg border-2 border-white shadow-sm"
            />
            <button
              type="button"
              onClick={() => onRemoveExisting(img.id)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
            >
              <X size={12} />
            </button>
          </motion.div>
        ))}
        
        {newImages.map((file, idx) => (
          <motion.div
            key={`new-${idx}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group aspect-square"
          >
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="w-full h-full object-cover rounded-lg border-2 border-green-400 shadow-sm"
            />
            <button
              type="button"
              onClick={() => onRemoveNew(idx)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
            >
              <X size={12} />
            </button>
            <span className="absolute bottom-1 left-1 bg-green-500 text-white text-[8px] px-1 rounded font-bold uppercase">New</span>
          </motion.div>
        ))}

        {existingImages.length === 0 && newImages.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-xs py-4">
            No images uploaded yet
          </div>
        )}
      </div>
    </div>
  );
}