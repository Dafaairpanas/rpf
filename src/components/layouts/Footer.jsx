import { ICONS } from "@/assets/assets";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-[#2B2521] text-[#E8DDC7] pt-16 pb-6 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold mb-4">{t("brand.title")}</h2>
          <p className="text-sm leading-relaxed whitespace-pre-line">
            {t("brand.description")}
          </p>
        </div>

        {/* Quick Links */}
        <nav>
          <h3 className="text-xl font-semibold mb-4">
            {t("quickLinks.title")}
          </h3>
          <ul className="space-y-2 text-sm flex flex-col">
            <li>
              <a href="/" className="hover:text-white">
                {t("quickLinks.home")}
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white">
                {t("quickLinks.about")}
              </a>
            </li>
            <li>
              <a href="/whyus" className="hover:text-white">
                {t("quickLinks.whyUs")}
              </a>
            </li>
            <li>
              <a href="/collections" className="hover:text-white">
                {t("quickLinks.collections")}
              </a>
            </li>
            <li>
              <a
                href="/corporate-social-responsibility"
                className="hover:text-white"
              >
                {t("quickLinks.csr")}
              </a>
            </li>
            <li>
              <a href="/news" className="hover:text-white">
                {t("quickLinks.news")}
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-white">
                {t("quickLinks.careers")}
              </a>
            </li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">{t("contact.title")}</h3>

          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <img src={ICONS.icLocation} alt="Location" className="w-5.5" />
              <p className="whitespace-pre-line">{t("contact.address")}</p>
            </li>

            <li className="flex items-center gap-3">
              <img src={ICONS.icEmail} alt="Email" className="w-6" />
            </li>

            <li className="flex items-center gap-3">
              <img src={ICONS.icInstagram} alt="Instagram" className="w-6" />
              <a
                href="https://www.instagram.com/rajawaliperkasafurniture?igsh=bTgzbmZ1Zzc1ZmRz"
                target="_blank"
                rel="noopener noreferrer"
              >
                rajawaliperkasafurniture
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 pt-6 border-t border-[#3C3631] text-center text-xs text-[#C0B8A9]">
        {t("copyright")}
      </div>
    </footer>
  );
}

export default Footer;
