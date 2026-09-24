import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Target,
  Compass,
  Code2,
  Terminal,
  Layers,
  Award,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Users,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { siteConfig } from '../config/siteConfig';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      <SEO
        title="About Us | Our Mission & Methodology"
        description="Learn about SkillSet Go EduTech — our mission, project-based learning methodology, technical values, and commitment to verifiable proof of work."
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f8faf9] via-white to-[#f0fdf4]/50 text-slate-900 pt-16 pb-20 border-b border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 mb-6">
            <Sparkles size={14} />
            <span>Our Story & Mission</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6">
            Bridging Theory and{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">
              Engineering Reality
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            SkillSet Go EduTech was founded on a simple conviction: technology education should be defined by what you can build, prove, and deploy — not just what you can memorize.
          </p>
        </div>
      </section>

      {/* Who We Are & Mission / Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <SectionHeader
                eyebrow="Who We Are"
                title="A Modern Platform for Pragmatic Technology Learners"
                description="We are a team of practicing software engineers, tech leads, and educators dedicated to modernizing hands-on skills training."
                className="mb-6"
              />
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                <p>
                  In traditional academic curricula, students often spend years absorbing abstract algorithms and textbook theory, yet graduate without experiencing modern development workflows — like writing unit tests, managing CI/CD pipelines, containerizing services, or configuring cloud deployments.
                </p>
                <p>
                  SkillSet Go EduTech provides structured, milestone-driven internship pathways and intensive weekend masterclasses. We guide learners through authentic engineering cycles so they emerge with verifiable proof of work.
                </p>
              </div>
            </div>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-4">
                  <Target size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Our Mission</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To democratize practical, project-based engineering education and empower learners of all backgrounds to build tangible, verifiable portfolios that speak louder than words.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 mb-4">
                  <Compass size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Our Vision</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  To become the premier launchpad for aspiring engineers, where competence is measured by code quality, architectural depth, and real problem-solving capabilities.
                </p>
              </div>
            </div>
          </div>

          {/* Our Core Approach (4 Pillars) */}
          <div className="border-t border-slate-100 pt-16">
            <SectionHeader
              centered
              eyebrow="Our Methodology"
              title="How We Approach Technical Growth"
              description="Four foundational pillars guide every internship cohort, workshop curriculum, and technical publication."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                  <Terminal size={20} />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Learning Through Projects</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every concept is directly applied to functional software, microservices, or CAD simulation artifacts.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600 mb-4">
                  <Layers size={20} />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Industry-Oriented Stacks</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We focus on the tools tech companies actually use: React 19, Node.js, Kubernetes, Docker, Gemini AI, and cloud services.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 mb-4">
                  <BookOpen size={20} />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Guided Weekly Roadmaps</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Structured 4-week milestones with clear acceptance criteria keep learners motivated and on schedule.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 mb-4">
                  <Award size={20} />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Verifiable Credentials</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  All certificates feature unique verifiable credential IDs backed by public repository review standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Realistic Guarantees & Values */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <SectionHeader
            centered
            eyebrow="Our Commitment"
            title="Integrity & Realistic Educational Principles"
            description="We believe in complete transparency with our learners and partners."
          />

          <div className="space-y-4 mt-8">
            <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block">No False Promises or Fake Placement Guarantees</strong>
                <span className="text-xs text-slate-600">
                  We never make deceptive claims about guaranteed jobs, salaries, or placements. We provide real training, mentorship, and project proof that make you genuinely competitive.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block">Accessible to Everyone</strong>
                <span className="text-xs text-slate-600">
                  Our programs are designed for standard student laptops using free, open-source, or cloud-hosted tiers so no student is excluded due to hardware limitations.
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-sm font-bold text-slate-900 block">Original Intellectual Effort</strong>
                <span className="text-xs text-slate-600">
                  We enforce genuine academic integrity. Learners are taught how to research, write, test, and document their own solutions rather than blindly copying answers.
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/internships"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow hover:bg-blue-700 transition-colors"
            >
              <span>Explore Internship Tracks</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
