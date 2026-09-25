import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import MagazineCard from '../components/MagazineCard';
import AntiGravityCanvas from '../components/AntiGravityCanvas';
import { contentService } from '../services/contentService';

export default function Magazine() {
  const [magazines, setMagazines] = useState(() => contentService.getPublicMagazines());

  useEffect(() => {
    const handleUpdate = async () => {
      try {
        await contentService.fetchMagazines();
      } catch (e) {
        // Fallback
      }
      setMagazines(contentService.getPublicMagazines());
    };
    handleUpdate();
    window.addEventListener('ssg:content_changed', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ssg:content_changed', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const featured = magazines[0];
  const previousIssues = magazines.slice(1);

  return (
    <div className="bg-transparent min-h-screen py-12 lg:py-16 relative">

      <SEO
        title="SkillSet Go Tech Journal | Quarterly Publication"
        description="Read research papers, industry breakthroughs, student project case studies, and engineering breakdowns published quarterly."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Editorial Publication"
          title="SkillSet Go Tech Journal"
          description="A quarterly publication exploring autonomous systems, modern cloud resilience, human-centered UI/UX, and student engineering innovations."
        />

        {/* Featured Latest Edition Spotlight */}
        {featured ? (
          <div className="mb-14">
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200/70">
                <Sparkles size={13} className="text-emerald-700" />
                Current Flagship Edition
              </span>
            </div>

            <MagazineCard magazine={featured} featured />
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200 text-slate-500 mb-12">
            No magazine editions have been published yet. Please check back soon!
          </div>
        )}

        {/* Previous Archives / Issues */}
        {previousIssues.length > 0 && (
          <div>
            <div className="border-t border-slate-200 pt-12 mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                Archived Editions & Special Issues
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore previous quarterly editions covering foundational systems, cyber resilience, and UI/UX engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {previousIssues.map(issue => (
                <MagazineCard key={issue.slug || issue.id} magazine={issue} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
