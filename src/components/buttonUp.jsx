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
                            
                            /* FIX: Shadow bercahaya dimasukkan secara statis */
                            hover:shadow-[0_0_20px_5px_rgba(192,122,44,0.7)]
                        "
          >
            <img src={ICONS.icArrow} alt="Up" className="w-5 h-7" />
          </button>
        )}
      </div>

      {/* Popup Form (Kode tidak berubah) */}
      {openForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-end items-center z-[999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setOpenForm(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
            >
              ×
            </button>
            <PopupForm />
          </div>
        </div>
      )}
    </>
  );
}

export default ButtonUp;
