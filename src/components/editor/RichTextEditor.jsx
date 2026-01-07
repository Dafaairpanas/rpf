import React, { useState, useEffect, useRef, useCallback } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  Font,
  Paragraph,
  Heading,
  Link,
  List,
  BlockQuote,
  CodeBlock,
  Code,
  Alignment,
  Indent,
  IndentBlock,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageResize,
  ImageInsert,
  ImageBlock,
  ImageInline,
  LinkImage,
  Table,
  TableToolbar,
  TableProperties,
  TableCellProperties,
  MediaEmbed,
  Undo,
  Highlight,
  HorizontalLine,
  RemoveFormat,
  SourceEditing,
  GeneralHtmlSupport,
  WordCount,
  AutoLink,
  PasteFromOffice,
  Base64UploadAdapter,
} from "ckeditor5";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  Check,
  X,
  ImageIcon,
  RefreshCw,
} from "lucide-react";
import "ckeditor5/ckeditor5.css";

// ============================================================================
// INLINE IMAGE TOOLBAR
// ============================================================================

const ImageToolbarPopup = ({
  visible,
  position,
  width,
  align,
  onWidthChange,
  onAlignChange,
  onDelete,
  onApply,
  onClose,
  onChangeImage,
}) => {
  if (!visible) return null;

  const alignOptions = [
    { value: "float-left", icon: AlignLeft, label: "Wrap L" },
    { value: "left", icon: AlignLeft, label: "Kiri" },
    { value: "center", icon: AlignCenter, label: "Tengah" },
    { value: "right", icon: AlignRight, label: "Kanan" },
    { value: "float-right", icon: AlignRight, label: "Wrap R" },
  ];

  const isWrap = align.includes("float");
  const presets = isWrap ? [25, 33, 50] : [50, 75, 100];

  const handleClick = (e, callback) => {
    e.preventDefault();
    e.stopPropagation();
    callback();
  };

  return (
    <div
      className="absolute z-[9999] bg-white rounded-xl shadow-2xl border p-4 w-72"
      style={{
        top: position.top,
        left: position.left,
        transform: "translateX(-50%)",
      }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-semibold text-gray-700">
            Edit Gambar
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => handleClick(e, onClose)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      {/* Change Image Button */}
      <button
        type="button"
        onClick={(e) => handleClick(e, onChangeImage)}
        className="w-full flex items-center justify-center gap-2 mb-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-medium transition"
      >
        <RefreshCw className="w-3.5 h-3.5" /> Ubah Gambar
      </button>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-gray-600">Lebar</span>
          <span className="text-xs font-bold text-[#3C2F26] bg-amber-50 px-2 py-0.5 rounded">
            {width}%
          </span>
        </div>
        <input
          type="range"
          min="20"
          max="100"
          value={width}
          onChange={(e) => onWidthChange(Number(e.target.value))}
          onMouseDown={(e) => e.stopPropagation()}
          className="w-full h-1.5 bg-gray-200 rounded-full cursor-pointer"
        />
        <div className="flex gap-1.5 mt-2">
          {presets.map((val) => (
            <button
              type="button"
              key={val}
              onClick={(e) => handleClick(e, () => onWidthChange(val))}
              className={`flex-1 py-1.5 text-xs rounded-lg font-medium ${width === val ? "bg-[#3C2F26] text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}
            >
              {val}%
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <span className="text-xs font-medium text-gray-600 block mb-2">
          Posisi
        </span>
        <div className="grid grid-cols-5 gap-1">
          {alignOptions.map(({ value, icon: Icon, label }) => (
            <button
              type="button"
              key={value}
              onClick={(e) => handleClick(e, () => onAlignChange(value))}
              className={`flex flex-col items-center py-2 rounded-lg transition-all ${align === value ? "bg-[#3C2F26] text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-600"}`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span className="text-[9px] mt-1">{label}</span>
            </button>
          ))}
        </div>
        {isWrap && (
          <p className="text-[10px] text-amber-600 mt-2 text-center">
            💡 Untuk wrap, gunakan lebar 25-50%
          </p>
        )}
      </div>

      <div className="flex gap-2 pt-3 border-t">
        <button
          type="button"
          onClick={(e) => handleClick(e, onDelete)}
          className="flex items-center justify-center gap-1 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg text-xs font-medium"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Hapus
        </button>
        <button
          type="button"
          onClick={(e) => handleClick(e, onApply)}
          className="flex-1 flex items-center justify-center gap-1 py-2 bg-[#3C2F26] text-white rounded-lg hover:bg-[#52453B] text-xs font-medium shadow-sm"
        >
          <Check className="w-3.5 h-3.5" />
          Terapkan
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// RICH TEXT EDITOR
// ============================================================================

const RichTextEditor = ({
  value,
  onChange,
  height = 400,
  placeholder = "Tulis konten di sini...",
}) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [ready, setReady] = useState(false);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const contentRef = useRef(value || "");

  const [toolbar, setToolbar] = useState({
    visible: false,
    position: { top: 0, left: 0 },
    figure: null,
    width: 100,
    align: "center",
  });

  const config = {
    plugins: [
      Essentials,
      Bold,
      Italic,
      Underline,
      Strikethrough,
      Subscript,
      Superscript,
      Font,
      Paragraph,
      Heading,
      Link,
      AutoLink,
      List,
      BlockQuote,
      CodeBlock,
      Code,
      Alignment,
      Indent,
      IndentBlock,
      Image,
      ImageToolbar,
      ImageCaption,
      ImageResize,
      ImageInsert,
      ImageBlock,
      ImageInline,
      LinkImage,
      Table,
      TableToolbar,
      TableProperties,
      TableCellProperties,
      MediaEmbed,
      Undo,
      Highlight,
      HorizontalLine,
      RemoveFormat,
      SourceEditing,
      GeneralHtmlSupport,
      WordCount,
      PasteFromOffice,
      Base64UploadAdapter,
    ],
    toolbar: {
      items: [
        "undo",
        "redo",
        "|",
        "heading",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "|",
        "outdent",
        "indent",
        "|",
        "link",
        "insertImage",
        "insertTable",
        "mediaEmbed",
        "blockQuote",
        "codeBlock",
        "|",
        "highlight",
        "horizontalLine",
        "|",
        "removeFormat",
        "sourceEditing",
      ],
      shouldNotGroupWhenFull: false,
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
      ],
    },
    fontSize: { options: [10, 12, 14, "default", 18, 20, 24, 28, 32] },
    fontFamily: {
      options: [
        "default",
        "Arial, Helvetica, sans-serif",
        "Georgia, serif",
        "Times New Roman, Times, serif",
        "Verdana, Geneva, sans-serif",
      ],
    },
    image: {
      insert: { type: "auto", integrations: ["upload", "url"] },
      toolbar: ["imageTextAlternative", "toggleImageCaption", "linkImage"],
    },
    table: { contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"] },
    link: {
      decorators: {
        openInNewTab: {
          mode: "manual",
          label: "Open in new tab",
          defaultValue: true,
          attributes: { target: "_blank", rel: "noopener noreferrer" },
        },
      },
    },
    placeholder,
    htmlSupport: {
      allow: [{ name: /.*/, attributes: true, classes: true, styles: true }],
    },
    wordCount: {
      onUpdate: (stats) => {
        setWordCount(stats.words);
        setCharCount(stats.characters);
      },
    },
    licenseKey: "GPL",
  };

  const parseStyle = (style) => {
    const widthMatch = style.match(/width:\s*(\d+)%/);
    const width = widthMatch ? parseInt(widthMatch[1]) : 100;
    let align = "center";
    if (style.includes("float: left") || style.includes("float:left"))
      align = "float-left";
    else if (style.includes("float: right") || style.includes("float:right"))
      align = "float-right";
    else if (
      style.includes("margin-left: 0") ||
      style.includes("margin-left:0")
    )
      align = "left";
    else if (
      style.includes("margin-right: 0") ||
      style.includes("margin-right:0")
    )
      align = "right";
    return { width, align };
  };

  const buildStyle = (width, align) => {
    const positions = {
      "float-left": "float: left; margin-right: 1.5em; margin-bottom: 1em;",
      "float-right": "float: right; margin-left: 1.5em; margin-bottom: 1em;",
      left: "margin-left: 0; margin-right: auto;",
      right: "margin-left: auto; margin-right: 0;",
      center: "margin-left: auto; margin-right: auto;",
    };
    return `width: ${width}%; display: block; ${positions[align] || positions.center}`;
  };

  const handleClick = useCallback(
    (e) => {
      const img = e.target.closest("img");
      const figure = e.target.closest("figure.image");
      if (img && figure) {
        const rect = containerRef.current?.getBoundingClientRect();
        const imgRect = img.getBoundingClientRect();
        const { width, align } = parseStyle(figure.getAttribute("style") || "");
        if (rect) {
          setToolbar({
            visible: true,
            position: {
              top: imgRect.top - rect.top - 10,
              left: imgRect.left - rect.left + imgRect.width / 2,
            },
            figure,
            width,
            align,
          });
        }
      } else if (toolbar.visible) {
        setToolbar((t) => ({ ...t, visible: false }));
      }
    },
    [toolbar.visible],
  );

  const applyChanges = useCallback(() => {
    if (!editorRef.current || !toolbar.figure) return;
    const html = editorRef.current.getData();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const targetSrc = toolbar.figure.querySelector("img")?.src;
    doc.querySelectorAll("figure.image").forEach((fig) => {
      if (fig.querySelector("img")?.src === targetSrc)
        fig.setAttribute("style", buildStyle(toolbar.width, toolbar.align));
    });
    const newHtml = doc.body.innerHTML;
    editorRef.current.setData(newHtml);
    contentRef.current = newHtml;
    onChange?.(newHtml);
    setToolbar((t) => ({ ...t, visible: false }));
  }, [toolbar, onChange]);

  const deleteImage = useCallback(() => {
    if (!editorRef.current || !toolbar.figure) return;
    const html = editorRef.current.getData();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const targetSrc = toolbar.figure.querySelector("img")?.src;
    doc.querySelectorAll("figure.image").forEach((fig) => {
      if (fig.querySelector("img")?.src === targetSrc) fig.remove();
    });
    const newHtml = doc.body.innerHTML;
    editorRef.current.setData(newHtml);
    contentRef.current = newHtml;
    onChange?.(newHtml);
    setToolbar((t) => ({ ...t, visible: false }));
  }, [toolbar, onChange]);

  const changeImage = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file || !editorRef.current || !toolbar.figure) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        const html = editorRef.current.getData();
        const doc = new DOMParser().parseFromString(html, "text/html");
        const targetSrc = toolbar.figure.querySelector("img")?.src;

        doc.querySelectorAll("figure.image img").forEach((img) => {
          if (img.src === targetSrc) img.src = base64;
        });

        const newHtml = doc.body.innerHTML;
        editorRef.current.setData(newHtml);
        contentRef.current = newHtml;
        onChange?.(newHtml);
        setToolbar((t) => ({ ...t, visible: false }));
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    },
    [toolbar, onChange],
  );

  useEffect(() => {
    const handler = (e) => {
      if (
        toolbar.visible &&
        !e.target.closest(".image-toolbar-popup") &&
        !e.target.closest("figure.image")
      ) {
        setToolbar((t) => ({ ...t, visible: false }));
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [toolbar.visible]);

  return (
    <div
      ref={containerRef}
      className="rich-text-editor border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white relative"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <CKEditor
        editor={ClassicEditor}
        config={config}
        data={value || ""}
        onReady={(editor) => {
          editorRef.current = editor;
          setReady(true);
          editor.editing.view.change((w) =>
            w.setStyle(
              "min-height",
              `${height}px`,
              editor.editing.view.document.getRoot(),
            ),
          );
          editor.ui.view.editable.element?.addEventListener(
            "click",
            handleClick,
          );
        }}
        onChange={(_, editor) => {
          const data = editor.getData();
          contentRef.current = data;
          onChange?.(data);
        }}
      />

      <div className="image-toolbar-popup">
        <ImageToolbarPopup
          visible={toolbar.visible}
          position={toolbar.position}
          width={toolbar.width}
          align={toolbar.align}
          onWidthChange={(w) => setToolbar((t) => ({ ...t, width: w }))}
          onAlignChange={(a) => setToolbar((t) => ({ ...t, align: a }))}
          onDelete={deleteImage}
          onApply={applyChanges}
          onClose={() => setToolbar((t) => ({ ...t, visible: false }))}
          onChangeImage={changeImage}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-100 text-xs text-amber-700">
        <span>
          💡 <span className="font-medium">Tip:</span> Klik gambar untuk
          resize, posisi, atau ubah gambar
        </span>
      </div>

      <div className="flex justify-between px-4 py-2 bg-gray-50 border-t text-xs text-gray-500">
        <span>
          {wordCount} kata · {charCount} karakter
        </span>
        <span>{ready ? "✓ Siap" : "Loading..."}</span>
      </div>

      <style>{`
        .rich-text-editor .ck.ck-editor__editable { min-height: ${height}px; font-size: 16px; line-height: 1.7; }
        .rich-text-editor .ck.ck-editor__editable:focus { border-color: #3C2F26 !important; box-shadow: 0 0 0 2px rgba(60,47,38,0.1) !important; }
        .rich-text-editor .ck.ck-toolbar { border: none !important; border-bottom: 1px solid #e5e7eb !important; background: #f9fafb !important; }
        .rich-text-editor .ck.ck-editor__main > .ck-editor__editable { border: none !important; }
        .rich-text-editor .ck.ck-content img { max-width: 100%; cursor: pointer; transition: box-shadow .2s; }
        .rich-text-editor .ck.ck-content img:hover { box-shadow: 0 0 0 3px rgba(60,47,38,0.3); }
        .rich-text-editor .ck.ck-content figure.image { margin: 1em 0; }
        .rich-text-editor .ck.ck-content blockquote { border-left: 4px solid #3C2F26; padding-left: 16px; color: #6b7280; font-style: italic; }
        .rich-text-editor .ck.ck-content pre { background: #1e1e1e; color: #d4d4d4; border-radius: 8px; padding: 16px; }
        .rich-text-editor .ck.ck-button.ck-on { background: #3C2F26 !important; color: white !important; }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
