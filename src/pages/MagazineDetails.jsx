import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Download,
  Share2,
  FileText,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import SEO from '../components/SEO';
import { contentService } from '../services/contentService';

export default function MagazineDetails() {
  const { slug } = useParams();
  const issue = contentService.getMagazine(slug);

  if (!issue) {
    return <Navigate to="/magazine" replace />;
  }

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      <SEO
        title={`${issue.title} - ${issue.edition}`}
        description={issue.description}
      />

      {/* Header */}
      <div className="bg-slate-950 text-white pt-8 pb-14 border-b border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/magazine"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to All Editions</span>
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
              <BookOpen size={13} />
              {issue.edition}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {issue.issueNumber}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4 max-w-4xl leading-tight">
            {issue.title}
          </h1>

          {issue.subtitle && (
            <p className="text-lg text-purple-200/90 max-w-3xl mb-6">
              {issue.subtitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {issue.publicationDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {issue.readTime}
            </span>
            <span>•</span>
            <span>{issue.pageCount} Pages</span>
            <span>•</span>
            <span>{issue.editorInChief}</span>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview & Editor's Note */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                About this Edition
              </h2>
              <p className="text-base text-slate-700 leading-relaxed mb-6">
                {issue.description}
              </p>

              {issue.highlights && (
                <div className="border-t border-slate-100 pt-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Editorial Highlights
                  </h3>
                  <div className="space-y-2">
                    {issue.highlights.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <CheckCircle2 size={16} className="text-purple-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Table of Contents */}
            {issue.tableOfContents && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <FileText size={20} className="text-purple-600" />
                  <span>Table of Contents</span>
                </h2>

                <div className="space-y-3">
                  {issue.tableOfContents.map((entry, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-4 p-3.5 rounded-lg border border-slate-100 bg-slate-50/60 hover:bg-purple-50/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs font-bold text-purple-600 w-8">
                          p. {entry.page}
                        </span>
                        <span className="text-sm font-semibold text-slate-800">
                          {entry.title}
                        </span>
                      </div>
                      <Bookmark size={14} className="text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-lg">
              <img
                src={issue.coverImage}
                alt={issue.title}
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="p-5">
                <span className="block text-xs text-slate-400 mb-1 font-mono uppercase">
                  {issue.edition}
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  {issue.title}
                </h3>
                
                <a
                  href="#download"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("The full PDF edition will download in your browser shortly.");
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  <Download size={15} />
                  <span>Download Digital PDF Edition</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
