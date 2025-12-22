import { motion as M } from "framer-motion";
import { heroTextVariant, heroParagraphVariant } from "./variants";
import { IMAGES } from "@/assets/assets";

/**
 * HeroSection - About page hero section
 */
export default function HeroSection({ t }) {
  return (
    <section
      className="relative w-full min-h-[95vh] sm:min-h-[100vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${IMAGES.bg1})` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-4xl mx-auto">
        <M.h1
          {...heroTextVariant}
          className="text-white font-montserrat font-extrabold text-3xl sm:text-5xl md:text-6xl leading-tight drop-shadow-md"
        >
          {t("hero.line1")} <br className="hidden sm:block" />
          {t("hero.line2")}{" "}
          <span className="text-[#EEE4C8]">{t("hero.highlight")}</span> <br className="hidden sm:block" />
          {t("hero.line3")}
        </M.h1>

        <M.p
          {...heroParagraphVariant}
          className="text-gray-200 text-sm sm:text-base md:text-xl mt-4 sm:mt-6 font-poppins drop-shadow max-w-2xl mx-auto"
        >
          {t("hero.subtitle")}
        </M.p>
      </div>
    </section>
  );
}
