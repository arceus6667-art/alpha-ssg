/**
 * SkillSet Go EduTech - Magazine Publication Data
 * Editorial tech journal issues showcasing student research, industry insights, and engineering breakthroughs.
 */

export const magazines = [
  {
    id: "mag-vol-03-q3",
    slug: "volume-03-issue-03-autonomous-future-ai-engineering",
    edition: "Volume 3 • Issue 3",
    issueNumber: "Q3 2026",
    title: "The Autonomous Era: Engineering Beyond Prompting",
    subtitle: "From Language Models to Actionable Systems — How Student Engineers are Building Autonomous Workflows",
    description: "In this flagship edition, we explore how next-generation software engineers are transitioning from basic AI wrappers to robust, distributed autonomous agent architectures. Features in-depth interviews with industry founders, student project case studies, and engineering breakdowns.",
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    publicationDate: "September 2026",
    isoDate: "2026-09-15",
    editorInChief: "Editorial Board, SkillSet Go EduTech",
    pageCount: 48,
    readTime: "35 min read",
    featured: true,
    pdfUrl: "#", // Direct download or reader link
    topics: [
      "Agentic Frameworks: LangGraph vs AutoGen in Production",
      "Why 'Proof of Work' is Replacing the Traditional Tech Resume",
      "Mechatronics Meets Edge Computing: Modern Smart Robotics",
      "Student Spotlight: Building a Real-Time Cyber Vulnerability Scanner"
    ],
    tableOfContents: [
      { page: "04", title: "Letter from the Founders: Redefining Real-World Learning" },
      { page: "08", title: "The Death of Generic Portfolios: Why Real Projects Matter" },
      { page: "16", title: "Deep Dive: Building Scalable Microservices with Go & Kubernetes" },
      { page: "26", title: "Mechatronics in 2026: Designing Cyber-Physical Automation Systems" },
      { page: "34", title: "Internship Showcase: Top 5 Outstanding Proofs of Work" },
      { page: "44", title: "Career Compass: Landing Your First Technical Role" },
    ],
    highlights: [
      "Exclusive interview with top ML systems architects",
      "Curated repository links and open-source starter code",
      "Comprehensive benchmark reviews of 2026 frontend tooling"
    ]
  },
  {
    id: "mag-vol-03-q2",
    slug: "volume-03-issue-02-cloud-resilience-cyber-defense",
    edition: "Volume 3 • Issue 2",
    issueNumber: "Q2 2026",
    title: "Cloud Resilience & Zero Trust: Modern Security Architectures",
    subtitle: "Navigating Multi-Cloud Infrastructure, IAM Governance, and Next-Gen Defensive Security",
    description: "A comprehensive investigation into how modern applications protect sensitive data across distributed cloud endpoints. Features practical guidelines on container security, automated CI/CD security audits, and cloud cost governance.",
    coverImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    publicationDate: "June 2026",
    isoDate: "2026-06-10",
    editorInChief: "Editorial Board, SkillSet Go EduTech",
    pageCount: 42,
    readTime: "30 min read",
    featured: false,
    pdfUrl: "#",
    topics: [
      "Zero Trust Architecture in Distributed Microservices",
      "OWASP API Security Top 10 Walkthrough",
      "Kubernetes Hardening: Network Policies and Pod Security Standards",
      "The Cost of Cloud Waste: FinOps for Fast-Growing Tech Startups"
    ],
    tableOfContents: [
      { page: "03", title: "Foreword: Security as a First-Class Citizen" },
      { page: "09", title: "Anatomy of an API Breach: Lessons Learned from Real CVEs" },
      { page: "19", title: "Container Security Auditing with Trivy & Falco" },
      { page: "28", title: "The Rise of Platform Engineering over Traditional DevOps" },
      { page: "38", title: "Student Research: Decentralized Identity Verification Protocols" },
    ],
    highlights: [
      "Actionable checklist for cloud infrastructure audits",
      "Hands-on teardown of modern API vulnerabilities",
      "Student research paper publication excerpts"
    ]
  },
  {
    id: "mag-vol-03-q1",
    slug: "volume-03-issue-01-human-centered-ui-ux-spatial",
    edition: "Volume 3 • Issue 1",
    issueNumber: "Q1 2026",
    title: "Human-Centered Design: Crafting Intuitive Digital Experiences",
    subtitle: "From Micro-interactions to Spatial UI — Bridging the Gap Between Engineering and Emotion",
    description: "Designers and frontend engineers collaborate to dissect the principles of accessible, delightful user experiences. Includes design system tear-downs, typography masterclasses, and case studies on conversion-oriented UX.",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    publicationDate: "March 2026",
    isoDate: "2026-03-20",
    editorInChief: "Editorial Board, SkillSet Go EduTech",
    pageCount: 38,
    readTime: "28 min read",
    featured: false,
    pdfUrl: "#",
    topics: [
      "Typography & Spacing: The Invisible Foundations of SaaS Design",
      "Accessibility (WCAG 2.2) Done Right Without Sacrificing Beauty",
      "Micro-Interactions that Increase User Retention by 40%",
      "Transitioning from Junior Designer to Product Design Lead"
    ],
    tableOfContents: [
      { page: "04", title: "Why Good Code Deserves Exceptional Design" },
      { page: "11", title: "Design System Architecture: Tokens, Variants & Components" },
      { page: "20", title: "Case Study: Redesigning a FinTech Onboarding Flow" },
      { page: "29", title: "Figma to React: Eliminating Designer-Developer Friction" },
      { page: "35", title: "Portfolio Critiques: What Hiring Managers Actually Look For" },
    ],
    highlights: [
      "Complete downloadable Figma design system starter file",
      "Detailed color theory and accessible contrast guidelines",
      "Critique rubrics for junior design portfolios"
    ]
  }
];

export function getMagazineBySlug(slug) {
  return magazines.find(m => m.slug === slug);
}
