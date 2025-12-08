
function Footer() {
  return (
    <footer className="bg-[#2B2521] text-[#E8DDC7] pt-16 pb-6 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">


        <div>
          <h2 className="text-xl font-semibold mb-4">Rajawali Perkasa Furniture</h2>
          <p className="text-sm leading-relaxed">
            Are you interested with our collection?<br />
            Send us a message!
          </p>
        </div>



        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm flex flex-col">
            <a href="/" className="hover:text-white cursor-pointer">Home</a>
            <a href="/about" className="hover:text-white cursor-pointer">About</a>
            <a href="/whyus" className="hover:text-white cursor-pointer">Why Us</a>
            <a href="/collections" className="hover:text-white cursor-pointer">Collections</a>
            <a href="/articles" className="hover:text-white cursor-pointer">Articles</a>
            <a href="/careers" className="hover:text-white cursor-pointer">Careers</a>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="text-lg">
                <img src="./src/assets/icLocation.png" alt="" srcset="" className="w-5" />
              </span>
              <p>
                Jl. Raya Pati - Juwana KM 1,<br />
                Mintomulyo, Kec. Pati,<br />
                Kabupaten Pati
              </p>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-lg">
                <img src="./src/assets/icEmail.png" alt="" srcset="" className="w-6" />
              </span>
              <p>email@a.a</p>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-lg">
                <img src="./src/assets/icInstagram.png" alt="" srcset="" className="w-6" />
              </span>
              <p>@instagram</p>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="mt-12 pt-6 border-t border-[#3C3631] text-center text-xs text-[#C0B8A9]">
        Copyright © 2025 Rajawali Perkasa All Right Reserved
      </div>
    </footer>
  );
}

export default Footer;