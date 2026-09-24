import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  BookOpen,
  FileText,
  Gift,
  ExternalLink,
  ChevronRight,
  GitBranch,
  Target
} from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import InternshipCard from '../components/InternshipCard';
import WorkshopCard from '../components/WorkshopCard';
import MagazineCard from '../components/MagazineCard';
import ArticleCard from '../components/ArticleCard';
import AntiGravityCanvas from '../components/AntiGravityCanvas';
import { siteConfig } from '../config/siteConfig';
import { internships } from '../data/internships';
import { contentService } from '../services/contentService';
import { handleApplicationRedirect } from '../utils/applicationTracker';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [workshopsList, setWorkshopsList] = useState(() => contentService.getPublicWorkshops());
  const [magazinesList, setMagazinesList] = useState(() => contentService.getPublicMagazines());
  const [articlesList, setArticlesList] = useState(() => contentService.getPublicArticles());

  useEffect(() => {
    const handleUpdate = () => {
      setWorkshopsList(contentService.getPublicWorkshops());
      setMagazinesList(contentService.getPublicMagazines());
      setArticlesList(contentService.getPublicArticles());
    };
    window.addEventListener('ssg:content_changed', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('ssg:content_changed', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  // Categories list
  const categories = ['All', 'Development', 'AI & Data', 'Security', 'Engineering', 'Cloud'];

  // Filter internships for homepage preview
  const filteredInternships = internships.filter(item => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Development') return item.category.toLowerCase().includes('development') || item.category.toLowerCase().includes('frontend') || item.category.toLowerCase().includes('backend');
    if (selectedCategory === 'AI & Data') return item.category.toLowerCase().includes('data') || item.category.toLowerCase().includes('intelligence');
    if (selectedCategory === 'Security') return item.category.toLowerCase().includes('security');
    if (selectedCategory === 'Engineering') return item.category.toLowerCase().includes('engineering');
    if (selectedCategory === 'Cloud') return item.category.toLowerCase().includes('cloud') || item.category.toLowerCase().includes('devops');
    return item.category === selectedCategory;
  }).slice(0, 6);

  const featuredWorkshops = workshopsList.slice(0, 3);
  const featuredMagazine = magazinesList[0];
  const featuredArticles = articlesList.slice(0, 3);

  const handleQuickApply = () => {
    handleApplicationRedirect({
      internshipSlug: 'hero-cta-apply',
      internshipName: 'Homepage Hero Apply',
      sourcePage: '/',
    });
  };

  return (
    <div className="bg-transparent">
      <SEO
        title="SkillSet Go EduTech | Learn. Build. Prove."
        description="Structured project-based internships, live technical workshops, quarterly engineering magazine, and industry-oriented technology learning."
      />

      {/* ========================================================
          SECTION 1 — HERO
          ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8faf9]/50 via-white/40 to-[#f0fdf4]/20 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-100">
        {/* Subtle architectural dot grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/90 bg-emerald-50/90 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-xs mb-6">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Next Cohort Admissions Open</span>
                <span className="hidden sm:inline text-slate-300">/</span>
                <span className="hidden sm:inline text-emerald-900 font-bold">12 Technical Tracks</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] mb-6">
                Learn. Build.{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-800 bg-clip-text text-transparent">
                  Prove Your Engineering.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-8">
                Master modern engineering through structured, project-driven internships and live masterclasses. Complete weekly milestones, ship production-grade code, and prove your capabilities with a verifiable portfolio.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/internships"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-lg transition-all duration-150"
                >
                  <span>Explore Internships</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/workshops"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-xs hover:bg-emerald-50/50 hover:border-emerald-300 hover:text-emerald-800 transition-all duration-150"
                >
                  <Layers size={16} className="text-emerald-600" />
                  <span>View Workshops</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-slate-200/70 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>100% Project-Based Work</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>Verifiable Certificate ID</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                  <span>GitHub Proof of Work</span>
                </div>
              </div>
            </div>

            {/* Right Card: Interactive Milestone Demonstration */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-xs p-6 shadow-xl shadow-slate-200/50 relative">
                {/* Card Topline */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                      Standard Cohort Milestone Path
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-800 border border-emerald-100">
                    4-Week Sprint
                  </span>
                </div>

                {/* Vertical Timeline */}
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {/* Milestone 1 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 ring-4 ring-emerald-50">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-800">Week 1: Core Architecture & Setup</span>
                        <span className="font-mono text-[10px] text-emerald-700 font-semibold">FOUNDATION</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Environment configuration, design schemas, and repository initialization.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 2 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 ring-4 ring-emerald-50">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-800">Week 2: Guided Mini Tasks</span>
                        <span className="font-mono text-[10px] text-teal-700 font-semibold">BUILDING</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Implement key module features, tests, and API integration tasks.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 3 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 ring-4 ring-emerald-50">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>
                    <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-slate-800">Week 3: Major Capstone Project</span>
                        <span className="font-mono text-[10px] text-emerald-800 font-semibold">SYNTHESIS</span>
                      </div>
                      <p className="text-xs text-slate-500">
                        End-to-end deployment, user authentication, and performance tuning.
                      </p>
                    </div>
                  </div>

                  {/* Milestone 4 */}
                  <div className="relative">
                    <div className="absolute -left-6 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 ring-4 ring-emerald-50">
                      <CheckCircle2 size={12} className="text-white" />
                    </div>
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-emerald-950">Week 4: Review & Certification</span>
                        <span className="font-mono text-[10px] text-emerald-800 font-bold">VERIFIED</span>
                      </div>
                      <p className="text-xs text-emerald-800">
                        Code review evaluation, repository grading, and credential issuance.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer inside demonstration card */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <GitBranch size={13} className="text-emerald-600" />
                    <span>Public GitHub Submission</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleQuickApply}
                    className="font-bold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
                  >
                    Apply for Next Cohort →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 — TRUST / IMPACT (STATISTICS AREA - BRIGHT & CLEAN)
          ======================================================== */}
      <section className="py-12 bg-white/75 backdrop-blur-xs border-y border-slate-200/80 shadow-xs relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
            <div className="pt-4 sm:pt-0">
              <span className="block text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-1.5 tabular-nums">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  {siteConfig.metrics.learnersCount}
                </span>
              </span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                {siteConfig.metrics.learnersLabel}
              </span>
            </div>

            <div className="pt-6 sm:pt-0 sm:px-4">
              <span className="block text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-1.5 tabular-nums">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  {siteConfig.metrics.domainsCount}
                </span>
              </span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                {siteConfig.metrics.domainsLabel}
              </span>
            </div>

            <div className="pt-6 sm:pt-0">
              <span className="block text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-1.5 tabular-nums">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  {siteConfig.metrics.projectsCount}
                </span>
              </span>
              <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">
                {siteConfig.metrics.projectsLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 — INTERNSHIP DOMAINS
          ======================================================== */}
      <section className="py-20 lg:py-24 bg-transparent" id="internships-preview">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              eyebrow="Specialized Tracks"
              title="Project-Based Internship Pathways"
              description="Choose from 12 industry-aligned technical disciplines designed to build portfolio-grade proof of work."
              className="mb-0"
            />

            <Link
              to="/internships"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors shrink-0"
            >
              <span>View All 12 Domains</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInternships.map(internship => (
              <InternshipCard
                key={internship.slug}
                internship={internship}
                sourcePage="/"
              />
            ))}
          </div>

          {/* Bottom Action */}
          <div className="mt-12 text-center">
            <Link
              to="/internships"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-800 hover:bg-emerald-50/50 hover:border-emerald-300 hover:text-emerald-800 transition-colors shadow-xs"
            >
              <span>Explore All 12 Internship Pathways</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4 — HOW IT WORKS (6 STAGES)
          ======================================================== */}
      <section className="py-20 lg:py-24 bg-[#f8faf9]/60 backdrop-blur-xs border-y border-slate-200/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            centered
            eyebrow="The Methodology"
            title="How SkillSet Go EduTech Works"
            description="Our structured 6-stage framework guarantees that you don't just passively watch videos — you build verifiable proof of work."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {/* Stage 1 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs relative">
              <span className="font-mono text-2xl font-bold text-emerald-600 block mb-3">01</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Choose a Program</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select from 12 technical domains based on your career interests and upcoming semester goals.
              </p>
            </div>

            {/* Stage 2 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs relative">
              <span className="font-mono text-2xl font-bold text-emerald-600 block mb-3">02</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Apply Online</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Submit your application through our centralized Google Form. No lengthy resume screening needed.
              </p>
            </div>

            {/* Stage 3 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs relative">
              <span className="font-mono text-2xl font-bold text-emerald-600 block mb-3">03</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Learn & Build</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Follow weekly milestone documentation and curated architectural guides to build real systems.
              </p>
            </div>

            {/* Stage 4 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs relative">
              <span className="font-mono text-2xl font-bold text-emerald-600 block mb-3">04</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Complete Projects</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tackle both focused mini-tasks and a comprehensive production-grade major capstone project.
              </p>
            </div>

            {/* Stage 5 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs relative">
              <span className="font-mono text-2xl font-bold text-emerald-600 block mb-3">05</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Submit Work</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Submit your public GitHub repositories, deployed URLs, and technical documentation for evaluation.
              </p>
            </div>

            {/* Stage 6 */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs relative">
              <span className="font-mono text-2xl font-bold text-teal-600 block mb-3">06</span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Earn Credentials</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Receive an official, verifiable Certificate of Completion with a unique ID shareable on LinkedIn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5 — WORKSHOPS PREVIEW (CONNECTED TO ADMIN CRUD)
          ======================================================== */}
      <section className="py-20 lg:py-24 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeader
              eyebrow="Hands-on Learning"
              title="Live Technical Workshops"
              description="Intensive weekend masterclasses on trending developer technologies, cloud systems, and AI frameworks."
              className="mb-0"
            />

            <Link
              to="/workshops"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors shrink-0"
            >
              <span>View All Workshops</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {featuredWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredWorkshops.map(workshop => (
                <WorkshopCard key={workshop.slug} workshop={workshop} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500">
              No live workshops are currently scheduled. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          SECTION 6 — MAGAZINE PREVIEW (CONNECTED TO ADMIN CRUD)
          ======================================================== */}
      {featuredMagazine && (
        <section className="py-20 lg:py-24 bg-slate-950 text-white relative overflow-hidden">
          {/* Subtle Anti-Gravity space particles on dark section */}
          <AntiGravityCanvas particleCount={30} interactive={false} theme="green" className="opacity-40" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 mb-3">
                  <BookOpen size={14} />
                  <span>Quarterly Journal</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  SkillSet Go Tech Journal
                </h2>
                <p className="mt-2 text-base text-slate-400 max-w-xl">
                  Curated articles, student engineering breakthroughs, and architectural breakdowns from industry leaders.
                </p>
              </div>

              <Link
                to="/magazine"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
              >
                <span>View All Editions</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Featured Publication Spotlight Card */}
            <MagazineCard magazine={featuredMagazine} featured />
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 7 — ARTICLES PREVIEW (CONNECTED TO ADMIN CRUD)
          ======================================================== */}
      {featuredArticles.length > 0 && (
        <section className="py-20 lg:py-24 bg-transparent">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <SectionHeader
                eyebrow="Knowledge Base"
                title="Articles, Tutorials & Career Guides"
                description="Learn from practical breakdowns written by senior developers and technology mentors."
                className="mb-0"
              />

              <Link
                to="/articles"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900 transition-colors shrink-0"
              >
                <span>Explore Knowledge Hub</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          SECTION 8 — GOODIES TEASER (UNDER CONSTRUCTION)
          ======================================================== */}
      <section className="py-16 bg-[#f8faf9]/60 backdrop-blur-xs border-t border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shrink-0">
                <Gift size={32} />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase text-amber-800 bg-amber-100 mb-2">
                  Coming Soon
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Learner Goodies & Official Swag
                </h3>
                <p className="mt-1 text-sm text-slate-600 max-w-lg">
                  We are curating custom developer kits, stickers, badges, and merchandise for outstanding internship cohort participants.
                </p>
              </div>
            </div>

            <Link
              to="/goodies"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 shadow-xs hover:bg-slate-50 hover:border-slate-400 transition-colors shrink-0"
            >
              <span>View Goodies Preview</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          GLOBAL CALL TO ACTION BANNER WITH ANTI-GRAVITY BACKGROUND
          ======================================================== */}
      <section className="relative py-20 bg-gradient-to-br from-[#064e3b] via-[#065f46] to-[#047857] text-white overflow-hidden">
        {/* Anti-gravity running particles */}
        <AntiGravityCanvas particleCount={40} interactive={false} theme="green" className="opacity-30" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3.5 py-1 text-xs font-semibold text-emerald-200 mb-4">
            <Sparkles size={14} />
            <span>Ready to build your career?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Build Your Proof of Work Today
          </h2>

          <p className="text-base sm:text-lg text-emerald-100 leading-relaxed mb-8">
            Join thousands of learners building real skills through structured milestones and verified GitHub contributions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleQuickApply}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-bold text-emerald-900 shadow-lg hover:bg-emerald-50 transition-all cursor-pointer"
            >
              <span>Apply for Internship</span>
              <ExternalLink size={16} />
            </button>

            <Link
              to="/internships"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/50 bg-emerald-800/40 px-8 py-3.5 text-sm font-bold text-white hover:bg-emerald-800/60 transition-all"
            >
              <span>Browse All 12 Domains</span>
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
