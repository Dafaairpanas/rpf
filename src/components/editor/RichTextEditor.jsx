import React, { useMemo, useRef, useCallback, useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import QuillResizeImage from 'quill-resize-image';
import BlotFormatter from 'quill-blot-formatter';

// Register modules
Quill.register('modules/resize', QuillResizeImage);
Quill.register('modules/blotFormatter', BlotFormatter);

// Custom Link - open in new tab
const Link = Quill.import('formats/link');
class CustomLink extends Link {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
    return node;
  }
}
Quill.register(CustomLink, true);

const RichTextEditor = ({ value, onChange, height = 400, placeholder = "Tulis konten di sini..." }) => {
  const quillRef = useRef(null);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  // Handle content change
  const handleChange = useCallback((content, delta, source, editor) => {
    const text = editor.getText();
    setCharCount(text.length > 1 ? text.length - 1 : 0);
    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    if (onChange) onChange(content);
  }, [onChange]);

  // Custom image handler with file size check
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran gambar maksimal 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const quill = quillRef.current?.getEditor();
        if (quill) {
          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, 'image', reader.result);
          quill.setSelection(range.index + 1);
        }
      };
      reader.readAsDataURL(file);
    };
  }, []);

  // Custom video handler for YouTube/Vimeo
  const videoHandler = useCallback(() => {
    const url = prompt('Masukkan URL video (YouTube/Vimeo):');
    if (!url) return;
    const quill = quillRef.current?.getEditor();
    if (!quill) return;
    
    let embedUrl = url;
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      if (videoId) embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      if (videoId) embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }
    
    const range = quill.getSelection(true);
    quill.insertEmbed(range.index, 'video', embedUrl);
    quill.setSelection(range.index + 1);
  }, []);

  // Full modules config
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean'],
      ],
      handlers: { image: imageHandler, video: videoHandler }
    },
    clipboard: { matchVisual: false },
    history: { delay: 1000, maxStack: 100, userOnly: true },
    resize: { locale: { center: 'Center' } },
    blotFormatter: {},
  }), [imageHandler, videoHandler]);

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'script', 'list', 'bullet', 'indent', 'check',
    'direction', 'align', 'blockquote', 'code-block', 'link', 'image', 'video',
    'width', 'height', 'style', 'alt', 'code',
  ];

  useEffect(() => {
    if (value) {
      const temp = document.createElement('div');
      temp.innerHTML = value;
      const text = temp.textContent || '';
      setCharCount(text.length);
      setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
    }
  }, []);

  return (
    <div className="rich-text-editor border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ''}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        style={{ height: `${height}px` }}
        placeholder={placeholder}
      />
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        <div className="flex gap-4">
          <span>{wordCount} kata</span>
          <span>{charCount} karakter</span>
        </div>
        <span className="text-[10px] text-gray-400">Ctrl+B Bold • Ctrl+I Italic • Ctrl+U Underline • Ctrl+Z Undo</span>
      </div>
      <style>{`
        .rich-text-editor .ql-toolbar{border:none!important;border-bottom:1px solid #e5e7eb!important;background:#f9fafb!important;padding:10px!important;flex-wrap:wrap}
        .rich-text-editor .ql-container{border:none!important;font-size:16px}
        .rich-text-editor .ql-editor{min-height:${height-100}px;padding:20px;line-height:1.8}
        .rich-text-editor .ql-editor img{max-width:100%;cursor:pointer;border-radius:8px;margin:8px 0}
        .rich-text-editor .ql-editor.ql-blank::before{color:#9ca3af;font-style:normal}
        .rich-text-editor .ql-snow button:hover .ql-stroke{stroke:#3C2F26}
        .rich-text-editor .ql-snow button.ql-active .ql-stroke{stroke:#3C2F26}
        .rich-text-editor .ql-toolbar button{padding:5px;margin:1px;border-radius:6px}
        .rich-text-editor .ql-toolbar button:hover{background:#e5e7eb}
        .rich-text-editor .ql-editor pre.ql-syntax{background:#1e1e1e;color:#d4d4d4;border-radius:8px;padding:16px;font-family:monospace;font-size:14px}
        .rich-text-editor .ql-editor blockquote{border-left:4px solid #3C2F26;padding-left:16px;color:#6b7280;font-style:italic}
        .rich-text-editor .ql-editor .ql-video{width:100%;max-width:640px;height:360px;border-radius:8px;margin:16px 0}
        .rich-text-editor .ql-editor a{color:#3C2F26;text-decoration:underline}
        .blot-formatter__overlay{border:2px solid #3C2F26!important}
        .blot-formatter__resize-handle{background:#3C2F26!important;border-radius:50%!important}
      `}</style>
    </div>
  );
};

export default RichTextEditor;
