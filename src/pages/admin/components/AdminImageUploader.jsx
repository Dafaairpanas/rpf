import React from 'react';
import { ImagePlus, X } from 'lucide-react';
import { STORAGE_URL } from '@/config';

const API_BASE_URL = STORAGE_URL.replace('/storage', '');

const getFileUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${cleanPath}`;
};

/**
 * AdminImageUploader component
 * @param {string} label - Input label
 * @param {array|object} existingImages - Current image(s) from server
 * @param {array|object} newImages - Selected file(s) for upload
 * @param {function} onUpload - Handler for file selection
 * @param {function} onRemoveExisting - Handler for removing server image
 * @param {function} onRemoveNew - Handler for removing selected file
 * @param {boolean} multiple - Allow multiple files
 */
export default function AdminImageUploader({ 
  label, 
  existingImages = [], 
  newImages = [], 
  onUpload, 
  onRemoveExisting, 
  onRemoveNew,
  multiple = false
}) {
  // Normalize single image to array for consistent rendering
  const existingArr = Array.isArray(existingImages) ? existingImages : (existingImages ? [existingImages] : []);
  const newArr = Array.isArray(newImages) ? newImages : (newImages ? [newImages] : []);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-gray-500 uppercase tracking-tight">
        {label}
      </label>
      
      {/* Container Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Existing Images */}
        {existingArr.map((img, idx) => (
          <div key={`existing-${idx}`} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-blue-200">
            <img 
              src={getFileUrl(typeof img === 'string' ? img : img.image_url)} 
              alt="existing" 
              className="w-full h-full object-cover"
            />
            {onRemoveExisting && (
              <button
                type="button"
                onClick={() => onRemoveExisting(img.id || img)}
                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            )}
          </div>
        ))}

        {/* New Previews */}
        {newArr.map((file, idx) => (
          <div key={`new-${idx}`} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-green-200">
            <img 
              src={URL.createObjectURL(file)} 
              alt="preview" 
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onRemoveNew(idx)}
              className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
          </div>
        ))}

        {/* Upload Button */}
        {(multiple || (existingArr.length === 0 && newArr.length === 0)) && (
          <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#3C2F26] hover:bg-gray-50 transition drop-shadow-sm group">
            <ImagePlus size={24} className="text-gray-400 group-hover:text-[#3C2F26] transition" />
            <span className="text-[10px] font-bold text-gray-500 mt-2 uppercase">Upload</span>
            <input 
              type="file" 
              multiple={multiple} 
              accept="image/*" 
              onChange={onUpload} 
              className="hidden" 
            />
          </label>
        )}
      </div>
    </div>
  );
}
