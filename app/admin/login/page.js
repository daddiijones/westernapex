'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-deepest)',
      position: 'relative',
      overflow: 'hidden',
      padding: '24px',
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(239,68,68,0.06) 0%, transparent 70%)',
      }} />
      <div className="glow-orb glow-cyan animate-pulse-glow" style={{
        width: '400px', height: '400px', top: '10%', left: '20%',
      }} />
      <div className="glow-orb glow-purple animate-pulse-glow" style={{
        width: '300px', height: '300px', bottom: '10%', right: '20%',
        animationDelay: '1.5s',
      }} />

      {/* Login Card */}
      <div className="glass-panel animate-fade-in-up" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '48px 40px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            marginBottom: '24px',
          }}>
            <img
              src="/logo.png"
              alt="WesternApex SHIPMENT SOLUTIONS"
              style={{
                height: '72px',
                width: 'auto',
                display: 'block',
              }}
            />
          </Link>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Welcome Back
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Sign in to your admin dashboard</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(244,63,94,0.08)',
            border: '1px solid rgba(244,63,94,0.2)',
            borderRadius: '10px',
            padding: '14px 16px',
            marginBottom: '24px',
            color: '#f43f5e',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="admin@westernapex.online"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading}
            style={{ marginTop: '8px', padding: '16px' }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin-slow 1s linear infinite' }}>
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                Signing in...
              </span>
            ) : 'Sign In'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Link href="/" style={{ color: '#64748b', fontSize: '0.85rem', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}>
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}
