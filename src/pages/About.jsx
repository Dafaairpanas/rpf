//eslint-disable-next-line no-unused-vars
import { motion as M } from "framer-motion";
import { useEffect, useState } from "react";
import { IMAGES, ICONS } from "@/assets/assets.js";
import { useTranslation } from "react-i18next";

const heroTextVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const heroParagraphVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25 } },
};

const statsCardVariant = {
  initial: { opacity: 0, scale: 0.7 },
  whileInView: { opacity: 1, scale: 1 },
  transition: (i) => ({ duration: 1.5, delay: i * 0.15 }),
  viewport: { once: true, amount: 0.8 },
};

const cardSlideUpVariant = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: (delay = 0) => ({ duration: 0.6, delay: delay }),
  viewport: { once: true, amount: 0.3 },
};

const coreValueVariant = {
  initial: { opacity: 0, y: 40 },
  whileInView: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, delay: index * 0.15 },
  }),
  whileHover: {
    scale: 1.05,
    rotate: 0.5,
    y: -10,
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  viewport: { once: true, amount: 0.3 },
};

const sectionHeadingVariant = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  viewport: { once: true, amount: 0.2 },
};

const timelineCardTopVariant = {
  initial: { y: -60, opacity: 0 },
  whileInView: { y: -54, opacity: 1 },
  whileHover: {
    scale: 1.05,
    rotate: -1,
    zIndex: 40,
    backgroundColor: "#DFD7BF",
    color: "#333333",
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  transition: (i) => ({ duration: 0.6, delay: i * 0.2 }),
  viewport: { once: true, amount: 0.5 },
};

const timelineCardBottomVariant = {
  initial: { y: 60, opacity: 0 },
  whileInView: { y: 72, opacity: 1 },
  whileHover: {
    scale: 1.05,
    rotate: 1,
    zIndex: 40,
    backgroundColor: "#DFD7BF",
    color: "#333333",
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
  transition: (i) => ({ duration: 0.6, delay: i * 0.2 }),
  viewport: { once: true, amount: 0.5 },
};

const yearCircleVariant = {
  initial: { scale: 0.8, opacity: 0 },
  whileInView: { scale: 1, opacity: 1 },
  whileHover: {
    scale: 1.05,
    rotate: 2,
    backgroundColor: "#DFD7BF",
    color: "#333333",
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
  transition: (i) => ({ duration: 0.4, delay: i * 0.2 }),
  viewport: { once: true, amount: 0.5 },
};

const managementImageVariant = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1, transition: { duration: 1.0 } },
  viewport: { once: true, amount: 0.5 },
};

function About() {
  const { t } = useTranslation("about");

  const cardSlideUpVariant = {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    whileHover: {
      scale: 1.03,
      y: -5,
      backgroundColor: "#141313ff",
      boxShadow: "0 15px 30px rgba(192, 123, 47, 0.1)",
      transition: { type: "spring", stiffness: 350, damping: 20 },
    },
    transition: (delay = 0) => ({ duration: 0.6, delay: delay }),
    viewport: { once: true, amount: 0.3 },
  };

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

  const items = [
    {
      year: t("timeline.0.year"),
      title: t("timeline.0.title"),
      desc: t("timeline.0.desc"),
      position: "top",
    },
    {
      year: t("timeline.1.year"),
      title: t("timeline.1.title"),
      desc: t("timeline.1.desc"),
      position: "bottom",
    },
    {
      year: t("timeline.2.year"),
      title: t("timeline.2.title"),
      desc: t("timeline.2.desc"),
      position: "top",
    },
    {
      year: t("timeline.3.year"),
      title: t("timeline.3.title"),
      desc: t("timeline.3.desc"),
      position: "bottom",
    },
  ];

  const defaultCardClass =
    "bg-[#c07b2f] border border-[#e4b07a] text-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer z-30 transition-colors duration-100";
  const defaultYearClass =
    "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#c07b2f] text-white font-semibold w-20 h-20 rounded-full border border-[#e4b07a] shadow-lg flex items-center justify-center z-20 cursor-pointer transition-colors duration-100";

  const AnimatedNumber = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const numericTarget = target
        ? parseInt(target.replace(/[^0-9]/g, ""))
        : 0;
      const end = numericTarget;

      if (end === 0) {
        setCount(0);
        return;
      }
      if (start === end) return;

      const duration = 1500;
      const incrementTime = 10;
      const step = Math.ceil(end / (duration / incrementTime));

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setCount(start);
      }, incrementTime);

      return () => clearInterval(timer);
    }, [target]);

    return <span>{count.toLocaleString()}</span>;
  };

  return (
    <div className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section
        className="relative w-full min-h-[95vh] sm:min-h-[100vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${IMAGES.bg1})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-6  w-std h-full mx-auto">
          <M.h1
            {...heroTextVariant}
            className="text-white font-montserrat font-extrabold text-5xl sm:text-6xl leading-tight drop-shadow-md"
          >
            {t("hero.line1")} <br />
            {t("hero.line2")}{" "}
            <span className="text-[#EEE4C8]">{t("hero.highlight")}</span> <br />
            {t("hero.line3")}
          </M.h1>

          <M.p
            {...heroParagraphVariant}
            className="text-gray-200 text-base sm:text-lg md:text-xl mt-6 font-poppins drop-shadow"
          >
            {t("hero.subtitle")}
          </M.p>
        </div>
      </section>

      {/* STATS, VISION & MISSION SECTION */}
      <section className="h-fit text-white py-10 relative bg-gradient-to-b from-[#8A5C1D] via-[#2A221D] to-[#1A1613]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 z-10">
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center mb-16 font-poppins mb-[7rem]">
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
                <h2 className="text-4xl font-bold">
                  <AnimatedNumber target={val} />
                </h2>
                <p className="mt-2 text-gray-300">{label}</p>
              </M.div>
            ))}
          </div>

          {/* VISION & MISSION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <M.div
              custom={0}
              variants={cardSlideUpVariant}
              whileInView="whileInView"
              initial="initial"
              whileHover="whileHover"
              className="bg-[#27221F]/70 backdrop-blur-sm border border-gray-600 flex flex-col justify-center  rounded-xl p-10 shadow-lg cursor-pointer"
            >
              <h3 className="text-2xl md:text-4xl font-bold text-center mb-6">
                {t("vision.title")}
              </h3>
              <p className="text-gray-200 text-center leading-relaxed text-xl h-full text-center mt-[6vh]">
                {t("vision.desc")}
              </p>
            </M.div>

            <M.div
              custom={0.15}
              variants={cardSlideUpVariant}
              whileInView="whileInView"
              initial="initial"
              whileHover="whileHover"
              className="bg-[#27221F]/70 backdrop-blur-sm border border-gray-600 rounded-xl p-10 shadow-lg cursor-pointer"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">
                {t("mission.title")}
              </h3>
              <ul className="text-gray-200 space-y-3 leading-relaxed ">
                <li className="mb-4">1. {t("mission.1")}</li>
                <li className="mb-4">2. {t("mission.2")}</li>
                <li className="mb-4">3. {t("mission.3")}</li>
                <li className="mb-4">4. {t("mission.4")}</li>
                <li>5. {t("mission.5")}</li>
              </ul>
            </M.div>
          </div>
        </div>
      </section>

      {/* CORE VALUES SECTION */}
      <section className="w-full py-10  bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <M.div
                key={index}
                custom={index}
                variants={coreValueVariant}
                whileInView="whileInView"
                initial="initial"
                whileHover="whileHover"
                className="
                  bg-gradient-to-b from-[#DFD7BF] to-[#F8F6F2] rounded-2xl p-10 shadow-md 
                  cursor-pointer text-center
                "
              >
                <div className="flex justify-center mb-6">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-20 h-16 object-contain"
                  />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {item.desc}
                </p>
              </M.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY / TIMELINE SECTION */}
      <section className="w-full bg-[#1a1512] py-10 text-white h-[95dvh]">
        <div className="max-w-6xl mx-auto px-6">
          <M.h2
            {...sectionHeadingVariant}
            className="text-center text-4xl md:text-5xl font-bold mb-6"
          >
            Our Story
          </M.h2>

          <M.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center max-w-3xl mx-auto text-gray-300 leading-relaxed mb-20"
          >
            PT.Rajawali Perkasa Furniture was established by Yafet Sutrisno in
            2003, at Juwana-Pati, Central Java - Indonesia. We are proud to
            share our journey from humble beginnings to becoming a trusted
            partner for renowned companies in the furniture industry.
          </M.p>

          {/* DESKTOP TIMELINE */}
          <div className="hidden lg:block relative">
            <div className="absolute left-0 top-1/2 w-full h-[3px] bg-[#3a302b] -translate-y-1/2 rounded-[12px]"></div>

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
                        className={`mb-40 w-full max-w-[300px] h-[120px] ${defaultCardClass}`}
                      >
                        <h3 className="font-bold text-lg text-center">
                          {item.title}
                        </h3>
                        <p className="text-sm mt-1 text-center">{item.desc}</p>
                      </M.div>
                      <div className="absolute top-[18px] w-[3px] h-[55px] bg-[#3a302b] translate-y-full"></div>
                    </>
                  )}

                  <M.div
                    custom={i}
                    variants={yearCircleVariant}
                    whileInView="whileInView"
                    initial="initial"
                    whileHover="whileHover"
                    className={defaultYearClass}
                  >
                    {item.year}
                  </M.div>

                  {item.position === "bottom" && (
                    <>
                      <div className="absolute bottom-[18px] w-[3px] h-[55px] bg-[#3a302b] -translate-y-full"></div>

                      <M.div
                        custom={i}
                        variants={timelineCardBottomVariant}
                        whileInView="whileInView"
                        initial="initial"
                        whileHover="whileHover"
                        className={`mt-36 w-full max-w-[300px] h-[120px] ${defaultCardClass}`}
                      >
                        <h3 className="font-bold text-lg text-center">
                          {item.title}
                        </h3>
                        <p className="text-sm mt-1 text-center">{item.desc}</p>
                      </M.div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE TIMELINE */}
          <div className="lg:hidden max-w-md mx-auto relative px-4 py-10">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[3px] bg-[#3a302b] -translate-x-1/2 rounded-full"></div>

            <div className="relative z-10 space-y-20">
              {items.map((item, i) => (
                <div key={i} className="relative">
                  <M.div
                    custom={i}
                    variants={yearCircleVariant}
                    whileInView="whileInView"
                    initial="initial"
                    viewport={{ once: true }}
                    className="
                      absolute left-1/2 -translate-x-1/2
                      -top-6
                      w-10 h-10 rounded-full shadow-md text-sm font-bold
                      flex items-center justify-center text-white
                      bg-[#c07b2f] border border-[#e4b07a]
                      z-20
                    "
                  >
                    {item.year}
                  </M.div>

                  <div
                    className={`
                      flex 
                      ${i % 2 === 0 ? "justify-start -mt-6" : "justify-end -mt-8"}
                    `}
                  >
                    <M.div
                      custom={i}
                      variants={{
                        initial: { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
                        whileInView: { opacity: 1, x: 0 },
                        whileHover: {
                          scale: 1.03,
                          rotate: i % 2 === 0 ? -1 : 1,
                          backgroundColor: "#2d2621",
                          transition: {
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                          },
                        },
                      }}
                      initial="initial"
                      whileInView="whileInView"
                      whileHover="whileHover"
                      viewport={{ once: true }}
                      className={`
                        w-[45%] bg-[#1f1a17] border border-[#3a302b]
                        rounded-xl p-6 shadow-lg items-center justify-content flex flex-col
                        ${i % 2 === 0 ? "mr-auto" : "ml-auto"}
                      `}
                    >
                      <h3 className="font-bold text-[14px] text-white text-center">
                        {item.title}
                      </h3>

                      <p className="text-[12px] text-gray-300 text-center mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </M.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MANAGEMENT STRUCTURE SECTION */}
      <section className="w-full bg-[#f7f4ef] py-10">
        <div className="max-w-6xl mx-auto px-6">
          <M.h2
            {...sectionHeadingVariant}
            className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#3b2207] mb-16"
          >
            {t("management.title")}
          </M.h2>

          <M.div {...managementImageVariant} className="flex justify-center">
            <img
              src={IMAGES.managementStructureSvg}
              alt="Management Structure"
              className="w-full max-w-7xl object-contain"
            />
          </M.div>
        </div>
      </section>
    </div>
  );
}

export default About;
