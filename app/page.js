'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

/* ── Inline SVG Icons ── */
const AirplaneIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#gradCyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="gradCyan" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444"/><stop offset="100%" stopColor="#f97316"/></linearGradient></defs>
    <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
  </svg>
);

const ShipIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#gradBlue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="gradBlue" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#dc2626"/></linearGradient></defs>
    <path d="M2 20a2 2 0 0 0 2-2V9a2 2 0 0 1 2-2h1l2-4h6l2 4h1a2 2 0 0 1 2 2v9a2 2 0 0 0 2 2"/>
    <path d="M2 20h20"/>
    <path d="M8 7v4"/>
    <path d="M16 7v4"/>
    <path d="M6 11h12"/>
  </svg>
);

const ShieldIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#gradEmerald)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const TruckIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#gradAmber)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="gradAmber" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#f97316"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs>
    <path d="M1 3h15v13H1z"/>
    <path d="M16 8h4l3 3v5h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);

const WarehouseIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#gradPurple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="gradPurple" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#dc2626"/><stop offset="100%" stopColor="#ef4444"/></linearGradient></defs>
    <path d="M3 21V8l9-5 9 5v13"/>
    <path d="M9 21V13h6v8"/>
    <path d="M3 21h18"/>
  </svg>
);

const GlobeIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="url(#gradGlobe)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <defs><linearGradient id="gradGlobe" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#ef4444"/><stop offset="100%" stopColor="#dc2626"/></linearGradient></defs>
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const services = [
  {
    Icon: AirplaneIcon,
    title: 'Air Freight',
    desc: 'Express and charter air cargo with priority handling across 300+ global airports. Temperature-controlled and hazmat-certified.',
    badge: 'Fastest',
    badgeClass: 'badge-cyan',
    iconClass: 'icon-box-cyan',
  },
  {
    Icon: ShipIcon,
    title: 'Ocean Freight',
    desc: 'FCL and LCL container shipping with real-time GPS tracking. Access to 800+ port pairs with competitive rates.',
    badge: 'Most Popular',
    badgeClass: 'badge-purple',
    iconClass: 'icon-box-blue',
  },
  {
    Icon: ShieldIcon,
    title: 'Customs Brokerage',
    desc: 'Seamless customs clearance with licensed brokers in 50+ countries. Full compliance, documentation and duty management.',
    badge: 'Compliance',
    badgeClass: 'badge-emerald',
    iconClass: 'icon-box-emerald',
  },
  {
    Icon: TruckIcon,
    title: 'Road & Rail',
    desc: 'FTL, LTL, and intermodal solutions spanning continental routes. Cross-border expertise across every corridor.',
    badge: 'Flexible',
    badgeClass: 'badge-amber',
    iconClass: 'icon-box-cyan',
  },
  {
    Icon: WarehouseIcon,
    title: 'Warehousing & 3PL',
    desc: 'Strategically located fulfillment centers with WMS integration, pick-and-pack, inventory management, and last-mile dispatch.',
    badge: 'End-to-End',
    badgeClass: 'badge-purple',
    iconClass: 'icon-box-purple',
  },
  {
    Icon: GlobeIcon,
    title: 'Supply Chain Consulting',
    desc: 'Data-driven optimization of your global supply chain. Network design, cost modeling, and resilience planning.',
    badge: 'Strategic',
    badgeClass: 'badge-cyan',
    iconClass: 'icon-box-blue',
  },
];

const stats = [
  { value: '190+', label: 'Countries Served' },
  { value: '12M+', label: 'Shipments Delivered' },
  { value: '99.7%', label: 'On-Time Rate' },
  { value: '24/7', label: 'Global Support' },
];

const steps = [
  { num: '01', title: 'Get a Quote', desc: 'Submit your cargo details and receive an instant competitive quote within minutes.' },
  { num: '02', title: 'Book & Dispatch', desc: 'Confirm your booking, we handle pickup, documentation, and customs clearance.' },
  { num: '03', title: 'Real-Time Tracking', desc: 'Monitor your shipment with live GPS tracking, milestone alerts, and ETA updates.' },
  { num: '04', title: 'Delivered Safely', desc: 'Your cargo arrives on-time with proof of delivery and complete audit trail.' },
];

const testimonials = [
  {
    quote: "WesternApex transformed our supply chain. Transit times dropped 40% and visibility went from zero to real-time across all lanes.",
    name: "Sarah Chen",
    title: "VP of Operations, TechCorp Global",
  },
  {
    quote: "The customs brokerage team is exceptional. Zero clearance delays in 18 months — that's unheard of in our industry.",
    name: "Michael Adeyemi",
    title: "Director of Logistics, Meridian Pharma",
  },
  {
    quote: "Their platform gives us granular control over every shipment. The API integration was seamless and support is always responsive.",
    name: "Lars Johansson",
    title: "CTO, Nordic Supply Co.",
  },
];

export default function HomePage() {
  const [trackingNum, setTrackingNum] = useState('');
  const router = useRouter();

  // Estimator States
  const [estOrigin, setEstOrigin] = useState('Stockholm (ARN)');
  const [estDest, setEstDest] = useState('Santiago (SCL)');
  const [estMode, setEstMode] = useState('Air');
  const [estWeight, setEstWeight] = useState(150);
  const [estimating, setEstimating] = useState(false);
  const [estimateResult, setEstimateResult] = useState(null);

  // FAQ State
  const [openFaq, setOpenFaq] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (trackingNum.trim()) {
      router.push(`/track/${trackingNum.trim()}`);
    }
  };

  const calculateEstimate = (e) => {
    e.preventDefault();
    setEstimating(true);
    setEstimateResult(null);
    setTimeout(() => {
      const weightFactor = parseFloat(estWeight) || 0;
      let baseRate = 0;
      let transitDays = '';
      
      if (estMode === 'Air') {
        baseRate = 4.8 * weightFactor;
        transitDays = '2-3 Days';
      } else if (estMode === 'Ocean') {
        baseRate = 1.15 * weightFactor;
        transitDays = '18-24 Days';
      } else {
        baseRate = 2.1 * weightFactor;
        transitDays = '5-7 Days';
      }
      
      const fuelSurcharge = baseRate * 0.12;
      const customsFee = 150.00;
      const total = baseRate + fuelSurcharge + customsFee;

      setEstimateResult({
        baseRate: baseRate.toFixed(2),
        fuelSurcharge: fuelSurcharge.toFixed(2),
        customsFee: customsFee.toFixed(2),
        total: total.toFixed(2),
        days: transitDays,
        status: estOrigin === estDest ? 'Invalid Route' : 'Optimal Path',
      });
      setEstimating(false);
    }, 600);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ══════════ HERO ══════════ */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="hero-grid" />
          {/* Animated Orbs */}
          <div className="glow-orb glow-cyan animate-pulse-glow" style={{
            width: '500px', height: '500px', top: '10%', left: '10%',
          }} />
          <div className="glow-orb glow-purple animate-pulse-glow" style={{
            width: '400px', height: '400px', bottom: '10%', right: '10%',
            animationDelay: '1.5s',
          }} />
          <div className="glow-orb glow-blue animate-pulse-glow" style={{
            width: '300px', height: '300px', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            animationDelay: '0.8s',
          }} />
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Label */}
          <div className="animate-fade-in-up" style={{ marginBottom: '24px' }}>
            <span className="badge badge-cyan" style={{ fontSize: '0.8rem', padding: '8px 18px' }}>
              ✦ Enterprise-Grade Logistics Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="heading-hero animate-fade-in-up delay-100" style={{ marginBottom: '24px', maxWidth: '900px', margin: '0 auto 24px' }}>
            Move Cargo Across the{' '}
            <span className="text-gradient">Globe</span>{' '}
            with Precision
          </h1>

          <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '640px', margin: '0 auto 48px' }}>
            End-to-end freight management, real-time visibility, and customs brokerage across 190+ countries. Built for enterprises that demand reliability.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up delay-300" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
            <a href="/contact" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
              Get a Quote
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="/services" className="btn-secondary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
              Explore Services
            </a>
          </div>

          {/* Glass Tracking Widget */}
          <div className="glass-panel animate-fade-in-up delay-400" style={{ maxWidth: '600px', margin: '0 auto', padding: '8px' }}>
            <form onSubmit={handleTrack} style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{
                  position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                }}>
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  type="text"
                  placeholder="Enter tracking number..."
                  value={trackingNum}
                  onChange={(e) => setTrackingNum(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 48px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    color: '#f1f5f9',
                    fontSize: '0.95rem',
                    outline: 'none',
                    transition: 'all 0.3s',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(239,68,68,0.3)';
                    e.target.style.boxShadow = '0 0 20px rgba(239,68,68,0.08)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255,255,255,0.06)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{
                padding: '16px 28px',
                borderRadius: '12px',
                whiteSpace: 'nowrap',
              }}>
                Track
              </button>
            </form>
          </div>

          {/* Trust indicators */}
          <div className="animate-fade-in-up delay-500" style={{
            marginTop: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}>
            {['ISO 9001 Certified', 'IATA Licensed', 'AEO Approved', 'C-TPAT Partner'].map((item) => (
              <span key={item} style={{
                fontSize: '0.8rem',
                color: '#475569',
                fontWeight: '500',
                letterSpacing: '0.02em',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}>
                <span style={{ color: '#ef4444' }}>✦</span> {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className="section-sm" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div className="grid-4" style={{ textAlign: 'center' }}>
            {stats.map((stat, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0 }}>
                <div className="stat-value text-gradient">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ══════════ SERVICES ══════════ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label animate-fade-in-up" style={{ marginBottom: '12px', display: 'block' }}>Our Solutions</span>
            <h2 className="heading-section animate-fade-in-up delay-100">
              Comprehensive Freight <span className="text-gradient">Solutions</span>
            </h2>
            <p className="subheading animate-fade-in-up delay-200" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
              From air freight to last-mile delivery, we cover every link in your supply chain with enterprise-grade reliability.
            </p>
          </div>

          <div className="grid-3">
            {services.map((service, i) => (
              <div key={i} className="glass-card animate-fade-in-up" style={{
                animationDelay: `${0.1 + i * 0.08}s`, opacity: 0,
              }}>
                <div className={`icon-box ${service.iconClass}`}>
                  <service.Icon size={28} />
                </div>
                <span className={`badge ${service.badgeClass}`} style={{ marginBottom: '16px', display: 'inline-flex' }}>
                  {service.badge}
                </span>
                <h3 className="heading-card" style={{ marginBottom: '12px' }}>{service.title}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ══════════ INFRASTRUCTURE & TELEMETRY ══════════ */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label">Global Network</span>
            <h2 className="heading-section" style={{ marginTop: '12px' }}>
              Built for <span className="text-gradient">Next-Gen</span> Supply Chains
            </h2>
            <p className="subheading" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
              Our infrastructure is engineered for resilience, packing smart tracking telemetry and dedicated cargo control centers.
            </p>
          </div>

          <div className="grid-3">
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                <span className="badge badge-emerald">Active</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>IoT Telemetry Shield</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
                Each cargo pallet is loaded with sensory tracking nodes monitoring coordinates, ambient temp (-40°C to +80°C), humidity spikes, and shock alerts.
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: '#64748b' }}>Device Latency</span>
                <span style={{ color: '#f1f5f9', fontWeight: '600' }}>&lt; 5 seconds</span>
              </div>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '8px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <span className="badge badge-cyan">GDP Certified</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>Cold Chain Precision</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
                Strict thermal containment solutions with dry-ice/gel-packs setups. Fully compliant for pharmaceuticals, chemical reagents, and life sciences.
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: '#64748b' }}>Temp Hold Stability</span>
                <span style={{ color: '#f1f5f9', fontWeight: '600' }}>Up to 120 Hours</span>
              </div>
            </div>

            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                </div>
                <span className="badge badge-purple">Developer API</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px' }}>ERP & EDI Integration</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '20px' }}>
                Connect shipping bookings directly to your internal SAP, Oracle, or custom logistics stack using our robust REST APIs and webhook payloads.
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: '#64748b' }}>API Uptime SLA</span>
                <span style={{ color: '#f1f5f9', fontWeight: '600' }}>99.99% Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ══════════ PROCESS ══════════ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label animate-fade-in-up" style={{ marginBottom: '12px', display: 'block' }}>How It Works</span>
            <h2 className="heading-section animate-fade-in-up delay-100">
              Ship in <span className="text-gradient">Four Simple</span> Steps
            </h2>
          </div>

          <div className="grid-4">
            {steps.map((step, i) => (
              <div key={i} className="glass-card-static animate-fade-in-up" style={{
                animationDelay: `${0.1 + i * 0.1}s`,
                opacity: 0,
                textAlign: 'center',
                padding: '40px 24px',
              }}>
                <div style={{
                  fontSize: '3rem',
                  fontWeight: '900',
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.15))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '16px',
                  lineHeight: 1,
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '10px' }}>{step.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.7' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ══════════ CARGO COST ESTIMATOR ══════════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb glow-purple" style={{ width: '400px', height: '400px', bottom: '-10%', left: '-10%', opacity: 0.15 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="label">Live Rates Tool</span>
            <h2 className="heading-section" style={{ marginTop: '12px' }}>
              Instant Freight <span className="text-gradient">Estimator</span>
            </h2>
            <p className="subheading" style={{ maxWidth: '600px', margin: '16px auto 0' }}>
              Select shipment routes and cargo parameters to obtain an immediate, real-time freight cost layout.
            </p>
          </div>

          <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto', padding: '40px' }}>
            <form onSubmit={calculateEstimate} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', alignItems: 'end' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>Origin Hub</label>
                <select 
                  value={estOrigin} 
                  onChange={(e) => setEstOrigin(e.target.value)}
                  style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', color: '#f1f5f9', outline: 'none' }}
                >
                  <option value="Stockholm (ARN)" style={{ background: '#0b1120' }}>Stockholm (ARN) - Sweden</option>
                  <option value="New York (JFK)" style={{ background: '#0b1120' }}>New York (JFK) - USA</option>
                  <option value="Singapore (SIN)" style={{ background: '#0b1120' }}>Singapore (SIN) - Singapore</option>
                  <option value="Frankfurt (FRA)" style={{ background: '#0b1120' }}>Frankfurt (FRA) - Germany</option>
                  <option value="Santiago (SCL)" style={{ background: '#0b1120' }}>Santiago (SCL) - Chile</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>Destination Hub</label>
                <select 
                  value={estDest} 
                  onChange={(e) => setEstDest(e.target.value)}
                  style={{ width: '100%', padding: '14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', color: '#f1f5f9', outline: 'none' }}
                >
                  <option value="Santiago (SCL)" style={{ background: '#0b1120' }}>Santiago (SCL) - Chile</option>
                  <option value="Stockholm (ARN)" style={{ background: '#0b1120' }}>Stockholm (ARN) - Sweden</option>
                  <option value="New York (JFK)" style={{ background: '#0b1120' }}>New York (JFK) - USA</option>
                  <option value="Singapore (SIN)" style={{ background: '#0b1120' }}>Singapore (SIN) - Singapore</option>
                  <option value="Frankfurt (FRA)" style={{ background: '#0b1120' }}>Frankfurt (FRA) - Germany</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>Freight Mode</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {['Air', 'Ocean', 'Road'].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setEstMode(mode)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid',
                        borderColor: estMode === mode ? '#ef4444' : 'rgba(255,255,255,0.06)',
                        background: estMode === mode ? 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(249,115,22,0.15))' : 'rgba(255,255,255,0.02)',
                        color: estMode === mode ? '#f1f5f9' : '#94a3b8',
                        fontWeight: '600',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>Payload Weight</label>
                  <span style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: '700' }}>{estWeight} kg</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="5000" 
                  step="10"
                  value={estWeight}
                  onChange={(e) => setEstWeight(parseInt(e.target.value))}
                  style={{ width: '100%', accentColor: '#ef4444', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px' }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '12px' }}>
                <button type="submit" className="btn-primary" style={{ padding: '14px 48px', width: '100%', maxWidth: '300px' }} disabled={estimating}>
                  {estimating ? 'Calculating...' : 'Generate Cost Layout'}
                </button>
              </div>
            </form>

            {estimateResult && (
              <div className="glass-panel animate-fade-in-up" style={{ marginTop: '36px', border: '1px solid rgba(239, 68, 68, 0.15)', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                  
                  <div>
                    <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '16px' }}>Cost Breakdown</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8' }}>Freight Base Rate:</span>
                        <span style={{ fontWeight: '600', color: '#f1f5f9' }}>${estimateResult.baseRate} USD</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8' }}>Fuel Surcharge (12%):</span>
                        <span style={{ fontWeight: '600', color: '#f1f5f9' }}>${estimateResult.fuelSurcharge} USD</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8' }}>Customs Entry Fee:</span>
                        <span style={{ fontWeight: '600', color: '#f1f5f9' }}>${estimateResult.customsFee} USD</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px', marginTop: '5px' }}>
                        <span style={{ fontWeight: '700', color: '#f1f5f9' }}>Estimated Total:</span>
                        <span style={{ fontWeight: '900', color: '#ef4444', fontSize: '1.15rem' }}>${estimateResult.total} USD</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', paddingLeft: '32px' }}>
                    <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.05em', marginBottom: '16px' }}>Transit & Routing</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Transit Duration</span>
                        <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#f97316' }}>{estimateResult.days}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>Terminal Corridor</span>
                        <span style={{ fontSize: '0.9rem', color: '#f1f5f9', fontWeight: '600' }}>{estOrigin} &rarr; {estDest}</span>
                      </div>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '6px 12px', borderRadius: '9999px', background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.15)', width: 'fit-content', marginTop: '4px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                        Route Verified: {estimateResult.status}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb glow-cyan" style={{ width: '400px', height: '400px', top: '20%', right: '-10%' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="label animate-fade-in-up" style={{ marginBottom: '12px', display: 'block' }}>Testimonials</span>
            <h2 className="heading-section animate-fade-in-up delay-100">
              Trusted by <span className="text-gradient">Industry Leaders</span>
            </h2>
          </div>

          <div className="grid-3">
            {testimonials.map((t, i) => (
              <div key={i} className="glass-card animate-fade-in-up" style={{
                animationDelay: `${0.1 + i * 0.1}s`, opacity: 0,
              }}>
                {/* Stars */}
                <div style={{ marginBottom: '16px', color: '#f59e0b', fontSize: '0.9rem', letterSpacing: '2px' }}>
                  ★★★★★
                </div>
                <p style={{
                  color: '#cbd5e1',
                  fontSize: '0.95rem',
                  lineHeight: '1.8',
                  marginBottom: '24px',
                  fontStyle: 'italic',
                }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{t.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '2px' }}>{t.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ══════════ FAQ ACCORDION ══════════ */}
      <section className="section" style={{ position: 'relative' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span className="label">FAQ Portal</span>
            <h2 className="heading-section" style={{ marginTop: '12px' }}>
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="subheading" style={{ marginTop: '12px' }}>
              Everything you need to know about booking, tracking, and customs clearance procedures.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: "How does real-time cargo telemetry and tracking work?",
                a: "Every shipment is registered with IoT cellular & satellite tracking tags that stream live GPS position, temperature (+2°C to +8°C for cold chain), pressure, and humidity reports directly to our tracking portal. No manual barcode scanning needed at intermediate hubs."
              },
              {
                q: "What documentation is required for customs pre-clearance?",
                a: "Our system automatically compiles the Commercial Invoice, Packing List, and Export Declarations in compliance with global customs protocols (like AEO and C-TPAT). These are transmitted to local authorities while the flight/vessel is in transit, facilitating instant clearance upon arrival."
              },
              {
                q: "Can I customize shipping routes for delicate or valuable items?",
                a: "Absolutely. Our logistics advisory team works with you to design dedicated routes, avoiding high-congestion container ports or weather-risk flight corridors. Every custom shipment includes dual-custody tracking protocols."
              },
              {
                q: "What is your on-time delivery assurance?",
                a: "WesternApex boasts a 99.7% on-time delivery rate. In the rare event of major weather disruptions or air carrier delays, our AI dynamic routing software instantly redirects cargo to backup schedules to preserve transit time commitment."
              }
            ].map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div 
                  key={index} 
                  className="glass-panel" 
                  style={{ 
                    padding: '20px 24px', 
                    cursor: 'pointer', 
                    border: isOpen ? '1px solid rgba(239, 68, 68, 0.15)' : '1px solid rgba(255,255,255,0.06)',
                    background: isOpen ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)',
                    transition: 'all 0.3s'
                  }}
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', color: isOpen ? '#f1f5f9' : '#cbd5e1' }}>
                      {faq.q}
                    </h3>
                    <span style={{ fontSize: '1.25rem', color: '#ef4444', fontWeight: 'bold', transition: 'transform 0.3s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                      ＋
                    </span>
                  </div>
                  <div 
                    style={{ 
                      maxHeight: isOpen ? '300px' : '0', 
                      overflow: 'hidden', 
                      transition: 'all 0.4s ease-in-out',
                      marginTop: isOpen ? '16px' : '0',
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.7' }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ══════════ PARTNERS ══════════ */}
      <section className="section-sm">
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="label" style={{ marginBottom: '32px' }}>Trusted Partners & Integrations</p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '48px',
            flexWrap: 'wrap',
            opacity: 0.4,
          }}>
            {['Maersk', 'DHL', 'FedEx', 'MSC', 'CMA CGM', 'Emirates SkyCargo', 'DB Schenker'].map((name) => (
              <span key={name} style={{
                fontSize: '1.1rem',
                fontWeight: '700',
                letterSpacing: '0.02em',
                color: '#f1f5f9',
              }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ══════════ CTA ══════════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="glow-orb glow-purple" style={{ width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="glass-panel" style={{ padding: '80px 40px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <span className="label" style={{ marginBottom: '16px', display: 'block' }}>Ready to Ship?</span>
            <h2 className="heading-section" style={{ marginBottom: '16px' }}>
              Let&#39;s Move Your Cargo <span className="text-gradient">Forward</span>
            </h2>
            <p className="subheading" style={{ maxWidth: '500px', margin: '0 auto 40px' }}>
              Join thousands of businesses that trust WesternApex for their most critical shipments.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
                Get Started Today
              </a>
              <a href="/contact" className="btn-secondary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
