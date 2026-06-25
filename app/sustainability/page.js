'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const initiatives = [
  {
    title: 'Carbon Neutral by 2028',
    desc: 'We\'ve committed to achieving carbon-neutral operations across our entire global network by 2028 through emissions reduction, renewable energy adoption, and verified carbon offsets.',
    stat: '42%',
    statLabel: 'Emissions Reduced Since 2020',
  },
  {
    title: 'Sustainable Aviation Fuel',
    desc: 'Partnering with leading SAF producers to transition our air freight operations. Currently at 15% SAF blend rate, targeting 50% by 2027.',
    stat: '15%',
    statLabel: 'SAF Adoption Rate',
  },
  {
    title: 'Electric Fleet',
    desc: 'Deploying electric and hydrogen-powered vehicles for last-mile and regional deliveries. 200+ EVs already in operation across Europe and North America.',
    stat: '200+',
    statLabel: 'Electric Vehicles Deployed',
  },
  {
    title: 'Green Warehousing',
    desc: 'All new warehouse facilities built to LEED Gold standard with solar installations, rainwater harvesting, and zero-waste operations.',
    stat: '100%',
    statLabel: 'New Facilities LEED Gold',
  },
];

const sdgs = [
  { num: '7', title: 'Affordable & Clean Energy' },
  { num: '9', title: 'Industry, Innovation & Infrastructure' },
  { num: '11', title: 'Sustainable Cities & Communities' },
  { num: '12', title: 'Responsible Consumption & Production' },
  { num: '13', title: 'Climate Action' },
  { num: '17', title: 'Partnerships for the Goals' },
];

export default function SustainabilityPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <span className="label animate-fade-in-up mb-16" style={{ display: 'block' }}>Sustainability</span>
          <h1 className="heading-section animate-fade-in-up delay-100 mb-16">
            Moving the World <span className="text-gradient">Responsibly</span>
          </h1>
          <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '640px', margin: '0 auto' }}>
            Sustainability isn&#39;t just a commitment — it&#39;s embedded in every decision we make across our global network.
          </p>
        </div>
      </section>

      {/* Initiatives */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {initiatives.map((item, i) => (
              <div key={i} className="glass-card-static animate-fade-in-up" style={{
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
                padding: '40px',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '40px',
                  alignItems: 'center',
                }} className="sustainability-grid">
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '12px' }}>{item.title}</h3>
                    <p style={{ color: '#94a3b8', lineHeight: '1.8' }}>{item.desc}</p>
                  </div>
                  <div style={{ textAlign: 'center', minWidth: '140px' }}>
                    <div className="stat-value text-gradient">{item.stat}</div>
                    <div className="stat-label">{item.statLabel}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* SDGs */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label mb-12" style={{ display: 'block' }}>UN Sustainable Development Goals</span>
            <h2 className="heading-section">Aligned with <span className="text-gradient">Global Goals</span></h2>
          </div>
          <div className="grid-3">
            {sdgs.map((sdg, i) => (
              <div key={i} className="glass-card animate-fade-in-up" style={{
                animationDelay: `${i * 0.08}s`,
                opacity: 0,
                textAlign: 'center',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(239,68,68,0.15))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: '1.3rem',
                  fontWeight: '800',
                  color: '#10b981',
                }}>
                  {sdg.num}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>{sdg.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ESG Report CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>2025 ESG Report</h3>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>
              Download our comprehensive Environmental, Social, and Governance report for full metrics and targets.
            </p>
            <a href="/contact" className="btn-primary">Request ESG Report</a>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @media (max-width: 768px) {
          .sustainability-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
