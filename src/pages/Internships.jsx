import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import InternshipCard from '../components/InternshipCard';
import EmptyState from '../components/EmptyState';
import { internships, categories } from '../data/internships';

export default function Internships() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all categories safely
  const allCategories = useMemo(() => {
    const set = new Set(['All']);
    if (Array.isArray(categories)) {
      categories.forEach(c => set.add(c));
    }
    internships.forEach(item => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set);
  }, []);

  // Filter internships by category and search
  const filteredInternships = useMemo(() => {
    return internships.filter(item => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (Array.isArray(item.skills) &&
          item.skills.some(s =>
            (typeof s === 'string' ? s : s.name).toLowerCase().includes(query)
          ));

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-transparent min-h-screen py-12 lg:py-16">
      <SEO
        title="Internship Domains (12 Technical Tracks)"
        description="Explore 12 project-based technical internship tracks across Web, AI/ML, Cloud, Cybersecurity, Mechatronics, and Software Engineering."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <SectionHeader
          eyebrow="Cohort Programs"
          title="Project-Based Internship Tracks"
          description="Build verified proof of work through weekly guided milestones, real-world tasks, and comprehensive capstone projects."
        />

        {/* Filter & Search Bar */}
        <div className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-5 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tracks, skills (e.g. React, Python, CAD, Kubernetes)..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            {/* Total Count Badge */}
            <div className="text-xs text-slate-600 font-semibold">
              Showing <span className="font-bold text-emerald-800">{filteredInternships.length}</span> of {internships.length} Technical Tracks
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
            {allCategories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Internships Grid */}
        {filteredInternships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map(internship => (
              <InternshipCard
                key={internship.slug}
                internship={internship}
                sourcePage="/internships"
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Internship Tracks Match Your Search"
            message={`We couldn't find any tracks matching "${searchQuery}". Try searching for another skill or clearing filters.`}
            onReset={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
          />
        )}
      </div>
    </div>
  );
}
