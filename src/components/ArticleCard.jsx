import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md">
      <div>
        {/* Cover Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          <img
            src={article.coverImage}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-slate-800 shadow-xs border border-slate-200/60 backdrop-blur-xs">
              {article.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {article.publishedAt}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {article.readingTime}
            </span>
          </div>

          <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2 leading-snug">
            <Link to={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {article.excerpt}
          </p>

          {/* Author */}
          {article.author && (
            <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-200"
              />
              <div className="min-w-0">
                <span className="block text-xs font-bold text-slate-800 truncate">
                  {article.author.name}
                </span>
                <span className="block text-[10px] text-slate-400 truncate">
                  {article.author.role}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0 mt-2">
        <Link
          to={`/articles/${article.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
        >
          Read Full Article
          <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
