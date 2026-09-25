import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AnnouncementBanner from './components/AnnouncementBanner';
import useAdminShortcut from './hooks/useAdminShortcut';

// Public Pages
import Home from './pages/Home';
import Internships from './pages/Internships';
import InternshipDetails from './pages/InternshipDetails';
import Workshops from './pages/Workshops';
import WorkshopDetails from './pages/WorkshopDetails';
import Magazine from './pages/Magazine';
import MagazineDetails from './pages/MagazineDetails';
import Articles from './pages/Articles';
import ArticleDetails from './pages/ArticleDetails';
import Goodies from './pages/Goodies';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';

// Legal & Policy Pages
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import RefundPolicy from './pages/legal/RefundPolicy';
import CancellationPolicy from './pages/legal/CancellationPolicy';
import CookiePolicy from './pages/legal/CookiePolicy';
import Disclaimer from './pages/legal/Disclaimer';

// 404
import NotFound from './pages/NotFound';

// Admin Architecture
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUpdates from './pages/admin/AdminUpdates';
import AdminWorkshops from './pages/admin/AdminWorkshops';
import AdminMagazine from './pages/admin/AdminMagazine';
import AdminArticles from './pages/admin/AdminArticles';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminFutureModule from './pages/admin/AdminFutureModule';
import AntiGravityCanvas from './components/AntiGravityCanvas';
import AdminSettings from './pages/admin/AdminSettings';
import VerificationPortal from './pages/VerificationPortal';
import AdminVerification from './pages/admin/AdminVerification';

export default function App() {
  const { pathname } = useLocation();

  // Activate secret CTRL + SHIFT + A listener
  useAdminShortcut();

  // Scroll to top automatically on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <div className="relative flex min-h-screen flex-col bg-[#fcfdfd] font-sans text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
      {/* Global Running Anti-Gravity Pixel Background across all public pages */}
      {!isAdminRoute && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <AntiGravityCanvas
            particleCount={85}
            interactive={true}
            theme="green"
            className="w-full h-full"
          />
        </div>
      )}

      {/* Public Header & Announcement Banner only on non-admin routes */}
      {!isAdminRoute && (
        <div className="relative z-50">
          <AnnouncementBanner />
          <Header />
        </div>
      )}

      <main className="flex-1 relative z-10">
        <Routes>
          {/* ====================================================
              PUBLIC ROUTES
              ==================================================== */}
          <Route path="/" element={<Home />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/internships/:slug" element={<InternshipDetails />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/:slug" element={<WorkshopDetails />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/magazine/:slug" element={<MagazineDetails />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetails />} />
          <Route path="/goodies" element={<Goodies />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verification" element={<VerificationPortal />} />
          <Route path="/verify" element={<VerificationPortal />} />

          {/* Legal Pages */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* ====================================================
              ADMIN AUTHENTICATION & PORTAL ROUTES
              ==================================================== */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="updates" element={<AdminUpdates />} />
            <Route path="workshops" element={<AdminWorkshops />} />
            <Route path="magazine" element={<AdminMagazine />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="verification" element={<AdminVerification />} />

            {/* Future Modules — Under Construction */}
            <Route path="users" element={<AdminFutureModule />} />
            <Route path="domains" element={<AdminFutureModule />} />
            <Route path="projects" element={<AdminFutureModule />} />
            <Route path="offer-letters" element={<AdminFutureModule />} />
            <Route path="sales" element={<AdminFutureModule />} />
            <Route path="categories" element={<AdminFutureModule />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Public Footer only on non-admin routes */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}
