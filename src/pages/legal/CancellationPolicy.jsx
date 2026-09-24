import React from 'react';
import SEO from '../../components/SEO';
import SectionHeader from '../../components/SectionHeader';
import { siteConfig } from '../../config/siteConfig';

export default function CancellationPolicy() {
  const lastUpdated = "September 20, 2026";

  return (
    <div className="bg-white min-h-screen py-12 lg:py-16">
      <SEO
        title="Cancellation Policy | SkillSet Go EduTech"
        description="Learn about enrollment cancellation, withdrawal procedures, and seat releases at SkillSet Go EduTech."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <SectionHeader
          eyebrow="Legal & Compliance"
          title="Cancellation Policy"
          description={`Last updated: ${lastUpdated}. Details on how to withdraw from cohorts or cancel session seats.`}
        />

        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Withdrawing from an Internship Cohort</h2>
            <p>
              We understand that college exams, academic coursework, or family priorities may arise. If you are unable to continue your active internship cohort, you may withdraw gracefully by emailing <span className="font-mono text-blue-600 font-semibold">{siteConfig.contact.admissionsEmail}</span>.
            </p>
            <p>
              Withdrawing does not penalize your ability to apply for future cohorts. However, milestone progress is cohort-specific and cannot be transferred across different months.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Inactivity and Automated Drop Policy</h2>
            <p>
              To maintain high accountability, learners who do not submit milestone tasks for two consecutive weeks without notifying the mentorship desk may be automatically marked as inactive to release cohort slots. Inactive learners will not receive a certificate for that cohort cycle.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Workshop Seat Cancellations</h2>
            <p>
              For live workshops, please notify our team as early as possible if you cannot attend live so that waitlisted students can be invited. Please refer to our Refund Policy for financial terms regarding paid workshop cancellations.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
