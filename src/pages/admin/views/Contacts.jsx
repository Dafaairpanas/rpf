import React, { useState, useEffect, useMemo } from "react";
import {
  AlertCircle,
  Mail,
  MailOpen,
  Reply,
  Calendar,
  Info,
  ShoppingBag,
} from "lucide-react";
import useAdminCRUD from "../hooks/useAdminCRUD";
import AdminTable from "../components/AdminTable";
import SortFilter from "../components/SortFilter";
import AdminModal from "../components/AdminModal";

const Contacts = () => {
  // HOOKS
  const {
    items: contacts,
    pagination,
    loading,
    error,
    success,
    deleteItem,
    saveData,
    getItem,
    fetchData,
    setSuccess,
  } = useAdminCRUD("/admin/contacts");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // DETAIL STATE
  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  // FETCH WITH FILTERS
  useEffect(() => {
    const params = {};
    if (statusFilter) params["filter[status]"] = statusFilter;
    fetchData(params);
  }, [statusFilter, fetchData]);

  // HANDLERS
  const handleViewDetail = async (contact) => {
    const detailed = await getItem(contact.id);
    if (detailed) {
      setSelectedContact(detailed);
      setShowModal(true);
      // Refresh list in case status changed to 'read' on backend
      fetchData();
    }
  };

  const handleUpdateStatus = async (id, status) => {
    const result = await saveData({ status }, id);
    if (result) {
      setSelectedContact((prev) => ({ ...prev, status }));
      setSuccess(`Message marked as ${status}`);
    }
  };

  // HELPERS
  const getStatusBadge = (status) => {
    const configs = {
      new: {
        color: "bg-blue-100 text-blue-600",
        icon: <Mail size={10} />,
        label: "Incoming",
      },
      read: {
        color: "bg-amber-100 text-amber-600",
        icon: <MailOpen size={10} />,
        label: "Reviewed",
      },
      replied: {
        color: "bg-emerald-100 text-emerald-600",
        icon: <Reply size={10} />,
        label: "Responded",
      },
    };
    const config = configs[status] || {
      color: "bg-gray-100 text-gray-400",
      icon: <Info size={10} />,
      label: status,
    };

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${config.color}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  // TABLE COLUMNS
  const columns = [
    {
      key: "sender",
      label: "Sender",
      render: (item) => (
        <div className="flex flex-col">
          <span
            className={`font-bold ${item.status === "new" ? "text-[#3C2F26]" : "text-gray-400"}`}
          >
            {item.name}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">
            {item.email}
          </span>
        </div>
      ),
    },
    {
      key: "product",
      label: "Product",
      render: (item) =>
        item.product ? (
          <div className="flex items-center gap-2">
            <ShoppingBag size={14} className="text-[#BF9054]" />
            <span className="text-xs font-medium text-[#3C2F26] max-w-[150px] truncate">
              {item.product.name}
            </span>
          </div>
        ) : (
          <span className="text-gray-300 text-xs italic">General Inquiry</span>
        ),
    },
    {
      key: "message",
      label: "Snippet",
      render: (item) => (
        <p
          className={`text-xs truncate max-w-[200px] ${item.status === "new" ? "text-gray-600 font-medium" : "text-gray-400"}`}
        >
          {item.message}
        </p>
      ),
    },
    {
      key: "status",
      label: "Priority",
      render: (item) => getStatusBadge(item.status),
    },
    {
      key: "created_at",
      label: "Received",
      render: (item) => (
        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-tighter">
          <Calendar size={12} className="opacity-40" />
          {new Date(item.created_at).toLocaleDateString("id-ID")}
        </div>
      ),
    },
  ];

  // FILTERED & SORTED DATA
  const filteredContacts = useMemo(() => {
    let filtered = contacts.filter(
      (contact) =>
        contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase()),
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
  }, [contacts, searchTerm, sortOrder]);

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
        title="Contacts"
        data={filteredContacts}
        columns={columns}
        loading={loading && contacts.length === 0}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onView={handleViewDetail}
        onDelete={deleteItem}
        titleFilter={
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 bg-white px-2 sm:px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-xs sm:text-sm font-bold text-[#3C2F26] appearance-none cursor-pointer pr-4"
              >
                <option value="">All Threads</option>
                <option value="new">Unread</option>
                <option value="read">Archived</option>
                <option value="replied">Processed</option>
              </select>
            </div>
            <SortFilter value={sortOrder} onChange={setSortOrder} />
          </div>
        }
      />

      {/* Detail Modal */}
      <AdminModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Interaction Intelligence"
        maxWidth="max-w-4xl"
      >
        {selectedContact && (
          <div className="space-y-8">
            <div className="flex justify-between items-start border-b border-gray-50 pb-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-[#3C2F26] tracking-tight">
                  {selectedContact.name}
                </h3>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg tracking-wider">
                    {selectedContact.email}
                  </span>
                  {selectedContact.phone && (
                    <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-lg uppercase tracking-wider">
                      {selectedContact.phone}
                    </span>
                  )}
                </div>
              </div>
              {getStatusBadge(selectedContact.status)}
            </div>

            {/* Product Info - if from Order Now */}
            {selectedContact.product && (
              <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <ShoppingBag size={20} className="text-[#BF9054]" />
                <div>
                  <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
                    Inquiring About Product
                  </p>
                  <p className="text-[#3C2F26] font-bold">
                    {selectedContact.product.name}
                  </p>
                </div>
              </div>
            )}

            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#3C2F26] rounded-full opacity-10" />
              <div className="pl-6">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mb-4">
                  Transmission Payload
                </p>
                <p className="text-gray-700 leading-relaxed font-medium text-lg italic whitespace-pre-wrap">
                  "{selectedContact.message}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-6 border-t border-gray-50">
              <div className="flex-1 space-y-1">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
                  Timestamp
                </p>
                <p className="text-xs font-bold text-gray-500">
                  {new Date(selectedContact.created_at).toLocaleString(
                    "id-ID",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
              </div>
              <div className="flex gap-3">
                {selectedContact.status !== "replied" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(selectedContact.id, "replied")
                    }
                    className="bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-lg active:scale-95 flex items-center gap-2 text-xs uppercase tracking-widest cursor-pointer"
                  >
                    <Reply size={16} /> Mark as Processed
                  </button>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-100 text-gray-500 px-6 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all text-xs uppercase tracking-widest cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminModal>

      {/* Pagination */}
      {pagination.last_page > 1 && (
        <div className="mt-8 flex justify-center gap-3">
          {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => fetchData({ page })}
                className={`w-10 h-10 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  page === pagination.current_page
                    ? "bg-[#3C2F26] text-white shadow-xl scale-110"
                    : "bg-white text-gray-400 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default Contacts;
