import React, { useEffect, useState } from "react";
import PopupForm from "./PopupForm.jsx";
import { ICONS } from "@/assets/assets.js";

function ButtonUp() {
  const [showScroll, setShowScroll] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const checkScroll = () => {
      setShowScroll(window.scrollY > 120);
    };

    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  /* Default shadow untuk tombol Anda adalah 'shadow-xl' */

  return (
    <>
      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-4 z-50 ">
        {/* BUTTON POP UP MESSAGE */}
        <button
          onClick={() => setOpenForm(true)}
          className="
                        w-14 h-14 bg-[#C07A2C] shadow-xl rounded-2xl 
                        flex justify-center items-center transition duration-300
                        hover:translate-y-[-2px] hover:bg-[#28221F] 
                        hover:shadow-[0_0_20px_5px_rgba(192,122,44,0.7)]
                        cursor-pointer
                    "
        >
          <img src={ICONS.icMessage} alt="Message" className="w-7 h-7" />
        </button>

        {/* BUTTON SCROLL TOP */}
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="
                            w-14 h-14 bg-[#C07A2C] shadow-xl rounded-2xl 
                            flex justify-center items-center transition duration-300
                            hover:bg-[#28221F] hover:translate-y-[-2px]
                            cursor-pointer
                            /* FIX: Shadow bercahaya dimasukkan secara statis */
                            hover:shadow-[0_0_20px_5px_rgba(192,122,44,0.7)]
                        "
          >
            <img src={ICONS.icArrow} alt="Up" className="w-5 h-7" />
          </button>
        )}
      </div>

      {/* Popup Form - positioned above floating buttons */}
      {openForm && (
        <>
          {/* Backdrop - click to close */}
          <div
            className="fixed inset-0 bg-black/40 z-[9998] backdrop-blur-[2px]"
            onClick={() => setOpenForm(false)}
          />
          {/* Form container - responsive sizing */}
          <div className="fixed bottom-24 right-3 z-[9999] w-[90vw] xs:w-[85vw] sm:w-[380px] md:w-[400px] lg:w-[420px] max-w-[420px]">
            <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 relative shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
              {/* Close */}
              <button
                onClick={() => setOpenForm(false)}
                className="absolute top-2 right-2 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 rounded-full text-base sm:text-lg cursor-pointer transition-colors"
              >
                ×
              </button>
              <PopupForm onClose={() => setOpenForm(false)} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ButtonUp;
