import React from 'react';
import SEO from '../../components/SEO';
import SectionHeader from '../../components/SectionHeader';
import { siteConfig } from '../../config/siteConfig';

export default function TermsAndConditions() {
  const lastUpdated = "September 20, 2026";

  return (
    <div className="bg-white min-h-screen py-12 lg:py-16">
      <SEO
        title="Terms & Conditions | SkillSet Go EduTech"
        description="Review the terms and conditions governing enrollment, project evaluations, intellectual property, and acceptable use at SkillSet Go EduTech."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <SectionHeader
          eyebrow="Legal & Compliance"
          title="Terms & Conditions"
          description={`Last updated: ${lastUpdated}. Please read these terms carefully before applying or enrolling.`}
        />

        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing the {siteConfig.companyName} website, registering for technical workshops, or submitting an application for an internship cohort, you agree to be bound by these Terms and Conditions. If you do not agree, please refrain from using our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Nature of the Programs</h2>
            <p>
              {siteConfig.companyName} provides virtual, project-based educational internship programs, guided roadmaps, and technical masterclasses. 
            </p>
            <p className="font-semibold text-slate-900 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              Crucial Notice: These programs are hands-on skill-building training experiences. Enrollment does not constitute formal employment with SkillSet Go EduTech or guarantee any salary, stipend, placement, or hiring by third parties unless explicitly stated in writing.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Academic Integrity & Original Submissions</h2>
            <p>
              Participants must submit code and documentation that reflect their own genuine understanding. While referencing open-source libraries and documentation is encouraged, wholesale plagiarism, submitting pre-existing repositories, or submitting work authored by third parties is grounds for immediate termination without certificate issuance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Intellectual Property Rights</h2>
            <p>
              <strong>Learner Ownership:</strong> You retain complete ownership of all code, designs, and capstone projects created by you during the internship.
            </p>
            <p>
              <strong>Platform Materials:</strong> Curated curriculum documentation, proprietary starter boilerplates, magazine issues, and workshop lecture content remain the intellectual property of {siteConfig.companyName}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Certification Requirements</h2>
            <p>
              Issuance of the SkillSet Go EduTech Certificate of Completion is strictly contingent upon:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li>Timely submission of weekly milestone tasks within the cohort deadline window.</li>
              <li>Completion of a functional capstone project meeting the specified rubrics.</li>
              <li>Satisfactory evaluation by assigned technical mentors.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Code of Conduct</h2>
            <p>
              All community members, students, and attendees must maintain a respectful, professional environment in discord channels, discussion forums, and live workshops. Harassment, discriminatory language, or abusive behavior will result in permanent exclusion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Limitation of Liability</h2>
            <p>
              {siteConfig.companyName} shall not be liable for any indirect, incidental, or consequential damages resulting from platform downtime, third-party software updates, or student academic standing with outside institutions.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
