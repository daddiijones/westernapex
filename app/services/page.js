'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#s1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="s1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs>
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
      </svg>
    ),
    title: 'Air Freight',
    desc: 'Express and charter air cargo services with priority handling and temperature-controlled options across 300+ airports worldwide.',
    features: ['Express 24-48hr delivery', 'Charter flights available', 'Temperature-controlled cargo', 'Dangerous goods certified', 'Priority customs clearance', 'Door-to-airport & airport-to-door'],
    badge: 'Fastest Option',
    badgeClass: 'badge-cyan',
    iconClass: 'icon-box-cyan',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#s2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="s2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#dc2626"/></linearGradient></defs>
        <path d="M2 20a2 2 0 0 0 2-2V9a2 2 0 0 1 2-2h1l2-4h6l2 4h1a2 2 0 0 1 2 2v9a2 2 0 0 0 2 2"/><path d="M2 20h20"/><path d="M8 7v4"/><path d="M16 7v4"/><path d="M6 11h12"/>
      </svg>
    ),
    title: 'Ocean Freight',
    desc: 'Full Container Load (FCL) and Less than Container Load (LCL) ocean shipping with comprehensive port-to-port and door-to-door service.',
    features: ['FCL & LCL options', 'Reefer containers available', 'Real-time vessel tracking', '800+ port pairs', 'Buyer\'s consolidation', 'Project & breakbulk cargo'],
    badge: 'Best Value',
    badgeClass: 'badge-purple',
    iconClass: 'icon-box-blue',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#s3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="s3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs>
        <path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Road & Rail',
    desc: 'Full truckload, less-than-truckload, and intermodal solutions spanning continental routes with cross-border expertise.',
    features: ['FTL & LTL service', 'Cross-border capabilities', 'Intermodal rail options', 'GPS fleet tracking', 'Flatbed & specialized', 'Last-mile delivery'],
    badge: 'Flexible',
    badgeClass: 'badge-amber',
    iconClass: 'icon-box-cyan',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#s4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="s4" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    title: 'Customs Brokerage',
    desc: 'Licensed customs brokers in 50+ countries providing seamless clearance, compliance management, and duty optimization.',
    features: ['Licensed in 50+ countries', 'Automated HS classification', 'Duty drawback services', 'AEO & C-TPAT certified', 'Trade compliance consulting', 'FTA optimization'],
    badge: 'Compliance',
    badgeClass: 'badge-emerald',
    iconClass: 'icon-box-emerald',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#s5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="s5" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#dc2626"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs>
        <path d="M3 21V8l9-5 9 5v13"/><path d="M9 21V13h6v8"/><path d="M3 21h18"/>
      </svg>
    ),
    title: 'Warehousing & 3PL',
    desc: 'Strategically located fulfillment centers with advanced WMS integration, pick-and-pack, inventory management, and distribution.',
    features: ['5M+ sq ft globally', 'WMS integration', 'Pick, pack & ship', 'Inventory management', 'Kitting & assembly', 'Returns processing'],
    badge: 'End-to-End',
    badgeClass: 'badge-purple',
    iconClass: 'icon-box-purple',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#s6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <defs><linearGradient id="s6" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444"/><stop offset="100%" stopColor="#dc2626"/></linearGradient></defs>
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Supply Chain Consulting',
    desc: 'Data-driven optimization of your end-to-end supply chain with network design, cost modeling, and resilience planning.',
    features: ['Network optimization', 'Cost-to-serve analysis', 'Risk & resilience planning', 'Technology assessment', 'Carrier negotiation', 'Sustainability roadmap'],
    badge: 'Strategic',
    badgeClass: 'badge-cyan',
    iconClass: 'icon-box-blue',
  },
];

export default function ServicesPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <span className="label animate-fade-in-up mb-16" style={{ display: 'block' }}>Our Services</span>
          <h1 className="heading-section animate-fade-in-up delay-100 mb-16">
            Comprehensive Freight <span className="text-gradient">Solutions</span>
          </h1>
          <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '640px', margin: '0 auto' }}>
            From first mile to last mile, WesternApex delivers enterprise-grade logistics services designed for speed, reliability, and total visibility.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {services.map((service, i) => (
              <div key={i} className="glass-card-static animate-fade-in-up" style={{
                animationDelay: `${i * 0.08}s`,
                opacity: 0,
                padding: '40px',
              }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '48px',
                  alignItems: 'start',
                }} className="service-detail-grid">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                      <div className={`icon-box ${service.iconClass}`}>
                        {service.icon}
                      </div>
                      <span className={`badge ${service.badgeClass}`}>{service.badge}</span>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.02em' }}>
                      {service.title}
                    </h2>
                    <p style={{ color: '#94a3b8', lineHeight: '1.8', marginBottom: '24px' }}>
                      {service.desc}
                    </p>
                    <a href="/contact" className="btn-primary btn-sm">Request a Quote</a>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b', marginBottom: '16px' }}>
                      Key Capabilities
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {service.features.map((f, j) => (
                        <div key={j} style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          color: '#94a3b8',
                          fontSize: '0.9rem',
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5"/>
                          </svg>
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <h2 className="heading-section mb-16">Need a <span className="text-gradient">Custom Solution</span>?</h2>
            <p className="subheading" style={{ maxWidth: '500px', margin: '0 auto 32px' }}>
              Our logistics experts will design a tailored solution for your unique supply chain requirements.
            </p>
            <a href="/contact" className="btn-primary" style={{ padding: '16px 36px' }}>Talk to an Expert</a>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @media (max-width: 768px) {
          .service-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
