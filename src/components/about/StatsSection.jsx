import { motion as M } from "framer-motion";
import { statsCardVariant, cardSlideUpVariant } from "./variants";
import AnimatedNumber from "./AnimatedNumber";

/**
 * StatsSection - Stats, Vision & Mission section
 */
export default function StatsSection({ t }) {
  return (
    <section className="h-fit text-white py-8 sm:py-10 relative bg-gradient-to-b from-[#8A5C1D] via-[#2A221D] to-[#1A1613]">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 text-center mb-12 sm:mb-[7rem] font-poppins">
          {[
            [t("stats.employees"), t("stats.employeesLabel")],
            [t("stats.plants"), t("stats.plantsLabel")],
            [t("stats.containers"), t("stats.containersLabel")],
          ].map(([val, label], i) => (
            <M.div
              key={i}
              custom={i}
              variants={statsCardVariant}
              whileInView="whileInView"
              initial="initial"
            >
              <h2 className="text-3xl sm:text-4xl font-bold">
                <AnimatedNumber target={val} />
              </h2>
              <p className="mt-2 text-gray-300 text-sm sm:text-base">{label}</p>
            </M.div>
          ))}
        </div>

        {/* VISION & MISSION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <M.div
            custom={0}
            variants={cardSlideUpVariant}
            whileInView="whileInView"
            initial="initial"
            whileHover="whileHover"
            className="bg-[#27221F]/70 backdrop-blur-sm border border-gray-600 flex flex-col justify-center rounded-xl p-6 sm:p-10 shadow-lg cursor-pointer"
          >
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
              {t("vision.title")}
            </h3>
            <p className="text-gray-200 text-center leading-relaxed text-base sm:text-xl">
              {t("vision.desc")}
            </p>
          </M.div>

          <M.div
            custom={0.15}
            variants={cardSlideUpVariant}
            whileInView="whileInView"
            initial="initial"
            whileHover="whileHover"
            className="bg-[#27221F]/70 backdrop-blur-sm border border-gray-600 rounded-xl p-6 sm:p-10 shadow-lg cursor-pointer"
          >
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
              {t("mission.title")}
            </h3>
            <ul className="text-gray-200 space-y-2 sm:space-y-3 leading-relaxed text-sm sm:text-base">
              <li>1. {t("mission.1")}</li>
              <li>2. {t("mission.2")}</li>
              <li>3. {t("mission.3")}</li>
              <li>4. {t("mission.4")}</li>
              <li>5. {t("mission.5")}</li>
            </ul>
          </M.div>
        </div>
      </div>
    </section>
  );
}
