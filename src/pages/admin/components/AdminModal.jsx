import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * AdminModal component - FULLY RESPONSIVE
 * Mobile: Full screen / near full screen
 * Desktop: Centered modal with max-width
 */
const AdminModal = React.memo(function AdminModal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  maxWidth = "max-w-2xl"
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - clickable to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm cursor-pointer"
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[61] flex items-end md:items-center justify-center p-0 md:p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={`
                bg-white shadow-2xl w-full pointer-events-auto
                ${maxWidth}
                /* Mobile: Full width, rounded top, bottom sheet style */
                rounded-t-2xl md:rounded-xl
                max-h-[95vh] md:max-h-[90vh]
                overflow-hidden
                border border-gray-100
              `}
            >
              {/* Header */}
              <div className="bg-[#3C2F26] text-white p-4 flex justify-between items-center sticky top-0 z-10">
                <h2 className="text-base md:text-lg font-bold truncate pr-4">{title}</h2>
                <button 
                  onClick={onClose} 
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-white/20 rounded-xl transition active:scale-95 shrink-0 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drag Handle for Mobile (visual indicator) */}
              <div className="md:hidden flex justify-center py-2 bg-gray-50">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>

              {/* Content */}
              <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-140px)] md:max-h-[calc(90vh-80px)]">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
});

export default AdminModal;
