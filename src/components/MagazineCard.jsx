import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, ArrowRight, Download, Clock } from 'lucide-react';

export default function MagazineCard({ magazine, featured = false }) {
  if (!magazine) return null;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md ${
        featured ? 'md:grid md:grid-cols-12 md:gap-8' : ''
      }`}
    >
      {/* Cover Artwork / Visual */}
      <div
        className={`relative overflow-hidden bg-slate-900 ${
          featured ? 'md:col-span-5 aspect-[4/5] md:aspect-auto' : 'aspect-[4/3]'
        }`}
      >
        <img
          src={magazine.coverImage}
          alt={magazine.title}
          className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        
        {/* Editorial Pill badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/90 backdrop-blur-md text-[11px] font-bold tracking-wider text-slate-900 uppercase">
            <BookOpen size={12} className="text-emerald-600" />
            {magazine.edition}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <span className="text-xs font-mono tracking-wider opacity-80 uppercase block">
            {magazine.issueNumber}
          </span>
          <span className="text-xs opacity-80 flex items-center gap-1 mt-1">
            <Calendar size={12} />
            {magazine.publicationDate}
          </span>
        </div>
      </div>

      {/* Editorial Content */}
      <div className={`p-6 flex flex-col justify-between ${featured ? 'md:col-span-7' : ''}`}>
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
            <span>{magazine.pageCount} Pages</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {magazine.readTime}
            </span>
          </div>

          <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug mb-2">
            <Link to={`/magazine/${magazine.slug}`}>
              {magazine.title}
            </Link>
          </h3>

          {magazine.subtitle && (
            <h4 className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">
              {magazine.subtitle}
            </h4>
          )}

          <p className="text-sm text-slate-600 leading-relaxed mb-5 line-clamp-3">
            {magazine.description}
          </p>

          {/* Key Topics inside this Edition */}
          {magazine.topics && magazine.topics.length > 0 && (
            <div className="mb-5 space-y-1.5 border-t border-slate-100 pt-3">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Inside this Issue
              </span>
              {magazine.topics.slice(0, 3).map((topic, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span className="truncate">{topic}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Link */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <Link
            to={`/magazine/${magazine.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            Read Issue Highlights
            <ArrowRight size={14} />
          </Link>

          <span className="text-[11px] text-slate-400 font-mono">
            SSG Journal
          </span>
        </div>
      </div>
    </article>
  );
}
