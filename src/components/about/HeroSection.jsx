import { motion as M } from "framer-motion";
import { heroVariants } from "./variants";
import { HERO_BACKGROUNDS } from "@/assets/assets";

/**
 * HeroSection - About page hero section
 */
export default function HeroSection({ t }) {
  return (
    <M.section
      {...heroVariants.section}
      className="relative w-full hero-full bg-cover bg-center flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${HERO_BACKGROUNDS.about})` }}
    >
      <M.div
        {...heroVariants.overlay}
        className="absolute inset-0 bg-black/40"
      />

      <div className="relative z-10 text-center px-4 sm:px-6 w-full max-w-6xl mx-auto smooth-responsive">
        <M.h1
          {...heroVariants.title}
          className="text-white font-montserrat font-extrabold text-3xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight drop-shadow-md smooth-responsive"
        >
          {t("hero.line1")} <br className="hidden sm:block" />
          {t("hero.line2")} <span className="text-[#EEE4C8]">{t("hero.highlight")}</span> <br className="hidden sm:block" />
          {t("hero.line3")}
        </M.h1>

        <M.p
          {...heroVariants.subtitle}
          className="text-gray-200 text-sm sm:text-lg md:text-xl mt-4 sm:mt-6 font-poppins drop-shadow max-w-2xl mx-auto"
        >
          {t("hero.subtitle")}
        </M.p>
      </div>
    </M.section>
  );
}
