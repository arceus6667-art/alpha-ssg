import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

export default function InternshipCard({ internship }) {
  const Icon = Icons[internship.icon] || Icons.BriefcaseBusiness;
  return (
    <article className="internship-card">
      <div className="card-topline">
        <span className="icon-box"><Icon size={20} /></span>
        <span className="status-pill">{internship.status}</span>
      </div>
      <div className="eyebrow">{internship.category} · {internship.level}</div>
      <h3>{internship.title}</h3>
      <p>{internship.description}</p>
      <div className="tag-row">
        {internship.skills.slice(0, 4).map(skill => <span key={skill.name} className="tag">{skill.name}</span>)}
      </div>
      <Link className="card-link" to={`/internships/${internship.slug}`}>
        View Internship <ArrowUpRight size={16} />
      </Link>
    </article>
  );
}
