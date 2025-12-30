/**
 * Image Helper Utilities
 * Uses centralized config for URLs
 */

import { STORAGE_URL } from "@/config";

// Get full image URL from path
export const getImageUrl = (path) => {
  if (!path) return "/placeholder.png";

  // If path is an object, extract the actual path
  if (typeof path === "object") {
    path = path.image_url || path.image_path || path.path || path.url || "";
  }

  // Ensure path is a string
  if (typeof path !== "string") return "/placeholder.png";

  if (path.startsWith("http")) return path;

  // Remove leading slashes and 'storage/' prefix if present
  const cleanPath = path.replace(/^\/+/, "").replace(/^storage\//, "");
  return `${STORAGE_URL}/${cleanPath}`;
};

// Get product images from product object
export const getProductImages = (product) => {
  if (!product) return { productImages: [], coverImages: [], teakImages: [] };

  const processImages = (images) => {
    if (!images || !Array.isArray(images)) return [];
    return images.map((img) => {
      // API returns image_url, not image_path
      const path = img.image_url || img.image_path || img.path || img;
      return getImageUrl(path);
    });
  };

  return {
    productImages: processImages(product.product_images),
    coverImages: processImages(product.cover_images),
    teakImages: processImages(product.teak_images),
  };
};

// Get single display image for product (for cards, thumbnails)
export const getProductDisplayImage = (
  product,
  fallback = "/placeholder.png",
) => {
  if (!product) return fallback;

  // Only use product_images for display (carousel, cards, etc.)
  const images = product.product_images;

  if (images && Array.isArray(images) && images.length > 0) {
    const firstImage = images[0];
    const path = firstImage.image_path || firstImage.path || firstImage;
    return getImageUrl(path);
  }

  return fallback;
};

// Export STORAGE_URL for backwards compatibility
export { STORAGE_URL };
export const API_BASE_URL = STORAGE_URL.replace("/storage", "");
