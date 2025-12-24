/**
 * Generates an array of page numbers and ellipses for pagination.
 * 
 * @param {number} current - The current active page.
 * @param {number} total - The total number of pages.
 * @returns {Array<number|string>} Array containing page numbers and '...' strings.
 */
export const generatePagination = (current, total) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = [];
  
  // Always show first page
  pages.push(1);

  if (current > 3) {
    pages.push('...');
  }

  // Calculate range around current page
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    // Avoid double adding if current is near start or end
    if (i > 1 && i < total) {
      pages.push(i);
    }
  }

  if (current < total - 2) {
    pages.push('...');
  }

  // Always show last page
  pages.push(total);

  // Remove duplicates just in case (e.g. if current is 2 or total-1)
  return [...new Set(pages)];
};
