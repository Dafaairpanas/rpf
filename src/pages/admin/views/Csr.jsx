import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Heart } from "lucide-react";
import useAdminCRUD from "../hooks/useAdminCRUD";
import AdminTable from "../components/AdminTable";
import SortFilter from "../components/SortFilter";

const Csr = () => {
  const navigate = useNavigate();

  // HOOKS
  const {
    items: csrList,
    loading,
    error,
    success,
    deleteItem,
  } = useAdminCRUD("/csrs");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // TABLE COLUMNS
  const columns = [
    {
      key: "title",
      label: "Initiative Title",
      render: (item) => (
        <div className="flex flex-col">
          <span className="font-bold text-[#3C2F26]">{item.title}</span>
          <span className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">
            By {item.creator?.name || "Admin"}
          </span>
        </div>
      ),
    },
    {
      key: "created_at",
      label: "Date Published",
      render: (item) => (
        <span className="text-gray-500 text-xs font-medium">
          {new Date(item.created_at).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  // FILTER & SORT DATA
  const filteredData = useMemo(() => {
    let filtered = csrList.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return filtered.sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortOrder === "oldest") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortOrder === "name") {
        return (a.title || "").localeCompare(b.title || "");
      }
      return 0;
    });
  }, [csrList, searchTerm, sortOrder]);

  // HANDLERS - Navigate to full-screen form
  const handleAdd = () => navigate("/admin/csr/create");
  const handleEdit = (item) => navigate(`/admin/csr/${item.id}/edit`);

  return (
    <div className="p-4 sm:p-8 bg-[#F4F2EE] min-h-screen">
      {/* STATUS MESSAGES */}
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
        title="CSR Initiatives"
        subtitle="Corporate Social Responsibility Programs"
        data={filteredData}
        columns={columns}
        loading={loading && csrList.length === 0}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteItem}
        addButtonText="New Initiative"
        titleFilter={<SortFilter value={sortOrder} onChange={setSortOrder} />}
      />
    </div>
  );
};

export default Csr;
