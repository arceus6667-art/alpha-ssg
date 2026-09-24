import React, { useState } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { handleApplicationRedirect } from '../utils/applicationTracker';

export default function ApplyButton({
  internship = {},
  sourcePage = '',
  className = '',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'compact'
  label = 'Apply for Internship',
  showIcon = true,
}) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsRedirecting(true);

    handleApplicationRedirect({
      internshipSlug: internship?.slug || 'general',
      internshipName: internship?.title || 'General Internship Track',
      internshipId: internship?.id || internship?.slug || 'general',
      sourcePage: sourcePage || (typeof window !== 'undefined' ? window.location.pathname : ''),
    });

    // Reset button state after brief delay
    setTimeout(() => {
      setIsRedirecting(false);
    }, 1200);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm';
      case 'outline':
        return 'bg-transparent text-emerald-700 border border-emerald-600 hover:bg-emerald-50';
      case 'compact':
        return 'bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-emerald-700 shadow-xs';
      case 'lime':
        return 'bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-xs';
      case 'primary':
      default:
        return 'button primary';
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${getVariantClasses()} ${className} inline-flex items-center justify-center gap-2 cursor-pointer font-semibold transition-all duration-150`}
      title={`Apply for ${internship?.title || 'Internship'}`}
      disabled={isRedirecting}
    >
      <span>{isRedirecting ? 'Redirecting to Form...' : label}</span>
      {showIcon && (
        isRedirecting ? (
          <ArrowRight size={15} className="animate-pulse" />
        ) : (
          <ExternalLink size={15} className="opacity-90" />
        )
      )}
    </button>
  );
}
