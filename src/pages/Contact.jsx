import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import {
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  ShoppingBag,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { sendEmail } from "@/utils/emailjs";
import { submitContactForm } from "@/api/contact.api";
import api from "@/api/axios";
import SEO from "@/components/SEO";

// --- ANIMATION VARIANTS ---
// Varian Container untuk mengatur stagger effect pada komponen anak-anak
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};

// Varian Item untuk elemen yang muncul dari bawah (y: 20)
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

// --- KOMPONEN ITEM INFORMASI KONTAK ---
const ContactInfoItem = ({ icon, label, children }) => (
  <motion.div className="flex items-start mb-6" variants={itemVariants}>
    <div className="text-[#BF9054] text-xl mt-1 mr-4 shrink-0 transition-colors duration-300 group-hover:text-yellow-600">
      {icon}
    </div>
    <div className="text-[#332C26] font-medium text-sm sm:text-base leading-relaxed">
      {label && (
        <span className="font-semibold text-[#2C241E] mr-2">{label}:</span>
      )}
      {children}
    </div>
  </motion.div>
);

// --- KOMPONEN INPUT FIELD ---
const InputField = ({
  label,
  field,
  type = "text",
  placeholder,
  isTextarea,
  formData,
  handleChange,
  errors,
  t,
}) => (
  <div className="mb-5">
    <label className="block text-white text-sm font-medium mb-2 pl-1 font-poppins">
      {label} {field !== "phone" && <span className="text-red-400">*</span>}
    </label>
    {isTextarea ? (
      <textarea
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-full p-3.5 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BF9054] transition duration-200 h-50 resize-none text-sm ${errors[field] ? "ring-2 ring-red-400" : ""}`}
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        value={formData[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-full p-3.5 rounded-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#BF9054] transition duration-200 text-sm ${errors[field] ? "ring-2 ring-red-400" : ""}`}
        placeholder={placeholder}
      />
    )}
    {errors[field] && (
      <p className="text-red-400 text-xs mt-1 pl-1">{errors[field]}</p>
    )}
  </div>
);

const ContactUs = () => {
  const { t } = useTranslation("contact");
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product_id");

  // Product info for "Order Now" flow
  const [productInfo, setProductInfo] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(false);

  // Form state
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Fetch product info if product_id exists
  useEffect(() => {
    if (productId) {
      setLoadingProduct(true);
      api
        .get(`/products/${productId}`)
        .then((res) => {
          if (res.data.success) {
            const product = res.data.data;
            setProductInfo(product);
            // Pre-fill message with product name
            setFormData((prev) => ({
              ...prev,
              message: `Saya tertarik dengan produk "${product.name}".\n\n`,
            }));
          }
        })
        .catch((err) => console.error("Error fetching product:", err))
        .finally(() => setLoadingProduct(false));
    }
  }, [productId]);

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t("validation.nameRequired");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("validation.emailRequired");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValid = emailRegex.test(formData.email.trim());
      console.log("Email validation:", formData.email, "Valid:", isValid);
      if (!isValid) {
        newErrors.email = t("validation.emailInvalid");
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = t("validation.messageRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Check Honeypot
    if (formData.website || formData.fax) {
      console.warn("Bot detected.");
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      // Payload for EmailJS
      const emailPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        product_id: productId ? parseInt(productId) : null,
      };

      // Payload for Backend
      const backendPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      // Add product_id if exists (as integer)
      if (productId) {
        backendPayload.product_id = parseInt(productId);
      }

      // Execute both services in parallel
      const [emailResult, backendResult] = await Promise.allSettled([
        sendEmail(emailPayload),
        submitContactForm(backendPayload),
      ]);

      // Check results
      const emailSuccess = emailResult.status === "fulfilled" && emailResult.value.success;
      const backendSuccess = backendResult.status === "fulfilled";

      if (!emailSuccess) {
        console.error("EmailJS Failed:", emailResult);
      }

      if (backendSuccess) {
        console.log("Backend Response:", backendResult.value);
      } else {
        console.error("Backend API Failed:", backendResult.reason?.response?.data || backendResult.reason);
      }

      // If at least one succeeded, show success
      if (emailSuccess || backendSuccess) {
        setShowSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          website: "",
          fax: "",
        });
        setTimeout(() => setShowSuccess(false), 3000);

        if (!emailSuccess) console.warn("Note: Email failed to send.");
        if (!backendSuccess) console.warn("Note: Data failed to save to database.");
      } else {
        setSubmitError("Gagal mengirim pesan. Silakan coba lagi.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setSubmitError("Terjadi kesalahan sistem. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="bg-[#F8F8F8] py-6 sm:py-8 px-3 sm:px-4 md:px-6 lg:px-8 font-poppins mt-16 sm:mt-20 md:mt-24">
      <SEO
        title="Contact Us"
        description="Get in touch with Rajawali Perkasa Furniture for inquiries about our teak wood furniture collections."
      />
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full text-center"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {t("form.success.title")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("form.success.message")}
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-6 py-2 bg-[#3C2F26] text-white rounded-lg hover:bg-[#52453B] transition"
              >
                {t("form.success.button")}
              </button>
            </motion.div>
          </motion.div>
        )}
        
      </AnimatePresence>

      {/* Header dengan Animasi */}
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center text-[#332C26] mb-12 tracking-tight font-montserrat mt-5"
      >
        {t("header.title")}
      </motion.h1>

      {/* Kontainer Utama dengan Animasi Stagger */}
      <motion.div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* 1. Kartu Formulir (Kiri) */}
        <motion.div
          className="bg-[#2C241E] rounded-[20px] p-8 sm:p-10 shadow-2xl"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 font-inter">
            {t("form.title")}
          </h2>

          {submitError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-400 rounded-lg flex items-center gap-2">
              <AlertCircle className="text-red-400 flex-shrink-0" size={18} />
              <p className="text-red-300 text-sm">{submitError}</p>
            </div>
          )}

          {loadingProduct && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl flex items-center gap-2">
              <Loader2 className="animate-spin text-white/50" size={18} />
              <span className="text-white/50 text-sm">
                {t("messages.loadingProduct")}
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="sm:mt-4">
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
            <InputField
              label={t("form.labels.fullName")}
              field="name"
              placeholder={t("form.placeholders.fullName")}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              t={t}
            />
            <InputField
              label={t("form.labels.email")}
              field="email"
              type="email"
              placeholder={t("form.placeholders.email")}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              t={t}
            />
            <InputField
              label={t("form.labels.phone")}
              field="phone"
              type="tel"
              placeholder={t("form.placeholders.phone")}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              t={t}
            />
            <InputField
              label={t("form.labels.message")}
              field="message"
              isTextarea={true}
              placeholder={t("form.placeholders.message")}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              t={t}
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              transition={{ duration: 0.2 }}
              className="w-full bg-[#C6934B] text-white font-semibold text-lg py-3.5 rounded-md mt-4 transition duration-300 shadow-lg transform hover:bg-[#DFD7BF] hover:text-[#28221F] font-poppins disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Mengirim...
                </>
              ) : (
                t("form.button")
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* 2. Kartu Informasi Kontak (Kanan) */}
        <motion.div
          className="bg-white rounded-[20px] p-8 sm:p-10 shadow-xl border border-gray-100 flex flex-col h-full"
          variants={itemVariants}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-[#332C26] mb-8 font-inter">
            {t("contactInfo.title")}
          </h2>

          <motion.div
            className="space-y-4 flex-grow"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Phone Information */}
            <ContactInfoItem
              icon={<FaPhoneAlt className="mr-2 w-8 h-8" />}
              label={t("contactInfo.phone.label")}
            >
              <div>
                {t("contactInfo.phone.numbers", { returnObjects: true }).map(
                  (number, index) => (
                    <p className="font-poppins" key={index}>
                      {number}
                    </p>
                  ),
                )}
              </div>
            </ContactInfoItem>

            {/* Email Information */}
            <ContactInfoItem
              icon={<FaEnvelope className="mr-2 w-8 h-8" />}
              label={t("contactInfo.email.label")}
            >
              <div className="flex flex-col font-poppins">
                <a
                  className="hover:text-[#C6934B]"
                  href="mailto:info@rajpf.com"
                >
                  info@rajpf.com
                </a>
                <a
                  className="hover:text-[#C6934B]"
                  href="mailto:marketing@rajpf.com"
                >
                  marketing@rajpf.com
                </a>
              </div>
            </ContactInfoItem>

            {/* Address Information */}
            <ContactInfoItem
              icon={<FaMapMarkerAlt size={40} />}
              label={t("contactInfo.address.label")}
            >
              <div>
                {t("contactInfo.address.lines", { returnObjects: true }).map(
                  (line, index) => (
                    <p className="font-poppins" key={index}>
                      {line}
                    </p>
                  ),
                )}
              </div>
            </ContactInfoItem>
          </motion.div>

          {/* Embed Google Maps */}
          <motion.div
            className="mt-8 rounded-xl overflow-hidden h-64 w-full shadow-md border border-gray-200"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d130591.67524387666!2d111.1064882241782!3d-6.729969034336803!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e772c604a182293%3A0xb8927dcc8b6e7c97!2sPT%20Rajawali%20Perkasa%20Furniture!5e1!3m2!1sen!2sid!4v1765242757988!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
