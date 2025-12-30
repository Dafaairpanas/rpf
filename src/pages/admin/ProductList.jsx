import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Edit2, Trash2 } from "lucide-react";

// --- DUMMY DATA ---
const dummyProducts = [
  {
    id: 1,
    name: "Sofa Premium",
    material: "Teak Wood",
    category: "Living Room",
    dimensions: "200x85x80",
  },
  {
    id: 2,
    name: "Dining Table Set",
    material: "Mahogany",
    category: "Dining Room",
    dimensions: "180x75x80",
  },
  {
    id: 3,
    name: "Office Desk",
    material: "MDF",
    category: "Office",
    dimensions: "150x45x60",
  },
  {
    id: 4,
    name: "Lounge Chair",
    material: "Synthetic Rattan",
    category: "Outdoor",
    dimensions: "80x90x75",
  },
];

// --- KOMPONEN UTAMA ---

export default function ProductList({ activeMenuItem }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState(dummyProducts);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect untuk fetching data (simulasi)
  useEffect(() => {
    // Di sini seharusnya Anda memanggil api.get('/products')
    // setLoading(true);
    // const fetchedProducts = await fetchProducts();
    // setProducts(fetchedProducts);
    // setLoading(false);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete Product ID: ${id}?`)) {
      // Logika API deleteProduct(id) di sini
      setProducts(products.filter((p) => p.id !== id));
      alert(`Product ${id} deleted (Simulated)`);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Dalam realitas, ini akan memicu fetching data baru ke API
  };

  return (
    <div className="flex-1 ml-[200px] p-8 bg-[#F4F2EE] min-h-screen">
      <div className="max-w-[1300px] mx-auto">
        {/* Header dan Breadcrumb */}
        <h1 className="text-2xl font-bold text-[#3C2F26] mb-6">Products</h1>

        {/* Aksi Bar: Search dan Add New */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C58E47] shadow-sm"
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>

          <button
            onClick={() => navigate("/admin/products/create")}
            className="flex items-center bg-[#C58E47] hover:bg-[#B8793A] text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Add New
          </button>
        </div>

        {/* Tabel Produk */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#E7E7E7] text-[#3C2F26] uppercase text-sm">
              <tr>
                <th className="px-6 py-3 text-left font-bold">ID</th>
                <th className="px-6 py-3 text-left font-bold">Name</th>
                <th className="px-6 py-3 text-left font-bold">Material</th>
                <th className="px-6 py-3 text-left font-bold">Category</th>
                <th className="px-6 py-3 text-left font-bold">Dimensions</th>
                <th className="px-6 py-3 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 text-sm">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    Loading products...
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {product.id}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {product.material}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {product.dimensions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() =>
                            navigate(`/admin/products/edit/${product.id}`)
                          }
                          className="text-[#3C2F26] hover:text-[#C58E47] p-1 rounded-full transition"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Dummy */}
          <div className="p-4 border-t flex justify-end text-sm text-gray-600">
            <span className="mr-4">
              Showing 1 to {products.length} of {products.length} entries
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
