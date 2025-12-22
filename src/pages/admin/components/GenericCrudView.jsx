import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, X, Save } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const GenericCrudView = ({ config }) => {
  const [data, setData] = useState(config.initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setData(config.initialData);
  }, [config]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const openModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData({ ...item });
    } else {
      const initialForm = {};
      config.columns.forEach(col => initialForm[col.key] = '');
      setFormData(initialForm);
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingItem) {
      setData(data.map(item => item.id === editingItem.id ? { ...formData, id: item.id } : item));
    } else {
      setData([...data, { ...formData, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 pt-25">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#3C2F26]">{config.title}</h1>
          <p className="text-sm text-gray-500">Manage your {config.title.toLowerCase()} data here.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="flex items-center bg-[#3C2F26] text-white px-4 py-2 rounded-lg hover:bg-[#52453B] transition shadow-lg active:scale-95"
        >
          <Plus size={18} className="mr-2" /> Add New
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search data..." 
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F4F2EE] text-[#3C2F26] text-xs uppercase font-bold tracking-wider">
                <th className="px-6 py-4">ID</th>
                {config.columns.map(col => (
                  <th key={col.key} className="px-6 py-4">{col.label}</th>
                ))}
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">#{item.id}</td>
                    {config.columns.map(col => (
                      <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
                        {col.type === 'select' ? (
                           <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                             item[col.key] === 'Active' ? 'bg-green-100 text-green-700' : 
                             item[col.key] === 'Inactive' ? 'bg-red-100 text-red-700' : 
                             'bg-blue-100 text-blue-700'
                           }`}>
                             {item[col.key]}
                           </span>
                        ) : (
                          item[col.key]
                        )}
                      </td>
                    ))}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => openModal(item)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={config.columns.length + 2} className="px-6 py-8 text-center text-gray-400">
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-[#3C2F26] text-white">
                <h3 className="font-bold">{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-white/70 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                {config.columns.map(col => (
                  <div key={col.key} className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">{col.label}</label>
                    {col.type === 'select' ? (
                      <select
                        value={formData[col.key] || ''}
                        onChange={(e) => setFormData({...formData, [col.key]: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C2F26]/20 outline-none"
                      >
                         <option value="">Select {col.label}</option>
                         {col.options.map(opt => (
                           <option key={opt} value={opt}>{opt}</option>
                         ))}
                      </select>
                    ) : (
                      <input 
                        type={col.type} 
                        value={formData[col.key] || ''}
                        onChange={(e) => setFormData({...formData, [col.key]: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3C2F26]/20 outline-none"
                        placeholder={`Enter ${col.label}`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg text-sm font-medium transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-[#3C2F26] text-white rounded-lg text-sm font-medium hover:bg-[#52453B] transition shadow-md flex items-center"
                >
                  <Save size={16} className="mr-2" /> Save Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GenericCrudView;