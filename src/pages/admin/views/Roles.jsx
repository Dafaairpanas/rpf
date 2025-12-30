import React, { useState, useMemo } from "react";
import { AlertCircle, Loader2, Shield } from "lucide-react";
import useAdminCRUD from "../hooks/useAdminCRUD";
import useDebounce from "@/hooks/useDebounce";
import AdminTable from "../components/AdminTable";
import SortFilter from "../components/SortFilter";
import AdminModal from "../components/AdminModal";

const Roles = () => {
  const {
    items: roles,
    loading,
    error,
    success,
    deleteItem,
    saveData,
  } = useAdminCRUD("/roles", { skipFetch: false });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const debouncedSearch = useDebounce(searchTerm, 300);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "" });

  const filteredRoles = useMemo(() => {
    let filtered = roles.filter((role) =>
      role.name?.toLowerCase().includes(debouncedSearch.toLowerCase()),
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
  }, [roles, debouncedSearch, sortOrder]);

  const handleOpenModal = (role = null) => {
    if (role) {
      setEditingId(role.id);
      setFormData({ name: role.name });
    } else {
      setEditingId(null);
      setFormData({ name: "" });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const result = await saveData(formData, editingId);
    if (result) setShowModal(false);
  };

  const columns = [
    {
      key: "name",
      label: "Role Name",
      render: (item) => (
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-[#3C2F26]/40" />
          <span className="font-bold">{item.name}</span>
        </div>
      ),
    },
    {
      key: "users_count",
      label: "Users",
      render: (item) => (
        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight">
          {item.users_count || 0} users
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Created At",
      render: (item) =>
        item.created_at ? new Date(item.created_at).toLocaleDateString() : "-",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#F4F2EE] min-h-screen">
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
        title="Roles"
        data={filteredRoles}
        columns={columns}
        loading={loading && roles.length === 0}
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
        title={editingId ? "Edit Role" : "Add New Role"}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase mb-2">
              Role Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 min-h-[48px] bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 transition-all font-medium"
              placeholder="e.g. Super Admin"
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
              {editingId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default Roles;
