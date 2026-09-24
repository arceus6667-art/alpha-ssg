import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock3, Laptop2, Gauge, Check } from 'lucide-react';
import * as Icons from 'lucide-react';
import { internships } from '../data/internships';
import ApplyButton from '../components/ApplyButton';

export default function InternshipDetails() {
  const { slug } = useParams();
  const internship = internships.find(item => item.slug === slug);

  if (!internship) {
    return <section className="page-section"><div className="container empty-state">Internship not found. <Link to="/internships">Back to internships</Link></div></section>;
  }

  const renderIcon = (iconName, size = 20) => {
    const Icon = Icons[iconName] || Icons.CheckCircle2;
    return <Icon size={size} />;
  };

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Link className="back-link" to="/internships"><ArrowLeft size={16} /> Back to internships</Link>
          <div className="eyebrow">{internship.category} Internship</div>
          <h1>{internship.title} Internship</h1>
          <p>{internship.description}</p>
          <div className="hero-actions">
            <ApplyButton internship={internship} />
            <button className="button secondary" type="button" onClick={() => document.getElementById('program-details')?.scrollIntoView({ behavior: 'smooth' })}>View Track</button>
          </div>
          <div className="detail-metrics">
            <div><CalendarDays size={18} /><span><small>Duration</small><strong>{internship.duration}</strong></span></div>
            <div><Laptop2 size={18} /><span><small>Mode</small><strong>{internship.mode}</strong></span></div>
            <div><Gauge size={18} /><span><small>Level</small><strong>{internship.level}</strong></span></div>
            <div><Clock3 size={18} /><span><small>Program</small><strong>{internship.hours}</strong></span></div>
            <div><span className="status-dot" /><span><small>Status</small><strong>{internship.status}</strong></span></div>
          </div>
        </div>
      </section>

      <section className="detail-body" id="program-details">
        <div className="container detail-layout">
          <div className="detail-main">
            <section className="content-block">
              <div className="section-kicker">Program Overview</div><h2>About This Internship</h2>
              {internship.about?.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </section>

            <section className="content-block">
              <div className="section-kicker">Technical Toolkit</div><h2>Skills & Frameworks Covered</h2>
              <div className="skill-grid">
                {internship.skills?.map(skill => (
                  <div className="skill-card" key={skill.name}>
                    <Check size={16} /><strong>{skill.name}</strong><p>{skill.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-block">
              <div className="section-kicker">Build & Deliver</div><h2>Assigned Tasks & Capstone Projects</h2>
              <div className="project-list">
                {internship.projects?.map((project, index) => (
                  <div className="project-row" key={`${project.title}-${index}`}>
                    <span>TASK {String(index + 1).padStart(2, '0')}</span>
                    <div><strong>{project.title}</strong><small>{project.description}</small></div>
                    <b>{project.type}</b>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-block">
              <div className="section-kicker">Execution Cycle</div><h2>4-Week Program Roadmap</h2>
              <div className="roadmap-grid">
                {internship.roadmap?.map(item => <div className="roadmap-card" key={item.week}><span>{item.week}</span><h3>{item.title}</h3><p>{item.description}</p></div>)}
              </div>
            </section>

            <section className="content-block">
              <div className="section-kicker">Entry Criteria</div><h2>Eligibility & Prerequisites</h2>
              <div className="two-col-cards">
                {[internship.eligibility?.whoCanApply, internship.eligibility?.requirements].filter(Boolean).map(card => (
                  <div className="info-card" key={card.title}>
                    <h3>{card.title}</h3><p>{card.description}</p>
                    <ul>{card.bullets?.map(item => <li key={item}>{item}</li>)}</ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-block">
              <div className="section-kicker">Outcome & Proof</div><h2>What You Receive Upon Completion</h2>
              <div className="benefits-grid compact-benefits">
                {internship.benefits?.map(benefit => (
                  <div className="benefit-card" key={benefit.title}>
                    {renderIcon(benefit.icon)}
                    <div><h3>{benefit.title}</h3><p>{benefit.description}</p></div>
                  </div>
                ))}
              </div>
            </section>

            <section className="content-block">
              <div className="section-kicker">Program Policies</div><h2>Terms & Academic Integrity</h2>
              <div className="accordion-list">
                {internship.terms?.map(term => <details key={term.title}><summary>{term.title}</summary><p>{term.description}</p></details>)}
              </div>
            </section>

            <section className="content-block">
              <div className="section-kicker">FAQs</div><h2>Frequently Asked Questions</h2>
              <div className="accordion-list">
                {internship.faqs?.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}
              </div>
            </section>
          </div>

          <aside className="application-card">
            <div className="aside-top"><span>TRACK SUMMARY</span><span className="status-dot" /></div>
            <h3>Application Summary</h3>
            <dl>
              <div><dt>Track</dt><dd>{internship.shortTitle}</dd></div>
              <div><dt>Duration</dt><dd>{internship.duration}</dd></div>
              <div><dt>Delivery</dt><dd>{internship.mode}</dd></div>
              <div><dt>Program</dt><dd>{internship.hours}</dd></div>
              <div><dt>Status</dt><dd>{internship.status}</dd></div>
            </dl>
            <ApplyButton internship={internship} className="full-width" />
            <ul className="aside-checks">{internship.sidebarChecks?.map(item => <li key={item}><Check size={14} /> {item}</li>)}</ul>
            {!internship.applyLink && <div className="placeholder-note">Add the Google Form link in <code>src/data/internships.json</code> to activate applications.</div>}
          </aside>
        </div>
      </section>

      <section className="detail-cta">
        <div className="container">
          <div className="eyebrow lime">{internship.cta?.eyebrow}</div>
          <h2>{internship.cta?.heading}</h2>
          <p>{internship.cta?.description}</p>
          <ApplyButton internship={internship} />
        </div>
      </section>

      <div className="mobile-apply"><ApplyButton internship={internship} className="full-width" /></div>
    </>
  );
}
