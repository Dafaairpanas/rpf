function WhyUS() {
  const brands = [
    { src: "./src/assets/logo.png", alt: "Four Hands" },
    { src: "./src/assets/logo.png", alt: "Tikamoon" },
    { src: "./src/assets/logo.png", alt: "Kave Home" },
    { src: "./src/assets/logo.png", alt: "Bridgman" },
    { src: "./src/assets/logo.png", alt: "Harbour" },
    { src: "./src/assets/logo.png", alt: "RH" },
  ];

  return (
    <div className="w-full">

      {/* ======================= HERO ======================= */}
      <section className="relative w-full h-[85vh] md:h-screen overflow-hidden">
        <img
          src="./src/assets/bg1.png"
          alt="Factory Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 px-6 sm:px-10 max-w-xl pt-24 md:pt-36">
          <h1 className="
            text-white font-extrabold leading-tight
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          ">
            Excellent<br />Products,<br />
            <span className="text-[#e8ddc7]">Endless Convenience</span>
          </h1>

          <p className="text-white mt-6 max-w-xl text-base sm:text-lg leading-relaxed">
            We deliver furniture crafted with quality and elegance, trusted by
            brands for consistent beauty and performance.
          </p>
        </div>
      </section>


      {/* ======================= BRANDS ======================= */}
      <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-12">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
            Trusted by{" "}
            <span className="text-[#cd803a]">Leading Brands</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg">
            We are proud to be a trusted partner of renowned companies across
            industries. Your trust reflects our commitment to excellence.
          </p>
        </div>

        {/* Logo Grid */}
        <div className="mt-12 sm:mt-16">
          <div className="bg-[#f8faf6] rounded-xl p-6 sm:p-10">
            
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                gap-6 sm:gap-10
                place-items-center
              "
            >
              {brands.map((item, idx) => (
                <div
                  key={idx}
                  className="
                    bg-white rounded-lg shadow-sm
                    flex items-center justify-center
                    h-28 sm:h-32 w-full
                    p-4
                    transition-all duration-300
                    hover:shadow-md hover:scale-[1.03]
                  "
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="max-h-20 object-contain opacity-80 hover:opacity-100 transition"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* ======================= GLOBAL REACH ======================= */}
      <section className="w-full bg-[#2a2220] py-20 md:py-24">
        <div className="
          max-w-7xl mx-auto
          grid grid-cols-1 lg:grid-cols-2
          gap-14 lg:gap-20
          px-4 sm:px-6 lg:px-12 items-center
        ">

          {/* LEFT TEXT */}
          <div className="text-white">
            <p className="text-[#cd803a] font-medium text-lg mb-2">
              Exporting excellence worldwide
            </p>

            <h2 className="
              text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
              font-bold leading-tight mb-6
            ">
              Global Reach
            </h2>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Our export performance reflects our dedication to quality,
              serving over 30 countries worldwide with products that meet
              global standards. Wherever the destination, our craftsmanship
              stays consistent.
            </p>
          </div>

          {/* RIGHT MAP */}
          <div className="bg-white rounded-2xl shadow-xl p-4 w-full">
            <img
              src="./src/assets/map.webp"
              alt="Global Export Map"
              className="w-full h-auto object-contain rounded-xl
                transition-all duration-300 hover:scale-[1.02]
              "
            />
          </div>

        </div>
      </section>


      {/* ======================= CERTIFICATIONS ======================= */}
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            We Have Achived Official{" "}
            <span className="text-[#cd803a]">Certifications</span>
          </h2>

          <p className="
            text-gray-600 text-base sm:text-lg
            max-w-3xl mx-auto mb-12 md:mb-16
          ">
            Our certifications represent our commitment to sustainability,
            international standards, and outstanding craftsmanship.
          </p>

          {/* Certification Grid */}
          <div className="
            bg-[#f6faf6] rounded-2xl p-8 sm:p-10
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4
            gap-10 place-items-center
          ">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  transition-all duration-300
                  hover:scale-[1.06]
                "
              >
                <img
                  src="./src/assets/logo.png"
                  alt="Certification Logo"
                  className="h-16 sm:h-20 md:h-24 object-contain opacity-80 hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}

export default WhyUS;
