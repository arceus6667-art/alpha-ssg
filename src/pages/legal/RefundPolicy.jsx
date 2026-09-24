import React from 'react';
import SEO from '../../components/SEO';
import SectionHeader from '../../components/SectionHeader';
import { siteConfig } from '../../config/siteConfig';

export default function RefundPolicy() {
  const lastUpdated = "September 20, 2026";

  return (
    <div className="bg-white min-h-screen py-12 lg:py-16">
      <SEO
        title="Refund Policy | SkillSet Go EduTech"
        description="Read the refund policy for SkillSet Go EduTech paid workshop seats, specialized cohorts, and learning materials."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <SectionHeader
          eyebrow="Legal & Compliance"
          title="Refund Policy"
          description={`Last updated: ${lastUpdated}. Outlines the conditions under which refund requests are processed.`}
        />

        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Free Internship Programs</h2>
            <p>
              Standard application and participation in our primary project-based internship cohort roadmaps are generally free of upfront charge for enrolled students. Where no fee was collected, refund provisions are not applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Paid Workshops & Masterclasses</h2>
            <p>
              For paid weekend workshops or live interactive bootcamps:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Cancellation &gt; 48 Hours Prior:</strong> If you request a cancellation at least 48 hours before the scheduled live session starts, a 100% refund will be issued to your original payment method.</li>
              <li><strong>Cancellation Within 48 Hours:</strong> Cancellations made less than 48 hours before the scheduled session are non-refundable, but you will receive full access to the recorded session, slide deck, and starter code repositories.</li>
              <li><strong>Session Rescheduling by SkillSet Go:</strong> In the rare event that an instructor becomes unavailable and the session is cancelled or rescheduled by our team, registered participants may request either a full refund or seat transfer to the rescheduled date.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How to Request a Refund</h2>
            <p>
              To initiate a refund request for an eligible transaction, send an email to <span className="font-mono text-blue-600 font-semibold">{siteConfig.contact.email}</span> with your registered email, order or transaction ID, and the workshop title. Eligible refunds are processed within 5 to 7 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
