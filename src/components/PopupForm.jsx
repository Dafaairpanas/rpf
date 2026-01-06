import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendEmail } from "@/utils/emailjs";
import { submitContactForm } from "@/api/contact.api";
import { Loader, CheckCircle, AlertCircle } from "lucide-react";

// --- INTERNAL SUB-COMPONENTS ---

/**
 * SuccessState - Tampilan saat form berhasil dikirim (Full Screen Modal)
 */
const SuccessState = ({ onReset, t }) => (
  <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center animate-in zoom-in-95 duration-300">
      {/* Large green checkmark icon */}
      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle className="text-green-500" size={80} strokeWidth={1.5} />
      </div>
      
      <h2 className="text-xl font-bold text-[#332C26] mb-2">
        {t("form.success.title") || "Pesan Terkirim!"}
      </h2>
      
      <p className="text-gray-600 mb-6 px-4 text-sm leading-relaxed">
        {t("form.success.message") ||
          "Terima kasih telah menghubungi kami. Tim kami akan segera merespons."}
      </p>
      
      <button
        onClick={onReset}
        className="px-8 py-2.5 bg-[#332C26] text-white rounded-lg hover:bg-[#28221F] transition shadow-md active:scale-95 cursor-pointer font-semibold text-sm"
      >
        {t("form.success.button") || "Tutup"}
      </button>
    </div>
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

const PopupForm = ({ onClose }) => {
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
      // Payload for EmailJS (needs title for template)
      const emailPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        title: "Pesan dari Popup Form",
      };

      // Retrieve product_id from URL if available
      const searchParams = new URLSearchParams(window.location.search);
      const rawProductId = searchParams.get("product_id");
      const productId = rawProductId ? parseInt(rawProductId) : null;

      // Payload for Backend
      const backendPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      // Only add product_id if it exists (strictly integer)
      if (productId) {
        backendPayload.product_id = productId;
      }

      // Execute both services in parallel
      const [emailResult, backendResult] = await Promise.allSettled([
        sendEmail(emailPayload),
        submitContactForm(backendPayload),
      ]);

      // Check EmailJS result
      const emailSuccess =
        emailResult.status === "fulfilled" && emailResult.value.success;
      if (!emailSuccess) {
        console.error("EmailJS Failed:", emailResult);
      }

      // Check Backend result
      const backendSuccess = backendResult.status === "fulfilled";
      
      if (backendSuccess) {
        console.log("Backend Response:", backendResult.value);
      } else {
        // Detailed error logging for debugging
        console.error("Backend API Failed:", backendResult.reason?.response?.data || backendResult.reason);
      }

      // If at least one succeeded, we consider it a success for the user
      // but we log errors for the developer.
      if (emailSuccess || backendSuccess) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          website: "",
          fax: "",
        });
        
        if (!emailSuccess) console.warn("Note: Email failed to send.");
        if (!backendSuccess) console.warn("Note: Data failed to save to database.");
      } else {
        setApiError("Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("PopupForm submission error:", err);
      setApiError("Terjadi kesalahan sistem. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // -- Render Logic --
  if (success) {
    return (
      <SuccessState
        onReset={() => {
          setSuccess(false);
          onClose?.(); // Close the popup form as well
        }}
        t={t}
      />
    );
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
