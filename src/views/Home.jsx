import React from "react";
import useFadeIn from "../animations/useFadeIn.js";

function Home() {
  const [ref1, show1] = useFadeIn("left");   // Section 1
  const [ref2, show2] = useFadeIn("bottom"); // Section 2
  const [ref3, show3] = useFadeIn("right");  // Section 3
  const [ref4, show4] = useFadeIn("top");    // Section 4

  return (
    <div className="w-full overflow-x-hidden">

      {/* SECTION 1 - From Left */}
      <section
        className="
          relative w-full 
          h-[85vh] sm:h-[90vh] 
          bg-cover bg-center 
          flex items-center
        "
        style={{ backgroundImage: "url('./src/assets/bg1.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div
          ref={ref1}
          className={`fade-in from-left ${show1 && "show"}
            relative z-10 max-w-4xl px-6 sm:px-10 text-left 
            flex flex-col gap-8 h-full justify-center
          `}
        >
          <h1 className="font-montserrat font-extrabold text-white text-5xl sm:text-6xl md:text-7xl leading-tight mt-0">
            Crafting<br />
            Timeless<br />
            <span className="text-[#EEE4C8]">Furniture&nbsp;</span>
            to<br />
            Elevate Your<br />
            Space.
          </h1>

          <a
            href="about"
            className="
              w-[65%] mt-12 mb-16 px-8 py-3 text-gray-900 font-inter font-semibold 
              rounded-xl shadow-lg text-center
              bg-gradient-to-r from-[#DFD7BF] to-[#A6A6A6]
              transition-all duration-500 ease-out
              hover:bg-[#CB9147] hover:from-transparent hover:to-transparent 
              hover:text-white hover:translate-y-[-5px]
            "
          >
            About us
          </a>
        </div>
      </section>


      {/* SECTION 2 - From Bottom */}
      <section
        ref={ref2}
        className={`fade-in from-bottom ${show2 && "show"} py-20 px-5 sm:px-10 md:px-24 bg-[#FDFBF7]`}
      >
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <h3 className="text-[#B48A4A] font-inter font-bold text-xl sm:text-2xl">Who We Are?</h3>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-montserrat font-extrabold mt-3">
            Specialists in Indoor & Outdoor Furniture
          </h2>

          <p className="text-gray-600 mt-5 text-sm sm:text-base max-w-3xl mx-auto font-poppins ">
            With decades of expertise, we craft furniture that seamlessly blends aesthetics...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
          <div className="relative rounded-xl overflow-visible shadow-lg bg-white group cursor-pointer">
            <img
              src="./src/assets/indoor.png"
              alt="Indoor furniture"
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            />

            <span
              className="
                absolute top-4 left-4
                bg-gradient-to-r from-[#343130] to-[#654823] text-white px-6 py-3 rounded-md
                text-xs sm:text-sm font-poppins
                transition-all duration-500
                group-hover:-top-6 group-hover:left-8
              "
            >
              Indoor Furniture
            </span>
          </div>

          <div className="relative rounded-xl overflow-visible shadow-lg bg-white group cursor-pointer">
            <img
              src="./src/assets/outdoor.png"
              alt="Outdoor furniture"
              className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-xl hover:scale-105 transition-transform duration-500"
            />

            <span
              className="
                absolute top-4 left-4
                bg-gradient-to-r from-[#343130] to-[#654823] text-white px-6 py-3 rounded-md
                text-xs sm:text-sm font-poppins
                transition-all duration-500
                group-hover:-top-6 group-hover:left-8
              "
            >
              Outdoor Furniture
            </span>
          </div>
        </div>



      </section>

    
      {/* SECTION 3 - From Right */}
      <section
        ref={ref3}
        className={`fade-in from-right ${show3 && "show"} w-full px-5 sm:px-10 md:px-16 py-20 bg-[#1c1511] text-white`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-inter font-bold ">
            Some of our collections
          </h2>

          <a href="collections" className="text-base sm:text-lg text-[#e6d6b8] hover:bg-[#e6d6b8] hover:text-black py-2 px-4 rounded-full transition-all duration-300 w-max hover:translate-y-[5px] font-poppins font-medium">
            View all collections
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-14 ">
          {[1,2,3,4].map((id) => (
          <div
            key={id}
            className="
              group
              bg-[#2b2727] rounded-xl 
              h-fit flex  justify-center
              flex-col py-6
              hover:scale-110 
              transition-transform duration-500
            "
          >
            <img src="./src/assets/chair.svg" alt="" className="object-fit h-64"/>
            <p
              className="
                text-sm sm:text-base text-gray-300
                group-hover:text-[#CB9147]
                transition-colors duration-300
                text-center mt-4 font-poppins font-medium
              "
            >
              Nama Produk
            </p>
          </div>

          ))}
        </div>
      </section>


      {/* SECTION 4 - From Top */}
      <section
        ref={ref4}
        className={`fade-in from-top ${show4 && "show"} w-full py-20 sm:py-24 px-5 sm:px-10 md:px-16 
        bg-gradient-to-b from-[#F5F2E9] to-[#F8F6F1] text-center`}
      >
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-montserrat font-extrabold text-[#1A1A1A]">
          Ready to Transform Your Space?
        </h2>

        <p className="text-gray-600 mt-4 text-sm sm:text-lg max-w-2xl mx-auto font-poppins">
          Let us help you create the perfect environment...
        </p>

        <div className="w-full max-w-2xl mx-auto h-40 sm:h-56 md:h-64 bg-gray-300 rounded-xl mt-12 sm:mt-16 mb-25">
            <iframe
              className="w-full h-full rounded-xl"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
        </div>

        <a
          href="contact"
          className=" px-10 sm:px-12 py-3 sm:py-4 bg-[#915E23] text-white font-semibold text-lg sm:text-xl rounded-xl shadow-md transform transition hover:-translate-y-6 hover:bg-[#CB9147] font-poppins hover:scale-105 inline-block transition-all duration-500 "
        >
          Get in touch!
        </a>

      </section>

    </div>
  );
}

export default Home;
