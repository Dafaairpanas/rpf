import { ICONS } from "@/assets/assets";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer className="bg-[#2B2521] text-[#E8DDC7]">
      {/* Main Footer Content */}
      <div className="px-6 md:px-12 lg:px-16 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
            {/* Brand Section */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-semibold mb-6">
                {t("brand.title")}
              </h2>
              <p className="text-base leading-relaxed whitespace-pre-line text-[#D4CCBF]">
                {t("brand.description")}
              </p>
            </div>

            {/* Quick Links Section */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-semibold mb-8">
                {t("quickLinks.title")}
              </h3>
              <nav>
                <ul className="space-y-3 text-base">
                  <li>
                    <a
                      href="/"
                      className="hover:text-[#C6934B] transition-colors duration-200"
                    >
                      {t("quickLinks.home")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="hover:text-[#C6934B] transition-colors duration-200"
                    >
                      {t("quickLinks.about")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/whyus"
                      className="hover:text-[#C6934B] transition-colors duration-200"
                    >
                      {t("quickLinks.whyUs")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/collections"
                      className="hover:text-[#C6934B] transition-colors duration-200"
                    >
                      {t("quickLinks.collections")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/corporate-social-responsibility"
                      className="hover:text-[#C6934B] transition-colors duration-200"
                    >
                      {t("quickLinks.csr")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/news"
                      className="hover:text-[#C6934B] transition-colors duration-200"
                    >
                      {t("quickLinks.news")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/careers"
                      className="hover:text-[#C6934B] transition-colors duration-200"
                    >
                      {t("quickLinks.careers")}
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="hover:text-[#C6934B] transition-colors duration-200"
                    >
                      {t("quickLinks.contact")}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-semibold mb-8">
                {t("contact.title")}
              </h3>
              <ul className="space-y-6 text-base">
                {/* Address */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={ICONS.icLocation}
                      alt="Location"
                      className="w-6 h-8 mt-1 mr-1"
                    />
                  </div>
                  <a
                    href="https://maps.app.goo.gl/MyN61hxPEgB3f3FBA"
                    className="leading-relaxed whitespace-pre-line hover:text-[#C6934B] transition-colors duration-200"
                  >
                    {t("contact.address")}
                  </a>
                </li>

                {/* Email */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={ICONS.icEmail}
                      alt="Email"
                      className="w-7 h-6 mt-1"
                    />
                  </div>
                  <a
                    className="hover:text-[#C6934B]"
                    href="mailto:info@rajpf.com"
                  >
                    info@rajpf.com
                  </a>
                </li>

                {/* Instagram */}
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={ICONS.icInstagram}
                      alt="Instagram"
                      className="w-7.5 h-7 mt-1"
                    />
                  </div>
                  <a
                    href="https://www.instagram.com/rajawaliperkasafurniture?igsh=bTgzbmZ1Zzc1ZmRz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C6934B]"
                  >
                    rajawaliperkasafurniture
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#3C3631] bg-[#1F1B18] px-6 md:px-12 lg:px-16 py-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-[#A89F94]">
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
