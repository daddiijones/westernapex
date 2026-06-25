'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const highlights = [
  { value: '$4.2B', label: 'Cargo Value Managed Annually' },
  { value: '28%', label: 'Year-Over-Year Revenue Growth' },
  { value: '$1.2B', label: 'Annual Revenue (FY2025)' },
  { value: '190+', label: 'Countries of Operation' },
];

const quarters = [
  { period: 'Q1 2025', revenue: '$312M', growth: '+26%', ebitda: '$52M' },
  { period: 'Q4 2024', revenue: '$298M', growth: '+24%', ebitda: '$48M' },
  { period: 'Q3 2024', revenue: '$285M', growth: '+22%', ebitda: '$45M' },
  { period: 'Q2 2024', revenue: '$271M', growth: '+20%', ebitda: '$42M' },
];

const pillars = [
  {
    title: 'Technology Platform',
    desc: 'Our proprietary logistics platform processes 35,000+ shipments daily with AI-powered routing, real-time IoT tracking, and automated customs processing.',
  },
  {
    title: 'Global Network',
    desc: '42 offices across 6 continents with deep local expertise. Strategic partnerships with 500+ carriers, airlines, and shipping lines.',
  },
  {
    title: 'Market Expansion',
    desc: 'Targeting $8.6T global logistics market with focus on digital freight forwarding, e-commerce fulfillment, and emerging market growth.',
  },
  {
    title: 'Sustainable Growth',
    desc: 'Carbon-neutral by 2028. ESG-aligned operations with science-based emissions targets and industry-leading sustainability practices.',
  },
];

export default function InvestorsPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <span className="label animate-fade-in-up mb-16" style={{ display: 'block' }}>Investor Relations</span>
          <h1 className="heading-section animate-fade-in-up delay-100 mb-16">
            Investing in the Future of <span className="text-gradient">Global Trade</span>
          </h1>
          <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '640px', margin: '0 auto' }}>
            WesternApex is publicly listed on the London Stock Exchange (LSE: WAPX), delivering consistent growth in a $8.6 trillion market.
          </p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section-sm" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {highlights.map((stat, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div className="stat-value text-gradient">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Financial Performance */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="label mb-12" style={{ display: 'block' }}>Financials</span>
            <h2 className="heading-section">Quarterly <span className="text-gradient">Performance</span></h2>
          </div>

          <div className="table-wrapper" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Period</th>
                  <th>Revenue</th>
                  <th>YoY Growth</th>
                  <th>EBITDA</th>
                </tr>
              </thead>
              <tbody>
                {quarters.map((q, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: '600', color: '#f1f5f9' }}>{q.period}</td>
                    <td>{q.revenue}</td>
                    <td><span className="badge badge-emerald" style={{ fontSize: '0.75rem' }}>{q.growth}</span></td>
                    <td>{q.ebitda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Investment Pillars */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label mb-12" style={{ display: 'block' }}>Why Invest</span>
            <h2 className="heading-section">Investment <span className="text-gradient">Thesis</span></h2>
          </div>
          <div className="grid-2">
            {pillars.map((p, i) => (
              <div key={i} className="glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.15))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', fontWeight: '800', marginBottom: '16px',
                  color: '#ef4444',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '10px' }}>{p.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.8' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact IR */}
      <section className="section-sm">
        <div className="container">
          <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Investor Relations Contact</h3>
            <p style={{ color: '#94a3b8', marginBottom: '8px' }}>ir@westernapex.online</p>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px' }}>100 Bishopsgate, London EC2N 4AG</p>
            <a href="/contact" className="btn-primary">Contact IR Team</a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
