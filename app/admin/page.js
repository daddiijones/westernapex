'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  // Filters & Pagination State
  const [filterQuery, setFilterQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me');
        const data = await res.json();
        if (!data.success) {
          router.push('/admin/login');
          return;
        }
        setAuthenticated(true);
      } catch {
        router.push('/admin/login');
        return;
      }

      try {
        const res = await fetch('/api/shipments');
        const data = await res.json();
        if (data.success) {
          setShipments(data.shipments || []);
        }
      } catch (err) {
        console.error('Failed to load shipments:', err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    router.push('/admin/login');
  };

  const handleDelete = async (trackingNumber) => {
    if (!window.confirm(`Delete shipment ${trackingNumber}? This cannot be undone.`)) return;

    setDeletingId(trackingNumber);
    try {
      const res = await fetch(`/api/shipments/${trackingNumber}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setShipments(prev => prev.filter(s => s.trackingNumber !== trackingNumber));
      } else {
        alert(data.error || 'Failed to delete shipment');
      }
    } catch {
      alert('An error occurred while deleting.');
    } finally {
      setDeletingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      'Processing': 'badge-amber',
      'In Transit': 'badge-cyan',
      'Out for Delivery': 'badge-purple',
      'Delivered': 'badge-emerald',
      'Delayed': 'badge-rose',
      'Exception': 'badge-rose',
      'Created': 'badge-cyan',
    };
    return map[status] || 'badge-cyan';
  };

  // Filter shipments based on search query and status dropdown selection
  const filteredShipments = shipments.filter((s) => {
    if (statusFilter !== 'All' && s.status !== statusFilter) return false;
    
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase().trim();
      const trackingMatch = s.trackingNumber?.toLowerCase().includes(q);
      const senderMatch = s.senderName?.toLowerCase().includes(q) || s.senderCompany?.toLowerCase().includes(q);
      const receiverMatch = s.receiverName?.toLowerCase().includes(q) || s.receiverCompany?.toLowerCase().includes(q);
      const originMatch = s.senderCity?.toLowerCase().includes(q) || s.senderCountry?.toLowerCase().includes(q);
      const destinationMatch = s.receiverCity?.toLowerCase().includes(q) || s.receiverCountry?.toLowerCase().includes(q);
      
      return trackingMatch || senderMatch || receiverMatch || originMatch || destinationMatch;
    }
    
    return true;
  });

  // Calculate pagination boundaries
  const totalItems = filteredShipments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const activePage = Math.min(currentPage, totalPages);
  
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedShipments = filteredShipments.slice(startIndex, startIndex + itemsPerPage);

  if (!authenticated || loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-deepest)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{ animation: 'spin-slow 1s linear infinite', margin: '0 auto 16px' }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          <p style={{ color: '#64748b' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-deepest)' }}>
      {/* Top Bar */}
      <header style={{
        background: 'rgba(4,6,14,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
            }}>
              <img
                src="/logo.png"
                alt="WesternApex SHIPMENT SOLUTIONS"
                style={{ height: '34px', width: 'auto', display: 'block' }}
              />
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f1f5f9' }}>
                Admin <span style={{ color: '#ef4444' }}>Dashboard</span>
              </span>
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link href="/admin/create" className="btn-primary btn-sm">
              + New Shipment
            </Link>
            <button onClick={handleLogout} className="btn-ghost" style={{ color: '#64748b' }}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 24px' }}>
        <div className="grid-4" style={{ marginBottom: '32px' }}>
          {[
            { label: 'Total Shipments', value: shipments.length, color: '#ef4444' },
            { label: 'In Transit', value: shipments.filter(s => s.status === 'In Transit').length, color: '#f97316' },
            { label: 'Delivered', value: shipments.filter(s => s.status === 'Delivered').length, color: '#10b981' },
            { label: 'Processing', value: shipments.filter(s => s.status === 'Processing').length, color: '#f59e0b' },
          ].map((stat, i) => (
            <div key={i} className="glass-card-static" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '800', color: stat.color, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: '500' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card-static" style={{ padding: '0', overflow: 'hidden' }}>
          {/* Header & Filters Panel */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '700' }}>All Shipments</h2>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                Showing {filteredShipments.length} of {shipments.length} total
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {/* Text search */}
              <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search tracking #, sender/receiver names, ports..."
                  value={filterQuery}
                  onChange={(e) => { setFilterQuery(e.target.value); setCurrentPage(1); }}
                  className="input-field"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: '12px 16px 12px 38px',
                    margin: 0,
                    width: '100%',
                    fontSize: '0.85rem',
                  }}
                />
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}>
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
              </div>

              {/* Status Selector */}
              <div style={{ minWidth: '160px' }}>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
                  className="input-field"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    padding: '12px',
                    margin: 0,
                    width: '100%',
                    fontSize: '0.85rem',
                  }}
                >
                  <option value="All" style={{ background: '#0b1120' }}>All Statuses</option>
                  <option value="Created" style={{ background: '#0b1120' }}>Created</option>
                  <option value="Processing" style={{ background: '#0b1120' }}>Processing</option>
                  <option value="In Transit" style={{ background: '#0b1120' }}>In Transit</option>
                  <option value="Out for Delivery" style={{ background: '#0b1120' }}>Out for Delivery</option>
                  <option value="Delivered" style={{ background: '#0b1120' }}>Delivered</option>
                  <option value="Delayed" style={{ background: '#0b1120' }}>Delayed</option>
                  <option value="Exception" style={{ background: '#0b1120' }}>Exception</option>
                </select>
              </div>

              {/* Reset button */}
              {(filterQuery || statusFilter !== 'All') && (
                <button
                  type="button"
                  onClick={() => { setFilterQuery(''); setStatusFilter('All'); setCurrentPage(1); }}
                  className="btn-ghost"
                  style={{ padding: '10px 16px', fontSize: '0.85rem', color: '#ef4444' }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {paginatedShipments.length === 0 ? (
            <div style={{ padding: '60px 24px', textAlign: 'center' }}>
              <p style={{ color: '#64748b', marginBottom: '16px' }}>
                {shipments.length === 0 ? 'No shipments yet' : 'No shipments match your search filters'}
              </p>
              {shipments.length === 0 && (
                <Link href="/admin/create" className="btn-primary btn-sm">Create First Shipment</Link>
              )}
            </div>
          ) : (
            <>
              <div className="table-wrapper" style={{ border: 'none', borderRadius: '0' }}>
                <table className="premium-table">
                  <thead>
                    <tr>
                      <th>Tracking #</th>
                      <th>Receiver</th>
                      <th>Origin</th>
                      <th>Destination</th>
                      <th>Method</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedShipments.map((s) => (
                      <tr key={s.id}>
                        <td style={{ fontWeight: '600', color: '#ef4444', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                          {s.trackingNumber}
                        </td>
                        <td style={{ color: '#f1f5f9', fontWeight: '500' }}>{s.receiverName}</td>
                        <td>{s.senderCity}, {s.senderCountry}</td>
                        <td>{s.receiverCity}, {s.receiverCountry}</td>
                        <td>{s.shippingMethod}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(s.status)}`}>{s.status}</span>
                        </td>
                        <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '180px' }}>
                            <Link href={`/admin/edit/${s.trackingNumber}`} className="btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                              Edit
                            </Link>
                            <Link href={`/admin/update/${s.trackingNumber}`} className="btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                              Update
                            </Link>
                            <Link href={`/track/${s.trackingNumber}`} className="btn-ghost btn-sm" style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
                              View
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(s.trackingNumber)}
                              disabled={deletingId === s.trackingNumber}
                              className="btn-ghost btn-sm"
                              style={{ padding: '4px 8px', fontSize: '0.75rem', color: '#f43f5e', opacity: deletingId === s.trackingNumber ? 0.5 : 1, cursor: deletingId === s.trackingNumber ? 'not-allowed' : 'pointer' }}
                            >
                              {deletingId === s.trackingNumber ? 'Deleting...' : 'Delete'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div style={{
                  padding: '16px 24px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                  background: 'rgba(0,0,0,0.1)',
                }}>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    Showing <span style={{ color: '#f1f5f9', fontWeight: '600' }}>{startIndex + 1}</span> to <span style={{ color: '#f1f5f9', fontWeight: '600' }}>{endIndex}</span> of <span style={{ color: '#f1f5f9', fontWeight: '600' }}>{totalItems}</span> shipments
                  </div>
                  
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={activePage === 1}
                      className="btn-secondary btn-sm"
                      style={{
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        opacity: activePage === 1 ? 0.4 : 1,
                        cursor: activePage === 1 ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Prev
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isCurrent = activePage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            border: isCurrent ? 'none' : '1px solid rgba(255,255,255,0.08)',
                            background: isCurrent ? 'linear-gradient(135deg, #ef4444, #f97316)' : 'rgba(255,255,255,0.02)',
                            color: isCurrent ? '#ffffff' : '#94a3b8',
                            fontWeight: '600',
                            fontSize: '0.8rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={activePage === totalPages}
                      className="btn-secondary btn-sm"
                      style={{
                        padding: '8px 14px',
                        fontSize: '0.8rem',
                        opacity: activePage === totalPages ? 0.4 : 1,
                        cursor: activePage === totalPages ? 'not-allowed' : 'pointer',
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
