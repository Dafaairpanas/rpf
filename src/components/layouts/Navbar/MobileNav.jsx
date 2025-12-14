import { useTranslation } from "react-i18next";
import { NAV_LINKS, ARTICLE_LINKS } from "./config";
import { IMAGES, ICONS, FLAGS } from "@/assets/assets";
import { useLocation } from "react-router-dom";

export default function MobileNav({
  open,
  setOpen,
  openDropdown,
  setOpenDropdown,
  changeLang,
  i18n,
}) {
  const { t } = useTranslation("navbar");
  const location = useLocation();
  const activePath = location.pathname;

  // Helper function untuk check apakah link aktif
  const isActive = (path) => activePath === path;

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full bg-[#F1EEE7] shadow-xl w-[90%] sm:w-[70%] z-[10000] transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="flex items-center gap-3">
            <img src={IMAGES.logo} className="w-12 h-12" />
            <span className="text-lg font-semibold text-gray-800">
              Rajawali Perkasa <span className="text-[#6B3F21]">Furniture</span>
            </span>
          </div>
          <button className="text-3xl" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <div className="flex flex-col px-6 py-6 text-gray-800 text-lg font-medium space-y-6">
          {NAV_LINKS.map((item) => (
            <a
              key={item.path}
              href={item.path}
              className={`relative hover:text-[#6B3F21] transition ${
                isActive(item.path) ? "text-[#6B3F21]" : ""
              }`}
              onClick={() => setOpen(false)}
            >
              <span>{t(item.label)}</span>
              {isActive(item.path) && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21]" />
              )}
            </a>
          ))}

          {/* ARTICLES SECTION - Langsung Tampil Tanpa Dropdown */}
          <div>
            <div className="flex flex-col gap-4 mt-0 text-[8px">
              {ARTICLE_LINKS.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className={`relative hover:text-[#6B3F21] transition ${
                    isActive(item.path) ? "text-[#6B3F21]" : ""
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <span>{t(item.label)}</span>
                  {isActive(item.path) && (
                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21]" />
                  )}
                </a>
              ))}
            </div>
          </div>

          <a
            href="/careers"
            className={`relative hover:text-[#6B3F21] transition ${
              isActive("/careers") ? "text-[#6B3F21]" : ""
            }`}
            onClick={() => setOpen(false)}
          >
            <span>{t("careers")}</span>
            {isActive("/careers") && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21]" />
            )}
          </a>

          <a
            href="/contact"
            className={`relative hover:text-[#6B3F21] transition ${
              isActive("/contact") ? "text-[#6B3F21]" : ""
            }`}
            onClick={() => setOpen(false)}
          >
            <span>{t("contact")}</span>
            {isActive("/contact") && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21]" />
            )}
          </a>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => changeLang("id")}
              className={`w-8 h-8 border rounded-full overflow-hidden transition ${
                i18n.language === "id" ? "ring-2 ring-[#6B3F21]" : ""
              }`}
            >
              <img src={FLAGS.idFlag} className="w-full h-full object-cover" />
            </button>

            <button
              onClick={() => changeLang("en")}
              className={`w-8 h-8 border rounded-full overflow-hidden transition ${
                i18n.language === "en" ? "ring-2 ring-[#6B3F21]" : ""
              }`}
            >
              <img src={FLAGS.enFlag} className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9000]"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
