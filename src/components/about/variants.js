/**
 * About page animation variants - extracted to reduce component size
 */

export const heroTextVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export const heroParagraphVariant = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.25 } },
};

export const statsCardVariant = {
  initial: { opacity: 0, scale: 0.7 },
  whileInView: { opacity: 1, scale: 1 },
  transition: (i) => ({ duration: 1.5, delay: i * 0.15 }),
  viewport: { once: true, amount: 0.8 },
};

export const cardSlideUpVariant = {
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

export const coreValueVariant = {
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

export const sectionHeadingVariant = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  viewport: { once: true, amount: 0.2 },
};

export const timelineCardTopVariant = {
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

export const timelineCardBottomVariant = {
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

export const yearCircleVariant = {
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

export const managementImageVariant = {
  initial: { opacity: 0, scale: 0.8 },
  whileInView: { opacity: 1, scale: 1, transition: { duration: 1.0 } },
  viewport: { once: true, amount: 0.5 },
};

// Timeline classes
export const timelineCardClass =
  "bg-[#c07b2f] border border-[#e4b07a] text-white px-6 py-4 rounded-lg shadow-lg flex flex-col items-center justify-center cursor-pointer z-30 transition-colors duration-100";

export const yearCircleClass =
  "absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#c07b2f] text-white font-semibold w-20 h-20 rounded-full border border-[#e4b07a] shadow-lg flex items-center justify-center z-20 cursor-pointer transition-colors duration-100";
