import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);

  const navClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">S</span>
          <span className="brand-copy"><strong>Skill Set Go</strong><small>EDUTECH</small></span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <NavLink className={navClass} to="/" end>Home</NavLink>
          <NavLink className={navClass} to="/internships">Internships</NavLink>
          <a className="nav-link" href="/#how-it-works">How It Works</a>
          <a className="nav-link" href="/#why-us">About</a>
        </nav>

        <Link className="button primary compact desktop-cta" to="/internships">
          Explore Internships <ArrowUpRight size={16} />
        </Link>

        <button className="menu-button" onClick={() => setOpen(v => !v)} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <div className="container mobile-menu-inner">
            <NavLink onClick={() => setOpen(false)} className={navClass} to="/" end>Home</NavLink>
            <NavLink onClick={() => setOpen(false)} className={navClass} to="/internships">Internships</NavLink>
            <a onClick={() => setOpen(false)} className="nav-link" href="/#how-it-works">How It Works</a>
            <a onClick={() => setOpen(false)} className="nav-link" href="/#why-us">About</a>
            <Link onClick={() => setOpen(false)} className="button primary" to="/internships">Explore Internships</Link>
          </div>
        </div>
      )}
    </header>
  );
}
