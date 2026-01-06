/**
 * Generates an array of page numbers and ellipses for pagination.
 * Uses Sliding Window Pagination with proper truncation.
 *
 * @param {number} current - The current active page.
 * @param {number} total - The total number of pages.
 * @param {number} delta - Number of pages to show on each side of current.
 * @returns {Array<number|string>} Array containing page numbers and '...' strings.
 *
 * @example
 * generatePagination(1, 20, 2)   // [1, 2, 3, '...', 20]
 * generatePagination(10, 20, 2)  // [1, '...', 8, 9, 10, 11, 12, '...', 20]
 * generatePagination(20, 20, 2)  // [1, '...', 18, 19, 20]
 */
export const generatePagination = (current, total, delta = 2) => {
  // If total pages is small enough, show all
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const range = [];
  const rangeWithDots = [];
  let lastNum;

  // Build range: always include 1, total, and pages around current
  for (let i = 1; i <= total; i++) {
    if (
      i === 1 || 
      i === total || 
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  // Add ellipsis where there are gaps
  range.forEach((num) => {
    if (lastNum) {
      if (num - lastNum === 2) {
        // If gap is exactly 2, show the number instead of ellipsis
        rangeWithDots.push(lastNum + 1);
      } else if (num - lastNum !== 1) {
        // If gap is more than 1, show ellipsis
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(num);
    lastNum = num;
  });

  return rangeWithDots;
};
