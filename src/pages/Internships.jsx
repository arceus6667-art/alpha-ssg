import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import InternshipCard from '../components/InternshipCard';
import { categories, internships } from '../data/internships';

export default function Internships() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => internships.filter(item => {
    const matchesCategory = category === 'All' || item.category === category;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || `${item.title} ${item.skills.map(skill => skill.name).join(' ')} ${item.category}`.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  }), [search, category]);

  return (
    <section className="page-section internships-page">
      <div className="container">
        <div className="page-heading"><div className="eyebrow">Internship Directory</div><h1>Explore Internship Tracks</h1><p>Choose a domain, review the complete program structure and apply through the linked form when available.</p></div>

        <div className="filter-bar">
          <label className="search-box"><Search size={18} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search internships or skills" /></label>
          <div className="filter-pills">{categories.map(item => <button key={item} onClick={() => setCategory(item)} className={category === item ? 'active' : ''}>{item}</button>)}</div>
        </div>

        <div className="results-line"><strong>{filtered.length}</strong> internship{filtered.length !== 1 ? 's' : ''} found</div>
        <div className="card-grid">{filtered.map(item => <InternshipCard internship={item} key={item.slug} />)}</div>
        {!filtered.length && <div className="empty-state">No internships match your current search.</div>}
      </div>
    </section>
  );
}
