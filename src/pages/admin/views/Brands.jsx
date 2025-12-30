import React, { useState, useMemo } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import useAdminCRUD from "../hooks/useAdminCRUD";
import useDebounce from "@/hooks/useDebounce";
import AdminTable from "../components/AdminTable";
import SortFilter from "../components/SortFilter";
import AdminModal from "../components/AdminModal";
import AdminImageUploader from "../components/AdminImageUploader";
import { getImageUrl } from "@/config";

const BrandsCRUD = () => {
  // HOOKS
  const {
    items: brands,
    loading,
    error,
    success,
    deleteItem,
    saveData,
  } = useAdminCRUD("/brands");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const debouncedSearch = useDebounce(searchTerm, 300);

  // FORM STATE
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });
  const [newImage, setNewImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  // FILTERING & SORTING
  const filteredBrands = useMemo(() => {
    let filtered = brands.filter((brand) =>
      brand.name?.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );

    return filtered.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortOrder === "oldest") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortOrder === "name") {
        return (a.name || "").localeCompare(b.name || "");
      }
      return 0;
    });
  }, [brands, debouncedSearch, sortOrder]);

  // HANDLERS
  const handleOpenModal = (brand = null) => {
    if (brand) {
      setEditingId(brand.id);
      setFormData({ name: brand.name });
      setExistingImage(brand.image_url);
    } else {
      setEditingId(null);
      setFormData({ name: "" });
      setExistingImage("");
    }
    setNewImage(null);
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const fd = new FormData();
    fd.append("name", formData.name);
    if (newImage) fd.append("image_url", newImage);

    const result = await saveData(fd, editingId, true);
    if (result) setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewImage(file);
  };

  // TABLE COLUMNS
  const columns = [
    {
      key: "image_url",
      label: "Image",
      render: (item) => (
        <img
          src={getImageUrl(item.image_url)}
          alt={item.name}
          className="w-12 h-12 rounded object-cover border-2 border-amber-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/50?text=Error";
          }}
        />
      ),
    },
    { key: "name", label: "Name" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#F4F2EE] min-h-screen">
      {/* Messages */}
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
        title="Brands"
        data={filteredBrands}
        columns={columns}
        loading={loading && brands.length === 0}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={() => handleOpenModal()}
        onEdit={handleOpenModal}
        onDelete={deleteItem}
        titleFilter={<SortFilter value={sortOrder} onChange={setSortOrder} />}
      />

      <AdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingId ? "Edit Brand" : "Add New Brand"}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 transition-all font-medium"
              placeholder="e.g. Ikea, Informa"
            />
          </div>

          <AdminImageUploader
            label="Brand Image"
            existingImages={existingImage ? [existingImage] : []}
            newImages={newImage ? [newImage] : []}
            onUpload={handleImageChange}
            onRemoveNew={() => setNewImage(null)}
            onRemoveExisting={() => setExistingImage("")}
          />

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
              className="w-full sm:flex-1 bg-[#3C2F26] text-white min-h-[48px] rounded-xl font-bold hover:bg-[#2a1f18] disabled:bg-gray-300 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {editingId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default BrandsCRUD;
