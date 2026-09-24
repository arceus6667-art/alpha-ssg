import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';

export default function EmptyState({
  title = "No results found",
  message = "We couldn't find any items matching your current filters or search terms.",
  onReset,
  resetLabel = "Reset Filters",
  icon: Icon = SearchX,
  className = ""
}) {
  return (
    <div className={`rounded-xl border border-dashed border-slate-300 bg-white/70 p-10 text-center ${className}`}>
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
        <Icon size={26} />
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
        {message}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <RefreshCw size={13} />
          {resetLabel}
        </button>
      )}
    </div>
  );
}
