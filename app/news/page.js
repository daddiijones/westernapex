'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const pressReleases = [
  {
    date: 'June 12, 2025',
    tag: 'Expansion',
    title: 'WesternApex Opens New Asia-Pacific Hub in Singapore',
    excerpt: 'The 150,000 sq ft facility will serve as the company\'s regional headquarters for Southeast Asia, supporting growing demand in the APAC market.',
  },
  {
    date: 'May 28, 2025',
    tag: 'Technology',
    title: 'WesternApex Launches AI-Powered Predictive ETA Engine',
    excerpt: 'New machine learning model achieves 97% accuracy in delivery predictions by analyzing 200+ data points per shipment including weather, port congestion, and customs processing times.',
  },
  {
    date: 'April 15, 2025',
    tag: 'Sustainability',
    title: 'WesternApex Achieves 42% Emissions Reduction Milestone',
    excerpt: 'Ahead of schedule on the 2028 carbon-neutral target, the company credits SAF adoption, EV fleet expansion, and LEED-certified warehousing.',
  },
  {
    date: 'March 3, 2025',
    tag: 'Partnership',
    title: 'Strategic Alliance with Emirates SkyCargo Expands Air Freight Network',
    excerpt: 'The partnership adds 40+ new air cargo routes across Africa and the Middle East, with dedicated capacity on key lanes.',
  },
  {
    date: 'January 22, 2025',
    tag: 'Financial',
    title: 'WesternApex Reports Record Q4 2024 Revenue of $298M',
    excerpt: 'Revenue grew 24% year-over-year driven by strong demand in e-commerce fulfillment and cross-border trade services.',
  },
  {
    date: 'December 8, 2024',
    tag: 'Product',
    title: 'New Self-Service Platform Enables SMB Access to Enterprise Logistics',
    excerpt: 'Small and medium businesses can now book, track, and manage shipments through the same platform used by Fortune 500 clients.',
  },
];

const tagColors = {
  Expansion: 'badge-cyan',
  Technology: 'badge-purple',
  Sustainability: 'badge-emerald',
  Partnership: 'badge-amber',
  Financial: 'badge-cyan',
  Product: 'badge-purple',
};

export default function NewsPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <span className="label animate-fade-in-up mb-16" style={{ display: 'block' }}>Press & Media</span>
          <h1 className="heading-section animate-fade-in-up delay-100 mb-16">
            Latest <span className="text-gradient">News & Updates</span>
          </h1>
          <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Stay informed about WesternApex developments, industry insights, and company milestones.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {pressReleases.map((pr, i) => (
              <div key={i} className="glass-card animate-fade-in-up" style={{
                animationDelay: `${i * 0.08}s`,
                opacity: 0,
                padding: '32px',
                cursor: 'pointer',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '12px',
                }}>
                  <span className={`badge ${tagColors[pr.tag] || 'badge-cyan'}`}>{pr.tag}</span>
                  <span style={{ color: '#475569', fontSize: '0.8rem' }}>{pr.date}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px', lineHeight: '1.4' }}>
                  {pr.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7' }}>
                  {pr.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="section-sm">
        <div className="container">
          <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Media Inquiries</h3>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>press@westernapex.online</p>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>
              For press kits, executive interviews, and media partnerships.
            </p>
            <a href="/contact" className="btn-primary">Contact Press Team</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
