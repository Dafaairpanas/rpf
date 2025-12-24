import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
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
  TodoList,
  BlockQuote,
  CodeBlock,
  Code,
  Alignment,
  Indent,
  IndentBlock,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
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
  FullPage,
  WordCount,
  AutoLink,
  PasteFromOffice,
  Base64UploadAdapter
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

const RichTextEditor = ({ value, onChange, height = 400, placeholder = "Tulis konten di sini..." }) => {
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [editorReady, setEditorReady] = useState(false);

  const editorConfig = {
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
      TodoList,
      BlockQuote,
      CodeBlock,
      Code,
      Alignment,
      Indent,
      IndentBlock,
      Image,
      ImageToolbar,
      ImageCaption,
      ImageStyle,
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
      Base64UploadAdapter
    ],
    toolbar: {
      items: [
        'undo', 'redo',
        '|',
        'heading',
        '|',
        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
        '|',
        'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript',
        '|',
        'alignment',
        '|',
        'bulletedList', 'numberedList', 'todoList',
        '|',
        'outdent', 'indent',
        '|',
        'link', 'insertImage', 'insertTable', 'mediaEmbed', 'blockQuote', 'codeBlock',
        '|',
        'highlight', 'horizontalLine',
        '|',
        'removeFormat', 'sourceEditing'
      ],
      shouldNotGroupWhenFull: false
    },
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
      ]
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 24, 28, 32]
    },
    fontFamily: {
      options: [
        'default',
        'Arial, Helvetica, sans-serif',
        'Georgia, serif',
        'Lucida Sans Unicode, Lucida Grande, sans-serif',
        'Tahoma, Geneva, sans-serif',
        'Times New Roman, Times, serif',
        'Trebuchet MS, Helvetica, sans-serif',
        'Verdana, Geneva, sans-serif'
      ]
    },
    image: {
      // Insert image as block by default for better alignment support
      insert: {
        type: 'auto'
      },
      // Image toolbar that appears when clicking on image
      toolbar: [
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        'imageStyle:side',
        '|',
        'imageStyle:alignBlockLeft',
        'imageStyle:alignCenter', 
        'imageStyle:alignBlockRight',
        '|',
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'resizeImage'
      ],
      // Resize configuration
      resizeUnit: '%',
      resizeOptions: [
        { name: 'resizeImage:original', value: null, label: 'Original' },
        { name: 'resizeImage:25', value: '25', label: '25%' },
        { name: 'resizeImage:50', value: '50', label: '50%' },
        { name: 'resizeImage:75', value: '75', label: '75%' },
        { name: 'resizeImage:100', value: '100', label: '100%' }
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn', 'tableRow', 'mergeTableCells',
        'tableProperties', 'tableCellProperties'
      ]
    },
    link: {
      decorators: {
        openInNewTab: {
          mode: 'manual',
          label: 'Open in new tab',
          defaultValue: true,
          attributes: {
            target: '_blank',
            rel: 'noopener noreferrer'
          }
        }
      }
    },
    mediaEmbed: {
      previewsInData: true
    },
    placeholder: placeholder,
    htmlSupport: {
      allow: [
        { name: /.*/, attributes: true, classes: true, styles: true }
      ]
    },
    wordCount: {
      onUpdate: stats => {
        setWordCount(stats.words);
        setCharCount(stats.characters);
      }
    },
    licenseKey: 'GPL'
  };

  return (
    <div className="rich-text-editor border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white">
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={value || ''}
        onReady={editor => {
          setEditorReady(true);
          // Set minimum height
          const editingView = editor.editing.view;
          editingView.change(writer => {
            writer.setStyle('min-height', `${height}px`, editingView.document.getRoot());
          });
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          if (onChange) onChange(data);
        }}
      />

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
        <div className="flex gap-4">
          <span>{wordCount} kata</span>
          <span>{charCount} karakter</span>
        </div>
        <span className="text-[10px] text-gray-400">
          {editorReady ? '✓ Editor siap' : 'Loading...'}
        </span>
      </div>

      {/* Custom Styles */}
      <style>{`
        .rich-text-editor .ck.ck-editor__editable {
          min-height: ${height}px;
          font-size: 16px;
          line-height: 1.7;
        }
        .rich-text-editor .ck.ck-editor__editable:focus {
          border-color: #3C2F26 !important;
          box-shadow: 0 0 0 2px rgba(60, 47, 38, 0.1) !important;
        }
        .rich-text-editor .ck.ck-toolbar {
          border: none !important;
          border-bottom: 1px solid #e5e7eb !important;
          background: #f9fafb !important;
        }
        .rich-text-editor .ck.ck-editor__main > .ck-editor__editable {
          border: none !important;
          border-radius: 0 !important;
        }
        .rich-text-editor .ck.ck-content h1 { font-size: 2em; font-weight: 700; }
        .rich-text-editor .ck.ck-content h2 { font-size: 1.5em; font-weight: 700; }
        .rich-text-editor .ck.ck-content h3 { font-size: 1.25em; font-weight: 600; }
        .rich-text-editor .ck.ck-content img { max-width: 100%; border-radius: 8px; }
        /* Image alignment styles */
        .rich-text-editor .ck.ck-content .image {
          margin: 1em 0;
        }
        .rich-text-editor .ck.ck-content .image.image_resized {
          max-width: 100%;
        }
        .rich-text-editor .ck.ck-content .image.image-style-align-left {
          float: left;
          margin-right: 1.5em;
          margin-bottom: 1em;
        }
        .rich-text-editor .ck.ck-content .image.image-style-align-right {
          float: right;
          margin-left: 1.5em;
          margin-bottom: 1em;
        }
        .rich-text-editor .ck.ck-content .image.image-style-align-center {
          margin-left: auto;
          margin-right: auto;
          display: block;
        }
        .rich-text-editor .ck.ck-content .image.image-style-block-align-left {
          margin-right: auto;
        }
        .rich-text-editor .ck.ck-content .image.image-style-block-align-right {
          margin-left: auto;
        }
        .rich-text-editor .ck.ck-content .image img {
          display: block;
        }
        .rich-text-editor .ck.ck-content blockquote {
          border-left: 4px solid #3C2F26;
          padding-left: 16px;
          color: #6b7280;
          font-style: italic;
        }
        .rich-text-editor .ck.ck-content pre {
          background: #1e1e1e;
          color: #d4d4d4;
          border-radius: 8px;
          padding: 16px;
        }
        .rich-text-editor .ck.ck-content a {
          color: #3C2F26;
          text-decoration: underline;
        }
        .rich-text-editor .ck.ck-button.ck-on {
          background: #3C2F26 !important;
          color: white !important;
        }
        .rich-text-editor .ck.ck-dropdown__button.ck-on {
          background: #3C2F26 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
