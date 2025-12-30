import React, { useState, useEffect, useMemo } from "react";
import {
  AlertCircle,
  Loader2,
  Save,
  Mail,
  Lock,
  User as UserIcon,
  Shield,
  Building2,
} from "lucide-react";
import api from "@/api/axios";
import useAdminCRUD from "../hooks/useAdminCRUD";
import AdminTable from "../components/AdminTable";
import SortFilter from "../components/SortFilter";
import AdminModal from "../components/AdminModal";

const Users = () => {
  // HOOKS
  const {
    items: users,
    loading,
    error,
    success,
    deleteItem,
    saveData,
  } = useAdminCRUD("/users");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [roles, setRoles] = useState([]);

  // FORM STATE
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    division: "",
    role_id: "",
  });

  // FETCH ROLES
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await api.get("/roles");
        if (res.data.success) {
          // Backend now returns paginated data: { data: [...], current_page, ... }
          const rolesData = res.data.data;
          setRoles(Array.isArray(rolesData) ? rolesData : rolesData.data || []);
        }
      } catch (err) {
        console.error("Error fetching roles:", err);
      }
    };
    fetchRoles();
  }, []);

  // HANDLERS
  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingId(user.id);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        division: user.division || "",
        role_id: user.role_id || (user.role ? user.role.id : ""),
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        password: "",
        division: "",
        role_id: "",
      });
    }
    setShowModal(true);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      (!editingId && !formData.password)
    )
      return;

    const dataToSend = { ...formData };
    if (editingId && !dataToSend.password) delete dataToSend.password;

    // Convert empty strings to null for optional fields
    if (!dataToSend.role_id) dataToSend.role_id = null;
    if (!dataToSend.division?.trim()) dataToSend.division = null;

    const result = await saveData(dataToSend, editingId);
    if (result) setShowModal(false);
  };

  // TABLE COLUMNS
  const columns = [
    {
      key: "name",
      label: "Identity",
      render: (item) => (
        <div className="flex flex-col">
          <span className="font-bold text-[#3C2F26]">{item.name}</span>
          <span className="text-[10px] text-gray-400 font-medium tracking-wider">
            {item.email}
          </span>
        </div>
      ),
    },
    {
      key: "division",
      label: "Division",
      render: (item) => (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-50 text-amber-700 border border-amber-100">
          <Building2 size={10} />
          {item.division || "-"}
        </span>
      ),
    },
    {
      key: "role",
      label: "Access Level",
      render: (item) => (
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            item.role?.name === "Super Admin"
              ? "bg-[#3C2F26] text-white"
              : "bg-blue-50 text-blue-600 border border-blue-100"
          }`}
        >
          <Shield
            size={10}
            fill={item.role?.name === "Super Admin" ? "currentColor" : "none"}
          />
          {item.role?.name || "No Role"}
        </span>
      ),
    },
    {
      key: "created_at",
      label: "Registered",
      render: (item) => (
        <span className="text-gray-400 text-xs font-medium">
          {new Date(item.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  // FILTERED & SORTED DATA
  const filteredUsers = useMemo(() => {
    let filtered = users.filter(
      (user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
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
  }, [users, searchTerm, sortOrder]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-[#F4F2EE] min-h-screen">
      {(error || success) && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-2 border ${
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
        title="Active Operators"
        data={filteredUsers}
        columns={columns}
        loading={loading && users.length === 0}
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
        title={editingId ? "Modify Operator" : "Onboard New Operator"}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Display Name
              </label>
              <div className="relative group">
                <UserIcon
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#3C2F26] transition-colors"
                />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 min-h-[48px] bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#3C2F26]/20 transition-all font-bold text-[#3C2F26]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Corporate Email
              </label>
              <div className="relative group">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#3C2F26] transition-colors"
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#3C2F26]/20 transition-all font-medium text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Division
              </label>
              <div className="relative group">
                <Building2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#3C2F26] transition-colors"
                />
                <input
                  type="text"
                  value={formData.division}
                  onChange={(e) =>
                    setFormData({ ...formData, division: e.target.value })
                  }
                  placeholder="e.g. IT, Marketing, HR"
                  className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#3C2F26]/20 transition-all font-medium text-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                System Role
              </label>
              <div className="relative group">
                <Shield
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#3C2F26] transition-colors"
                />
                <select
                  required
                  value={formData.role_id}
                  onChange={(e) =>
                    setFormData({ ...formData, role_id: e.target.value })
                  }
                  className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#3C2F26]/20 transition-all font-bold text-[#3C2F26] appearance-none"
                >
                  <option value="">Select Priority</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                {editingId
                  ? "Credential Update (Optional)"
                  : "Security Credential"}
              </label>
              <div className="relative group">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#3C2F26] transition-colors"
                />
                <input
                  type="password"
                  required={!editingId}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full pl-12 pr-5 py-3.5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#3C2F26]/20 transition-all font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full sm:w-auto bg-gray-100 text-gray-500 px-6 min-h-[48px] rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#3C2F26] text-white min-h-[48px] rounded-xl font-bold hover:bg-[#2a1f18] disabled:bg-gray-400 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              {editingId ? "Update" : "Create Account"}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default Users;
