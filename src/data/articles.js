/**
 * SkillSet Go EduTech - Technical Articles & Knowledge Base
 * In-depth tutorials, architectural guides, career tips, and project breakdowns.
 */

export const articleCategories = [
  "All",
  "AI & Machine Learning",
  "Web Development",
  "Cloud & DevOps",
  "Cybersecurity",
  "Career & Internships",
  "Mechatronics & Hardware",
];

export const articles = [
  {
    id: "art-01",
    slug: "why-proof-of-work-beats-resumes-tech-hiring-2026",
    title: "Why 'Proof of Work' is Replacing the Traditional Resume in Tech Hiring",
    excerpt: "Engineering managers are increasingly bypassing bullet-pointed PDFs in favor of verifiable GitHub repositories, live deployed projects, and structured architectural documentation.",
    category: "Career & Internships",
    author: {
      name: "Tanvi Saxena",
      role: "Head of Talent & Engineering Partnerships",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "September 18, 2026",
    isoDate: "2026-09-18",
    readingTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Career Advice", "GitHub", "Proof of Work", "Internships", "Resume Building"],
    content: `
### The Fundamental Problem with Modern Tech Resumes

For decades, landing an engineering interview followed a predictable script: format a two-page resume, list academic coursework, sprinkle in keywords like "React", "Python", and "Docker", and submit it to job boards.

In 2026, automated Applicant Tracking Systems (ATS) and generative tools have inundated hiring managers with hundreds of virtually identical resumes. When every applicant lists the same buzzwords, traditional resumes cease to be an effective differentiator.

### What Technical Hiring Managers Actually Care About

When senior engineers and tech leads review candidate submissions, they ask three decisive questions:

1. **Can this person write clean, maintainable, and idiomatic code?**
2. **Do they understand the architectural trade-offs behind their tech stack choices?**
3. **Can they take a project from an ambiguous requirement to a reliable, deployed solution?**

A bullet point saying *"Built a scalable web application"* answers none of these questions. A live URL paired with a well-structured GitHub repository, meaningful git commits, automated tests, and clear README documentation answers all three instantly.

### Anatomy of an Irresistible Proof of Work

At SkillSet Go EduTech, every internship milestone is designed around verifiable evidence. Here is what separates exceptional proof of work from generic college projects:

- **Live Production URL**: A working deployment on Vercel, Cloud Run, AWS, or Railway that anyone can click and test in 5 seconds.
- **Architectural Decision Records (ADRs)**: A short section in your repository explaining why you chose PostgreSQL over MongoDB, or why you implemented Redis caching.
- **Clean Commit History**: Small, purposeful commits with semantic messages (\`feat:\`, \`fix:\`, \`refactor:\`) demonstrating progressive problem-solving over time.
- **Edge Case Handling**: Form validation, error boundaries, responsive layouts, and graceful loading states.

### Actionable Next Steps for Learners

Don't wait for permission or formal experience to build your reputation. Choose a challenging problem domain, build a focused proof of work, document your journey publicly, and let your code speak for itself.
    `
  },
  {
    id: "art-02",
    slug: "building-scalable-rag-pipelines-hybrid-search",
    title: "Architecting Production RAG Pipelines with Hybrid Vector & Keyword Search",
    excerpt: "Pure vector similarity frequently fails on exact product SKUs, code snippets, and proper nouns. Learn how hybrid retrieval solves semantic drift in production LLM applications.",
    category: "AI & Machine Learning",
    author: {
      name: "Aditya Sharma",
      role: "Lead AI Systems Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "September 14, 2026",
    isoDate: "2026-09-14",
    readingTime: "9 min read",
    coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    tags: ["RAG", "Generative AI", "Vector Databases", "Embeddings", "Python"],
    content: `
### Beyond Naive Vector Retrieval

Retrieval-Augmented Generation (RAG) has emerged as the standard pattern for grounding Large Language Models on proprietary corporate documents. However, teams quickly discover that standard cosine similarity over dense vector embeddings fails in critical edge cases:

- Part numbers, error codes, and unique identifiers (e.g. \`ERR_CONN_REFUSED_503\`)
- Exact keyword matches versus loose thematic synonyms
- Multi-lingual cross-queries

### The Solution: Hybrid Search & Reciprocal Rank Fusion

Hybrid search combines the best of two complementary worlds:

1. **Dense Vector Search (Semantic Understanding)**: Captures intent, synonyms, and conceptual similarities across queries.
2. **Sparse BM25 Keyword Search (Exact Precision)**: Ensures that specific product codes, variable names, and precise phrases are prioritized without losing context.

Using algorithms like Reciprocal Rank Fusion (RRF), scores from both search modes are combined to produce a ranked list of chunks that dramatically outperform single-vector indexes.

### Implementing Re-Ranking for Token Efficiency

Feeding 20 retrieved chunks directly to your LLM wastes expensive context window tokens and increases prompt latency. By introducing a cross-encoder re-ranking stage, we can filter down to the top 3-5 most pertinent chunks before calling Gemini or Claude models.

### Key Engineering Takeaway

Don't treat RAG as a simple vector database lookup. Treat it as a multi-stage search engine pipeline with query rewriting, hybrid retrieval, re-ranking, and citation tracking.
    `
  },
  {
    id: "art-03",
    slug: "mastering-react-19-server-actions-compiler",
    title: "Mastering React 19: Server Actions, optimistic UI, and the React Compiler",
    excerpt: "Say goodbye to manual useMemo/useCallback optimizations and endless useEffect boilerplate. Explore how React 19 revolutionizes modern frontend architecture.",
    category: "Web Development",
    author: {
      name: "Sneha Patel",
      role: "Staff Frontend Architect",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "September 08, 2026",
    isoDate: "2026-09-08",
    readingTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    tags: ["React 19", "JavaScript", "Frontend", "Performance", "Web Development"],
    content: `
### The New Mental Model for React

For years, React developers spent countless hours managing re-render optimization with \`useMemo\`, \`useCallback\`, and \`React.memo\`. React 19 completely changes this paradigm with the automated React Compiler and first-class async actions.

### 1. The React Compiler: Automatic Memoization

The React Compiler analyzes your JavaScript code at build time, understanding values and dependency graphs automatically. It eliminates the cognitive overhead of determining whether a calculation or object identity needs manual caching.

### 2. Built-In Async State: useActionState & useOptimistic

Updating data on a server used to require:
- A state for \`loading\`
- A state for \`error\`
- A state for \`data\`
- An async handler with \`try/catch\`

With React 19's \`useActionState\` and \`useOptimistic\`, updating a user profile or submitting a form is reduced to a concise declarative pattern that handles pending transitions and instant UI updates out of the box.

### 3. Native Asset Loading and Metadata

Page titles, meta descriptions, and stylesheets are now natively hoisted by React without requiring external packages like React Helmet.

### Conclusion

React 19 is not just an incremental update; it's a simplification of the entire developer experience that lets engineers focus on building great products rather than micromanaging the rendering lifecycle.
    `
  },
  {
    id: "art-04",
    slug: "top-api-vulnerabilities-how-to-fix-them",
    title: "The Top 5 API Security Vulnerabilities and How to Remediate Them",
    excerpt: "APIs now represent over 80% of all web traffic. Here is a breakdown of Broken Object Level Authorization (BOLA), mass assignment, and how to safeguard your endpoints.",
    category: "Cybersecurity",
    author: {
      name: "Rohan Mehta",
      role: "Security Researcher",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "August 28, 2026",
    isoDate: "2026-08-28",
    readingTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    tags: ["API Security", "OWASP", "BOLA", "Cybersecurity", "Authentication"],
    content: `
### APIs: The Primary Attack Surface

As modern applications shift toward decoupled microservices and single-page applications, backend APIs are increasingly exposed directly to the internet. 

Automated penetration tests repeatedly discover that traditional network firewalls are blind to business-logic vulnerabilities embedded inside API routes.

### 1. Broken Object Level Authorization (BOLA)

BOLA remains the #1 threat on the OWASP API Security Top 10. It occurs when an endpoint accepts an object ID directly from the user request (e.g. \`GET /api/invoices/10492\`) without verifying that the currently authenticated user owns that specific invoice.

**The Fix**: Always enforce ownership checks in your data layer:
\`\`\`sql
SELECT * FROM invoices WHERE id = :invoiceId AND user_id = :currentUserId;
\`\`\`

### 2. Broken Authentication & Weak JWT Validation

Common issues include accepting tokens with the \`none\` algorithm, failing to verify token expiration, or storing sensitive keys in client-accessible local storage.

### 3. Mass Assignment / Unfiltered Object Binding

Allowing clients to post arbitrary JSON payloads directly into ORM entities can allow malicious actors to set \`isAdmin: true\` or manipulate internal balance fields.

**The Fix**: Always validate incoming payloads using strict DTO schemas (such as Zod or Joi) that strip undeclared fields.

### Summary Checklist for Developers

- Require authentication across all non-public endpoints
- Validate tenancy and ownership on every entity request
- Never trust client-supplied privilege flags
- Implement rate limiting on sensitive routes (logins, password resets, export jobs)
    `
  },
  {
    id: "art-05",
    slug: "zero-to-mechatronics-cad-simulation-robotics",
    title: "Getting Started in Mechatronics: From CAD Part Modeling to Robotic Simulation",
    excerpt: "A beginner's roadmap to bridging mechanical design, circuit interfacing, and embedded code through accessible cloud simulation tools.",
    category: "Mechatronics & Hardware",
    author: {
      name: "Dr. K. S. Venkatesh",
      role: "Associate Director of Robotics",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "August 20, 2026",
    isoDate: "2026-08-20",
    readingTime: "7 min read",
    coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Mechatronics", "Robotics", "CAD", "Arduino", "Simulation"],
    content: `
### Why Mechatronics is the Future of Engineering

Modern smart devices — from electric vehicles and medical robotics to automated warehouses — are not purely mechanical or purely software. They are cyber-physical systems where sensors, microcontrollers, mechanical structures, and control algorithms operate in harmony.

### Do You Need an Expensive Physical Lab?

A common misconception among students is that learning mechatronics requires thousands of dollars in physical motors, 3D printers, and microcontrollers.

In reality, the modern aerospace and automotive industries design and validate 90% of their systems inside virtual simulation environments long before cutting the first piece of metal.

### The 4-Pillar Roadmap:

1. **Parametric 3D CAD Modeling**: Master cloud tools like Onshape or Autodesk Fusion 360 to design parts, define constraints, and assemble kinematic joints.
2. **Virtual Circuit Simulation**: Use platforms like Tinkercad Circuits or Wokwi to wire microcontrollers, sensors, and motor drivers in a sandbox without risking blown components.
3. **Control Code**: Write firmware in C++/Python to handle debouncing, PID control loops, and sensor telemetry.
4. **Kinematic & Dynamic Analysis**: Study how forces and torques propagate through your mechanical linkages.

### Conclusion

By mastering cloud CAD and virtual simulation, any aspiring engineer can build an impressive portfolio of functional mechatronic systems that showcase tangible technical depth to recruiters.
    `
  },
  {
    id: "art-06",
    slug: "zero-downtime-deployments-github-actions-kubernetes",
    title: "Achieving Zero-Downtime Deployments with GitHub Actions & Rolling Updates",
    excerpt: "Step-by-step guide to configuring health probes, readiness checks, and blue-green or canary releases to keep your web services available 24/7.",
    category: "Cloud & DevOps",
    author: {
      name: "Vikram Kulkarni",
      role: "Senior Cloud Platform Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    publishedAt: "August 12, 2026",
    isoDate: "2026-08-12",
    readingTime: "8 min read",
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    tags: ["DevOps", "Kubernetes", "CI/CD", "GitHub Actions", "Cloud"],
    content: `
### What Zero-Downtime Actually Means

Deploying new features should never force your users to see a "Site Under Maintenance" banner or encounter dropped HTTP connections. Zero-downtime deployment ensures that the previous version of your service continues serving traffic until the newly deployed instances are fully healthy, warmed up, and ready.

### The Power of Kubernetes Readiness Probes

A pod being in the \`Running\` state does not mean it is ready to handle traffic. A database connection pool may still be initializing, or cache pre-warming may be taking place.

By specifying an explicit \`readinessProbe\` in your Kubernetes deployment:
\`\`\`yaml
readinessProbe:
  httpGet:
    path: /healthz
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
\`\`\`
Kubernetes will only route inbound traffic to the new container once the \`/healthz\` endpoint returns HTTP 200 OK.

### Automating with GitHub Actions

With GitHub Actions, every merge to \`main\` can automatically trigger:
1. Linting & unit test execution
2. Multi-architecture Docker image compilation
3. Image scanning with vulnerability detectors (Trivy)
4. Rolling rollout to production clusters with rollback guarantees on failure

This level of automation transforms deployments from high-stress late-night events into routine, peaceful background processes.
    `
  }
];

export function getArticleBySlug(slug) {
  return articles.find(a => a.slug === slug);
}
