import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { submitContactForm } from "@/api/contact.api";
import { Loader, CheckCircle, AlertCircle } from "lucide-react";

// --- INTERNAL SUB-COMPONENTS ---

/**
 * SuccessState - Tampilan saat form berhasil dikirim
 */
const SuccessState = ({ onReset, t }) => (
  <div className="flex flex-col items-center justify-center py-6 text-center animate-in fade-in zoom-in duration-300">
    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 shadow-sm">
      <CheckCircle className="text-green-600" size={24} />
    </div>
    <h2 className="text-lg font-bold text-[#332C26] mb-1">
      {t("form.success.title") || "Terima Kasih!"}
    </h2>
    <p className="text-gray-600 mb-4 px-2 text-sm">
      {t("form.success.message") ||
        "Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda."}
    </p>
    <button
      onClick={onReset}
      className="px-5 py-2 bg-[#C6934B] text-white rounded-lg hover:bg-[#b88240] transition shadow-md active:scale-95 cursor-pointer font-bold text-sm"
    >
      {t("form.success.button") || "Kirim Pesan Lain"}
    </button>
  </div>
);

/**
 * ErrorAlert - Komponen peringatan error API
 */
const ErrorAlert = ({ message }) => (
  <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-xs animate-in slide-in-from-top-2 duration-300">
    <AlertCircle size={14} />
    {message}
  </div>
);

/**
 * InputField - Reusable form field
 */
const InputField = ({
  label,
  field,
  type = "text",
  placeholder,
  isTextarea,
  value,
  onChange,
  error,
  required = true,
}) => {
  const inputClasses = `w-full p-5 sm:p-4 rounded-md bg-gray-100 text-gray-800 text-sm focus:ring-2 focus:ring-[#C6934B] focus:bg-white outline-none transition-all placeholder:text-gray-400 ${
    error ? "ring-2 ring-red-400 bg-red-50" : ""
  }`;

  return (
    <div className="mb-2.5">
      <label className="block text-gray-700 text-xs font-bold mb-0.5 pl-1 uppercase tracking-tight opacity-70">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className={`${inputClasses} h-16 sm:h-20 resize-none`}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}

      {error && (
        <p className="text-red-500 text-[10px] mt-0.5 pl-1 font-bold animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
};

// --- MAIN COMPONENT ---

const PopupForm = () => {
  const { t } = useTranslation("contact");

  // -- State --
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    website: "", // Honeypot
    fax: "", // Honeypot
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  // -- Handlers --
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const { name, email, message } = formData;

    if (!name.trim()) {
      newErrors.name = t("form.validation.nameRequired") || "Nama wajib diisi";
    }

    if (!email.trim()) {
      newErrors.email =
        t("form.validation.emailRequired") || "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email =
        t("form.validation.emailInvalid") || "Email tidak valid";
    }

    if (!message.trim()) {
      newErrors.message =
        t("form.validation.messageRequired") || "Pesan wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Check Honeypot
    if (formData.website || formData.fax) {
      console.warn("Bot detected.");
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const res = await submitContactForm(formData);
      if (res.data.success) {
        setSuccess(true);
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          website: "",
          fax: "",
        });
      } else {
        setApiError(res.data.message || "Gagal mengirim pesan.");
      }
    } catch (err) {
      console.error("PopupForm submission error:", err);
      if (err.response?.status === 429) {
        setApiError("Mohon tunggu sebentar sebelum mengirim pesan lagi.");
      } else {
        setApiError(err.response?.data?.message || "Terjadi kesalahan sistem.");
      }
    } finally {
      setLoading(false);
    }
  };

  // -- Render Logic --
  if (success) {
    return <SuccessState onReset={() => setSuccess(false)} t={t} />;
  }

  const FIELDS = [
    {
      label: t("form.labels.fullName"),
      field: "name",
      placeholder: t("form.placeholders.fullName"),
    },
    {
      label: t("form.labels.email"),
      field: "email",
      type: "email",
      placeholder: t("form.placeholders.email"),
    },
    {
      label: t("form.labels.phone"),
      field: "phone",
      type: "tel",
      placeholder: t("form.placeholders.phone"),
      required: false,
    },
    {
      label: t("form.labels.message"),
      field: "message",
      isTextarea: true,
      placeholder: t("form.placeholders.message"),
    },
  ];

  return (
    <div className="w-full">
      <h2 className="text-lg sm:text-xl font-bold mb-3 text-[#332C26] flex items-center gap-2">
        {t("form.title")}
      </h2>

      {apiError && <ErrorAlert message={apiError} />}

      <form onSubmit={handleSubmit}>
        {/* Honeypot Fields - Hidden */}
        <div className="absolute opacity-0 -z-10 h-0 w-0 overflow-hidden">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={(e) => handleChange("website", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
          <input
            type="text"
            name="fax"
            value={formData.fax}
            onChange={(e) => handleChange("fax", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {FIELDS.map((cfg) => (
          <InputField
            key={cfg.field}
            {...cfg}
            value={formData[cfg.field]}
            onChange={handleChange}
            error={errors[cfg.field]}
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#C6934B] text-white font-bold py-2.5 sm:py-3 rounded-lg mt-2 shadow-md hover:bg-[#28221F] disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] text-sm sm:text-base"
        >
          {loading ? (
            <Loader className="animate-spin" size={18} />
          ) : (
            t("form.button")
          )}
        </button>
      </form>
    </div>
  );
};

export default PopupForm;
