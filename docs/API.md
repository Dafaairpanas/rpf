# API Documentation - RPF Frontend

## Base Configuration

**Base URL:** `${VITE_API_URL}/v1`
**Default:** `http://localhost:8000/api/v1`

## Authentication

All protected endpoints require Bearer token authentication:

```javascript
Authorization: Bearer {token}
```

Token disimpan di `localStorage` dengan key `token` dan otomatis ditambahkan ke header oleh Axios interceptor.

---

## API Modules

### 1. Products API

**File:** `src/api/product.api.js`

#### Get Products (Paginated)

```javascript
GET /products?page=1&per_page=10&category_id=1&search=chair&featured=true

// Response
{
  "success": true,
  "data": {
    "data": [...products],
    "current_page": 1,
    "last_page": 5,
    "per_page": 10,
    "total": 50
  }
}
```

#### Get Product Detail

```javascript
GET /products/{id}

// Response
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Modern Chair",
    "description": "...",
    "dimension": {
      "width": 50,
      "height": 100,
      "depth": 60
    },
    "product_images": [...],
    "cover_images": [...],
    "teak_images": [...]
  }
}
```

#### Create Product (Admin)

```javascript
POST /products
Content-Type: multipart/form-data

Body:
- name
- description
- master_category_id
- dimension (JSON string)
- product_images[] (files)
- cover_images[] (files)
- teak_images[] (files)
```

#### Update Product (Admin)

```javascript
POST /products/{id}
Content-Type: multipart/form-data

Body: sama dengan create
```

#### Delete Product (Admin)

```javascript
DELETE / products / { id };
```

---

### 2. Categories API

**File:** `src/api/category.api.js`

#### Get All Categories

```javascript
GET /master-categories

// Response
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Indoor Furniture",
      "slug": "indoor"
    },
    ...
  ]
}
```

---

### 3. News API

**File:** `src/api/news.api.js`

#### Get News List

```javascript
GET /news?page=1&search=furniture

// Response
{
  "success": true,
  "data": {
    "data": [
      {
        "id": 1,
        "title": "News Title",
        "excerpt": "Short description...",
        "thumbnail_url": "http://...",
        "is_top_news": false,
        "created_at": "2025-01-01"
      }
    ],
    "pagination": {...}
  }
}
```

#### Get Top News

```javascript
GET /news/top-news

// Response
{
  "success": true,
  "data": {
    "id": 5,
    "title": "Top News Title",
    "content": "<p>Full HTML content</p>",
    "thumbnail_url": "..."
  }
}
```

#### Get News Detail

```javascript
GET / news / { id };

// Response includes full content field
```

---

### 4. CSR API

**File:** `src/api/csr.api.js`

Similar structure to News API:

- `GET /csr`
- `GET /csr/{id}`
- `POST /csr` (Admin)
- `PUT /csr/{id}` (Admin)
- `DELETE /csr/{id}` (Admin)

---

### 5. Banners API

**File:** `src/api/banner.api.js`

#### Get Banners

```javascript
GET /banners

// Response
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Banner Title",
      "image_url": "http://storage/banners/image.jpg",
      "link": "https://...",
      "is_active": true
    }
  ]
}
```

---

### 6. Users & Roles API

**Admin Only**

#### Users

```javascript
GET / users;
POST / users;
PUT / users / { id };
DELETE / users / { id };
```

#### Roles

```javascript
GET /roles
POST /roles (Super Admin only)
PUT /roles/{id} (Super Admin only)
DELETE /roles/{id} (Super Admin only)
```

---

### 7. Brands & Certifications API

```javascript
GET / brands;
GET / certifications;
```

Admin endpoints untuk CRUD juga tersedia.

---

## Error Responses

### Validation Error (422)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "name": ["The name field is required."],
    "email": ["The email must be valid."]
  }
}
```

### Unauthorized (401)

```json
{
  "success": false,
  "message": "Unauthenticated"
}
```

### Forbidden (403)

```json
{
  "success": false,
  "message": "Access denied"
}
```

### Not Found (404)

```json
{
  "success": false,
  "message": "Resource not found"
}
```

### Server Error (500)

```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Image Handling

### Upload Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "product_images": [
      {
        "id": 1,
        "image_path": "products/abc123.jpg",
        "image_url": "http://localhost:8000/storage/products/abc123.jpg"
      }
    ]
  }
}
```

### Image URL Helper

```javascript
import { getImageUrl } from "@/utils/imageHelpers";

// Automatic conversion
const fullUrl = getImageUrl("products/image.jpg");
// Returns: http://localhost:8000/storage/products/image.jpg
```

---

## Pagination Format

Standard pagination response:

```json
{
  "data": [...items],
  "current_page": 1,
  "from": 1,
  "to": 10,
  "last_page": 5,
  "per_page": 10,
  "total": 50,
  "links": {
    "first": "...",
    "last": "...",
    "prev": null,
    "next": "..."
  }
}
```

---

## Request Examples

### Using API Service

```jsx
import { getProducts, getProductById } from "@/api/product.api";

// Get products
const response = await getProducts({
  page: 1,
  perPage: 10,
  categoryId: 1,
  search: "chair",
});

// Get detail
const product = await getProductById(5);
```

### Direct Axios

```javascript
import api from "@/api/axios";

const response = await api.get("/products", {
  params: { page: 1, per_page: 10 },
});
```

---

## Rate Limiting

Backend implements rate limiting. If exceeded:

- **Status:** 429 Too Many Requests
- **Header:** `Retry-After: {seconds}`

Frontend automatically logs this error via interceptor.
