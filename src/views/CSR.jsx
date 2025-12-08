import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";


function Collections() {
    const cards = Array(6).fill(0); // contoh data dummy
    return (
        <div className="w-full ">

            <section
                className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-center"
                style={{ backgroundImage: "url('./src/assets/bg1.png')" }}
            >
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 text-center px-6 max-w-112">
                <h1 className="text-white font-extrabold text-4xl md:text-6xl leading-tight drop-shadow-md">
                    Explore Our <span className="text-[#EEE4C8]">Collections</span>
                </h1>

                <p className="text-gray-200 text-lg md:text-xl mt-6 drop-shadow">
                    Discover a world of timeless elegance. Elevate your space with our finest selections.
                </p>
                </div>
            </section>

            <div className="w-full bg-[#F1EEE7] min-h-screen py-20 px-6">

                {/* ================= HEADINGS ================= */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-800">
                    Good Deeds, Good Vibes:{" "}
                    <span className="text-[#D9A556]">CSR Highlights</span>
                    </h1>

                    <p className="text-gray-600 mt-3 text-lg">
                    Explore how we're giving back through meaningful initiatives and
                    community-driven projects
                    </p>
                </div>

                {/* ================= GRID CARDS ================= */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {cards.map((_, i) => (
                    <div
                        key={i}
                        className="
                        bg-white rounded-xl shadow-md overflow-hidden
                        transition-all duration-300 cursor-pointer
                        hover:shadow-xl hover:scale-[1.02]
                        "
                    >
                        {/* IMAGE */}
                        <div className="w-full h-44 overflow-hidden">
                        <img
                            src="./src/assets/csr.jpeg"
                            className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
                            alt="CSR"
                        />
                        </div>

                        {/* TEXT CONTENT */}
                        <div className="p-4">
                        <p className="text-gray-800 font-semibold leading-tight">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
                            rhoncus velit…..
                        </p>

                        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                            <span>December 2, 2025</span>

                            {/* Read More */}
                            <button className="text-gray-800 font-medium hover:text-[#D9A556] transition">
                            Read More
                            </button>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>

                {/* ================= PAGINATION ================= */}
                <div className="mt-16 flex justify-center gap-2">
                    
                    {/* Left Arrow */}
                    <button
                    className="
                        w-8 h-8 rounded-md bg-[#E7E4DF]
                        flex items-center justify-center text-gray-700
                        hover:bg-[#D9A556] hover:text-white transition
                    "
                    >
                    ‹
                    </button>

                    {/* Page Numbers */}
                    {[1, 2, 3, 4].map((num) => (
                    <button
                        key={num}
                        className={`
                        w-8 h-8 rounded-md flex items-center justify-center font-medium
                        transition
                        ${
                            num === 3
                            ? "bg-[#D9A556] text-white"
                            : "bg-white text-gray-700 shadow-sm hover:bg-[#D9A556] hover:text-white"
                        }
                        `}
                    >
                        {num}
                    </button>
                    ))}

                    {/* Right Arrow */}
                    <button
                    className="
                        w-8 h-8 rounded-md bg-[#E7E4DF]
                        flex items-center justify-center text-gray-700
                        hover:bg-[#D9A556] hover:text-white transition
                    "
                    >
                    ›
                    </button>
                </div>

             </div>


        </div>
    );
}

export default Collections;