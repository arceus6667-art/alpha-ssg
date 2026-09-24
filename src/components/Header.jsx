import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Sparkles, BookOpen, Layers, Gift, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import Logo from './Logo';
import { siteConfig } from '../config/siteConfig';
import { handleApplicationRedirect } from '../utils/applicationTracker';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Handle sticky header scroll shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile & dropdown menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setExploreOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFastApply = () => {
    handleApplicationRedirect({
      internshipSlug: 'nav-fast-apply',
      internshipName: 'Navbar Quick Apply',
      sourcePage: location.pathname,
    });
  };

  const isExploreActive = ['/workshops', '/magazine', '/articles', '/goodies'].some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80'
          : 'bg-white border-b border-slate-200/60'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90 shrink-0"
            aria-label={`${siteConfig.companyName} Home`}
          >
            <Logo size={46} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/90 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/internships"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/90 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Internships
            </NavLink>

            {/* Explore Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setExploreOpen(prev => !prev)}
                onMouseEnter={() => setExploreOpen(true)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  isExploreActive || exploreOpen
                    ? 'text-emerald-700 bg-emerald-50/90 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-expanded={exploreOpen}
              >
                <span>Explore</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${exploreOpen ? 'rotate-180' : ''}`} />
              </button>

              {exploreOpen && (
                <div
                  onMouseLeave={() => setExploreOpen(false)}
                  className="absolute left-0 mt-1.5 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <Link
                    to="/workshops"
                    className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-50"
                  >
                    <div className="mt-0.5 rounded-md bg-emerald-50 p-1.5 text-emerald-600">
                      <Layers size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Workshops</div>
                      <div className="text-[11px] text-slate-500">Live masterclasses & bootcamps</div>
                    </div>
                  </Link>

                  <Link
                    to="/magazine"
                    className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-50"
                  >
                    <div className="mt-0.5 rounded-md bg-teal-50 p-1.5 text-teal-600">
                      <BookOpen size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Magazine</div>
                      <div className="text-[11px] text-slate-500">Quarterly student tech journal</div>
                    </div>
                  </Link>

                  <Link
                    to="/articles"
                    className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-50"
                  >
                    <div className="mt-0.5 rounded-md bg-emerald-50 p-1.5 text-emerald-600">
                      <FileText size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-800">Articles & Guides</div>
                      <div className="text-[11px] text-slate-500">Career tips, roadmaps & tech</div>
                    </div>
                  </Link>

                  <Link
                    to="/goodies"
                    className="flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-50 border-t border-slate-100 mt-1 pt-2"
                  >
                    <div className="mt-0.5 rounded-md bg-amber-50 p-1.5 text-amber-600">
                      <Gift size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                        <span>Goodies</span>
                        <span className="rounded bg-amber-100 px-1.5 py-0.2 text-[10px] font-bold text-amber-800">
                          Soon
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">Official developer swag & kits</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/90 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              About
            </NavLink>

            <NavLink
              to="/faq"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/90 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              FAQ
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/90 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleFastApply}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <span>Apply for Internship</span>
              <ArrowRight size={14} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(prev => !prev)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-expanded={mobileOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-semibold ${
                location.pathname === '/' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/internships"
              className={`block px-3 py-2 rounded-md text-base font-semibold ${
                location.pathname.startsWith('/internships') ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Internships (12 Tracks)
            </Link>

            <div className="pt-2 pb-1 border-t border-slate-100">
              <span className="block px-3 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                Explore Programs
              </span>

              <Link
                to="/workshops"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.startsWith('/workshops') ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Layers size={16} className="text-emerald-600" />
                <span>Workshops & Masterclasses</span>
              </Link>

              <Link
                to="/magazine"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.startsWith('/magazine') ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <BookOpen size={16} className="text-teal-600" />
                <span>Tech Magazine Journal</span>
              </Link>

              <Link
                to="/articles"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.startsWith('/articles') ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileText size={16} className="text-emerald-600" />
                <span>Articles & Guides</span>
              </Link>

              <Link
                to="/goodies"
                className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname.startsWith('/goodies') ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Gift size={16} className="text-amber-600" />
                  <span>Goodies & Swag</span>
                </div>
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                  Coming Soon
                </span>
              </Link>
            </div>

            <div className="pt-2 pb-1 border-t border-slate-100">
              <Link
                to="/about"
                className={`block px-3 py-2 rounded-md text-base font-semibold ${
                  location.pathname === '/about' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                About SkillSet Go
              </Link>

              <Link
                to="/faq"
                className={`block px-3 py-2 rounded-md text-base font-semibold ${
                  location.pathname === '/faq' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Frequently Asked Questions
              </Link>

              <Link
                to="/contact"
                className={`block px-3 py-2 rounded-md text-base font-semibold ${
                  location.pathname === '/contact' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                Contact & Support
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handleFastApply}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-emerald-600/20 hover:bg-emerald-700 cursor-pointer"
              >
                <span>Apply for Internship</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
