import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Star, Newspaper } from "lucide-react";
import useAdminCRUD from "../hooks/useAdminCRUD";
import AdminTable from "../components/AdminTable";
import SortFilter from "../components/SortFilter";

const News = () => {
  const navigate = useNavigate();

  // HOOKS
  const {
    items: newsList,
    loading,
    error,
    success,
    deleteItem,
  } = useAdminCRUD("/news");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // TABLE COLUMNS
  const columns = [
    {
      key: "title",
      label: "Title",
      render: (item) => (
        <div className="flex flex-col">
          <span className="font-bold text-[#3C2F26]">{item.title}</span>
          <span className="text-[10px] text-gray-400 font-medium">
            By {item.creator?.name || "Admin"}
          </span>
        </div>
      ),
    },
    {
      key: "is_top_news",
      label: "Status",
      render: (item) =>
        item.is_top_news ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-lg font-bold text-[10px] uppercase">
            <Star size={10} className="fill-amber-500" /> Featured
          </span>
        ) : (
          <span className="text-gray-400 text-xs">Regular</span>
        ),
    },
    {
      key: "created_at",
      label: "Published",
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
    let filtered = newsList.filter((item) =>
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
  }, [newsList, searchTerm, sortOrder]);

  // HANDLERS - Navigate to full-screen form
  const handleAdd = () => navigate("/admin/news/create");
  const handleEdit = (item) => navigate(`/admin/news/${item.id}/edit`);

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
        title="News Articles"
        subtitle="Company news and announcements"
        data={filteredData}
        columns={columns}
        loading={loading && newsList.length === 0}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={deleteItem}
        addButtonText="New Article"
        titleFilter={<SortFilter value={sortOrder} onChange={setSortOrder} />}
      />
    </div>
  );
};

export default News;
