'use client';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function LegalPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <span className="label animate-fade-in-up mb-16" style={{ display: 'block' }}>Legal</span>
          <h1 className="heading-section animate-fade-in-up delay-100 mb-16">
            Legal <span className="text-gradient">Information</span>
          </h1>
          <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Transparency and compliance are core to everything we do.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          {/* Terms */}
          <div className="glass-card-static animate-fade-in-up" style={{ padding: '40px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px' }}>Terms of Service</h2>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '2' }}>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#f1f5f9' }}>1. Acceptance of Terms.</strong> By accessing or using WesternApex services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#f1f5f9' }}>2. Services.</strong> WesternApex provides freight forwarding, customs brokerage, warehousing, and supply chain management services. All services are subject to our standard trading conditions and applicable international conventions including the CMR, Hague-Visby Rules, and Montreal Convention.
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#f1f5f9' }}>3. Liability.</strong> Our liability is limited in accordance with the applicable international convention or, in the absence thereof, to 2 SDR per kilogram of gross weight of the goods lost or damaged, unless higher value has been declared.
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#f1f5f9' }}>4. Insurance.</strong> All-risk cargo insurance is available on request. WesternApex recommends shippers maintain adequate coverage for all shipments.
              </p>
              <p>
                <strong style={{ color: '#f1f5f9' }}>5. Force Majeure.</strong> WesternApex shall not be liable for delays or failures resulting from events beyond our reasonable control, including but not limited to natural disasters, war, government action, or pandemics.
              </p>
            </div>
          </div>

          {/* Privacy */}
          <div className="glass-card-static animate-fade-in-up delay-200" style={{ padding: '40px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px' }}>Privacy Policy</h2>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '2' }}>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#f1f5f9' }}>Data Collection.</strong> We collect personal information necessary to provide logistics services, including names, addresses, contact details, and shipment data. We also collect analytics data to improve our services.
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#f1f5f9' }}>Data Use.</strong> Your data is used solely for service delivery, communication, legal compliance, and service improvement. We never sell personal data to third parties.
              </p>
              <p style={{ marginBottom: '16px' }}>
                <strong style={{ color: '#f1f5f9' }}>Data Protection.</strong> We employ industry-standard encryption, access controls, and security measures. We are compliant with GDPR, CCPA, and other applicable data protection regulations.
              </p>
              <p>
                <strong style={{ color: '#f1f5f9' }}>Your Rights.</strong> You have the right to access, correct, delete, or port your personal data. Contact privacy@westernapex.online for any data requests.
              </p>
            </div>
          </div>

          {/* Cookie Policy */}
          <div className="glass-card-static animate-fade-in-up delay-300" style={{ padding: '40px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px' }}>Cookie Policy</h2>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '2' }}>
              <p style={{ marginBottom: '16px' }}>
                We use essential cookies for site functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings. You can manage cookie preferences at any time through your browser settings.
              </p>
            </div>
          </div>

          {/* Regulatory */}
          <div className="glass-card-static animate-fade-in-up delay-400" style={{ padding: '40px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '20px' }}>Regulatory Compliance</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="legal-certs-grid">
              {[
                'IATA Licensed Agent',
                'ISO 9001:2015 Certified',
                'AEO Authorized (EU)',
                'C-TPAT Certified (US)',
                'FIATA Member',
                'WCA Network Member',
                'GDPR Compliant',
                'SOC 2 Type II',
              ].map((cert, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @media (max-width: 640px) {
          .legal-certs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
