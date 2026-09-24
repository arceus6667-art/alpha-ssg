import React from 'react';

export default function SectionHeader({
  eyebrow,
  title,
  description,
  centered = false,
  className = '',
  action,
}) {
  return (
    <div className={`mb-10 ${centered ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50/80 border border-blue-100 mb-3">
          {eyebrow}
        </div>
      )}
      {title && (
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
          {title}
        </h2>
      )}
      {description && (
        <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
