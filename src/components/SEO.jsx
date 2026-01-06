import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * SEO Component
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} image - Image URL for social sharing (Open Graph)
 * @param {string} url - Canonical URL of the page
 */
export default function SEO({ title, description, image, url }) {
  const siteTitle = "Rajawali Perkasa Furniture";
  const defaultDescription =
    "Manufacturer & exporter of high-quality teak wood furniture (indoor & outdoor) based in Jepara, Indonesia.";
  const defaultImage = "/assets/images/logo.png"; // Pastikan ada default image
  const siteUrl = window.location.origin;

  // const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const fullTitle = siteTitle; // User requested single title for all pages
  const metaDescription = description || defaultDescription;
  const metaImage = image
    ? image.startsWith("http")
      ? image
      : `${siteUrl}${image}`
    : `${siteUrl}${defaultImage}`;
  const metaUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Helmet>
  );
}
