/**
 * SkillSet Go EduTech - Central Site Configuration
 * Single source of truth for branding, application links, contact, metrics and navigation.
 */

export const siteConfig = {
  companyName: "SkillSet Go EduTech",
  shortName: "SkillSet Go",
  tagline: "Learn. Build. Prove.",
  subTagline: "Structured project-based internships, technical workshops, and career-oriented learning paths.",
  
  // Global Google Form application URL (as requested by client)
  applicationFormUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdrxqrL94MGoquJU_q1T_JATzufCRSAhJ1LFqMl3HkCaBJOkQ/viewform?usp=dialog",

  // Contact Information
  contact: {
    email: "admin@skillsetgoedutech.in",
    adminEmail: "admin@skillsetgoedutech.in",
    admissionsEmail: "senior-hr@skillsetgoedutech.in",
    hrEmail: "senior-hr@skillsetgoedutech.in",
    phone: "+91 98765 43210", // Configurable placeholder for official contact
    location: "Mumbai, Maharashtra, India",
    workingHours: "Monday - Saturday: 9:30 AM – 6:30 PM IST",
    responseTime: "Typically responds within 24 business hours",
  },

  // Editable Impact Metrics
  metrics: {
    learnersCount: "1,500+",
    learnersLabel: "Enrolled Learners",
    domainsCount: "12",
    domainsLabel: "Internship Domains",
    projectsCount: "150+",
    projectsLabel: "Real-World Projects",
  },

  // Social Channels
  socials: {
    linkedin: "https://linkedin.com/company/skillsetgo-edutech",
    github: "https://github.com/arceus6667-art/SkillSetGoEdutech",
    youtube: "https://youtube.com/@skillsetgoedutech",
    instagram: "https://instagram.com/skillsetgoedutech",
    twitter: "https://twitter.com/skillsetgoedutech",
    discord: "https://discord.gg/skillsetgo",
  },

  // Main Navigation Items
  navigation: [
    { name: "Home", path: "/" },
    { name: "Internships", path: "/internships" },
    {
      name: "Explore",
      isDropdown: true,
      children: [
        { name: "Workshops", path: "/workshops", description: "Hands-on weekend masterclasses & tech bootcamps" },
        { name: "Magazine", path: "/magazine", description: "Quarterly student tech journal & research insights" },
        { name: "Articles", path: "/articles", description: "Guides, tutorials, roadmaps & career advice" },
        { name: "Goodies", path: "/goodies", description: "Official learner swag, kits & badges (Coming Soon)", badge: "Soon" },
      ],
    },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ],

  // Legal & Compliance Links
  legalLinks: [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Refund Policy", path: "/refund-policy" },
    { name: "Cancellation Policy", path: "/cancellation-policy" },
    { name: "Cookie Policy", path: "/cookie-policy" },
    { name: "Disclaimer", path: "/disclaimer" },
  ],
};

export default siteConfig;
