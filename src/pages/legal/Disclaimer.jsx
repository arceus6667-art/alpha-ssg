import React from 'react';
import SEO from '../../components/SEO';
import SectionHeader from '../../components/SectionHeader';
import { siteConfig } from '../../config/siteConfig';

export default function Disclaimer() {
  const lastUpdated = "September 20, 2026";

  return (
    <div className="bg-white min-h-screen py-12 lg:py-16">
      <SEO
        title="Educational Disclaimer | SkillSet Go EduTech"
        description="Important legal disclaimer regarding SkillSet Go EduTech educational programs, certificates, and career outcomes."
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <SectionHeader
          eyebrow="Legal & Compliance"
          title="Educational Platform Disclaimer"
          description={`Last updated: ${lastUpdated}. Important clarifications on the educational nature of our programs.`}
        />

        <div className="prose prose-slate max-w-none text-slate-700 space-y-6 text-sm sm:text-base leading-relaxed">
          <section className="rounded-xl border border-blue-200 bg-blue-50/60 p-5">
            <h2 className="text-lg font-bold text-blue-900 mb-2">
              Summary Notice for All Learners
            </h2>
            <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
              {siteConfig.companyName} is an independent technology skills platform. Our internships are structured, remote practical learning experiences designed around project-based milestones and GitHub proof of work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. No Job or Placement Guarantee</h2>
            <p>
              {siteConfig.companyName} does NOT provide guaranteed employment, job placements, interviews with third parties, or minimum salary promises. 
            </p>
            <p>
              Career advancement and hiring outcomes depend entirely on individual student diligence, problem-solving skills, external job market conditions, and interview performance. Our role is to provide the guided framework, feedback, and project challenges to help you become a stronger candidate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Independent Educational Institution Status</h2>
            <p>
              {siteConfig.companyName} is an independent training and education entity. Unless explicitly listed with written partnership agreements on our website, we do not claim formal accreditation from university bodies, governmental education departments, or specific corporate entities. Certificates issued are credentials of program milestone completion issued by {siteConfig.companyName}.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. External Links & Third-Party Tools</h2>
            <p>
              Our guides, roadmaps, and tutorials often reference external websites, developer tools, and services (such as GitHub, Vercel, Figma, Google, and Python). {siteConfig.companyName} does not own or control these external platforms and is not responsible for their service availability or privacy practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Accuracy of Information</h2>
            <p>
              While we strive to keep our technology tracks up to date with modern industry frameworks (e.g. React 19, Gemini 3.5, Kubernetes), software ecosystems evolve rapidly. Content is provided on an "as is" educational basis.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
