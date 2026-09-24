import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true">S</span>
            <span className="brand-copy"><strong>Skill Set Go</strong><small>EDUTECH</small></span>
          </div>
          <p className="footer-copy">Learn. Build. Prove. Practical internship pathways designed around projects, portfolio growth and proof of work.</p>
        </div>
        <div><h4>Portal</h4><Link to="/">Home</Link><Link to="/internships">Internships</Link><a href="/#how-it-works">How It Works</a></div>
        <div><h4>Programs</h4><Link to="/internships/ai-ml">AI & ML</Link><Link to="/internships/web-development">Web Development</Link><Link to="/internships/cloud-devops">Cloud & DevOps</Link></div>
        <div><h4>Policies</h4><a href="#terms">Terms & Conditions</a><a href="#privacy">Privacy Policy</a><a href="mailto:contact@skillsetgoedutech.in">Contact</a></div>
      </div>
      <div className="container footer-bottom">© 2026 Skill Set Go EduTech. All rights reserved.</div>
    </footer>
  );
}
