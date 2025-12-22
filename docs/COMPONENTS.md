# Component Architecture - RPF Frontend

## Component Organization

Components diorganisir berdasarkan feature dan reusability:

```
components/
├── about/           # About page specific components
├── collections/     # Product & Collections components
├── layouts/         # Layout wrappers (Navbar, Footer, etc)
└── news/            # News page components
```

---

## Core Components

### 1. Layout Components

#### Navbar.jsx

**Location:** `src/components/layouts/Navbar.jsx`

**Features:**

- Responsive mobile menu
- Language switcher (ID/EN)
- Sticky header
- Active link highlighting
- Admin panel access (if authenticated)

**Usage:**

```jsx
import Navbar from "@/components/layouts/Navbar";

<Navbar />;
```

#### Footer.jsx

**Location:** `src/components/layouts/Footer.jsx`

**Features:**

- Company info
- Social media links
- Quick links
- Contact information
- Multilingual support

#### AdminLayout.jsx

**Location:** `src/components/layouts/AdminLayout.jsx`

**Features:**

- Admin sidebar navigation
- Role-based menu items
- Logout functionality
- Breadcrumbs

---

### 2. Collections Components

#### ProductCard.jsx

**Location:** `src/components/collections/ProductCard.jsx`

**Props:**

```typescript
{
  product: {
    id: number;
    name: string;
    product_images: array;
  };
  onClick: (product) => void;
}
```

**Features:**

- Product image display
- Hover animations
- Click handler for modal
- Lazy loading images

**Usage:**

```jsx
<ProductCard product={product} onClick={handleProductClick} />
```

#### ProductModal.jsx

**Location:** `src/components/collections/ProductModal.jsx`

**Props:**

```typescript
{
  product: object;
  loading: boolean;
  onClose: () => void;
}
```

**Features:**

- Image gallery dengan thumbnails
- Product specifications
- Multiple image types (product, cover, teak)
- Responsive layout
- Order button (navigate to contact form)

**Usage:**

```jsx
<ProductModal
  product={selectedProduct}
  loading={loading}
  onClose={handleClose}
/>
```

#### BannerCarousel.jsx

**Location:** `src/components/collections/BannerCarousel.jsx`

**Props:**

```typescript
{
  banners: array;
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index) => void;
  loading: boolean;
}
```

**Features:**

- Auto-rotate banners
- Navigation controls
- Indicator dots
- Smooth transitions dengan Framer Motion

---

### 3. News Components

#### NewsCard.jsx

**Location:** `src/components/news/NewsCard.jsx`

**Features:**

- Thumbnail image
- Title & excerpt
- Top news badge
- Read more link

#### NewsDetailSection.jsx

**Location:** `src/components/news/NewsDetailSection.jsx`

**Features:**

- Full article content
- HTML rendering
- Back navigation
- Social share buttons

---

### 4. About Components

#### TimelineSection.jsx

**Location:** `src/components/about/TimelineSection.jsx`

**Features:**

- Company history timeline
- Animated scroll reveal
- Responsive layout

#### VisionMissionSection.jsx

**Location:** `src/components/about/VisionMissionSection.jsx`

**Features:**

- Vision & Mission display
- Icon integration
- Card-based layout

---

### 5. Utility Components

#### ButtonUp.jsx

**Location:** `src/components/ButtonUp.jsx`

**Features:**

- Scroll-to-top button
- Auto show/hide based on scroll position
- Smooth scroll animation

**Usage:**

```jsx
<ButtonUp />
```

#### ProtectedRoute.jsx

**Location:** `src/components/ProtectedRoute.jsx`

**Features:**

- Authentication check
- Redirect to login if unauthenticated
- Admin route protection

**Usage:**

```jsx
<Route
  path="/admin/*"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
/>
```

#### PopupForm.jsx

**Location:** `src/components/PopupForm.jsx`

**Features:**

- Floating contact button
- Animated popup form
- EmailJS integration

---

## Admin Components

### AdminTable.jsx

**Location:** `src/pages/admin/components/AdminTable.jsx`

**Features:**

- Reusable table component
- Pagination
- Search filtering
- Action buttons (Edit, Delete)
- Responsive design

**Props:**

```typescript
{
  columns: array;
  data: array;
  loading: boolean;
  pagination: object;
  onPageChange: (page) => void;
  onEdit: (item) => void;
  onDelete: (id) => void;
}
```

---

## Component Patterns

### 1. Container/Presentational Pattern

**Container (Smart Component):**

```jsx
// src/pages/Collections.jsx
function Collections() {
  const [products, setProducts] = useState([]);
  const { fetchProduct } = useProductDetail();

  // Business logic here

  return <ProductCard product={product} onClick={handleClick} />;
}
```

**Presentational (Dumb Component):**

```jsx
// src/components/collections/ProductCard.jsx
function ProductCard({ product, onClick }) {
  // Only UI logic
  return <div onClick={() => onClick(product)}>{product.name}</div>;
}
```

### 2. Custom Hooks Pattern

Separate logic dari UI:

```jsx
// src/hooks/useProducts.js
export function useProducts(params) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch logic
  }, [params]);

  return { products, loading };
}

// Usage in component
const { products, loading } = useProducts({ page: 1 });
```

### 3. Compound Components Pattern

**Example - AdminLayout dengan nested routes:**

```jsx
<AdminLayout>
  <AdminSidebar />
  <AdminContent>
    <Outlet /> {/* Nested routes */}
  </AdminContent>
</AdminLayout>
```

---

## Styling Conventions

### TailwindCSS Classes

```jsx
// Responsive breakpoints
className = "text-sm sm:text-base md:text-lg lg:text-xl";

// Hover states
className = "hover:bg-gray-100 hover:scale-105 transition-all";

// Group hover
className = "group";
// Child: className="group-hover:text-blue-500"
```

### Framer Motion Animations

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

---

## Performance Optimization

### 1. React.memo untuk Prevent Re-renders

```jsx
const ProductCard = memo(function ProductCard({ product, onClick }) {
  // Component implementation
});
```

### 2. useCallback untuk Stable References

```jsx
const handleClick = useCallback(
  (product) => {
    // Handler logic
  },
  [dependencies],
);
```

### 3. useMemo untuk Expensive Computations

```jsx
const filteredProducts = useMemo(() => {
  return products.filter((p) => p.category === activeCategory);
}, [products, activeCategory]);
```

### 4. Lazy Loading Images

```jsx
<img src={imageUrl} loading="lazy" alt="Product" />
```

---

## Best Practices

1. **Keep components small and focused** - Single responsibility principle
2. **Use PropTypes or TypeScript** untuk type checking
3. **Extract reusable logic** ke custom hooks
4. **Avoid prop drilling** - Use Context API jika perlu
5. **Use semantic HTML** - `<nav>`, `<article>`, `<section>`, dll
6. **Accessibility** - Add `aria-labels`, keyboard navigation
7. **Error boundaries** untuk graceful error handling
8. **Consistent naming** - PascalCase untuk components, camelCase untuk functions

---

## Component Testing (Future)

Untuk testing, consider:

- **Jest** untuk unit testing
- **React Testing Library** untuk component testing
- **Cypress** untuk E2E testing

Example test structure:

```jsx
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

test("renders product name", () => {
  const product = { name: "Test Product" };
  render(<ProductCard product={product} onClick={() => {}} />);
  expect(screen.getByText("Test Product")).toBeInTheDocument();
});
```
