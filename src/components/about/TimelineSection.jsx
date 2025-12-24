import { motion as M } from "framer-motion";
import { 
  sectionHeadingVariant, 
  timelineCardTopVariant, 
  timelineCardBottomVariant, 
  yearCircleVariant,
  timelineCardClass,
  yearCircleClass 
} from "./variants";

/**
 * TimelineSection - Our Story timeline section
 * Includes both desktop (horizontal) and mobile (vertical) layouts
 */
export default function TimelineSection({ t }) {
  const items = [
    { year: t("timeline.0.year"), title: t("timeline.0.title"), desc: t("timeline.0.desc"), position: "top" },
    { year: t("timeline.1.year"), title: t("timeline.1.title"), desc: t("timeline.1.desc"), position: "bottom" },
    { year: t("timeline.2.year"), title: t("timeline.2.title"), desc: t("timeline.2.desc"), position: "top" },
    { year: t("timeline.3.year"), title: t("timeline.3.title"), desc: t("timeline.3.desc"), position: "bottom" },
  ];

  return (
    <section className="w-full bg-[#1a1512] py-8 sm:py-10 text-white lg:min-h-[87vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <M.h2
          {...sectionHeadingVariant}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
        >
          {t("timeline.sectionTitle")}
        </M.h2>

        <M.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto text-gray-300 leading-relaxed mb-8 sm:mb-30 text-sm sm:text-base "
        >
          {t("timeline.sectionSubtitle")}
        </M.p>

        {/* DESKTOP TIMELINE */}
        <div className="hidden lg:block relative">
          <div className="absolute left-0 top-1/2 w-full h-[3px] bg-[#3a302b] -translate-y-1/2 rounded-[12px]" />

          <div className="grid grid-cols-4 relative z-10">
            {items.map((item, i) => (
              <div key={i} className="relative flex flex-col items-center">
                {item.position === "top" && (
                  <>
                    <M.div
                      custom={i}
                      variants={timelineCardTopVariant}
                      whileInView="whileInView"
                      initial="initial"
                      whileHover="whileHover"
                      className={`mb-40 w-full max-w-[300px] h-[120px] ${timelineCardClass}`}
                    >
                      <h3 className="font-bold text-lg text-center">{item.title}</h3>
                      <p className="text-sm mt-1 text-center">{item.desc}</p>
                    </M.div>
                    <div className="absolute top-[18px] w-[3px] h-[55px] bg-[#3a302b] translate-y-full" />
                  </>
                )}

                <M.div
                  custom={i}
                  variants={yearCircleVariant}
                  whileInView="whileInView"
                  initial="initial"
                  whileHover="whileHover"
                  className={yearCircleClass}
                >
                  {item.year}
                </M.div>

                {item.position === "bottom" && (
                  <>
                    <div className="absolute bottom-[18px] w-[3px] h-[55px] bg-[#3a302b] -translate-y-full" />
                    <M.div
                      custom={i}
                      variants={timelineCardBottomVariant}
                      whileInView="whileInView"
                      initial="initial"
                      whileHover="whileHover"
                      className={`mt-36 w-full max-w-[300px] h-[120px] ${timelineCardClass}`}
                    >
                      <h3 className="font-bold text-lg text-center">{item.title}</h3>
                      <p className="text-sm mt-1 text-center">{item.desc}</p>
                    </M.div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE TIMELINE */}
        <MobileTimeline items={items} />
      </div>
    </section>
  );
}

// Mobile timeline component
function MobileTimeline({ items }) {
  return (
    <div className="lg:hidden max-w-md mx-auto relative px-2 py-8">
      <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-[#3a302b] -translate-x-1/2 rounded-full" />

      <div className="relative z-10 space-y-16">
        {items.map((item, i) => (
          <div key={i} className="relative">
            <M.div
              custom={i}
              variants={yearCircleVariant}
              whileInView="whileInView"
              initial="initial"
              viewport={{ once: true }}
              className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md text-xs sm:text-sm font-bold flex items-center justify-center text-white bg-[#c07b2f] border border-[#e4b07a] z-20"
            >
              {item.year}
            </M.div>

            <div className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <M.div
                custom={i}
                variants={{
                  initial: { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
                  whileInView: { opacity: 1, x: 0 },
                  whileHover: {
                    scale: 1.03,
                    backgroundColor: "#2d2621",
                    transition: { type: "spring", stiffness: 260, damping: 20 },
                  },
                }}
                initial="initial"
                whileInView="whileInView"
                whileHover="whileHover"
                viewport={{ once: true }}
                className={`w-[42%] bg-[#1f1a17] border border-[#B57137] rounded-xl p-4 sm:p-6 shadow-lg flex flex-col items-center ${
                  i % 2 === 0 ? "mr-auto" : "ml-auto"
                }`}
              >
                <h3 className="font-bold text-xs sm:text-sm text-white text-center">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-300 text-center mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </M.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
