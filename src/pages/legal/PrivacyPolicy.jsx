import React from 'react';
import SEO from '../../components/SEO';
import SectionHeader from '../../components/SectionHeader';
import { siteConfig } from '../../config/siteConfig';

export default function PrivacyPolicy() {
  const lastUpdated = "September 20, 2026";

  return (
    <div className="bg-white min-h-screen py-12 lg:py-16">
      <SEO
        title="Privacy Policy | SkillSet Go EduTech"
        description="Learn how SkillSet Go EduTech collects, uses, and safeguards learner personal information."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <SectionHeader
          eyebrow="Legal & Compliance"
          title="Privacy Policy"
          description={`Last updated: ${lastUpdated}. Explains how we handle applicant data, project submissions, and cookies.`}
        />

        {/* Notice badge */}
        <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-800 mb-8 leading-relaxed">
          <strong>Note to Learners & Stakeholders:</strong> This policy governs the public web portal, internship admissions, and workshop registration services of {siteConfig.companyName}. For questions or data requests, contact <span className="font-mono underline">{siteConfig.contact.email}</span>.
        </div>

        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
            <p>
              When you interact with our website, apply for an internship cohort, register for a live technical masterclass, or send an inquiry, we collect information necessary to provide educational services:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Personal Identifiers:</strong> Name, student email address, phone/WhatsApp number, college/institution, and academic year.</li>
              <li><strong>Academic & Technical Details:</strong> Selected internship track, GitHub profile URL, LinkedIn profile, and resume or portfolio links.</li>
              <li><strong>Submission Artifacts:</strong> Public code repositories, commit histories, technical documentation, and project demo links submitted for evaluation.</li>
              <li><strong>Technical Log Data:</strong> Browser type, approximate location, device details, and referral source collected via standard server analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
            <p>We process your data for legitimate educational and administrative purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Processing cohort applications and communicating admissions decisions.</li>
              <li>Reviewing weekly milestone submissions and issuing verifiable completion certificates.</li>
              <li>Sending essential workshop schedule notifications, zoom/meeting links, and starter code.</li>
              <li>Answering inquiries sent through our contact forms or support channels.</li>
              <li>Maintaining academic integrity and verifying original project submissions.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Application Data & Third-Party Services</h2>
            <p>
              Internship applications are processed via secure Google Forms infrastructure. By submitting an application, your submitted details are stored in access-controlled administrative spreadsheets managed by {siteConfig.companyName}. We never sell, rent, or trade student personal information to third-party marketing brokers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Public Project Artifacts</h2>
            <p>
              Our programs emphasize public "Proof of Work". When you submit a project repository hosted on GitHub or a live deployment on a hosting platform, that content is public according to your own repository privacy settings. We encourage open-source sharing of learning progress.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Retention & Your Rights</h2>
            <p>
              We retain enrollment and certificate verification records so that your credential remains verifiable by employers and colleges. You may request correction or deletion of your contact information by emailing <span className="font-mono text-blue-600">{siteConfig.contact.email}</span>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Policy Updates</h2>
            <p>
              We may revise this Privacy Policy periodically to reflect changes in our legal requirements or educational services. The updated date at the top will indicate when modifications took effect.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
