'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const faqCategories = [
  {
    category: 'Shipping & Tracking',
    faqs: [
      { q: 'How do I track my shipment?', a: 'Enter your tracking number on our homepage or visit the Track Shipment page. You\'ll get real-time updates including location, status, and estimated delivery time.' },
      { q: 'What shipping methods do you offer?', a: 'We offer Air Freight (express & charter), Ocean Freight (FCL & LCL), Road & Rail (FTL & LTL), and intermodal solutions. Each mode can be customized for speed, cost, or special handling needs.' },
      { q: 'How long does international shipping take?', a: 'Air freight: 1-5 days. Ocean freight: 14-45 days depending on route. Road freight: 1-10 days for continental routes. Express air options available for time-critical cargo.' },
      { q: 'Do you handle customs clearance?', a: 'Yes, we have licensed customs brokers in 50+ countries who manage all documentation, HS classification, duties, and regulatory compliance on your behalf.' },
    ],
  },
  {
    category: 'Pricing & Payments',
    faqs: [
      { q: 'How do I get a shipping quote?', a: 'Visit our Contact page or reach out to sales@westernapex.online. Provide cargo dimensions, weight, origin, destination, and desired timeline for an accurate quote.' },
      { q: 'What payment methods do you accept?', a: 'We accept wire transfers, corporate credit cards, ACH, and offer Net-30/60 terms for qualified enterprise accounts.' },
      { q: 'Are there any hidden fees?', a: 'No. We provide transparent, all-inclusive quotes that cover freight, handling, documentation, and applicable surcharges. Any additional costs are communicated upfront.' },
    ],
  },
  {
    category: 'Special Cargo',
    faqs: [
      { q: 'Can you ship dangerous goods?', a: 'Yes, we are IATA DGR certified and IMO compliant for hazardous materials across all transport modes. Our specialists handle classification, packaging, and documentation.' },
      { q: 'Do you offer temperature-controlled shipping?', a: 'Absolutely. We provide pharma-grade cold chain solutions including active and passive temperature control from -20°C to +25°C across air, ocean, and road.' },
      { q: 'Can you handle oversized or project cargo?', a: 'Yes, we specialize in project logistics including heavy-lift, out-of-gauge, and breakbulk cargo with custom engineering solutions for transport and installation.' },
    ],
  },
  {
    category: 'Account & Support',
    faqs: [
      { q: 'How do I create an account?', a: 'Enterprise accounts are set up through our sales team. Contact us for access to our digital platform with volume-based pricing and dedicated support.' },
      { q: 'What are your support hours?', a: 'Our global operations center operates 24/7/365. You can reach us by phone, email, or live chat at any time.' },
      { q: 'Do you have an API?', a: 'Yes, our RESTful API allows you to integrate shipment creation, tracking, and analytics directly into your ERP, WMS, or e-commerce platform.' },
    ],
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = (key) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    faqs: cat.faqs.filter(faq =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.faqs.length > 0);

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <span className="label animate-fade-in-up mb-16" style={{ display: 'block' }}>Help Center</span>
          <h1 className="heading-section animate-fade-in-up delay-100 mb-16">
            How Can We <span className="text-gradient">Help You</span>?
          </h1>
          <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
            Find answers to common questions or reach out to our 24/7 support team.
          </p>

          {/* Search */}
          <div className="glass-panel animate-fade-in-up delay-300" style={{ maxWidth: '500px', margin: '0 auto', padding: '6px' }}>
            <div style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
                style={{ paddingLeft: '48px', border: 'none', background: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow">
          {filteredCategories.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: '48px' }} className="animate-fade-in-up" >
              <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '20px', color: '#f1f5f9' }}>
                {cat.category}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cat.faqs.map((faq, fi) => {
                  const key = `${ci}-${fi}`;
                  const isOpen = openIndex === key;
                  return (
                    <div key={fi} className="glass-card-static" style={{ padding: 0 }}>
                      <button
                        onClick={() => toggle(key)}
                        style={{
                          width: '100%',
                          padding: '20px 24px',
                          background: 'none',
                          border: 'none',
                          color: isOpen ? '#ef4444' : '#f1f5f9',
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          transition: 'color 0.2s',
                        }}
                      >
                        {faq.q}
                        <svg
                          width="16" height="16" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{
                            transition: 'transform 0.3s',
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                            flexShrink: 0,
                            marginLeft: '16px',
                          }}
                        >
                          <path d="M6 9l6 6 6-6"/>
                        </svg>
                      </button>
                      <div style={{
                        maxHeight: isOpen ? '300px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}>
                        <div style={{
                          padding: '0 24px 20px',
                          color: '#94a3b8',
                          fontSize: '0.9rem',
                          lineHeight: '1.8',
                        }}>
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>Still need help?</h3>
            <p style={{ color: '#94a3b8', marginBottom: '24px' }}>Our support team is available 24/7 to assist you.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-primary">Contact Support</a>
              <a href="https://wa.me/12102143149" target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp Us</a>
              <a href="mailto:support@westernapex.online" className="btn-secondary">Email Us</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
