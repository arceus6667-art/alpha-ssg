import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, User } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { handleApplicationRedirect } from '../utils/applicationTracker';

export default function WorkshopCard({ workshop, featured = false }) {
  if (!workshop) return null;

  const handleRegisterClick = (e) => {
    e.preventDefault();
    handleApplicationRedirect({
      internshipSlug: `workshop-${workshop.slug}`,
      internshipName: `Workshop: ${workshop.title}`,
      sourcePage: window.location.pathname,
    });
  };

  const isCompleted = workshop.status === 'completed';

  return (
    <div
      className={`group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md ${
        featured ? 'ring-1 ring-emerald-500/30' : ''
      }`}
    >
      <div>
        {/* Workshop Banner */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <img
            src={workshop.coverImage}
            alt={workshop.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          
          <div className="absolute top-3 left-3">
            <StatusBadge status={workshop.status} />
          </div>

          {workshop.badge && (
            <div className="absolute top-3 right-3 rounded-full bg-emerald-700/90 backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-xs">
              {workshop.badge}
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3 text-white text-xs flex items-center justify-between">
            <span className="font-semibold flex items-center gap-1">
              <Calendar size={13} />
              {workshop.date}
            </span>
            <span className="opacity-90 flex items-center gap-1">
              <Clock size={13} />
              {workshop.duration}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <MapPin size={13} className="text-emerald-600" />
            <span>{workshop.mode}</span>
            <span>•</span>
            <span>{workshop.startTime}</span>
          </div>

          <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2">
            <Link to={`/workshops/${workshop.slug}`}>
              {workshop.title}
            </Link>
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {workshop.description}
          </p>

          {/* Speaker Pill */}
          {workshop.speaker && (
            <div className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg bg-slate-50 border border-slate-100 mb-4">
              <img
                src={workshop.speaker.avatar}
                alt={workshop.speaker.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-200"
              />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-800 truncate">
                  {workshop.speaker.name}
                </span>
                <span className="block text-[11px] text-slate-500 truncate">
                  {workshop.speaker.role}
                </span>
              </div>
            </div>
          )}

          {/* Topics Bullet Preview */}
          {workshop.topics && workshop.topics.length > 0 && (
            <div className="space-y-1 mb-4">
              {workshop.topics.slice(0, 2).map((topic, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span className="truncate">{topic}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2.5">
        {!isCompleted ? (
          <button
            type="button"
            onClick={handleRegisterClick}
            className="flex-1 py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs rounded-md transition-colors text-center cursor-pointer"
          >
            Register Now
          </button>
        ) : (
          <span className="flex-1 py-2 px-3 text-xs font-semibold text-slate-400 bg-slate-100 rounded-md text-center">
            Session Concluded
          </span>
        )}

        <Link
          to={`/workshops/${workshop.slug}`}
          className="inline-flex items-center justify-center gap-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors"
        >
          Details
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
