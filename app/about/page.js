'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const values = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#v1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="v1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs>
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Global Reach',
    desc: 'Operating across 190+ countries with strategically positioned offices and fulfillment centers spanning six continents.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#v2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="v2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Unmatched Reliability',
    desc: '99.7% on-time delivery rate backed by proprietary routing algorithms and predictive analytics platforms.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#v3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="v3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#dc2626"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'People First',
    desc: '4,800+ logistics professionals across the globe delivering white-glove service to every client engagement.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="url(#v4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="v4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Technology Driven',
    desc: 'AI-powered route optimization, real-time IoT tracking, and automated customs processing at scale.',
  },
];

const leadership = [
  { name: 'James Crawford', role: 'Chief Executive Officer', bio: '25+ years in global logistics. Former SVP at Maersk.' },
  { name: 'Priya Sharma', role: 'Chief Operating Officer', bio: 'Led operations scaling from 5 to 190+ countries.' },
  { name: 'David Müller', role: 'Chief Technology Officer', bio: 'Former engineering lead at Flexport. Built logistics platforms at scale.' },
  { name: 'Aisha Okonkwo', role: 'Chief Financial Officer', bio: 'Guided $2B+ in logistics M&A transactions.' },
];

const milestones = [
  { year: '2008', event: 'WesternApex founded in London with a vision to modernize freight forwarding.' },
  { year: '2012', event: 'Expanded to 50 countries. Launched digital tracking platform.' },
  { year: '2016', event: 'Series C funding of $120M. Acquired Asian logistics network.' },
  { year: '2019', event: 'Reached 150+ countries. Launched AI-powered route optimization.' },
  { year: '2022', event: 'IPO on London Stock Exchange. Surpassed 10M shipments annually.' },
  { year: '2025', event: '190+ countries. Carbon-neutral operations initiative launched.' },
];

export default function AboutPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="label animate-fade-in-up mb-16" style={{ display: 'block' }}>About Us</span>
          <h1 className="heading-section animate-fade-in-up delay-100 mb-16">
            Building the Future of <span className="text-gradient">Global Logistics</span>
          </h1>
          <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Since 2008, WesternApex has been redefining how the world moves cargo — with precision, technology, and an unwavering commitment to reliability.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '60px' }}>
            <div className="animate-slide-left">
              <span className="label mb-12" style={{ display: 'block' }}>Our Mission</span>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: '800', marginBottom: '20px', letterSpacing: '-0.03em' }}>
                Making global trade <span className="text-gradient">accessible, visible,</span> and reliable
              </h2>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', marginBottom: '16px' }}>
                We believe every business — from startups to Fortune 500 — deserves enterprise-grade logistics. Our platform democratizes global freight forwarding with transparent pricing, real-time tracking, and expert support.
              </p>
              <p style={{ color: '#94a3b8', lineHeight: '1.8' }}>
                Our integrated technology stack connects shippers, carriers, and customs authorities into a single seamless workflow, eliminating the friction that has plagued international trade for decades.
              </p>
            </div>
            <div className="glass-card-static animate-slide-right" style={{ padding: '48px', textAlign: 'center' }}>
              <div className="stat-value text-gradient" style={{ marginBottom: '8px' }}>$4.2B</div>
              <div className="stat-label" style={{ marginBottom: '32px' }}>Cargo Value Moved Annually</div>
              <hr className="section-divider" style={{ marginBottom: '32px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ef4444' }}>4,800+</div>
                  <div className="stat-label">Team Members</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f97316' }}>42</div>
                  <div className="stat-label">Global Offices</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Values */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label mb-12" style={{ display: 'block' }}>Our Values</span>
            <h2 className="heading-section">What <span className="text-gradient">Drives Us</span></h2>
          </div>
          <div className="grid-4">
            {values.map((v, i) => (
              <div key={i} className="glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div className="icon-box icon-box-cyan">{v.icon}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '10px' }}>{v.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Timeline */}
      <section className="section">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label mb-12" style={{ display: 'block' }}>Our Journey</span>
            <h2 className="heading-section">Key <span className="text-gradient">Milestones</span></h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {milestones.map((m, i) => (
              <div key={i} className="animate-fade-in-up" style={{
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
                display: 'flex',
                gap: '24px',
                padding: '24px 0',
                borderBottom: i < milestones.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '900',
                  minWidth: '80px',
                  background: 'linear-gradient(135deg, #ef4444, #f97316)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {m.year}
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.7' }}>{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Leadership */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label mb-12" style={{ display: 'block' }}>Leadership</span>
            <h2 className="heading-section">Executive <span className="text-gradient">Team</span></h2>
          </div>
          <div className="grid-4">
            {leadership.map((person, i) => (
              <div key={i} className="glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0, textAlign: 'center' }}>
                <div style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(249,115,22,0.2))',
                  margin: '0 auto 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#ef4444',
                }}>
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '4px' }}>{person.name}</h3>
                <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', marginBottom: '12px' }}>{person.role}</div>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.6' }}>{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
