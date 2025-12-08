import { motion as M } from "framer-motion";
import { useEffect, useState } from "react";

function About() {
  const values = [
    {
      img: "./src/assets/icCustomer.png",
      title: "Customer",
      desc: "Ensuring customer satisfaction with excellent product quality.",
    },
    {
      img: "./src/assets/icPeople.png",
      title: "People",
      desc: "Ensure the best service to our customers with well-trained human resources.",
    },
    {
      img: "./src/assets/icImprovement.png",
      title: "Continuous Improvement",
      desc: "Always improve the ability of self, work unit and organization to obtain the best results.",
    },
  ];

  const items = [
    { year: "2003", title: "Establishment", desc: "Established as C.V. Rajawali Perkasa Furniture", position: "top" },
    { year: "2013", title: "Setback", desc: "Big loss on October 1, 2013 (Burned Factory)", position: "bottom" },
    { year: "2021", title: "Expansion", desc: "Built second and third warehouse to increase production capacity", position: "top" },
    { year: "2022", title: "Transformation", desc: "Migrated to become PT. Rajawali Perkasa Furniture", position: "bottom" },
  ];

  // Counter animated values
  const AnimatedNumber = ({ target }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const end = parseInt(target.replace(/[^0-9]/g, ""));
      if (start === end) return;

      const duration = 1200;
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
        className="relative w-full min-h-[60vh] sm:min-h-[75vh] md:min-h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('./src/assets/bg1.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl md:max-w-4xl">
          <M.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white font-extrabold text-3xl sm:text-4xl md:text-6xl leading-tight drop-shadow-md"
          >
            Crafting standout indoor <br />
            & outdoor <span className="text-[#EEE4C8]">Furniture</span> with <br />
            diverse finishes.
          </M.h1>

          <M.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-gray-200 text-base sm:text-lg md:text-xl mt-6"
          >
            Designed to elevate your space with quality, style, and lasting appeal.
          </M.p>
        </div>
      </section>

      {/* STATS + VISION & MISSION */}
      <section className="text-white py-20 md:py-28 relative bg-gradient-to-b from-[#8A5C1D] via-[#2A221D] to-[#1A1613]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 z-10">

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center mb-16">
            {[
              ["±1.000", "Employees"],
              ["±40.877 m²", "Plants"],
              ["±1.000", "Container Shipped"],
            ].map(([val, label], i) => (
              <M.div
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <h2 className="text-4xl font-bold">
                  <AnimatedNumber target={val} />+
                </h2>
                <p className="mt-2 text-gray-300">{label}</p>
              </M.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <M.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#27221F]/70 backdrop-blur-sm border border-gray-600 rounded-xl p-10 shadow-lg"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">Vision</h3>
              <p className="text-gray-200 text-center leading-relaxed">
                To become an International Furniture Company with Excellent Product Quality.
              </p>
            </M.div>

            <M.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-[#27221F]/70 backdrop-blur-sm border border-gray-600 rounded-xl p-10 shadow-lg"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">Mission</h3>
              <ul className="text-gray-200 space-y-3 leading-relaxed">
                <li>1. Ensure Customer Satisfaction with Excellent Product Quality.</li>
                <li>2. Continuously Improving Human Resources Skills.</li>
                <li>3. Increase the Company’s Management Capacity.</li>
                <li>4. Innovate Product Designs needed by the Market.</li>
                <li>5. Participate in Environmental Conservation Activities.</li>
              </ul>
            </M.div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((item, index) => (
              <M.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="bg-gradient-to-b from-[#f2ecd9] to-[#fbf8ef] rounded-2xl p-10 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-6">
                  <img src={item.img} alt={item.title} className="w-20 h-16 object-contain" />
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

      {/* OUR STORY */}
      <section className="w-full bg-[#1a1512] py-24 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <M.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-4xl md:text-5xl font-bold mb-6"
          >
            Our Story
          </M.h2>

          <M.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center max-w-3xl mx-auto text-gray-300 leading-relaxed mb-20"
          >
            PT.Rajawali Perkasa Furniture was established by Yafet Sutrisno in 2003,
            at Juwana-Pati, Central Java - Indonesia. We are proud to share our journey
            from humble beginnings to becoming a trusted partner for renowned companies
            in the furniture industry.
          </M.p>

          <div className="relative">
            <div className="absolute left-0 top-1/2 w-full h-[25px] bg-[#3a302b] -translate-y-1/2 rounded-[12px]"></div>

                    <div className="grid grid-cols-4 relative z-10">
                        {items.map((item, i) => (
                        <div key={i} className="relative flex flex-col items-center">

          
                            {item.position === "top" && (
                            <>
                                <M.div
                                initial={{ y: -60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                className="
                                    mb-100   /* from 16 → 32, card sekarang jauh lebih ke atas */
                                    bg-[#c07b2f] border border-[#e4b07a] text-white 
                                    px-6 py-4 rounded-lg w-[230px] shadow-lg
                                "
                                >
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-sm mt-1">{item.desc}</p>
                                </M.div>

            
                                <div className="
                                absolute top-1/2 
                                w-[3px] 
                                h-32   /* from 16 → 32 */
                                bg-[#3a302b] 
                                -translate-y-[100%]
                                "></div>
                            </>
                            )}


                            <M.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="
                                absolute 
                                top-1/2 left-1/2 
                                -translate-y-1/2 -translate-x-1/2
                                bg-[#c07b2f] text-black font-semibold
                                w-20 h-20 rounded-full border border-[#e4b07a] 
                                shadow-lg flex items-center justify-center z-20
                                mb-0
                            "
                            >
                            {item.year}
                            </M.div>


      
                            {item.position === "bottom" && (
                            <>
                                <div className="
                                absolute top-1/2 
                                w-[3px] 
                                h-16     /* from 16 → 32 */
                                bg-[#3a302b] 
                                translate-y-[100%]
                                "></div>

                                <M.div
                                initial={{ y: 60, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                className="
                                    mt-100   /* from 16 → 32 → lebih turun */
                                    bg-[#c07b2f] border border-[#e4b07a] 
                                    text-white px-6 py-4 rounded-lg w-[230px] shadow-lg
                                "
                                >
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-sm mt-1">{item.desc}</p>
                                </M.div>
                            </>
                            )}


                        </div>
                        ))}
                    </div>
          </div>
        </div>
      </section>

      {/* MANAGEMENT */}
      <section className="w-full bg-[#f7f4ef] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#3b2207] mb-16">
            Management Structure
          </h2>

          <div className="flex justify-center">
            <img src="./src/assets/management-structure.svg" alt="Management Structure" className="w-full max-w-5xl object-contain" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
