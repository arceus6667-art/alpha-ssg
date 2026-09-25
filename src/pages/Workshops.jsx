import React, { useState, useEffect, useMemo } from 'react';
import { Search, Layers, Calendar, Clock, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import WorkshopCard from '../components/WorkshopCard';
import EmptyState from '../components/EmptyState';
import AntiGravityCanvas from '../components/AntiGravityCanvas';
import { contentService } from '../services/contentService';

export default function Workshops() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [workshops, setWorkshops] = useState(() => contentService.getPublicWorkshops());

  useEffect(() => {
    const handleUpdate = async () => {
      try {
        await contentService.fetchWorkshops();
      } catch (e) {
        // Fallback
      }
      setWorkshops(contentService.getPublicWorkshops());
    };
    handleUpdate();
    window.addEventListener('ssg:content_changed', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ssg:content_changed', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const filteredWorkshops = useMemo(() => {
    return workshops.filter(item => {
      // Filter tab
      let matchesTab = true;
      if (activeFilter === 'upcoming') {
        matchesTab = item.status === 'upcoming' || item.status === 'registration-open';
      } else if (activeFilter === 'completed') {
        matchesTab = item.status === 'completed';
      }

      // Search query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.speaker && item.speaker.name && item.speaker.name.toLowerCase().includes(query)) ||
        (Array.isArray(item.topics) &&
          item.topics.some(t => t.toLowerCase().includes(query)));

      return matchesTab && matchesSearch;
    });
  }, [workshops, activeFilter, searchQuery]);

  return (
    <div className="bg-transparent min-h-screen py-12 lg:py-16 relative">

      <SEO
        title="Live Technical Workshops & Masterclasses | SkillSet Go"
        description="Hands-on weekend masterclasses on AI Agents, Kubernetes, Next.js, Ethical Hacking, and Mechatronics led by industry specialists."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Hands-On Masterclasses"
          title="Technical Workshops & Live Bootcamps"
          description="Intensive live learning sessions focused on trending tools, practical architecture, and production deployments."
        />

        {/* Filter & Search Bar */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search workshops, speakers, topics (e.g. Gemini, DevOps, React)..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'all'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Sessions ({workshops.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('upcoming')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'upcoming'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Upcoming / Open
              </button>

              <button
                type="button"
                onClick={() => setActiveFilter('completed')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === 'completed'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Past Workshops
              </button>
            </div>
          </div>
        </div>

        {/* Workshop Cards Grid */}
        {filteredWorkshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map(workshop => (
              <WorkshopCard key={workshop.slug || workshop.id} workshop={workshop} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Workshops Found"
            message={`No workshops matched "${searchQuery}". Try searching with different keywords or switching status tabs.`}
            onReset={() => {
              setActiveFilter('all');
              setSearchQuery('');
            }}
          />
        )}
      </div>
    </div>
  );
}
