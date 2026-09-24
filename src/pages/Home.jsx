import { Link } from 'react-router-dom';
import { ArrowRight, Code2, BadgeCheck, FolderKanban, Route, FileCheck2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import InternshipCard from '../components/InternshipCard';
import { internships } from '../data/internships';

const steps = [
  ['01', 'Explore & Select Track', 'Browse available tracks, review practical details and choose the pathway that fits your learning goals.'],
  ['02', 'Apply via Form', 'Submit the internship application using the official Google Form linked to the program.'],
  ['03', 'Build & Prove', 'Complete structured tasks and projects, document your work and build a portfolio-ready proof of work.']
];

const GithubIcon = Icons.Github ?? Icons.GitBranch ?? Icons.Code2;

const benefits = [
  [FolderKanban, 'Real-World Projects', 'Build practical work that can become part of your portfolio.'],
  [GithubIcon, 'Auditable GitHub Proof', 'Keep structured repositories and visible evidence of progress.'],
  [BadgeCheck, 'Verifiable Credential', 'Complete requirements and receive the relevant internship credential.'],
  [Route, 'Career & Portfolio Growth', 'Turn completed work into stronger GitHub and LinkedIn proof.']
];

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">Skill Set Go Internship Program</div>
            <h1>Build Skills.<br />Work on Projects.<br /><span>Prove What You Can Do.</span></h1>
            <p>Explore structured internship tracks designed to help students practice real skills, build portfolio-ready projects and create visible proof of work.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/internships">Explore Internships <ArrowRight size={17} /></Link>
              <a className="button secondary" href="#how-it-works">How It Works</a>
            </div>
          </div>

          <div className="milestone-panel" aria-label="Internship pathway preview">
            <div className="panel-header"><span className="status-dot" /> Verified Project Milestone <span className="mini-pill">ACTIVE TRACK</span></div>
            <div className="timeline">
              <div className="timeline-item done"><span>1</span><div><strong>Phase 1: Foundations</strong><small>Core setup, fundamentals and learning workflow.</small></div><b>Done</b></div>
              <div className="timeline-item done"><span>2</span><div><strong>Phase 2: Implementation</strong><small>Feature integration, practical tasks and proof preparation.</small></div><b>Done</b></div>
              <div className="timeline-item active"><span>3</span><div><strong>Phase 3: Capstone Deployment</strong><small>Build the final project and structure the portfolio proof.</small></div><b>In Review</b></div>
              <div className="timeline-item"><span>4</span><div><strong>Phase 4: Verified Proof of Work</strong><small>Complete final documentation and submission.</small></div><b>Pending</b></div>
            </div>
            <div className="panel-foot"><Code2 size={14} /> Structured learning pathway</div>
          </div>
        </div>

        <div className="container metric-grid">
          <div><strong>11 Tracks</strong><span>Technical Domains</span></div>
          <div><strong>Project-Based</strong><span>Practical Learning</span></div>
          <div><strong>GitHub</strong><span>Proof of Work</span></div>
          <div><strong>1 Month</strong><span>Structured Internship</span></div>
        </div>
      </section>

      <section className="section tinted">
        <div className="container">
          <div className="section-heading centered"><div className="eyebrow">Explore Internship Tracks</div><h2>Featured Internship Tracks</h2><p>Start with one of our featured domains or explore all available internships.</p></div>
          <div className="card-grid featured-grid">{internships.slice(0, 6).map(item => <InternshipCard internship={item} key={item.slug} />)}</div>
          <div className="center-action"><Link className="button secondary" to="/internships">View All 11 Internships <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <div className="section-heading centered"><div className="eyebrow">Process Clarity</div><h2>How It Works</h2><p>A simple path from exploration to portfolio-ready proof of work.</p></div>
          <div className="steps-grid">{steps.map(([n, title, text]) => <div className="step-card" key={n}><div className="step-number">{n}</div><FileCheck2 size={19} /><h3>{title}</h3><p>{text}</p></div>)}</div>
        </div>
      </section>

      <section className="section tinted" id="why-us">
        <div className="container">
          <div className="section-heading centered"><div className="eyebrow">Core Advantage</div><h2>Why Skill Set Go?</h2><p>Built around project execution, visible progress and structured learning.</p></div>
          <div className="benefits-grid">{benefits.map(([Icon, title, text]) => <div className="benefit-card" key={title}><span className="icon-box"><Icon size={20} /></span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-panel"><div><div className="eyebrow lime">Next Cohort</div><h2>Ready to Build Your Proof of Work?</h2><p>Explore a track, review the program details and apply when your preferred internship opens.</p></div><div className="cta-actions"><Link className="button lime-button" to="/internships">Browse All Tracks <ArrowRight size={17} /></Link></div></div>
      </section>
    </>
  );
}
