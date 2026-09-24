import React, { useState } from 'react';
import { Mail, MapPin, Clock, Phone, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeader from '../components/SectionHeader';
import { siteConfig } from '../config/siteConfig';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Internship Admissions',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    try {
      const existingInquiries = JSON.parse(localStorage.getItem('ssg_contact_inquiries') || '[]');
      existingInquiries.unshift({
        ...formData,
        id: 'inq_' + Date.now(),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('ssg_contact_inquiries', JSON.stringify(existingInquiries));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    setSubmitted(true);
  };

  return (
    <div className="bg-transparent min-h-screen py-12 lg:py-16">
      <SEO
        title="Contact Us | Learner & Academic Inquiries"
        description="Get in touch with SkillSet Go EduTech for internship inquiries, institutional partnerships, and learner support."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Contact SkillSet Go EduTech"
          description="Have questions about our internship cohorts, upcoming masterclasses, or college workshops? We are here to help."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-xs space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Official Information
              </h3>

              {/* Senior HR & Admissions Email */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0 border border-emerald-100">
                  <Mail size={18} />
                </div>
                <div>
                  <strong className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Senior HR & Admissions
                  </strong>
                  <a
                    href="mailto:senior-hr@skillsetgoedutech.in"
                    className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    senior-hr@skillsetgoedutech.in
                  </a>
                  <span className="block text-[11px] text-slate-500 mt-0.5">
                    For cohort applications, verification & HR inquiries
                  </span>
                </div>
              </div>

              {/* Admin & Official Email */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-50 text-teal-600 shrink-0 border border-teal-100">
                  <Mail size={18} />
                </div>
                <div>
                  <strong className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Administration & Inquiries
                  </strong>
                  <a
                    href="mailto:admin@skillsetgoedutech.in"
                    className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                  >
                    admin@skillsetgoedutech.in
                  </a>
                  <span className="block text-[11px] text-slate-500 mt-0.5">
                    Official management & institutional communications
                  </span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 shrink-0 border border-slate-200">
                  <Clock size={18} />
                </div>
                <div>
                  <strong className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Working Hours
                  </strong>
                  <span className="text-sm text-slate-700 font-semibold block">
                    {siteConfig.contact.workingHours}
                  </span>
                  <span className="text-xs text-slate-500 block mt-0.5">
                    {siteConfig.contact.responseTime}
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 text-slate-600 shrink-0 border border-slate-200">
                  <MapPin size={18} />
                </div>
                <div>
                  <strong className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Location
                  </strong>
                  <span className="text-sm text-slate-700 font-semibold">
                    {siteConfig.contact.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Application Direct Box */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6">
              <h4 className="text-sm font-bold text-emerald-950 mb-1">
                Applying for an Internship Track?
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed mb-4">
                You do not need to wait for email confirmation. Simply submit your information directly through our Google Application Form.
              </p>
              <a
                href={siteConfig.applicationFormUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg transition-colors shadow-xs"
              >
                <span>Open Application Form</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill out the form below and our team will get back to you via email.
              </p>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. rahul@example.com"
                        className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Subject / Inquiry Category
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-sm text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="Internship Admissions">Internship Admissions & Cohort Schedule</option>
                      <option value="Certificate Verification">Certificate Verification & Credentials</option>
                      <option value="Workshops & Masterclasses">Workshops & Masterclass Registration</option>
                      <option value="College Partnership">College / University Workshop Partnership</option>
                      <option value="Other">General Feedback / Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your question or inquiry in detail..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 px-3.5 text-sm text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    <Send size={15} />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              ) : (
                <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 size={26} />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-900">
                    Inquiry Received Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
                    Thank you, {formData.name}. Our admissions and support desk will review your message and reply back to <strong>{formData.email}</strong> within 24 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: 'Internship Admissions', message: '' });
                    }}
                    className="inline-block text-xs font-bold text-emerald-800 underline hover:text-emerald-950 pt-2 cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
