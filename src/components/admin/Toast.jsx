import React, { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

let addToastFunction = null;

export function showToast(message, type = 'success', duration = 3500) {
  if (addToastFunction) {
    addToastFunction({ id: Date.now(), message, type, duration });
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    addToastFunction = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, toast.duration);
    };

    return () => {
      addToastFunction = null;
    };
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let borderStyles = 'border-emerald-200 bg-emerald-50 text-emerald-900';
        let IconComponent = CheckCircle2;

        if (toast.type === 'error') {
          borderStyles = 'border-red-200 bg-red-50 text-red-900';
          IconComponent = AlertCircle;
        } else if (toast.type === 'info') {
          borderStyles = 'border-blue-200 bg-blue-50 text-blue-900';
          IconComponent = Info;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 p-3.5 rounded-xl border shadow-lg transition-all animate-in slide-in-from-bottom-2 ${borderStyles}`}
          >
            <IconComponent size={18} className="shrink-0" />
            <span className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
              {toast.message}
            </span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
