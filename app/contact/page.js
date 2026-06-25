'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', company: '', phone: '', service: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="page-hero">
        <div className="container">
          <span className="label animate-fade-in-up mb-16" style={{ display: 'block' }}>Contact Us</span>
          <h1 className="heading-section animate-fade-in-up delay-100 mb-16">
            Get in Touch or <span className="text-gradient">Request a Quote</span>
          </h1>
          <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Our logistics experts are ready to help you optimize your supply chain. Reach out today.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '48px', alignItems: 'start' }} className="contact-grid">
            {/* Info Column */}
            <div className="animate-slide-left">
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px' }}>Let&#39;s start a conversation</h2>
              <p style={{ color: '#94a3b8', lineHeight: '1.8', marginBottom: '40px' }}>
                Whether you need a quote for a single shipment or want to discuss a full supply chain partnership, we&#39;re here to help.
              </p>

              {/* Contact Cards */}
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  ),
                  label: 'Email',
                  value: 'support@westernapex.online',
                  sub: 'sales@westernapex.online',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  ),
                  label: 'Phone',
                  value: '+1 (800) 555-APEX',
                  sub: '+44 20 7946 0958',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  ),
                  label: 'Headquarters',
                  value: '100 Bishopsgate',
                  sub: 'London EC2N 4AG, United Kingdom',
                },
              ].map((item, i) => (
                <div key={i} className="glass-card-static" style={{
                  padding: '20px',
                  marginBottom: '12px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'start',
                }}>
                  <div className="icon-box icon-box-cyan" style={{ width: '44px', height: '44px', flexShrink: 0, marginBottom: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748b', marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ fontWeight: '600', marginBottom: '2px' }}>{item.value}</div>
                    <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form Column */}
            <div className="glass-panel animate-slide-right" style={{ padding: '40px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%', margin: '0 auto 20px',
                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ color: '#94a3b8' }}>Thank you for reaching out. Our team will respond within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '24px' }}>Send us a message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="grid-2">
                      <div className="input-group">
                        <label>Full Name *</label>
                        <input name="name" className="input-field" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                      </div>
                      <div className="input-group">
                        <label>Email *</label>
                        <input name="email" type="email" className="input-field" required value={formData.email} onChange={handleChange} placeholder="john@company.com" />
                      </div>
                    </div>
                    <div className="grid-2">
                      <div className="input-group">
                        <label>Company</label>
                        <input name="company" className="input-field" value={formData.company} onChange={handleChange} placeholder="Acme Corp" />
                      </div>
                      <div className="input-group">
                        <label>Phone</label>
                        <input name="phone" className="input-field" value={formData.phone} onChange={handleChange} placeholder="+1 555 000 0000" />
                      </div>
                    </div>
                    <div className="input-group">
                      <label>Service Interested In</label>
                      <select name="service" className="input-field" value={formData.service} onChange={handleChange}>
                        <option value="">Select a service</option>
                        <option value="air">Air Freight</option>
                        <option value="ocean">Ocean Freight</option>
                        <option value="road">Road & Rail</option>
                        <option value="customs">Customs Brokerage</option>
                        <option value="warehouse">Warehousing & 3PL</option>
                        <option value="consulting">Supply Chain Consulting</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label>Message *</label>
                      <textarea name="message" className="input-field" required rows="4" value={formData.message} onChange={handleChange} placeholder="Tell us about your shipping needs..." />
                    </div>

                    {error && (
                      <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '600', marginTop: '4px', marginBottom: '12px' }}>
                        ⚠️ {error}
                      </p>
                    )}

                    <button 
                      type="submit" 
                      className="btn-primary w-full" 
                      style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div style={{
                            width: '16px',
                            height: '16px',
                            border: '2px solid rgba(255, 255, 255, 0.1)',
                            borderTopColor: '#ffffff',
                            borderRadius: '50%',
                            animation: 'spin-slow 0.8s linear infinite',
                          }} />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style jsx global>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
