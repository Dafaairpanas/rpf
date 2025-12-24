import React from 'react';
import { ArrowUpDown } from 'lucide-react';

/**
 * Reusable Sort Filter Component
 * @param {string} value - Current sort value
 * @param {function} onChange - Handler for sort change
 */
const SortFilter = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 bg-white px-2 sm:px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
      <ArrowUpDown size={14} className="text-gray-400 shrink-0" />
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-none focus:ring-0 text-xs sm:text-sm font-bold text-[#3C2F26] appearance-none cursor-pointer pr-4"
      >
        <option value="newest">Terbaru</option>
        <option value="oldest">Terlama</option>
        <option value="name">Nama A-Z</option>
      </select>
    </div>
  );
};

export default SortFilter;
