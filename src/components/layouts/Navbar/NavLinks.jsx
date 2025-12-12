import { useTranslation } from "react-i18next";

export default function NavLinks({ activePath, links }) {
  // PENTING: Tentukan namespace 'navbar' agar kunci terjemahan terpanggil
  const { t } = useTranslation("navbar");

  return (
    <>
      {links.map((item) => (
        // Mengubah tag <a> menjadi <li> yang membungkus <a>,
        // karena komponen ini diletakkan di dalam <ul> di DesktopNav
        <li key={item.path} className="relative">
          <a href={item.path} className="relative group">
            <span className="hover:text-[#6B3F21] transition-all px-1">
              {t(item.label)}
            </span>

            {/* Indikator aktif */}
            {activePath === item.path && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#6B3F21] rounded-full" />
            )}

            {/* Hover effect */}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#6B3F21] rounded-full transition-all duration-300 group-hover:w-full" />
          </a>
        </li>
      ))}
    </>
  );
}
