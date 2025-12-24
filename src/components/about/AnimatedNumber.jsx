import { useState, useEffect, memo } from 'react';

/**
 * AnimatedNumber - Animates a number counting up
 * Memoized to prevent unnecessary re-renders
 */
const AnimatedNumber = memo(function AnimatedNumber({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const numericTarget = target ? parseInt(target.replace(/[^0-9]/g, "")) : 0;
    const end = numericTarget;

    if (end === 0) {
      setCount(0);
      return;
    }
    if (start === end) return;

    const duration = 2000;
    const incrementTime = 10;
    const step = Math.ceil(end / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}</span>;
});

export default AnimatedNumber;
