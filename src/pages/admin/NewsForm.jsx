// NewsForm.jsx — FULL SCREEN NEWS CREATE/EDIT PAGE
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Loader2, X, Eye, Edit2, Star } from "lucide-react";
import { CKEditorWrapper } from "@/components/editor";
import api from "@/api/axios";

export default function NewsForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    is_top_news: false,
  });

  // Fetch News data if editing
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      api
        .get(`/news/${id}`)
        .then((res) => {
          if (res.data.success) {
            const news = res.data.data;
            setFormData({
              title: news.title || "",
              content: news.content?.content || news.content || "",
              is_top_news: news.is_top_news || false,
            });
          }
        })
        .catch((err) => {
          console.error("Error fetching news:", err);
          setError("Failed to load news data");
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEditing]);

  // Handle save
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Title and content are required");
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (isEditing) {
        await api.put(`/news/${id}`, formData);
      } else {
        await api.post("/news", formData);
      }
      navigate("/admin/news");
    } catch (err) {
      console.error("Save error:", err);
      setError(err.response?.data?.message || "Failed to save news");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F2EE] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#3C2F26]" />
      </div>
    );
  }

  return (
    <div className="bg-[#F4F2EE]">
      {/* Form Container */}
      <div className="px-4 sm:px-6 py-3 max-w-6xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/admin/news")}
              className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 transition active:scale-95 cursor-pointer"
              title="Back to news"
            >
              <ArrowLeft size={20} className="text-[#3C2F26]" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#3C2F26]">
                {isEditing ? "Edit News Article" : "Create News Article"}
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                Company news and updates
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                isPreview
                  ? "bg-[#3C2F26] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {isPreview ? <Edit2 size={16} /> : <Eye size={16} />}
              {isPreview ? "Edit" : "Preview"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
            <X size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          {/* Top Bar - Title + Top News Toggle + Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5">
            <div className="flex flex-col lg:flex-row lg:items-end gap-4">
              {/* Title Input */}
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 focus:border-[#3C2F26] transition-all text-lg font-medium h-[44px]"
                  placeholder="e.g. New Partnership Announcement 2024"
                />
              </div>

              {/* Top News Toggle */}
              <div className="flex items-center gap-3 px-4 py-2.5 bg-amber-50 rounded-xl border border-amber-100">
                <Star
                  className={`w-4 h-4 ${formData.is_top_news ? "text-amber-500 fill-amber-500" : "text-amber-300"}`}
                />
                <span className="text-sm font-medium text-amber-800">
                  Top News
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.is_top_news}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_top_news: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-amber-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => navigate("/admin/news")}
                  className="px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 bg-[#3C2F26] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#2a1f18] transition-colors disabled:opacity-50 shadow-lg"
                >
                  {saving ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}
                  {saving ? "Saving..." : isEditing ? "Update" : "Publish"}
                </button>
              </div>
            </div>
          </div>

          {/* Content Editor - Full Width */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
            <label className="block text-sm font-medium text-gray-600 mb-3">
              Article Content *
            </label>

            {isPreview ? (
              <div
                className="prose prose-sm max-w-none p-4 bg-gray-50 rounded-xl min-h-[500px] border border-gray-200"
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            ) : (
              <CKEditorWrapper
                value={formData.content}
                onChange={(content) => setFormData({ ...formData, content })}
                height={500}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
