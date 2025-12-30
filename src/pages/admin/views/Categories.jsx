import React, { useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import useAdminCRUD from "../hooks/useAdminCRUD";
import useDebounce from "@/hooks/useDebounce";
import AdminTable from "../components/AdminTable";
import AdminModal from "../components/AdminModal";

const Categories = () => {
  const {
    items: categories,
    loading,
    error,
    success,
    deleteItem,
    saveData,
  } = useAdminCRUD("/master-categories");

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", slug: "" });

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      cat.slug?.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingId(category.id);
      setFormData({ name: category.name, slug: category.slug });
    } else {
      setEditingId(null);
      setFormData({ name: "", slug: "" });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    // Auto-generate slug if empty
    const dataToSave = {
      ...formData,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
    };

    const result = await saveData(dataToSave, editingId);
    if (result) setShowModal(false);
  };

  const columns = [
    { key: "name", label: "Category Name" },
    { key: "slug", label: "Slug" },
    {
      key: "products_count",
      label: "Products",
      render: (item) => (
        <span className="bg-[#3C2F26]/5 px-2 py-1 rounded text-xs font-bold text-[#3C2F26]">
          {item.products_count || 0} items
        </span>
      ),
    },
  ];

  return (
    <div className="p-8 bg-[#F4F2EE] min-h-screen pt-[96px]">
      {(error || success) && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-2 border ${
            error
              ? "bg-red-50 border-red-200 text-red-700"
              : "bg-green-50 border-green-200 text-green-700"
          }`}
        >
          {error ? (
            <AlertCircle size={20} />
          ) : (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
          <p className="text-sm font-medium">{error || success}</p>
        </div>
      )}

      <AdminTable
        title="Categories"
        data={filteredCategories}
        columns={columns}
        loading={loading && categories.length === 0}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={() => handleOpenModal()}
        onEdit={handleOpenModal}
        onDelete={deleteItem}
      />

      <AdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "Edit Category" : "Add New Category"}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">
              Category Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 transition-all font-medium"
              placeholder="e.g. Living Room"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">
              Slug (Optional)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 transition-all font-medium"
              placeholder="e.g. living-room"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#3C2F26] text-white py-3 rounded-xl font-bold hover:bg-[#2a1f18] disabled:bg-gray-400 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {editingId ? "Update Category" : "Create Category"}
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default Categories;
