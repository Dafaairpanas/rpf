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
    <section className="w-full py-8 sm:py-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold text-[#28221F] mb-10 sm:mb-16">
          Core Values
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {values.map((item, index) => (
            <M.div
              key={index}
              custom={index}
              variants={coreValueVariant}
              whileInView="whileInView"
              initial="initial"
              whileHover="whileHover"
              className="bg-gradient-to-b from-[#DFD7BF] to-[#F8F6F2] rounded-2xl p-6 sm:p-10 shadow-md cursor-pointer text-center"
            >
              <div className="flex justify-center mb-4 sm:mb-6">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-16 h-12 sm:w-20 sm:h-16 object-contain"
                  loading="lazy"
                />
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                {item.title}
              </h3>

              <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                {item.desc}
              </p>
            </M.div>
          ))}
        </div>
      </div>
    </section>
  );
}
