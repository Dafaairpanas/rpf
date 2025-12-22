import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitContactForm } from "@/api/contact.api";
import { Loader, CheckCircle, AlertCircle } from "lucide-react";

// --- KOMPONEN INPUT FIELD ---
const InputField = ({ label, field, type = "text", placeholder, isTextarea, formData, handleChange, errors }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-medium mb-1 pl-1">
      {label} {field !== 'phone' && <span className="text-red-500">*</span>}
    </label>

    {isTextarea ? (
      <textarea
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-full p-3 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#C6934B] outline-none h-28 resize-none transition-all ${errors[field] ? 'ring-2 ring-red-400' : ''}`}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-full p-3 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#C6934B] outline-none transition-all ${errors[field] ? 'ring-2 ring-red-400' : ''}`}
        placeholder={placeholder}
      />
    )}
    {errors[field] && (
      <p className="text-red-500 text-[10px] mt-1 pl-1 font-medium">{errors[field]}</p>
    )}
  </div>
);

const PopupForm = () => {
  const { t } = useTranslation("contact");
  
  // State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t("form.validation.nameRequired") || "Nama wajib diisi";
    if (!formData.email.trim()) {
      newErrors.email = t("form.validation.emailRequired") || "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("form.validation.emailInvalid") || "Email tidak valid";
    }
    if (!formData.message.trim()) newErrors.message = t("form.validation.messageRequired") || "Pesan wajib diisi";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError("");
    try {
      const res = await submitContactForm(formData);
      if (res.data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        // Optional: Auto close or provide confirmation
      } else {
        setApiError(res.data.message || "Gagal mengirim pesan.");
      }
    } catch (err) {
      console.error("PopupForm error:", err);
      setApiError(err.response?.data?.message || "Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-[#332C26] mb-2">Terima Kasih!</h2>
        <p className="text-gray-600 mb-6">Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.</p>
        <button
          onClick={() => setSuccess(false)}
          className="px-6 py-2 bg-[#C6934B] text-white rounded-lg hover:bg-[#b88240] transition"
        >
          Kirim Pesan Lain
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-[#332C26] flex items-center gap-2">
        {t("form.title")}
      </h2>

      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <InputField
          label={t("form.labels.fullName")}
          field="name"
          placeholder={t("form.placeholders.fullName")}
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
        <InputField
          label={t("form.labels.email")}
          field="email"
          type="email"
          placeholder={t("form.placeholders.email")}
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
        <InputField
          label={t("form.labels.phone")}
          field="phone"
          type="tel"
          placeholder={t("form.placeholders.phone")}
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />
        <InputField
          label={t("form.labels.message")}
          field="message"
          isTextarea={true}
          placeholder={t("form.placeholders.message")}
          formData={formData}
          handleChange={handleChange}
          errors={errors}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#C6934B] text-white font-bold py-3.5 rounded-lg mt-3 shadow-md hover:bg-[#28221F] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            t("form.button")
          )}
        </button>
      </form>
    </div>
  );
};

export default PopupForm;
