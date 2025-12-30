/**
 * Generates an array of page numbers and ellipses for pagination.
 * Maximum 5 buttons displayed at a time.
 *
 * @param {number} current - The current active page.
 * @param {number} total - The total number of pages.
 * @returns {Array<number|string>} Array containing page numbers and '...' strings.
 */
export const generatePagination = (current, total) => {
  // If 5 or fewer pages, show all
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];

  // Always show first page
  pages.push(1);

  // Logic for showing pages with max 5 buttons
  if (current <= 3) {
    // Near start: 1, 2, 3, ..., last
    pages.push(2, 3);
    pages.push("...");
  } else if (current >= total - 2) {
    // Near end: 1, ..., n-2, n-1, n
    pages.push("...");
    pages.push(total - 2, total - 1);
  } else {
    // Middle: 1, ..., current, ..., last
    pages.push("...");
    pages.push(current);
    pages.push("...");
  }

  // Always show last page
  pages.push(total);

  // Remove duplicates just in case
  return [...new Set(pages)];
};
