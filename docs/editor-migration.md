# Editor Migration: TinyMCE → Lexical

## Overview

Migrasi berhasil dilakukan dari TinyMCE ke Lexical JS editor.

## Changes Made

### New Files Created

- `src/components/editor/LexicalEditor.jsx` - Main editor component
- `src/components/editor/ToolbarPlugin.jsx` - Custom toolbar with formatting buttons
- `src/components/editor/editorTheme.js` - Tailwind-based theme
- `src/components/editor/index.js` - Export barrel

### Files Modified

- `src/pages/admin/NewsForm.jsx` - Replaced TinyMCE with LexicalEditor
- `src/pages/admin/CsrForm.jsx` - Replaced TinyMCE with LexicalEditor

### Dependencies

**Removed:**

- `@tinymce/tinymce-react`

**Added:**

- `lexical`
- `@lexical/react`
- `@lexical/rich-text`
- `@lexical/list`
- `@lexical/link`
- `@lexical/code`
- `@lexical/history`
- `@lexical/html`
- `@lexical/table`
- `@lexical/selection`
- `@lexical/utils`
- `@lexical/clipboard`

## Usage

```jsx
import { LexicalEditor } from "@/components/editor";

<LexicalEditor
  value={htmlContent}
  onChange={(html) => setContent(html)}
  minHeight="500px"
/>;
```

## Features

- ✅ Bold, Italic, Underline, Strikethrough
- ✅ Headings (H1, H2, H3)
- ✅ Ordered & Unordered Lists
- ✅ Link insertion
- ✅ Image upload (base64)
- ✅ Undo/Redo
- ✅ HTML import/export (backward compatible)

## HTML Compatibility

- Existing HTML content (from TinyMCE) is automatically converted when loaded
- Output is standard HTML, compatible with existing backend

## Image Upload

Now using server endpoint with fallback to base64:

**Endpoint:** `POST /api/v1/upload/image`

**Validation:**

- Allowed types: jpg, jpeg, png, gif, webp
- Max size: 5MB

**Fallback:** If server upload fails, automatically uses base64 embed.

## Rollback

If needed, revert to commit before migration or reinstall:

```bash
npm install @tinymce/tinymce-react
```
