import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  FolderKanban,
  Award,
  ExternalLink,
  GitBranch,
  Layers,
  Sparkles,
  Check
} from 'lucide-react';
import SEO from '../components/SEO';
import ApplyButton from '../components/ApplyButton';
import StatusBadge from '../components/StatusBadge';
import { internships } from '../data/internships';
import { handleApplicationRedirect } from '../utils/applicationTracker';

export default function InternshipDetails() {
  const { slug } = useParams();

  const internship = internships.find(i => i.slug === slug);

  if (!internship) {
    return <Navigate to="/internships" replace />;
  }

  const handleApplyClick = () => {
    handleApplicationRedirect({
      internshipSlug: internship.slug,
      internshipName: internship.title,
      sourcePage: `/internships/${internship.slug}`,
    });
  };

  return (
    <div className="bg-transparent min-h-screen pb-20">
      <SEO
        title={`${internship.title} - Project-Based Internship`}
        description={internship.description}
      />

      {/* Hero Header */}
      <div className="bg-white/80 backdrop-blur-xs border-b border-slate-200/80 pt-8 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <Link
            to="/internships"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-emerald-700 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to All Internships</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
              {internship.category || 'Technology'}
            </span>
            <StatusBadge status={internship.status || 'Applications Open'} />
            {internship.level && (
              <span className="text-xs text-slate-500 font-medium">
                • {internship.level}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 max-w-4xl">
            {internship.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-8">
            {internship.description}
          </p>

          {/* Quick Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 max-w-3xl">
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Duration
              </span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Clock size={14} className="text-emerald-600" />
                {internship.duration || '1 Month'}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Mode
              </span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <MapPin size={14} className="text-emerald-600" />
                {internship.mode || 'Remote'}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Commitment
              </span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Calendar size={14} className="text-emerald-600" />
                {internship.hours || 'Flexible / Weekly'}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Credential
              </span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Award size={14} className="text-emerald-600" />
                Verified Certificate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Overview / About */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                Program Overview & Structure
              </h2>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {Array.isArray(internship.about) ? (
                  internship.about.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))
                ) : (
                  <p>{internship.description}</p>
                )}
              </div>
            </div>

            {/* Skills You Will Learn & Apply */}
            {internship.skills && internship.skills.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                  Skills & Technologies Covered
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {internship.skills.map((skill, index) => {
                    const name = typeof skill === 'string' ? skill : skill.name;
                    const desc = typeof skill === 'string' ? '' : skill.description;
                    return (
                      <div
                        key={index}
                        className="rounded-lg border border-slate-100 bg-slate-50/60 p-4"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-2 w-2 rounded-full bg-emerald-600" />
                          <strong className="text-sm font-bold text-slate-900">
                            {name}
                          </strong>
                        </div>
                        {desc && (
                          <p className="text-xs text-slate-500 leading-relaxed pl-4">
                            {desc}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Weekly Roadmap Milestones */}
            {internship.roadmap && internship.roadmap.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Weekly Curriculum Roadmap
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Structured 4-week milestones designed to keep your progress on schedule.
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200">
                    4 Weeks
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {internship.roadmap.map((milestone, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-slate-200 bg-slate-50/50 p-4"
                    >
                      <span className="font-mono text-xs font-bold text-emerald-700 block mb-1">
                        {milestone.week || `Week ${idx + 1}`}
                      </span>
                      <h3 className="text-sm font-bold text-slate-800 mb-1.5">
                        {milestone.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Real-World Projects Covered */}
            {internship.projects && internship.projects.length > 0 && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                  Projects & Portfolio Deliverables
                </h2>
                <p className="text-xs text-slate-500 mb-6">
                  You will complete both guided mini-tasks and a comprehensive capstone project suitable for your resume.
                </p>

                <div className="space-y-3">
                  {internship.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 font-mono text-xs font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <strong className="text-sm font-bold text-slate-800 block">
                            {proj.title}
                          </strong>
                          <span className="text-xs text-slate-500 block mt-0.5">
                            {proj.description || 'Hands-on implementation and GitHub documentation.'}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          proj.type === 'Major'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {proj.type || 'Task'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Eligibility & What You Need */}
            {internship.eligibility && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
                  Eligibility & Requirements
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Who Can Apply */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-5">
                    <h3 className="text-sm font-bold text-slate-900 mb-2">
                      {internship.eligibility.whoCanApply?.title || 'Who Can Apply'}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {internship.eligibility.whoCanApply?.description}
                    </p>
                    {internship.eligibility.whoCanApply?.bullets && (
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {internship.eligibility.whoCanApply.bullets.map((b, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check size={14} className="text-emerald-600 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Requirements */}
                  <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-5">
                    <h3 className="text-sm font-bold text-slate-900 mb-2">
                      {internship.eligibility.requirements?.title || 'System & Skill Requirements'}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                      {internship.eligibility.requirements?.description}
                    </p>
                    {internship.eligibility.requirements?.bullets && (
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {internship.eligibility.requirements.bullets.map((b, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check size={14} className="text-emerald-600 shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Terms & Important Information */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck size={22} className="text-emerald-600" />
                <span>Evaluation & Academic Integrity</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  <strong>Original Work Policy:</strong> All submitted code, CAD assemblies, and technical reports must be the original work of the enrolled learner. Plagiarized repositories or direct copy-paste without understanding will result in rejection of the submission.
                </p>
                <p>
                  <strong>Completion Criteria:</strong> Certificates of Completion are awarded based on satisfactory submission of weekly milestone tasks and the final capstone deliverable.
                </p>
                <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-md border border-slate-200">
                  <em>Disclaimer: SkillSet Go EduTech is a technical skills education provider. Participation in this internship provides real-world hands-on project experience and credentials, but does not guarantee employment, placements, or salary figures.</em>
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Sticky Application Box (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Cohort Enrollment
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Open
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Apply for this Track
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Submit your application through our centralized admissions form. Secure your spot for the upcoming monthly cohort.
              </p>

              {/* Centralized Apply Button */}
              <ApplyButton
                internship={internship}
                sourcePage={`/internships/${internship.slug}`}
                label="Apply for Internship"
                className="w-full py-3 text-sm shadow-md font-bold mb-4"
              />

              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span>Verified Digital Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span>Public GitHub Proof of Work</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span>Weekly Mentor Review & Feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={15} className="text-emerald-600" />
                  <span>100% Remote & Self-Paced Schedule</span>
                </div>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-xs text-slate-600">
              <strong className="block text-slate-800 font-bold mb-1">
                Have questions about this track?
              </strong>
              <p className="mb-3">
                Read our answers regarding prerequisites, deliverables, and submissions.
              </p>
              <Link
                to="/faq"
                className="text-emerald-700 font-bold hover:text-emerald-900 hover:underline inline-flex items-center gap-1"
              >
                <span>Read Internship FAQs</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
