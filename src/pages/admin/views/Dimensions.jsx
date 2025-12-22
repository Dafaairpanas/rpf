import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import useAdminCRUD from '../hooks/useAdminCRUD';
import useDebounce from '@/hooks/useDebounce';
import AdminTable from '../components/AdminTable';
import AdminModal from '../components/AdminModal';

const Dimensions = () => {
  const { 
    items: dimensions, 
    loading, 
    error, 
    success, 
    deleteItem, 
    saveData 
  } = useAdminCRUD('/dimensions');

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', unit: '', description: '' });

  const filteredDimensions = dimensions.filter(dim =>
    dim.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    dim.description?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  const handleOpenModal = (dimension = null) => {
    if (dimension) {
      setEditingId(dimension.id);
      setFormData({ 
        name: dimension.name, 
        unit: dimension.unit, 
        description: dimension.description || '' 
      });
    } else {
      setEditingId(null);
      setFormData({ name: '', unit: '', description: '' });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.unit.trim()) return;

    const result = await saveData(formData, editingId);
    if (result) setShowModal(false);
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { 
      key: 'unit', 
      label: 'Unit',
      render: (item) => (
        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
          {item.unit}
        </span>
      )
    },
    { key: 'description', label: 'Description' }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#F4F2EE] min-h-screen">
      {(error || success) && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 border ${
          error ? 'bg-red-50 border-red-200 text-red-700' : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          {error ? <AlertCircle size={20} /> : <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          <p className="text-sm font-medium">{error || success}</p>
        </div>
      )}

      <AdminTable
        title="Dimensions"
        data={filteredDimensions}
        columns={columns}
        loading={loading && dimensions.length === 0}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={() => handleOpenModal()}
        onEdit={handleOpenModal}
        onDelete={deleteItem}
      />

      <AdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? 'Edit Dimension' : 'Add New Dimension'}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 transition-all font-medium"
              placeholder="e.g. Standard Sofa"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Unit *</label>
            <input
              type="text"
              required
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 transition-all font-medium"
              placeholder="e.g. cm, meters, inches"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 min-h-[100px] bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 transition-all font-medium"
              placeholder="Provide a brief description..."
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full sm:flex-1 bg-gray-100 text-gray-600 min-h-[48px] rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:flex-1 bg-[#3C2F26] text-white min-h-[48px] rounded-xl font-bold hover:bg-[#2a1f18] disabled:bg-gray-400 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {editingId ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default Dimensions;
