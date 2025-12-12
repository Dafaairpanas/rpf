import { useEffect, useState } from "react";

export default function useScroll(offset = 10) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > offset);
    window.addEventListener("scroll", handle);
    return () => window.removeEventListener("scroll", handle);
  }, [offset]);

  return scrolled;
}
