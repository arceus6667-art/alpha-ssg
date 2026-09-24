import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, MapPin, Sparkles, Code2, Layers, Cpu, Shield, Globe, Database, Palette, Settings, Terminal, BarChart3, Smartphone } from 'lucide-react';
import ApplyButton from './ApplyButton';
import StatusBadge from './StatusBadge';

// Map icon string names to lucide icons safely
const ICON_MAP = {
  Code2,
  Layers,
  Cpu,
  Shield,
  Globe,
  Database,
  Palette,
  Settings,
  Terminal,
  BarChart3,
  Smartphone,
};

export default function InternshipCard({ internship, sourcePage = '' }) {
  if (!internship) return null;

  const IconComponent = (internship.icon && ICON_MAP[internship.icon]) ? ICON_MAP[internship.icon] : Sparkles;
  const skills = Array.isArray(internship.skills) ? internship.skills.slice(0, 4) : [];

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
      <div>
        {/* Top bar: Category + Status Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/80">
            {internship.category || 'Technology'}
          </span>
          <StatusBadge status={internship.status || 'Applications Open'} />
        </div>

        {/* Title & Icon */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-emerald-600 transition-colors group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-700">
            <IconComponent size={22} />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
              <Link to={`/internships/${internship.slug}`}>
                {internship.title}
              </Link>
            </h3>
            {internship.level && (
              <span className="text-xs text-slate-500 font-medium">{internship.level}</span>
            )}
          </div>
        </div>

        {/* Short Description */}
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
          {internship.description}
        </p>

        {/* Metadata Pills: Duration, Mode */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5 font-medium">
            <Clock size={14} className="text-slate-400" />
            <span>{internship.duration || '1 Month'}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 font-medium">
            <MapPin size={14} className="text-slate-400" />
            <span>{internship.mode || 'Remote'}</span>
          </div>
        </div>

        {/* Key Skills */}
        {skills.length > 0 && (
          <div className="mb-5">
            <span className="block text-[11px] font-bold tracking-wider text-slate-400 uppercase mb-2">
              Key Skills
            </span>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, index) => {
                const skillName = typeof skill === 'string' ? skill : skill.name;
                return (
                  <span
                    key={index}
                    className="inline-block rounded-md bg-slate-100/80 px-2 py-1 text-[11px] font-medium text-slate-700 border border-slate-200/60"
                  >
                    {skillName}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Dual CTA: Apply Button + Learn More */}
      <div className="pt-2 flex items-center gap-2.5">
        <ApplyButton
          internship={internship}
          sourcePage={sourcePage || `/internships`}
          label="Apply Now"
          className="flex-1 text-xs py-2"
        />
        <Link
          to={`/internships/${internship.slug}`}
          className="inline-flex items-center justify-center gap-1 text-xs font-semibold px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          title={`View syllabus for ${internship.title}`}
        >
          Details
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
