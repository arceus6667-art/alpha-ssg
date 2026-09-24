import React from 'react';
import SEO from '../../components/SEO';
import SectionHeader from '../../components/SectionHeader';
import { siteConfig } from '../../config/siteConfig';

export default function CookiePolicy() {
  const lastUpdated = "September 20, 2026";

  return (
    <div className="bg-white min-h-screen py-12 lg:py-16">
      <SEO
        title="Cookie Policy | SkillSet Go EduTech"
        description="Learn how SkillSet Go EduTech uses cookies and client-side storage to enhance navigation and track performance."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <SectionHeader
          eyebrow="Legal & Compliance"
          title="Cookie Policy"
          description={`Last updated: ${lastUpdated}. Information on cookies, local storage, and tracking technologies.`}
        />

        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. What Are Cookies & Local Storage?</h2>
            <p>
              Cookies and web storage (such as LocalStorage) are small data files stored in your web browser that allow a website to remember your device, preferences, and session state between visits.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Cookies & Storage</h2>
            <p>We use minimal, privacy-respecting client technologies for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Essential Functional Storage:</strong> Remembering whether you dismissed announcement banners, filter settings on internship listings, and responsive navigation state.</li>
              <li><strong>Application Click Tracking:</strong> Recording anonymous click events when you press "Apply for Internship" to ensure referral parameters are logged before redirecting to Google Forms.</li>
              <li><strong>Performance & Analytics:</strong> Understanding which tracks and tutorials are most viewed so we can develop better educational roadmaps.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Managing Your Cookie Preferences</h2>
            <p>
              Most browsers allow you to control cookies through their settings preferences (often under "Privacy & Security"). You can choose to block cookies or clear local storage at any time. The core internship catalog and reading materials will continue to function normally.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
