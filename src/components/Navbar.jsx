import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import idFlag from "../assets/idFlag.png";
import enFlag from "../assets/enFlag.png";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { i18n, t } = useTranslation();

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) i18n.changeLanguage(savedLang);
  }, []);

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("whyUs"), href: "/whyus" },
    { name: t("collections"), href: "/collections" },
  ];

  const activePath = window.location.pathname;

  return (
    <>
      <nav
        className={`w-full fixed top-0 left-0 transition-all duration-300 z-[999] bg-[#F1EEE7] shadow-sm ${
          scrolled ? "py-2" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10">
          {/* LEFT */}
          <div className="flex items-center gap-3 transition-all duration-300">
            <img
              src={logo}
              alt="Logo"
              className={`${scrolled ? "w-10 h-10" : "w-12 h-12"} object-contain`}
            />
            <h1
              className={`font-semibold text-gray-800 hidden sm:block transition-all duration-300 ${
                scrolled ? "text-lg" : "text-lg"
              }`}
            >
              Rajawali Perkasa <span className="text-[#6B3F21]">Furniture</span>
            </h1>
          </div>

          {/* DESKTOP NAV */}
          <ul className="hidden lg:flex items-center gap-10 text-gray-800 font-medium text-md">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="relative group">
                <span className="hover:text-[#6B3F21] hover:px-3 hover:py-1 transition-all duration-100">
                  {link.name}
                </span>

                {activePath === link.href && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21] rounded-full"></span>
                )}

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6B3F21] rounded-full transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}

            {/* DROPDOWN */}
            <div className="relative group cursor-pointer">
              <div className="hover:text-[#6B3F21] relative">
                <span>{t("articles")}</span>

                {activePath.includes("articles") && (
                  <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21] rounded-full"></span>
                )}

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6B3F21] transition-all duration-300 group-hover:w-full"></span>
              </div>

              <div className="absolute top-full left-0 bg-[#F1EEE7] shadow-lg rounded-lg w-40 px-4 py-3 mt-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-[10000]">
                <a href="/corporate-social-responsibility" className="block py-2 hover:text-[#6B3F21]">
                  {t("csr")}
                </a>
                <a href="/news" className="block py-2 hover:text-[#6B3F21]">
                  {t("news")}
                </a>
              </div>
            </div>

            {/* CAREERS */}
            <a href="/careers" className="relative group">
              <span className="hover:text-[#6B3F21]">{t("careers")}</span>

              {activePath === "/careers" && (
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21] rounded-full"></span>
              )}

              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6B3F21] rounded-full transition-all duration-300 group-hover:w-full"></span>
            </a>
          </ul>

          {/* FLAGS DESKTOP */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => changeLang("id")}
              className={`w-8 h-8 rounded-full overflow-hidden border transition ${
                i18n.language === "id" ? "ring-2 ring-[#6B3F21]" : ""
              }`}
            >
              <img src={idFlag} alt="ID Flag" className="w-full h-full object-cover" />
            </button>

            <button
              onClick={() => changeLang("en")}
              className={`w-8 h-8 rounded-full overflow-hidden border transition ${
                i18n.language === "en" ? "ring-2 ring-[#6B3F21]" : ""
              }`}
            >
              <img src={enFlag} alt="EN Flag" className="w-full h-full object-cover" />
            </button>
          </div>

          {/* MOBILE TOGGLE */}
          <button className="lg:hidden text-3xl text-gray-800" onClick={() => setOpenSidebar(true)}>
            ☰
          </button>
        </div>
      </nav>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full bg-[#F1EEE7] shadow-xl w-[90%] sm:w-[70%] z-[10000] transform transition-transform duration-300 ${
          openSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-12 h-12" />
            <span className="text-lg font-semibold text-gray-800">
              Rajawali Perkasa <span className="text-[#6B3F21]">Furniture</span>
            </span>
          </div>
          <button className="text-3xl" onClick={() => setOpenSidebar(false)}>
            ✕
          </button>
        </div>

        <div className="flex flex-col px-6 py-6 text-gray-800 text-lg font-medium space-y-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-[#6B3F21]">
              {link.name}
            </a>
          ))}

          {/* MOBILE DROPDOWN */}
          <div>
            <div
              className="flex justify-between items-center cursor-pointer hover:text-[#6B3F21]"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
              <span>{t("articles")}</span>
              <span>{openDropdown ? "▲" : "▼"}</span>
            </div>

            {openDropdown && (
              <div className="ml-4 mt-3 flex flex-col gap-3 text-base">
                <a href="/corporate-social-responsibility" className="hover:text-[#6B3F21]">
                  {t("csr")}
                </a>
                <a href="/news" className="hover:text-[#6B3F21]">
                  {t("news")}
                </a>
              </div>
            )}
          </div>

          <a href="/careers" className="hover:text-[#6B3F21]">
            {t("careers")}
          </a>

          {/* LANGUAGE SWITCH MOBILE */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => changeLang("id")}
              className={`w-8 h-8 border rounded-full overflow-hidden transition ${
                i18n.language === "id" ? "ring-2 ring-[#6B3F21]" : ""
              }`}
            >
              <img src={idFlag} className="w-full h-full object-cover" />
            </button>

            <button
              onClick={() => changeLang("en")}
              className={`w-8 h-8 border rounded-full overflow-hidden transition ${
                i18n.language === "en" ? "ring-2 ring-[#6B3F21]" : ""
              }`}
            >
              <img src={enFlag} className="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </div>

      {openSidebar && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9000]"
          onClick={() => setOpenSidebar(false)}
        />
      )}
    </>
  );
}
