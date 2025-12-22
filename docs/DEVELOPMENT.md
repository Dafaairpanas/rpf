# Development Workflow - RPF Frontend

## 📋 Table of Contents

- [Git Workflow](#git-workflow)
- [Code Standards](#code-standards)
- [Common Tasks](#common-tasks)
- [Adding New Features](#adding-new-features)
- [Debugging Tips](#debugging-tips)

---

## 🔀 Git Workflow

### Branch Strategy

```
main (production)
  ├── develop (staging)
  │   ├── feature/product-filter
  │   ├── feature/admin-dashboard
  │   └── bugfix/carousel-mobile
```

### Creating Feature Branch

```bash
# Update develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Work on feature...
git add .
git commit -m "feat: add product filtering"

# Push
git push origin feature/your-feature-name
```

### Commit Message Convention

Follow **Conventional Commits**:

```
<type>(<scope>): <subject>

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes (formatting)
- refactor: Code refactoring
- perf: Performance improvements
- test: Adding tests
- chore: Build/config changes
```

**Examples:**

```bash
feat(collections): add product category filter
fix(navbar): mobile menu not closing on link click
docs(readme): update installation instructions
style(components): format ProductCard with prettier
refactor(api): extract axios instance to separate file
perf(home): optimize product carousel rendering
```

---

## 📏 Code Standards

### ESLint & Prettier

Sebelum commit, pastikan code formatted:

```bash
# Check formatting
npm run format:check

# Auto-fix formatting
npm run format:fix

# Run linter
npm run lint
```

### File Naming

- **Components:** PascalCase - `ProductCard.jsx`
- **Utilities:** camelCase - `imageHelpers.js`
- **Pages:** PascalCase - `Collections.jsx`
- **Hooks:** camelCase with 'use' prefix - `useProducts.js`
- **API services:** camelCase with '.api' suffix - `product.api.js`

### Import Order

```jsx
// 1. External libraries
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// 2. Internal modules (@/ imports)
import { getProducts } from "@/api/product.api";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/collections/ProductCard";

// 3. Relative imports
import "./styles.css";
```

### Component Structure

```jsx
// 1. Imports
import React, { useState } from "react";

// 2. Constants/Configs (outside component)
const DEFAULT_PAGE_SIZE = 10;

// 3. Component
function MyComponent({ prop1, prop2 }) {
  // 3.1 Hooks
  const [state, setState] = useState();
  useEffect(() => {}, []);

  // 3.2 Event handlers
  const handleClick = () => {};

  // 3.3 Render helpers (if needed)
  const renderItem = () => {};

  // 3.4 Return JSX
  return <div>...</div>;
}

// 4. Export
export default MyComponent;
```

---

## 🛠 Common Tasks

### Task 1: Add New Page

**Steps:**

1. Create page component di `src/pages/`
2. Add route di `App.jsx`
3. Create translation files di `src/i18n/locales/`
4. Update navbar links jika perlu

**Example:**

```bash
# 1. Create component
touch src/pages/Gallery.jsx

# 2. Create translations
touch src/i18n/locales/en/gallery.json
touch src/i18n/locales/id/gallery.json
```

```jsx
// src/pages/Gallery.jsx
import { useTranslation } from "react-i18next";

export default function Gallery() {
  const { t } = useTranslation("gallery");
  return <div>{t("title")}</div>;
}
```

```jsx
// src/App.jsx
import Gallery from "./pages/Gallery";

<Route path="/gallery" element={<Gallery />} />;
```

### Task 2: Add New API Endpoint

**Steps:**

1. Create/update API service di `src/api/`
2. Define request/response types
3. Add error handling
4. Test di browser console

**Example:**

```javascript
// src/api/gallery.api.js
import api from "./axios";

export const getGalleryImages = async (params) => {
  try {
    const response = await api.get("/gallery", { params });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    throw error;
  }
};
```

### Task 3: Add Translation

**Steps:**

1. Edit JSON file di `src/i18n/locales/{lang}/{namespace}.json`
2. Use `t()` function di component

**Example:**

```json
// src/i18n/locales/id/common.json
{
  "buttons": {
    "submit": "Kirim",
    "cancel": "Batal",
    "save": "Simpan"
  }
}
```

```jsx
// Component
const { t } = useTranslation("common");
<button>{t("buttons.submit")}</button>;
```

### Task 4: Update Styling

**Best Practices:**

- Use Tailwind utilities first
- Create custom CSS only when necessary
- Use CSS variables untuk theme colors
- Keep responsive breakpoints consistent

```jsx
// ✅ Good - Tailwind utilities
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ❌ Avoid - Inline styles
<div style={{ display: 'flex', padding: '16px' }}>

// ✅ Good - Responsive
<h1 className="text-2xl sm:text-3xl md:text-4xl">

// ❌ Avoid - Fixed sizes
<h1 className="text-4xl">
```

---

## ✨ Adding New Features

### Example: Add Product Wishlist Feature

#### 1. Planning

- [ ] Create wishlist state management
- [ ] Add wishlist icon to ProductCard
- [ ] Create wishlist page
- [ ] Store wishlist in localStorage
- [ ] Add API integration (if backend supports)

#### 2. Implementation

**Step 1: Create wishlist context**

```jsx
// src/contexts/WishlistContext.jsx
import { createContext, useState, useContext } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (product) => {
    setWishlist((prev) => [...prev, product]);
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
```

**Step 2: Update ProductCard**

```jsx
// src/components/collections/ProductCard.jsx
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";

function ProductCard({ product }) {
  const { addToWishlist } = useWishlist();

  return (
    <div className="relative">
      <button
        onClick={() => addToWishlist(product)}
        className="absolute top-2 right-2 p-2 bg-white rounded-full"
      >
        <Heart className="w-5 h-5" />
      </button>
      {/* Rest of card */}
    </div>
  );
}
```

**Step 3: Create wishlist page**

```jsx
// src/pages/Wishlist.jsx
import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/components/collections/ProductCard";

export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

**Step 4: Add route**

```jsx
// src/App.jsx
<Route path="/wishlist" element={<Wishlist />} />
```

---

## 🐛 Debugging Tips

### React DevTools

Install **React Developer Tools** browser extension untuk:

- Inspect component hierarchy
- View props & state
- Track re-renders
- Profile performance

### Console Methods

```javascript
// Log API response
console.log("Products:", products);

// Group related logs
console.group("Product Fetch");
console.log("Params:", params);
console.log("Response:", response);
console.groupEnd();

// Log with styling
console.log("%c API Success", "color: green; font-weight: bold", data);

// Trace call stack
console.trace("Where was this called from?");
```

### Network Debugging

**Browser DevTools → Network tab:**

1. Filter by XHR untuk API calls
2. Check request headers (termasuk Authorization)
3. Check response status & body
4. Measure request timing

### Common Issues & Solutions

#### Issue: "Cannot read property of undefined"

```javascript
// ❌ Problem
const name = product.user.name;

// ✅ Solution: Optional chaining
const name = product?.user?.name;

// ✅ Solution: Default value
const name = product?.user?.name || "Unknown";
```

#### Issue: Infinite re-renders

```javascript
// ❌ Problem: Missing dependency
useEffect(() => {
  fetchData();
}, []); // fetchData not in deps

// ✅ Solution: Add to dependencies or use useCallback
const fetchData = useCallback(() => {
  // fetch logic
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);
```

#### Issue: Component not re-rendering

```javascript
// ❌ Problem: Mutating state
const handleClick = () => {
  products.push(newProduct); // Direct mutation
  setProducts(products); // Same reference
};

// ✅ Solution: Create new reference
const handleClick = () => {
  setProducts([...products, newProduct]);
};
```

---

## 🚀 Performance Optimization

### 1. Code Splitting

```jsx
// Lazy load heavy components
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));

<Suspense fallback={<Loader />}>
  <AdminPanel />
</Suspense>;
```

### 2. Memoization

```jsx
// Prevent expensive computations
const filteredProducts = useMemo(() => {
  return products.filter((p) => p.category === active);
}, [products, active]);

// Prevent unnecessary re-renders
const MemoizedCard = memo(ProductCard);
```

### 3. Virtualization

For long lists, use virtualization library like `react-window`:

```bash
npm install react-window
```

### 4. Image Optimization

```jsx
// Lazy loading
<img loading="lazy" src={url} alt="..." />

// Responsive images
<img
  srcSet={`${url}-small.jpg 300w, ${url}-large.jpg 1200w`}
  sizes="(max-width: 600px) 300px, 1200px"
/>
```

---

## 📝 Code Review Checklist

Before submitting PR:

- [ ] Code follows style guide
- [ ] No console.log() left in code
- [ ] No commented-out code
- [ ] Proper error handling
- [ ] Responsive on mobile/tablet/desktop
- [ ] Translations added for all text
- [ ] No PropTypes warnings
- [ ] ESLint passes
- [ ] Prettier formatted
- [ ] Tested in browser

---

## 🎓 Learning Resources

### React

- [React Docs](https://react.dev)
- [React Patterns](https://reactpatterns.com)

### TailwindCSS

- [Tailwind Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com)

### Framer Motion

- [Framer Motion Docs](https://www.framer.com/motion)
- [Animation Examples](https://www.framer.com/motion/examples)

### i18next

- [i18next Docs](https://www.i18next.com)
- [react-i18next Guide](https://react.i18next.com)

---

**Happy Coding! 🚀**
