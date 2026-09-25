import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import ArticleCard from '../components/ArticleCard';
import EmptyState from '../components/EmptyState';
import AntiGravityCanvas from '../components/AntiGravityCanvas';
import { articleCategories } from '../data/articles';
import { contentService } from '../services/contentService';

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState(() => contentService.getPublicArticles());

  useEffect(() => {
    const handleUpdate = async () => {
      try {
        await contentService.fetchArticles();
      } catch (e) {
        // Fallback
      }
      setArticles(contentService.getPublicArticles());
    };
    handleUpdate();
    window.addEventListener('ssg:content_changed', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ssg:content_changed', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const filteredArticles = useMemo(() => {
    return articles.filter(item => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.excerpt.toLowerCase().includes(query) ||
        (Array.isArray(item.tags) &&
          item.tags.some(t => t.toLowerCase().includes(query)));

      return matchesCategory && matchesQuery;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="bg-transparent min-h-screen py-12 lg:py-16 relative">

      <SEO
        title="Engineering Articles, Tutorials & Career Roadmaps | SkillSet Go"
        description="Read in-depth technical guides on React 19, RAG pipelines, API security, Kubernetes zero-downtime rollouts, and proof of work in tech hiring."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          eyebrow="Knowledge Base"
          title="Articles, Guides & Tutorials"
          description="Technical insights, architectural decisions, and career strategies written by our engineering team and mentors."
        />

        {/* Filter Bar */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics (e.g. React, RAG, API Security, Resume)..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
              />
            </div>

            <div className="text-xs text-slate-500 font-medium">
              Showing <span className="font-bold text-slate-800">{filteredArticles.length}</span> of {articles.length} Articles
            </div>
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
            {articleCategories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.slug || article.id} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Articles Found"
            message={`No articles matched "${searchQuery}". Try searching with different keywords or choosing "All" categories.`}
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
