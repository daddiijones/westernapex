'use client';

import Link from 'next/link';

const footerSections = [
  {
    title: 'Solutions',
    links: [
      { label: 'Air Freight', href: '/services' },
      { label: 'Ocean Freight', href: '/services' },
      { label: 'Road Freight', href: '/services' },
      { label: 'Warehousing', href: '/services' },
      { label: 'Customs Brokerage', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Investors', href: '/investors' },
      { label: 'Sustainability', href: '/sustainability' },
      { label: 'Press & Media', href: '/news' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/help' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Track Shipment', href: '/' },
      { label: 'Get a Quote', href: '/contact' },
      { label: 'Legal', href: '/legal' },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, rgba(4, 6, 14, 0) 0%, rgba(4, 6, 14, 1) 20%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '300px',
        bottom: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse, rgba(239, 68, 68, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 24px 40px',
        }}>
          {/* Top Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
            gap: '48px',
            marginBottom: '60px',
          }} className="footer-grid">
            {/* Brand Column */}
            <div>
              <Link href="/" style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                textDecoration: 'none',
              }}>
                <img
                  src="/logo.png"
                  alt="WesternApex SHIPMENT SOLUTIONS"
                  style={{
                    height: '40px',
                    width: 'auto',
                    display: 'block',
                  }}
                />
              </Link>
              <p style={{
                color: '#64748b',
                fontSize: '0.9rem',
                lineHeight: '1.7',
                maxWidth: '300px',
                marginBottom: '24px',
              }}>
                Enterprise-grade global logistics solutions. Moving the world&#39;s most valuable cargo across 190+ countries.
              </p>
              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                {['LinkedIn', 'Twitter', 'GitHub'].map((social) => (
                  <a key={social} href="#" style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                    e.currentTarget.style.color = '#ef4444';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = '#64748b';
                  }}>
                    {social[0]}
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#94a3b8',
                  marginBottom: '20px',
                }}>
                  {section.title}
                </h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} style={{
                        color: '#64748b',
                        fontSize: '0.9rem',
                        transition: 'color 0.2s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}>
            <p style={{
              color: '#475569',
              fontSize: '0.8rem',
            }}>
              © {new Date().getFullYear()} WesternApex Logistics. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Settings'].map((item) => (
                <Link key={item} href="/legal" style={{
                  color: '#475569',
                  fontSize: '0.8rem',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
