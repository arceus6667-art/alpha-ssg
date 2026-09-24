import React from 'react';

export default function StatusBadge({ status, className = '' }) {
  if (!status) return null;

  const normalized = String(status).toLowerCase().trim();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let label = status;

  if (normalized.includes('open') || normalized.includes('registration-open')) {
    styles = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    label = 'Registration Open';
  } else if (normalized.includes('upcoming')) {
    styles = 'bg-teal-50 text-teal-800 border-teal-200';
    label = 'Upcoming';
  } else if (normalized.includes('completed')) {
    styles = 'bg-slate-100 text-slate-500 border-slate-200';
    label = 'Completed';
  } else if (normalized.includes('popular')) {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
    label = 'Most Popular';
  } else if (normalized.includes('trending') || normalized.includes('new')) {
    styles = 'bg-purple-50 text-purple-700 border-purple-200';
    label = status;
  } else if (normalized.includes('soon') || normalized.includes('construction')) {
    styles = 'bg-amber-50 text-amber-700 border-amber-200';
    label = 'Coming Soon';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border ${styles} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
      {label}
    </span>
  );
}
