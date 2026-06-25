'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const departments = [
  {
    title: 'Engineering',
    positions: [
      { role: 'Senior Full-Stack Engineer', location: 'London / Remote', type: 'Full-time' },
      { role: 'Platform Engineer (Kubernetes)', location: 'Berlin / Remote', type: 'Full-time' },
      { role: 'Data Engineer', location: 'Singapore', type: 'Full-time' },
    ],
  },
  {
    title: 'Operations',
    positions: [
      { role: 'Regional Operations Manager — APAC', location: 'Singapore', type: 'Full-time' },
      { role: 'Customs Compliance Specialist', location: 'New York', type: 'Full-time' },
      { role: 'Supply Chain Analyst', location: 'Dubai', type: 'Full-time' },
    ],
  },
  {
    title: 'Commercial',
    positions: [
      { role: 'Enterprise Account Executive', location: 'London', type: 'Full-time' },
      { role: 'Business Development Manager — LATAM', location: 'Miami', type: 'Full-time' },
    ],
  },
  {
    title: 'Product & Design',
    positions: [
      { role: 'Product Manager — Tracking Platform', location: 'London / Remote', type: 'Full-time' },
      { role: 'Senior UX Designer', location: 'Remote', type: 'Full-time' },
    ],
  },
];

const perks = [
  { icon: '💰', title: 'Competitive Salary', desc: 'Top-of-market compensation with equity options.' },
  { icon: '🏥', title: 'Full Benefits', desc: 'Health, dental, vision, and life insurance coverage.' },
  { icon: '✈️', title: 'Travel Perks', desc: 'Annual travel stipend and shipping discounts.' },
  { icon: '📚', title: 'Learning Budget', desc: '$3,000 annual professional development fund.' },
  { icon: '🏠', title: 'Flexible Work', desc: 'Hybrid and remote options for most roles.' },
  { icon: '🌍', title: 'Global Mobility', desc: 'Opportunities to transfer across 42 offices.' },
];

export default function CareersPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <span className="label animate-fade-in-up mb-16" style={{ display: 'block' }}>Careers</span>
          <h1 className="heading-section animate-fade-in-up delay-100 mb-16">
            Build the Future of <span className="text-gradient">Global Trade</span>
          </h1>
          <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Join 4,800+ professionals across 42 offices shaping how the world moves cargo.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label mb-12" style={{ display: 'block' }}>Benefits & Perks</span>
            <h2 className="heading-section">Why <span className="text-gradient">WesternApex</span></h2>
          </div>
          <div className="grid-3">
            {perks.map((perk, i) => (
              <div key={i} className="glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{perk.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px' }}>{perk.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7' }}>{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Open Positions */}
      <section className="section">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label mb-12" style={{ display: 'block' }}>Open Positions</span>
            <h2 className="heading-section">Current <span className="text-gradient">Opportunities</span></h2>
          </div>

          {departments.map((dept, di) => (
            <div key={di} style={{ marginBottom: '40px' }} className="animate-fade-in-up">
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px', color: '#f1f5f9' }}>
                {dept.title}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {dept.positions.map((pos, pi) => (
                  <div key={pi} className="glass-card-static" style={{
                    padding: '20px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{pos.role}</div>
                      <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                        {pos.location} · {pos.type}
                      </div>
                    </div>
                    <a href="/contact" className="btn-secondary btn-sm">Apply</a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
