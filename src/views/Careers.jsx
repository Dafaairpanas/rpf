function Careers() {
  const jobs = [
    "Tailor",
    "Engraver",
    "Painter",
    "Driver",
    "Software Engineer",
    "Network Engineer",
  ];

  const skillTags = [
    "Full Day woyla coding",
    "Expert",
    "Full Day",
    "Expert",
    "Full Day",
    "Expert",
    "Full Day",
    "Expert",
    "Full Day",
    "Expert",
  ];

  return (
    <div className="w-full">

      <section
        className="
          relative w-full h-[60vh] md:h-[80vh] lg:h-[90vh] bg-cover bg-center
          flex items-center justify-center px-4
        "
        style={{ backgroundImage: "url('./src/assets/bg1.png')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="
            text-white font-extrabold
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl
            leading-tight drop-shadow-md
          ">
            Careers <span className="text-[#EEE4C8]">Opportunities</span>
          </h1>

          <p className="
            text-gray-200 
            text-base sm:text-lg md:text-xl 
            mt-4 md:mt-6 drop-shadow
          ">
            We're always looking for talented individuals to join our team.
          </p>
        </div>
      </section>

      <section className="w-full bg-white min-h-screen py-16 md:py-20 px-4 sm:px-6">

        <div className="text-center mb-16">
          <h1 className="
            text-3xl sm:text-4xl lg:text-5xl 
            font-bold text-gray-900
          ">
            Be a{" "}
            <span className="text-[#D9A556]">Part</span>{" "}
            of Rajawali Perkasa Furniture
          </h1>

          <p className="mt-3 text-gray-600 text-base sm:text-lg">
            Register Yourself Now
          </p>
        </div>

        <div className="
          max-w-7xl mx-auto grid
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-8 md:gap-10
        ">

          {jobs.map((job, index) => (
            <div
              key={index}
              className="
                rounded-xl shadow-md border border-gray-200
                bg-gradient-to-b from-[#DFD7BF] to-[#F5F5F5]
                p-6 sm:p-7 lg:p-8
                transition-all duration-300
                hover:shadow-lg
              "
            >
              <div className="mb-4">
                <span className="
                  text-xs bg-[#F5F5F5]
                  px-3 py-1 rounded-md
                  text-gray-800 font-semibold
                ">
                  December 2, 2025
                </span>
              </div>

              <h2 className="
                text-2xl sm:text-3xl lg:text-4xl
                font-semibold text-gray-800
                mb-8 lg:mb-12
              ">
                {job}
              </h2>

              <div className="
                flex flex-wrap gap-2
                mb-8
              ">
                {skillTags.map((tag, i) => (
                  <span
                    key={i}
                    className="
                      border border-gray-900 rounded-md
                      px-3 py-1 text-sm text-gray-900 font-semibold
                      w-fit
                      break-words
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button className="
                w-full bg-[#54504E] text-white py-2 rounded-md
                hover:bg-gray-700 transition
              ">
                Apply
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center gap-2">

          <button className="
            w-8 h-8 rounded-md bg-[#E7E4DF]
            flex items-center justify-center text-gray-700
            hover:bg-[#D9A556] hover:text-white transition
          ">
            ‹
          </button>

          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              className={`
                w-8 h-8 rounded-md flex items-center justify-center
                font-medium transition
                ${
                  num === 3
                    ? "bg-[#D9A556] text-white"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-[#D9A556] hover:text-white"
                }
              `}
            >
              {num}
            </button>
          ))}

          <button className="
            w-8 h-8 rounded-md bg-[#E7E4DF]
            flex items-center justify-center text-gray-700
            hover:bg-[#D9A556] hover:text-white transition
          ">
            ›
          </button>
        </div>

      </section>
    </div>
  );
}

export default Careers;
