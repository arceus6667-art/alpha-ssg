import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, ExternalLink, Shield, Award, Terminal } from 'lucide-react';
import Logo from './Logo';
import { siteConfig } from '../config/siteConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner / Trust Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                <Terminal size={18} />
              </div>
              <div>
                <strong className="block text-sm font-bold text-white">Project-Based Learning</strong>
                <span className="text-xs text-slate-400">100% verifiable GitHub proof of work</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Award size={18} />
              </div>
              <div>
                <strong className="block text-sm font-bold text-white">Verifiable Credentials</strong>
                <span className="text-xs text-slate-400">Official certificates with unique verification IDs</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                <Shield size={18} />
              </div>
              <div>
                <strong className="block text-sm font-bold text-white">Transparent & Authentic</strong>
                <span className="text-xs text-slate-400">No deceptive claims or false job promises</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <div className="bg-white p-1.5 rounded-xl shadow-xs inline-flex">
                <Logo size={46} />
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              SkillSet Go EduTech bridges academic theory and engineering reality through structured, remote project-based internships, technical workshops, and developer resources.
            </p>
            
            <div className="pt-2 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400 shrink-0" />
                <span>{siteConfig.contact.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-400 shrink-0" />
                <a href={`mailto:${siteConfig.contact.admissionsEmail}`} className="hover:text-emerald-400 transition-colors font-medium">
                  {siteConfig.contact.admissionsEmail}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-teal-400 shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-teal-400 transition-colors font-medium">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Programs Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Programs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/internships" className="hover:text-emerald-400 transition-colors">
                  All 12 Internships
                </Link>
              </li>
              <li>
                <Link to="/internships/full-stack-web-development" className="hover:text-emerald-400 transition-colors">
                  Full-Stack Web Dev
                </Link>
              </li>
              <li>
                <Link to="/internships/artificial-intelligence-machine-learning" className="hover:text-emerald-400 transition-colors">
                  AI & Machine Learning
                </Link>
              </li>
              <li>
                <Link to="/internships/cyber-security" className="hover:text-emerald-400 transition-colors">
                  Cyber Security
                </Link>
              </li>
              <li>
                <Link to="/internships/mechatronics-mechanical" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  <span>Mechatronics & Mech</span>
                  <span className="rounded bg-emerald-500/20 text-emerald-300 text-[10px] px-1.5 py-0.2 font-mono">New</span>
                </Link>
              </li>
              <li>
                <Link to="/workshops" className="hover:text-emerald-400 transition-colors">
                  Live Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link to="/articles" className="hover:text-emerald-400 transition-colors">
                  Articles & Guides
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-emerald-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/goodies" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>Learner Goodies</span>
                  <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-1.5 py-0.2 rounded">Soon</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Journal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/magazine" className="hover:text-emerald-400 transition-colors">
                  Quarterly Magazine
                </Link>
              </li>
              <li>
                <Link to="/articles?category=Career%20%26%20Internships" className="hover:text-emerald-400 transition-colors">
                  Career Roadmaps
                </Link>
              </li>
              <li>
                <Link to="/articles?category=AI%20%26%20Machine%20Learning" className="hover:text-emerald-400 transition-colors">
                  AI Architecture
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.applicationFormUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1 text-emerald-400 font-medium"
                >
                  <span>Cohort Application Form</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Legal & Policy
            </h4>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.legalLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-emerald-400 transition-colors text-slate-400 hover:text-slate-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Dynamic Year */}
        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {siteConfig.companyName}. All rights reserved.
          </p>

          <p className="text-center sm:text-right">
            <span>Learn. Build. Prove.</span>
            <span className="mx-2">•</span>
            <span>SkillSet Go EduTech Platform</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
