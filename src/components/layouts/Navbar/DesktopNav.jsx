import { useState } from "react";
import NavLinks from "./NavLinks";
import LanguageDropdown from "./LanguageDropdown";
import { NAV_LINKS, ARTICLE_LINKS } from "./config";
import { useTranslation } from "react-i18next";
import { IMAGES, FLAGS } from "@/assets/assets";

export default function DesktopNav({ activePath, changeLang, i18n }) {
  const { t } = useTranslation("navbar");

  // State untuk mengontrol visibilitas dropdown Articles
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  let timeoutId;

  // Fungsi untuk membuka dropdown (saat mouse masuk)
  const handleMouseEnter = () => {
    clearTimeout(timeoutId);
    setIsArticlesOpen(true);
  };

  // Fungsi untuk menutup dropdown (saat mouse keluar)
  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setIsArticlesOpen(false);
    }, 200);
  };

  // Tentukan kelas visibilitas berdasarkan state
  const visibilityClass = isArticlesOpen
    ? "opacity-100 pointer-events-auto"
    : "opacity-0 pointer-events-none";

  // Cek apakah ada artikel yang sedang aktif
  const isArticleActive = ARTICLE_LINKS.some((item) =>
    activePath.includes(item.path),
  );

  return (
    <div className="hidden lg:flex items-center gap-10">
      <ul className="flex items-center gap-10 text-gray-800 font-medium text-md">
        {/* NAV_LINKS */}
        <NavLinks activePath={activePath} links={NAV_LINKS} />

        {/* DROPDOWN ARTICLES */}
        <div
          className="relative cursor-pointer group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <span className="hover:text-[#6B3F21] inline-block px-1">
            {t("articles")}
          </span>

          {/* Garis bawah ketika artikel aktif atau dropdown terbuka */}
          {(isArticleActive || isArticlesOpen) && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21]" />
          )}

          {/* Garis bawah hover animation */}
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6B3F21] rounded-full transition-all duration-300 group-hover:w-full" />

          <div
            className={`absolute top-full left-0 bg-[#F1EEE7] shadow-lg rounded-lg w-40 px-4 py-3 mt-1 transition-all z-50 ${visibilityClass}`}
          >
            {ARTICLE_LINKS.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className={`block py-2 hover:text-[#6B3F21] transition-colors ${
                  activePath.includes(item.path)
                    ? "text-[#6B3F21] font-semibold"
                    : "text-gray-800"
                }`}
              >
                {t(item.label)}
              </a>
            ))}
          </div>
        </div>

        <a href="/careers" className="relative group">
          <span className="hover:text-[#6B3F21] px-1">{t("careers")}</span>

          {activePath === "/careers" && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21]" />
          )}

          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6B3F21] rounded-full transition-all duration-300 group-hover:w-full" />
        </a>

        <a href="/contact" className="relative group">
          <span className="hover:text-[#6B3F21] px-1">{t("contact")}</span>

          {activePath === "/contact" && (
            <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21]" />
          )}

          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6B3F21] rounded-full transition-all duration-300 group-hover:w-full" />
        </a>
      </ul>

      {/* Language Dropdown */}
      <div className="ml-[5rem]">
        <LanguageDropdown FLAGS={FLAGS} i18n={i18n} changeLang={changeLang} />
      </div>
    </div>
  );
}
