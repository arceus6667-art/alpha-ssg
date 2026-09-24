import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Users,
  Award,
  BookOpen,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import SEO from '../components/SEO';
import StatusBadge from '../components/StatusBadge';
import { contentService } from '../services/contentService';
import { handleApplicationRedirect } from '../utils/applicationTracker';

export default function WorkshopDetails() {
  const { slug } = useParams();
  const workshop = contentService.getWorkshop(slug);

  if (!workshop) {
    return <Navigate to="/workshops" replace />;
  }

  const handleRegisterClick = () => {
    handleApplicationRedirect({
      internshipSlug: `workshop-${workshop.slug}`,
      internshipName: `Workshop: ${workshop.title}`,
      sourcePage: `/workshops/${workshop.slug}`,
    });
  };

  const isCompleted = workshop.status === 'completed';

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      <SEO
        title={`${workshop.title} - Live Workshop`}
        description={workshop.description}
      />

      {/* Header Banner */}
      <div className="bg-white border-b border-slate-200/80 pt-8 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/workshops"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6"
          >
            <ArrowLeft size={14} />
            <span>Back to All Workshops</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <StatusBadge status={workshop.status} />
            {workshop.badge && (
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100">
                {workshop.badge}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-4 max-w-4xl">
            {workshop.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed mb-8">
            {workshop.description}
          </p>

          {/* Key Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 max-w-3xl">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Date
              </span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Calendar size={14} className="text-blue-600" />
                {workshop.date}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Time & Duration
              </span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Clock size={14} className="text-blue-600" />
                {workshop.startTime}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Mode
              </span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <MapPin size={14} className="text-blue-600" />
                {workshop.mode}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Capacity
              </span>
              <span className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                <Users size={14} className="text-emerald-600" />
                {workshop.seatCapacity}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Banner Image */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm aspect-video max-h-[420px] w-full">
              <img
                src={workshop.coverImage}
                alt={workshop.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Topics / Syllabus */}
            {workshop.topics && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                  What Will Be Covered in this Session
                </h2>
                <div className="space-y-3">
                  {workshop.topics.map((topic, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-lg border border-slate-100 bg-slate-50/50"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-700 font-mono text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-sm font-semibold text-slate-800 pt-0.5">
                        {topic}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Learning Outcomes */}
            {workshop.whatYouWillLearn && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                  Key Practical Outcomes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {workshop.whatYouWillLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Instructor / Speaker Bio */}
            {workshop.speaker && (
              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                  Meet Your Instructor
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <img
                    src={workshop.speaker.avatar}
                    alt={workshop.speaker.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-200 shadow-sm shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {workshop.speaker.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 mb-2">
                      {workshop.speaker.role} • {workshop.speaker.company}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {workshop.speaker.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Prerequisites */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                <HelpCircle size={18} className="text-blue-600" />
                <span>Prerequisites & Requirements</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {workshop.prerequisites || 'Basic understanding of computer science concepts and a working computer with internet access.'}
              </p>
            </div>
          </div>

          {/* Right Column: Sticky Registration Card (4 cols) */}
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-100">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Live Masterclass
                </span>
                <StatusBadge status={workshop.status} />
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Reserve Your Seat
              </h3>

              <div className="space-y-2 text-xs text-slate-600 mb-6">
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Date</span>
                  <span className="font-bold text-slate-800">{workshop.date}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Timing</span>
                  <span className="font-bold text-slate-800">{workshop.startTime} – {workshop.endTime}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1.5">
                  <span className="text-slate-400">Format</span>
                  <span className="font-bold text-slate-800">{workshop.mode}</span>
                </div>
                <div className="flex justify-between pb-1.5">
                  <span className="text-slate-400">Certificate</span>
                  <span className="font-bold text-emerald-600">Included</span>
                </div>
              </div>

              {!isCompleted ? (
                <button
                  type="button"
                  onClick={handleRegisterClick}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <span>Register for Workshop</span>
                  <ExternalLink size={15} />
                </button>
              ) : (
                <div className="text-center p-3 rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">
                  This live session has concluded. Check our upcoming sessions!
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>Interactive Live Q&A with Instructor</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>Session Code Repository & Slide Deck</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span>Participant Certificate of Attendance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
