import { ExternalLink } from 'lucide-react';

export default function ApplyButton({ internship, className = '' }) {
  if (!internship.applyLink) {
    return <button className={`button primary ${className}`} disabled title="Add the Google Form URL in src/data/internships.js">Application Form Coming Soon</button>;
  }

  return (
    <a className={`button primary ${className}`} href={internship.applyLink} target="_blank" rel="noreferrer">
      Apply for Internship <ExternalLink size={16} />
    </a>
  );
}
