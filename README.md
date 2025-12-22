# RPF - Furniture E-Commerce Website

> Modern furniture e-commerce platform built with React + Vite, featuring multilingual support, admin panel, and dynamic content management.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development Guide](#development-guide)
- [API Integration](#api-integration)
- [Internationalization](#internationalization)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

**RPF** adalah platform e-commerce furniture yang dirancang untuk menampilkan dan mengelola produk furniture secara profesional. Website ini dilengkapi dengan:

- 🛍️ **Public Pages**: Home, Collections, About, News, CSR, Contact
- 🔐 **Admin Panel**: Comprehensive CRUD untuk Products, News, CSR, Users, Roles, Banners, dll
- 🌍 **Multilingual**: Support untuk Bahasa Indonesia dan English
- 📱 **Responsive**: Mobile-first design dengan TailwindCSS
- ✨ **Modern UI**: Smooth animations dengan Framer Motion
- 🖼️ **Rich Content**: TinyMCE editor untuk konten dinamis

---

## 🛠 Tech Stack

### Core

- **React 19.2.0** - UI Library
- **Vite 7.2.4** - Build tool & dev server
- **React Router DOM 7.10.1** - Client-side routing

### Styling & UI

- **TailwindCSS 4.1.17** - Utility-first CSS framework
- **Framer Motion 12.23.25** - Animation library
- **Lucide React** - Icon library
- **React Icons** - Additional icons
- **Swiper 12.0.3** - Carousel/slider

### State & Data

- **Axios 1.13.2** - HTTP client
- **React Context** - Global state management
- **Custom Hooks** - Reusable logic

### Content Management

- **TinyMCE 6.3.0** - Rich text editor untuk admin

### Internationalization

- **i18next 25.7.2** - i18n framework
- **react-i18next 16.4.1** - React bindings
- **i18next-http-backend 3.0.2** - Translation loading

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **React Compiler** - Performance optimization

---

## ✨ Features

### Public Features

- ✅ **Dynamic Product Catalog** dengan filter by category dan search
- ✅ **Product Detail Modal** dengan image gallery dan specifications
- ✅ **Carousel Navigation** dari home ke collections dengan auto-open modal
- ✅ **Multi-language Support** (ID/EN)
- ✅ **News & CSR Articles** dengan top news feature
- ✅ **Contact Form** dengan EmailJS integration
- ✅ **Dynamic Banners** di collections page
- ✅ **Responsive Design** untuk semua devices

### Admin Features

- ✅ **Product Management** (CRUD dengan images, categories, specifications)
- ✅ **News Management** (dengan rich text editor)
- ✅ **CSR Management** (dengan thumbnail extraction)
- ✅ **User Management** (dengan role-based permissions)
- ✅ **Role Management** (Super Admin features)
- ✅ **Banner Management** (untuk collections carousel)
- ✅ **Certification & Brand Management**
- ✅ **Search & Filter** di semua list pages
- ✅ **Image Upload** dengan preview

---

## 📦 Prerequisites

Pastikan sistem Anda sudah memiliki:

- **Node.js** >= 18.0.0
- **npm** atau **yarn**
- **Backend API** (Laravel) sudah running
- **Database** sudah dikonfigurasi di backend

---

## 🚀 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd rpf
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Edit `.env` sesuai konfigurasi Anda (lihat [Configuration](#configuration))

### 4. Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5173`

---

## ⚙️ Configuration

### Environment Variables

Buat file `.env` di root directory dengan konfigurasi berikut:

```bash
# API Configuration
VITE_API_URL=http://localhost:8000/api

# Storage URL (untuk images)
VITE_STORAGE_URL=http://localhost:8000/storage

# TinyMCE API Key (untuk rich text editor)
VITE_API_KEY_TINY=your_tinymce_api_key

# EmailJS Configuration (untuk contact form)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

### Penjelasan Environment Variables

| Variable            | Deskripsi                              | Required                               |
| ------------------- | -------------------------------------- | -------------------------------------- |
| `VITE_API_URL`      | URL backend API (Laravel)              | ✅                                     |
| `VITE_STORAGE_URL`  | URL storage untuk images               | ✅                                     |
| `VITE_API_KEY_TINY` | TinyMCE API key untuk admin editor     | ✅ (hanya untuk admin)                 |
| `VITE_EMAILJS_*`    | Credentials EmailJS untuk contact form | ⚠️ (opsional jika pakai backend email) |

### Backend Setup

Backend Laravel harus:

1. Running di port yang sesuai dengan `VITE_API_URL`
2. Memiliki endpoints API v1 (`/api/v1/*`)
3. Support CORS untuk frontend URL
4. Storage images accessible di `VITE_STORAGE_URL`

---

## 📁 Project Structure

```
rpf/
├── public/              # Static assets
├── src/
│   ├── api/             # API service modules
│   │   ├── axios.js     # Axios instance dengan interceptors
│   │   ├── banner.api.js
│   │   ├── brand.api.js
│   │   ├── category.api.js
│   │   └── ...
│   ├── assets/          # Images, fonts, etc
│   │   └── assets.js    # Asset exports
│   ├── components/      # Reusable components
│   │   ├── about/       # About page components
│   │   ├── collections/ # Product related components
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductModal.jsx
│   │   │   └── BannerCarousel.jsx
│   │   ├── layouts/     # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── news/        # News components
│   │   └── ...
│   ├── config.js        # App configuration (STORAGE_URL, etc)
│   ├── hooks/           # Custom React hooks
│   │   ├── useProducts.js
│   │   ├── useDebounce.js
│   │   └── ...
│   ├── i18n/            # Internationalization
│   │   ├── config.js    # i18n setup
│   │   └── locales/     # Translation files
│   │       ├── en/
│   │       └── id/
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Collections.jsx
│   │   ├── About.jsx
│   │   ├── News.jsx
│   │   ├── Contact.jsx
│   │   └── admin/       # Admin pages
│   │       ├── AdminHome.jsx
│   │       ├── ProductList.jsx
│   │       ├── ProductForm.jsx
│   │       └── views/   # Admin view components
│   ├── styles/          # Global styles
│   ├── utils/           # Utility functions
│   │   └── imageHelpers.js
│   ├── App.jsx          # Main app component dengan routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global CSS + Tailwind
├── .env.example         # Environment template
├── .eslintrc.cjs        # ESLint config
├── .prettierrc          # Prettier config
├── package.json         # Dependencies
├── postcss.config.cjs   # PostCSS config
├── tailwind.config.js   # Tailwind config
└── vite.config.js       # Vite config
```

### Key Directories

- **`api/`** - Semua API calls ke backend, organized by resource
- **`components/`** - Reusable UI components, organized by feature
- **`pages/`** - Route-level components (pages)
- **`hooks/`** - Custom hooks untuk logic reuse
- **`i18n/`** - Translation files untuk multilingual support

---

## 📜 Available Scripts

### Development

```bash
npm run dev        # Start dev server dengan HMR
npm run build      # Build untuk production
npm run preview    # Preview production build locally
```

### Code Quality

```bash
npm run lint              # Run ESLint untuk check errors
npm run format:check      # Check formatting dengan Prettier
npm run format:fix        # Auto-fix formatting issues
```

### i18n

```bash
npm run i18n:generate     # Generate translation files
```

---

## 🔧 Development Guide

### Adding New Pages

1. Buat component di `src/pages/`
2. Import dan tambahkan route di `src/App.jsx`
3. Tambahkan translations di `src/i18n/locales/`

**Example:**

```jsx
// src/pages/NewPage.jsx
import { useTranslation } from "react-i18next";

export default function NewPage() {
  const { t } = useTranslation("newpage");

  return (
    <div>
      <h1>{t("title")}</h1>
    </div>
  );
}
```

```jsx
// src/App.jsx - tambahkan route
<Route path="/new-page" element={<NewPage />} />
```

### Creating API Services

Pattern yang digunakan:

```javascript
// src/api/resource.api.js
import api from "./axios";

export const getResources = (params) => {
  return api.get("/resources", { params });
};

export const getResourceById = (id) => {
  return api.get(`/resources/${id}`);
};

export const createResource = (data) => {
  return api.post("/resources", data);
};

export const updateResource = (id, data) => {
  return api.put(`/resources/${id}`, data);
};

export const deleteResource = (id) => {
  return api.delete(`/resources/${id}`);
};
```

### Using Custom Hooks

**Example - useProducts:**

```jsx
import { useProducts } from "@/hooks/useProducts";

function MyComponent() {
  const { products, loading, pagination } = useProducts({
    page: 1,
    perPage: 10,
    categoryId: "all",
    search: "",
  });

  if (loading) return <Loader />;

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### Styling Guidelines

1. **Use TailwindCSS utilities** untuk styling
2. **Responsive design** dengan breakpoints: `sm:`, `md:`, `lg:`, `xl:`
3. **Color palette** utama:
   - Primary: `#C58E47` (gold/brown)
   - Dark: `#28221F`, `#3C2F26`
   - Light: `#F4F2EE`, `#FDFBF7`
4. **Animations** dengan Framer Motion untuk smooth transitions

---

## 🔌 API Integration

### Authentication

Token-based authentication dengan Bearer token di header:

```javascript
// Token disimpan di localStorage
localStorage.setItem("token", "your-token");

// Axios interceptor otomatis menambahkan ke header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Error Handling

Centralized error handling di `src/api/axios.js`:

- **401** - Redirect ke login, clear token
- **403** - Forbidden access
- **422** - Validation errors
- **429** - Rate limit exceeded
- **500** - Server error

### Image URLs

Helper functions di `src/utils/imageHelpers.js`:

```javascript
import {
  getImageUrl,
  getProductImages,
  getProductDisplayImage,
} from "@/utils/imageHelpers";

// Get full URL dari path
const imageUrl = getImageUrl(product.image_path);

// Get grouped images
const { productImages, coverImages, teakImages } = getProductImages(product);

// Get display image (untuk cards/thumbnails)
const displayImage = getProductDisplayImage(product);
```

---

## 🌍 Internationalization

### Supported Languages

- 🇮🇩 **Bahasa Indonesia** (default)
- 🇬🇧 **English**

### Translation Files

Located in `src/i18n/locales/{lang}/{namespace}.json`

**Example:**

```json
// src/i18n/locales/id/home.json
{
  "section1": {
    "line1": "Keahlian",
    "line2": "Tradisional",
    "highlight": "Furniture",
    "line3": "Modern",
    "button": "Tentang Kami"
  }
}
```

### Using Translations

```jsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t, i18n } = useTranslation("home");

  // Get translation
  const title = t("section1.line1");

  // Change language
  i18n.changeLanguage("en");

  return <h1>{title}</h1>;
}
```

---

## 🚀 Deployment

### Build Production

```bash
npm run build
```

Output akan di folder `dist/`

### Deployment Options

#### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### 2. Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

#### 3. Static Hosting

Upload folder `dist/` ke:

- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting
- Nginx/Apache server

### Environment Variables di Production

Jangan lupa set environment variables di hosting platform:

- `VITE_API_URL` → Production API URL
- `VITE_STORAGE_URL` → Production storage URL
- dll.

---

## 🐛 Troubleshooting

### Products tidak muncul di carousel

**Problem:** Carousel hanya menampilkan placeholder images

**Solution:**

1. Check console browser untuk API errors
2. Verify backend `/products` endpoint berfungsi
3. Check `VITE_STORAGE_URL` sudah benar
4. Pastikan products memiliki `product_images` di database

### 401 Unauthorized errors

**Problem:** API calls menghasilkan 401

**Solution:**

1. Login ulang untuk refresh token
2. Check token di localStorage: `localStorage.getItem('token')`
3. Verify backend authentication middleware

### Images tidak load

**Problem:** Product/banner images broken

**Solution:**

1. Check `VITE_STORAGE_URL` di `.env`
2. Verify Laravel storage link sudah dibuat: `php artisan storage:link`
3. Check image paths di database (harus relative, bukan absolute)
4. Verify CORS di backend Laravel

### Build errors

**Problem:** `npm run build` gagal

**Solution:**

1. Delete `node_modules` dan reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
2. Check ESLint errors: `npm run lint`
3. Clear Vite cache: `rm -rf dist .vite`

---

## 📞 Support & Contact

Untuk pertanyaan atau issue, silakan hubungi development team atau buat issue di repository.

---

## 📄 License

Private project - All rights reserved.

---

**Last Updated:** December 2025
**Version:** 1.0.0
