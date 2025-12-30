import { motion as M } from "framer-motion";
import { coreValueVariant } from "./variants";
import { ICONS } from "@/assets/assets";

/**
 * CoreValuesSection - Core values cards section
 */
export default function CoreValuesSection({ t }) {
  const values = [
    {
      img: ICONS.icCustomer,
      title: t("values.customer.title"),
      desc: t("values.customer.desc"),
    },
    {
      img: ICONS.icPeople,
      title: t("values.people.title"),
      desc: t("values.people.desc"),
    },
    {
      img: ICONS.icImprovement,
      title: t("values.improvement.title"),
      desc: t("values.improvement.desc"),
    },
  ];

  return (
    <section className="w-full py-6 sm:py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-xl sm:text-3xl md:text-5xl font-bold text-[#28221F] mb-6 sm:mb-16">
          {t("values.sectionTitle")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {values.map((item, index) => (
            <M.div
              key={index}
              custom={index}
              variants={coreValueVariant}
              whileInView="whileInView"
              initial="initial"
              whileHover="whileHover"
              className="bg-gradient-to-b from-[#DFD7BF] to-[#F8F6F2] rounded-xl sm:rounded-2xl p-4 sm:p-8 shadow-md cursor-pointer text-center flex flex-col items-center h-auto sm:h-[300px]"
            >
              {/* Icon Container - Fixed Height */}
              <div className="flex justify-center items-center h-10 sm:h-20 mb-2 sm:mb-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-10 h-8 sm:w-20 sm:h-16 object-contain"
                  loading="lazy"
                />
              </div>

              {/* Title - Fixed Height */}
              <div className="h-10 sm:h-16 flex items-start justify-center">
                <h3 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>

              {/* Description - Takes remaining space */}
              <div className="flex-1 flex items-start mt-1 sm:mt-2">
                <p className="text-gray-700 text-[10px] sm:text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </M.div>
          ))}
        </div>
      </div>
    </section>
  );
}
