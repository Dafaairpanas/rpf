import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

/**
 * Props:
 * - FLAGS: { idFlag: string, enFlag: string }
 * - i18n: i18n instance (untuk i18n.language)
 * - changeLang: fn(langCode)
 */
export default function LanguageDropdown({ FLAGS, i18n, changeLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const languages = [
    { code: "id", flag: FLAGS.idFlag, label: "Indonesia" },
    { code: "en", flag: FLAGS.enFlag, label: "English" },
  ];

  const currentCode = i18n?.language || "id";

  return (
    <div ref={ref} className="relative">
      {/* Toggle button: shows current flag */}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 px-2 py-1 rounded-full hover:shadow-sm transition ring-offset-2"
      >
        <div
          className={`w-8 h-8 rounded-full overflow-hidden border ${
            currentCode === "id" ? "ring-2 ring-[#6B3F21]" : ""
          }`}
        >
          <img
            src={currentCode === "id" ? FLAGS.idFlag : FLAGS.enFlag}
            alt={currentCode}
            className="w-full h-full object-cover"
          />
        </div>

        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          role="menu"
          aria-label="Select language"
          className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg ring-1 ring-black/7 z-50 overflow-hidden"
        >
          {languages.map((lang) => {
            const active = lang.code === currentCode;
            return (
              <button
                key={lang.code}
                role="menuitem"
                onClick={() => {
                  if (!active) changeLang(lang.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition hover:bg-gray-50 ${
                  active ? "bg-gray-100" : ""
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full overflow-hidden border ${active ? "ring-2 ring-[#6B3F21]" : ""}`}
                >
                  <img
                    src={lang.flag}
                    alt={lang.code}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="text-sm font-medium">{lang.label}</div>
                  <div className="text-xs text-gray-500">
                    {lang.code.toUpperCase()}
                  </div>
                </div>

                {active && (
                  <div className="text-[#6B3F21]">
                    <Check size={16} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
