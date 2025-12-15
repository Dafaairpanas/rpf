import React from "react";
import { useTranslation } from "react-i18next";

const InputField = ({ label, type, placeholder, isTextarea }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-medium mb-1">
      {label}
    </label>

    {isTextarea ? (
      <textarea
        className="w-full p-3 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#C6934B] outline-none h-28 resize-none"
        placeholder={placeholder}
      />
    ) : (
      <input
        type={type}
        className="w-full p-3 rounded-md bg-gray-100 text-gray-800 focus:ring-2 focus:ring-[#C6934B] outline-none"
        placeholder={placeholder}
      />
    )}
  </div>
);

const PopupForm = () => {
  const { t } = useTranslation("contact");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#332C26]">
        {t("form.title")}
      </h2>

      <form>
        <InputField
          label={t("form.labels.fullName")}
          type="text"
          placeholder={t("form.placeholders.fullName")}
        />
        <InputField
          label={t("form.labels.email")}
          type="email"
          placeholder={t("form.placeholders.email")}
        />
        <InputField
          label={t("form.labels.phone")}
          type="tel"
          placeholder={t("form.placeholders.phone")}
        />
        <InputField
          label={t("form.labels.message")}
          isTextarea={true}
          placeholder={t("form.placeholders.message")}
        />

        <button
          type="submit"
          className="w-full bg-[#C6934B] text-white font-bold py-3 rounded-lg mt-3 shadow-md hover:bg-[#28221F] transition"
        >
          {t("form.button")}
        </button>
      </form>
    </div>
  );
};

export default PopupForm;
