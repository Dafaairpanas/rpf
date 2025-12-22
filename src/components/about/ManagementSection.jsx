import { motion as M } from "framer-motion";
import { sectionHeadingVariant, managementImageVariant } from "./variants";
import { IMAGES } from "@/assets/assets";

/**
 * ManagementSection - Management structure section
 */
export default function ManagementSection({ t }) {
  return (
    <section className="w-full bg-[#f7f4ef] py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <M.h2
          {...sectionHeadingVariant}
          className="text-center text-2xl sm:text-3xl md:text-5xl font-bold text-[#28221F] mb-10 sm:mb-16"
        >
          {t("management.title")}
        </M.h2>

        <M.div {...managementImageVariant} className="flex justify-center">
          <img
            src={IMAGES.managementStructureSvg}
            alt="Management Structure"
            className="w-full max-w-7xl object-contain"
            loading="lazy"
          />
        </M.div>
      </div>
    </section>
  );
}
