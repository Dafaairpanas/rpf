import React from 'react';
import { Search, Edit, Trash2, Plus, Eye, MoreVertical } from 'lucide-react';

/**
 * AdminTable component - FULLY RESPONSIVE
 * Mobile: Card-based layout
 * Desktop: Traditional table layout
 */
const AdminTable = React.memo(function AdminTable({ 
  title,
  subtitle,
  icon,
  data, 
  columns, 
  onEdit, 
  onDelete,
  onView,
  onAdd,
  addButtonText,
  searchTerm, 
  onSearchChange,
  loading,
  filters = null,
  titleFilter = null
}) {
  const hasActions = onEdit || onDelete || onView;

  // Loading State
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-10 h-10 border-3 border-[#3C2F26]/20 border-t-[#3C2F26] rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">Loading data...</p>
    </div>
  );

  // Empty State
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 gap-2">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <Search size={24} className="text-gray-300" />
      </div>
      <p className="text-gray-400 text-sm italic">No records found</p>
    </div>
  );

  // Action Buttons Component
  const ActionButtons = ({ item, variant = 'row' }) => (
    <div className={`flex items-center justify-end ${variant === 'card' ? 'gap-2' : 'gap-1'}`}>
      {onView && (
        <button
          onClick={() => onView(item)}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-lg transition active:scale-95 cursor-pointer"
          title="View Details"
        >
          <Eye size={18} />
        </button>
      )}
      {onEdit && (
        <button
          onClick={() => onEdit(item)}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-[#3C2F26] hover:bg-[#3C2F26]/10 rounded-lg transition active:scale-95 cursor-pointer"
          title="Edit"
        >
          <Edit size={18} />
        </button>
      )}
      {onDelete && (
        <button
          onClick={() => onDelete(item.id)}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition active:scale-95 cursor-pointer"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      )}
    </div>
  );

  // Mobile Card View
  const MobileCardItem = ({ item, idx }) => (
    <div 
      key={item.id || idx}
      className="bg-white rounded-xl border border-gray-100 p-4 space-y-3 shadow-sm"
    >
      {/* Card Content - Render all columns */}
      <div className="space-y-2">
        {columns.map((col, colIdx) => (
          <div key={col.key} className={colIdx === 0 ? '' : 'flex justify-between items-start gap-2'}>
            {colIdx === 0 ? (
              // First column - primary content, larger
              <div className="font-semibold text-[#3C2F26]">
                {col.render ? col.render(item) : (item[col.key] || '-')}
              </div>
            ) : (
              // Other columns - label: value format
              <>
                <span className="text-xs text-gray-400 uppercase tracking-wide shrink-0">
                  {col.label}
                </span>
                <div className="text-right text-sm text-[#3C2F26]">
                  {col.render ? col.render(item) : (item[col.key] || '-')}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Card Actions */}
      {hasActions && (
        <div className="flex justify-end pt-2 border-t border-gray-50">
          <ActionButtons item={item} variant="card" />
        </div>
      )}
    </div>
  );

  // Desktop Table Row
  const DesktopTableRow = ({ item, idx }) => (
    <tr key={item.id || idx} className="hover:bg-gray-50/50 transition">
      {columns.map((col) => (
        <td key={col.key} className="px-4 py-4 text-[#3C2F26]">
          {col.render ? col.render(item) : (item[col.key] || '-')}
        </td>
      ))}
      {hasActions && (
        <td className="px-4 py-4 text-right">
          <ActionButtons item={item} variant="row" />
        </td>
      )}
    </tr>
  );

  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:gap-3">
        {/* Title Row - Title + Add Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon && <div className="p-2 bg-white rounded-xl shadow-sm shrink-0">{icon}</div>}
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-[#3C2F26] truncate">{title}</h1>
              {subtitle && <p className="text-[10px] sm:text-xs text-gray-400 truncate">{subtitle}</p>}
            </div>
          </div>
          {onAdd && (
            <button
              onClick={onAdd}
              className="min-h-[40px] sm:min-h-[44px] flex items-center justify-center bg-[#3C2F26] text-white px-3 sm:px-4 py-2 rounded-xl shadow hover:bg-[#2a1f18] transition active:scale-95 text-xs sm:text-sm font-medium cursor-pointer shrink-0"
            >
              <Plus size={16} className="sm:mr-1.5" /> 
              <span className="inline">{addButtonText || `Add ${title.endsWith('s') ? title.slice(0, -1) : title}`}</span>
            </button>
          )}
        </div>
        
        {/* Title Filter - Horizontal Scroll on Mobile */}
        {titleFilter && (
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            <div className="flex items-center gap-2 min-w-max py-0.5">
              {titleFilter}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="p-2 sm:p-3 border-b border-gray-100 bg-gray-50/50">
          <div className="flex flex-col gap-2">
            {onSearchChange !== undefined && (
              <div className="relative w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder={`Search ${title.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3C2F26]/20 text-xs sm:text-sm min-h-[40px] sm:min-h-[44px]"
                />
              </div>
            )}
            {filters && <div className="w-full flex items-center gap-2 flex-wrap">{filters}</div>}
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <LoadingState />
        ) : data.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* MOBILE: Card Layout (hidden on md+) */}
            <div className="md:hidden p-3 space-y-3">
              {data.map((item, idx) => (
                <MobileCardItem key={item.id || idx} item={item} idx={idx} />
              ))}
            </div>

            {/* DESKTOP: Table Layout (hidden below md) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key} className="px-4 py-4 text-left whitespace-nowrap">
                        {col.label}
                      </th>
                    ))}
                    {hasActions && (
                      <th className="px-4 py-4 text-right">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.map((item, idx) => (
                    <DesktopTableRow key={item.id || idx} item={item} idx={idx} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default AdminTable;
