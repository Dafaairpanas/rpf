import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

function Collections() {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ================= HERO ================= */}
      <section
        className="
          relative w-full 
          h-[70vh] sm:h-[80vh] md:h-[90vh] 
          bg-cover bg-center flex items-center justify-center
        "
        style={{ backgroundImage: "url('./src/assets/bg1.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-[900px] mx-auto">
          <h1 className="
            text-white font-extrabold 
            text-3xl sm:text-4xl md:text-6xl 
            leading-tight drop-shadow-md
          ">
            Explore Our <span className="text-[#EEE4C8]">Collections</span>
          </h1>

          <p className="text-gray-200 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 drop-shadow">
            Discover a world of timeless elegance. Elevate your space with our finest selections.
          </p>
        </div>
      </section>

      {/* ================= MAIN WRAPPER ================= */}
      <div className="w-full bg-[#F4F2EE] py-16 px-4 sm:px-6 md:px-16">

        <h2 className="mb-20 text-center text-2xl sm:text-3xl md:text-5xl font-bold text-[#1A1A1A]">
          Find Your <span className="text-[#C58E47]">Style</span> in our Collections
        </h2>

        {/* ================= FEATURED SECTION ================= */}
        <section className="flex justify-center">
          <div className="
            relative rounded-3xl overflow-hidden 
            bg-gradient-to-b from-[#2A2623] to-[#1C1A18]
            w-full max-w-[1100px]
            h-[420px] sm:h-[480px] md:h-[520px]
          ">

            <div className="absolute inset-0 bg-black/25 pointer-events-none" />

            {/* STROKE TEXT */}
            <h1
              className="
                absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 
                z-30 select-none text-transparent font-bold
                text-[40px] sm:text-[56px] md:text-[112px]
                leading-[0.88] md:leading-[0.9]
                w-full text-center stroke-text
              "
              aria-hidden
            >
              Cordele Dining Chair
            </h1>

            {/* GOLD OVERLAY TEXT */}
            <h1
              className="
                absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 
                z-10 select-none
                text-[#C58E47] font-bold
                text-[40px] sm:text-[56px] md:text-[112px]
                leading-[0.88] md:leading-[0.9]
                w-full text-center
              "
            >
              Cordele Dining Chair
            </h1>

            {/* CENTER IMAGE */}
            <img
              src="./src/assets/chair.svg"
              alt="Cordele Dining Chair"
              className="
                absolute left-1/2 
                top-12 sm:top-14 md:top-24 
                -translate-x-1/2 z-20
                w-32 sm:w-40 md:w-[300px]
                object-contain
                drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]
              "
            />

            {/* NEXT BUTTON */}
            <button
              aria-label="Next"
              className="
                absolute right-4 sm:right-6 md:right-12 
                top-1/2 -translate-y-1/2
                bg-white/10 hover:bg-white/15 backdrop-blur-sm
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                rounded-full flex items-center justify-center shadow-md
              "
            >
              <ChevronRight size={26} className="text-[#D9D6D1]" />
            </button>

            {/* BOTTOM CONTENT */}
            <div className="absolute left-0 right-0 bottom-6 md:bottom-32 z-30 px-4 sm:px-8 md:px-12">
              <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">

                <div className="md:w-1/2 text-left">
                  <p className="text-white text-base sm:text-lg md:text-xl leading-relaxed max-w-[330px]">
                    Cordele Dining Chair: modern, comfortable, and elegant for any dining space.
                  </p>
                </div>

                <div className="md:w-1/2 flex justify-end md:pr-6">
                  <button
                    className="
                      mt-6 sm:mt-10 md:mt-20 
                      inline-flex items-center justify-center 
                      px-6 sm:px-8 py-3 sm:py-4 
                      rounded-2xl
                      bg-gradient-to-b from-[#F3E1BB] to-[#E6CFA0]
                      text-[#1A1A1A] font-semibold text-base sm:text-lg 
                      shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                      hover:brightness-95 transition 
                    "
                  >
                    Best Seller
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= FILTER + SEARCH ================= */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center md:justify-start">
            <button className="px-6 py-2 rounded-xl border border-[#A6A099] font-semibold bg-white shadow-sm">
              Indoor
            </button>
            <button className="px-6 py-2 rounded-xl border border-[#A6A099] font-semibold bg-white shadow-sm">
              Outdoor
            </button>
            <button className="px-6 py-2 rounded-xl bg-[#3C2F26] text-white font-semibold shadow-md">
              All
            </button>
          </div>

          <input
            type="text"
            placeholder="Search product by name"
            className="
              w-full md:w-96 px-4 py-3 
              border border-[#3C2F26] rounded-xl 
              bg-transparent focus:outline-none
            "
          />
        </div>

        {/* ================= PRODUCT GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">

          {[1, 2, 3, 4].map((id) => (
            <div
              key={id}
              className="
                bg-gradient-to-b from-[#DFD7BF] to-[#F5F5F5] 
                border border-[#E5DCC7] 
                rounded-xl p-4 shadow-sm
                flex flex-col items-center justify-start
              "
            >
              <img
                src="./src/assets/chair.svg"
                alt="Cordele Chair"
                className="
                  w-full max-w-[200px] 
                  h-64 sm:h-80 
                  bg-white rounded-lg mb-4 mx-auto p-4
                "
              />
              <p className="mt-3 text-[18px] sm:text-[20px] font-medium text-[#1A1A1A] leading-tight text-center">
                Cordele Dining Chair Pro Max Ultra Azaxa...
              </p>
            </div>
          ))}

        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex items-center justify-center gap-3 mt-12">
          <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-400">
            <ChevronLeft size={16} />
          </button>

          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`
                w-8 h-8 rounded-sm flex items-center justify-center 
                border text-sm font-bold 
                ${
                  num === 3
                    ? "bg-[#C58E47] text-white border-[#C58E47]"
                    : "border-gray-400 text-gray-500 hover:bg-gray-200"
                }
              `}
            >
              {num}
            </button>
          ))}

          <button className="w-8 h-8 flex items-center justify-center rounded-sm border border-gray-400">
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}

export default Collections;
