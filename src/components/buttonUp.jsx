import React from "react";


function buttonUp() {

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="d-flex fixed bottom-6 right-6 flex gap-4 z-50">

            <button
                className="w-14 h-14 bg-[#C07A2C] shadow-xl rounded-2xl flex justify-center items-center hover:bg-[#54504E] transition "
            >
                <img src="./src/assets/icMessage.png" alt="" className="w-7 h-7"/>
            </button>


            <button
                onClick={scrollToTop}
                className="w-14 h-14 bg-[#C07A2C] shadow-xl rounded-2xl flex justify-center items-center hover:bg-[#54504E] transition"
            >
                <img src="./src/assets/icArrow.png" alt="" className="w-5 h-7"/>
            </button>

        </div>
    );
}

export default buttonUp;