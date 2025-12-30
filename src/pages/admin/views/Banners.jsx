import React, { useState, useMemo, useEffect } from "react";
import {
  AlertCircle,
  Loader2,
  Link as LinkIcon,
  Eye,
  EyeOff,
  Package,
  ExternalLink,
  Search,
} from "lucide-react";
import useAdminCRUD from "../hooks/useAdminCRUD";
import AdminTable from "../components/AdminTable";
import SortFilter from "../components/SortFilter";
import AdminModal from "../components/AdminModal";
import AdminImageUploader from "../components/AdminImageUploader";
import { API_BASE_URL } from "@/config";
import api from "@/api/axios";

const Banners = () => {
  // HOOKS
  const {
    items: banners,
    loading,
    error,
    success,
    deleteItem,
    saveData,
  } = useAdminCRUD("/admin/banners");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  // PRODUCTS STATE (for Product Picker)
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [linkType, setLinkType] = useState("product"); // 'product' | 'external' | 'none'
  const [productSearchTerm, setProductSearchTerm] = useState("");

  // FORM STATE
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    order: 1,
    is_active: true,
  });
  const [newImage, setNewImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // FETCH PRODUCTS on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const response = await api.get("/products", {
          params: { per_page: 100 },
        });
        if (response.data.success) {
          const productData = response.data.data;
          setProducts(
            Array.isArray(productData) ? productData : productData.data || [],
          );
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Helper: Parse link to detect product ID
  const parseProductIdFromLink = (link) => {
    if (!link) return null;

    // Check for product_id parameter (works for relative and absolute URLs)
    const urlParams = new URLSearchParams(link.split("?")[1]);
    const productId = urlParams.get("product_id");
    if (productId) return parseInt(productId);

    // Also check for legacy format /products/{id}
    const legacyMatch = link.match(/\/products\/(\d+)$/);
    return legacyMatch ? parseInt(legacyMatch[1]) : null;
  };

  // Helper: Get product name by ID
  const getProductNameById = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product?.name || "Unknown Product";
  };

  // Filtered products for search
  const filteredProducts = useMemo(() => {
    if (!productSearchTerm.trim()) return products;
    return products.filter((p) =>
      p.name?.toLowerCase().includes(productSearchTerm.toLowerCase()),
    );
  }, [products, productSearchTerm]);

  // HANDLERS
  const handleOpenModal = (banner = null) => {
    if (banner) {
      setEditingId(banner.id);
      setFormData({
        title: banner.title || "",
        link: banner.link || "",
        order: banner.order || 1,
        is_active: !!banner.is_active,
      });
      setExistingImage(
        banner.image
          ? banner.image.startsWith("http")
            ? banner.image
            : `${API_BASE_URL}${banner.image.startsWith("/") ? "" : "/"}${banner.image}`
          : null,
      );

      // Parse link type and product ID
      const productId = parseProductIdFromLink(banner.link);
      if (productId) {
        setLinkType("product");
        setSelectedProductId(productId);
      } else if (banner.link && banner.link.startsWith("http")) {
        setLinkType("external");
        setSelectedProductId(null);
      } else if (banner.link) {
        setLinkType("external"); // Treat other internal links as external type
        setSelectedProductId(null);
      } else {
        setLinkType("none");
        setSelectedProductId(null);
      }
    } else {
      setEditingId(null);
      setFormData({ title: "", link: "", order: 1, is_active: true });
      setExistingImage(null);
      setLinkType("none");
      setSelectedProductId(null);
    }
    setNewImage(null);
    setProductSearchTerm("");
    setShowModal(true);
  };

  // Handle product selection
  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
    if (productId) {
      // Use absolute URL to satisfy backend validation
      const baseUrl = window.location.origin;
      setFormData((prev) => ({
        ...prev,
        link: `${baseUrl}/collections?product_id=${productId}`,
      }));
    } else {
      setFormData((prev) => ({ ...prev, link: "" }));
    }
  };

  // Handle link type change
  const handleLinkTypeChange = (type) => {
    setLinkType(type);
    if (type === "none") {
      setSelectedProductId(null);
      setFormData((prev) => ({ ...prev, link: "" }));
    } else if (type === "product") {
      setFormData((prev) => ({ ...prev, link: "" }));
    } else if (type === "external") {
      setSelectedProductId(null);
      setFormData((prev) => ({ ...prev, link: "" }));
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim()) return;

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("link", formData.link || "");
    submitData.append("order", formData.order || 1);
    submitData.append("is_active", formData.is_active ? 1 : 0);

    if (newImage) {
      submitData.append("image", newImage);
    }

    const result = await saveData(submitData, editingId, true);
    if (result) setShowModal(false);
  };

  // TABLE COLUMNS
  const columns = [
    {
      key: "image",
      label: "Preview",
      render: (item) => (
        <img
          src={
            item.image
              ? item.image.startsWith("http")
                ? item.image
                : `${API_BASE_URL}${item.image.startsWith("/") ? "" : "/"}${item.image}`
              : "https://via.placeholder.com/80x48?text=No+Image"
          }
          alt={item.title}
          className="w-20 h-12 rounded-lg object-cover border border-gray-100 shadow-sm"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/80x48?text=Error";
          }}
        />
      ),
    },
    {
      key: "title",
      label: "Info",
      render: (item) => {
        const productId = parseProductIdFromLink(item.link);
        return (
          <div className="flex flex-col">
            <span className="font-bold text-[#3C2F26]">{item.title}</span>
            {item.link &&
              (productId ? (
                <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                  <Package size={10} /> {getProductNameById(productId)}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] text-blue-500 font-medium">
                  <ExternalLink size={10} /> {item.link}
                </span>
              ))}
          </div>
        );
      },
    },
    {
      key: "order",
      label: "Order",
      render: (item) => (
        <span className="font-mono text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
          #{item.order}
        </span>
      ),
    },
    {
      key: "is_active",
      label: "Status",
      render: (item) =>
        item.is_active ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-[10px] uppercase tracking-wider">
            <Eye size={10} /> Visible
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-400 rounded-lg font-bold text-[10px] uppercase tracking-wider">
            <EyeOff size={10} /> Hidden
          </span>
        ),
    },
  ];

  // FILTERED & SORTED DATA
  const filteredBanners = useMemo(() => {
    let filtered = banners.filter((banner) =>
      banner.title?.toLowerCase().includes(searchTerm.toLowerCase()),
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
  }, [banners, searchTerm, sortOrder]);

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
        title="Banner Management"
        data={filteredBanners}
        columns={columns}
        loading={loading && banners.length === 0}
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
        title={editingId ? "Edit Banner" : "Create New Banner"}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Banner Heading
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. Premium Teak Collection"
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-transparent rounded-xl sm:rounded-2xl focus:bg-white focus:border-[#3C2F26]/20 transition-all font-bold text-base sm:text-lg text-[#3C2F26] placeholder:text-gray-300"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Banner Link Type
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => handleLinkTypeChange("none")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    linkType === "none"
                      ? "bg-[#3C2F26] text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  No Link
                </button>
                <button
                  type="button"
                  onClick={() => handleLinkTypeChange("product")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    linkType === "product"
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  <Package size={14} /> Link to Product
                </button>
                <button
                  type="button"
                  onClick={() => handleLinkTypeChange("external")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    linkType === "external"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  <ExternalLink size={14} /> Custom Link
                </button>
              </div>

              {/* Product Picker */}
              {linkType === "product" && (
                <div className="space-y-3">
                  <p className="text-xs text-gray-500 italic">
                    Pilih produk tujuan, sistem akan membuat link otomatis.
                  </p>

                  {/* Search Products */}
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      value={productSearchTerm}
                      onChange={(e) => setProductSearchTerm(e.target.value)}
                      placeholder="Cari produk..."
                      className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 transition-all text-sm"
                    />
                  </div>

                  {/* Product List */}
                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-xl bg-white">
                    {loadingProducts ? (
                      <div className="flex items-center justify-center py-6">
                        <Loader2
                          className="animate-spin text-gray-400"
                          size={20}
                        />
                      </div>
                    ) : filteredProducts.length === 0 ? (
                      <div className="text-center py-6 text-gray-400 text-sm">
                        No products found
                      </div>
                    ) : (
                      filteredProducts.map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => handleProductSelect(product.id)}
                          className={`w-full px-4 py-3 flex items-center gap-3 text-left transition-all cursor-pointer border-b border-gray-100 last:border-b-0 ${
                            selectedProductId === product.id
                              ? "bg-emerald-50 text-emerald-700"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <Package
                            size={16}
                            className={
                              selectedProductId === product.id
                                ? "text-emerald-600"
                                : "text-gray-400"
                            }
                          />
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-sm font-medium truncate ${selectedProductId === product.id ? "text-emerald-700" : "text-[#3C2F26]"}`}
                            >
                              {product.name}
                            </div>
                            {product.category?.name && (
                              <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                                {product.category.name}
                              </div>
                            )}
                          </div>
                          {selectedProductId === product.id && (
                            <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Selected Product Preview */}
                  {selectedProductId && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <Package size={16} className="text-emerald-600" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-emerald-600 font-medium">
                          Link akan menuju:
                        </div>
                        <div className="text-sm font-bold text-emerald-700 truncate">
                          {getProductNameById(selectedProductId)}
                        </div>
                      </div>
                      <code className="text-[10px] bg-emerald-100 px-2 py-1 rounded text-emerald-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px]">
                        ?product_id={selectedProductId}
                      </code>
                    </div>
                  )}
                </div>
              )}

              {/* External Link Input */}
              {linkType === "external" && (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 italic">
                    Masukkan URL lengkap untuk link eksternal (contoh:
                    https://example.com)
                  </p>
                  <div className="relative">
                    <ExternalLink
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                    />
                    <input
                      type="text"
                      value={formData.link}
                      onChange={(e) =>
                        setFormData({ ...formData, link: e.target.value })
                      }
                      placeholder="https://example.com atau /custom-path"
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 transition-all font-medium text-gray-600"
                    />
                  </div>
                </div>
              )}

              {/* No Link Info */}
              {linkType === "none" && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-center">
                  <p className="text-xs text-gray-500">
                    Banner tidak akan memiliki link. Klik pada banner tidak akan
                    melakukan apa-apa.
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Display Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(e.target.value) || 1,
                  })
                }
                className="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-gray-50 border border-transparent rounded-xl sm:rounded-2xl focus:bg-white focus:border-[#3C2F26]/20 transition-all font-mono font-bold text-[#3C2F26]"
              />
            </div>

            <div className="flex items-end pb-3.5">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${formData.is_active ? "bg-[#3C2F26]" : "bg-gray-200"}`}
                >
                  <div
                    className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 ${formData.is_active ? "translate-x-6" : "translate-x-0"}`}
                  />
                </div>
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                  className="hidden"
                />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest group-hover:text-[#3C2F26] transition-colors">
                  {formData.is_active ? "Visible on Site" : "Hidden from Site"}
                </span>
              </label>
            </div>
          </div>

          <div>
            <AdminImageUploader
              label="Banner Image Asset"
              existingImages={existingImage ? [existingImage] : []}
              newImages={newImage ? [newImage] : []}
              onUpload={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  setNewImage(files[0]);
                }
              }}
              onRemoveExisting={() => setExistingImage(null)}
              onRemoveNew={() => setNewImage(null)}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gray-100 text-gray-500 rounded-xl sm:rounded-2xl font-bold hover:bg-gray-200 transition-all text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-[#3C2F26] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-[#2a1f18] disabled:bg-gray-400 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {loading && <Loader2 className="animate-spin" size={20} />}
              {editingId ? "Update Banner" : "Publish Banner"}
            </button>
          </div>
        </div>
      </AdminModal>
    </div>
  );
};

export default Banners;
