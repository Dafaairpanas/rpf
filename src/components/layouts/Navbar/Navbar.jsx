import { useState, useEffect } from "react";
import { IMAGES, FLAGS } from "@/assets/assets";
import useScroll from "@/hooks/useScroll";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import LanguageDropdown from "./LanguageDropdown";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const scrolled = useScroll(10);
  const { i18n } = useTranslation();

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved) i18n.changeLanguage(saved);
  }, []);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const { pathname: activePath } = useLocation();

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 bg-[#F1EEE7] z-[999] transition-all shadow-[0_6px_20px_rgba(0,0,0,0.3)] ${
          scrolled ? "py-2" : "py-5"
        }`}
      >
        <div className="max-w-std mx-auto flex items-center px-6 md:px-10">
          {/* Left: Logo (Auto width) */}
          <div className="flex items-center justify-start gap-3 shrink-0">
            <img
              src={IMAGES.logo}
              className={`${scrolled ? "w-12 h-12" : "w-12 h-12"} object-contain`}
              alt="Logo"
            />
            <a
              href="/"
              className="font-semibold font-inter text-gray-800 hidden lg:block text-[18px] whitespace-nowrap"
            >
              Rajawali Perkasa <span className="text-[#6B3F21]">Furniture</span>
            </a>
            <a
              href="/"
              className="font-semibold font-inter text-gray-800 hidden sm:block lg:hidden text-[18px] whitespace-nowrap"
            >
              RPF
            </a>
          </div>

          {/* Center: Desktop Nav (Takes available space and centers content) */}
          <div className="flex-1 flex justify-center px-4 min-w-0">
            <DesktopNav activePath={activePath} />
          </div>

          {/* Right: Language & Mobile Toggle (Auto width) */}
          <div className="flex items-center justify-end gap-5 shrink-0">
            <div className="hidden lg:block">
              <LanguageDropdown
                FLAGS={FLAGS}
                i18n={i18n}
                changeLang={changeLang}
              />
            </div>

            <button
              className="lg:hidden text-3xl text-gray-800"
              onClick={() => setOpenSidebar(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      <MobileNav
        open={openSidebar}
        setOpen={setOpenSidebar}
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
        changeLang={changeLang}
        i18n={i18n}
      />
    </>
  );
}
