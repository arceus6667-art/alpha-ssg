import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Users,
  Briefcase,
  FolderKanban,
  FileCheck2,
  DollarSign,
  Tag,
  Construction
} from 'lucide-react';
import SEO from '../../components/SEO';
import AdminUnderConstruction from '../../components/admin/AdminUnderConstruction';

const MODULE_CONFIGS = {
  '/admin/users': {
    title: 'Users & Student Enrollment',
    icon: Users,
    description: 'Comprehensive student profile registry, batch cohort assignments, attendance records, and role-based access management.',
    features: [
      'Student profile management with GitHub link verification',
      'Cohort assignment and milestone completion tracking',
      'Role-based permissions (Admin, Mentor, Student Evaluator)',
      'Export student records to CSV and automated reports',
    ]
  },
  '/admin/domains': {
    title: 'Internship Domains & Tracks',
    icon: Briefcase,
    description: 'Custom domain definitions, syllabus roadmaps, prerequisite editing, and cohort capstone requirements.',
    features: [
      'Dynamic curriculum roadmap builder with weekly milestone definitions',
      'Skill tag assignment and difficulty categorization',
      'Capacity limits and automatic registration closing',
      'Draft mode for experimental technology domains',
    ]
  },
  '/admin/projects': {
    title: 'Projects & Deliverables Library',
    icon: FolderKanban,
    description: 'Repository of guided mini-tasks, reference architectures, automated test harnesses, and capstone evaluation rubrics.',
    features: [
      'Project rubric builder and automated grading checklists',
      'GitHub repository starter templates and starter ZIP downloads',
      'Student project showcase approval queue',
      'Benchmark scoring for exceptional portfolio recognition',
    ]
  },
  '/admin/offer-letters': {
    title: 'Offer Letters & Credentials',
    icon: FileCheck2,
    description: 'Automated generation, digital signing, and issuance of formal cohort offer letters and verified completion certificates.',
    features: [
      'Customizable PDF offer letter templates with company seal',
      'Cryptographically verifiable QR code credential generation',
      'Batch issuance to students who satisfy completion criteria',
      'Public credential verification portal integration',
    ]
  },
  '/admin/sales': {
    title: 'Total Sales & Financial Accounting',
    icon: DollarSign,
    description: 'Financial ledger, workshop ticket revenues, institutional billing invoices, and refund reconciliations.',
    features: [
      'Live revenue tracking across paid workshops and specialized bootcamps',
      'College partnership billing and invoice generation',
      'Automated gateway reconciliations and tax reporting',
      'Refund approval workflows and audit trails',
    ]
  },
  '/admin/categories': {
    title: 'Taxonomy & Categories',
    icon: Tag,
    description: 'Organize technical disciplines, article tags, workshop tracks, and skill taxonomies.',
    features: [
      'Unified taxonomy across Internships, Articles, and Workshops',
      'Hierarchical category nesting and slug aliases',
      'Color coding and visual icon association',
      'Automated SEO tag generation per category',
    ]
  },
};

export default function AdminFutureModule() {
  const location = useLocation();
  const config = MODULE_CONFIGS[location.pathname] || {
    title: 'Module',
    icon: Construction,
    description: 'This module is currently being developed and will be available in a future update.',
    features: []
  };

  return (
    <div>
      <SEO
        title={`${config.title} (Under Construction)`}
        description={`Administrative interface for ${config.title}. Currently under construction.`}
      />
      <AdminUnderConstruction
        moduleName={config.title}
        icon={config.icon}
        description={config.description}
        plannedFeatures={config.features}
      />
    </div>
  );
}
