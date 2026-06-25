'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function TrackShipmentClient({ initialShipment, trackingId }) {
  const router = useRouter();
  const [shipment, setShipment] = useState(initialShipment || null);
  const [loading, setLoading] = useState(!initialShipment && trackingId !== 'search');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState(trackingId === 'search' ? '' : trackingId);

  useEffect(() => {
    if (!initialShipment && trackingId && trackingId !== 'search') {
      fetchShipment(trackingId);
    } else if (initialShipment) {
      setShipment(initialShipment);
      setError('');
      setLoading(false);
    }
  }, [trackingId, initialShipment]);

  const fetchShipment = async (trackingNum) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/shipments?trackingNumber=${trackingNum.trim()}`);
      const data = await res.json();
      
      if (data.success && data.shipment) {
        setShipment(data.shipment);
      } else {
        setShipment(null);
        setError(data.error || 'No shipment matches this tracking number.');
      }
    } catch (err) {
      setError('Could not retrieve logistics data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/track/${searchQuery.trim()}`);
      fetchShipment(searchQuery.trim());
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'badge-emerald';
      case 'in transit': return 'badge-cyan';
      case 'out for delivery': return 'badge-purple';
      case 'delayed': return 'badge-rose';
      case 'exception': return 'badge-rose';
      case 'processing': return 'badge-amber';
      default: return 'badge-cyan';
    }
  };

  const getShareLink = () => {
    if (typeof window === 'undefined') return '';
    const shareText = `📦 WesternApex Logistics Waybill Receipt\n\n` +
      `• Tracking #: ${shipment.trackingNumber}\n` +
      `• Current Status: ${shipment.status}\n` +
      `• Routing: ${shipment.originPort || shipment.senderCity} → ${shipment.destinationPort || shipment.receiverCity}\n\n` +
      `Track your package live: ${window.location.origin}/track/${shipment.trackingNumber}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  };

  return (
    <div className="page-wrapper">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Libre+Barcode+39&family=Dancing+Script:wght@700&display=swap" />
      <Navbar />

      <div className="page-content" style={{ minHeight: '85vh', position: 'relative', overflow: 'hidden', paddingBottom: '80px' }}>
        {/* Glow Orbs */}
        <div className="glow-orb glow-cyan animate-pulse-glow" style={{ width: '400px', height: '400px', top: '10%', left: '-10%' }} />
        <div className="glow-orb glow-purple animate-pulse-glow" style={{ width: '300px', height: '300px', bottom: '10%', right: '-10%', animationDelay: '1.5s' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          
          {/* SEARCH MODE OR ERROR */}
          {(trackingId === 'search' || error) && !loading && (
            <div style={{ maxWidth: '600px', margin: '80px auto 40px', padding: '0 20px' }}>
              <div className="glass-panel animate-fade-in-up" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(239,68,68,0.1), rgba(249,115,22,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', margin: '0 auto 20px', color: '#ef4444'
                }}>
                  🔍
                </div>
                
                <h1 className="heading-card text-gradient mb-16">
                  {error ? 'Shipment Not Found' : 'Track Your Shipment'}
                </h1>
                
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '32px' }}>
                  {error ? error : 'Enter your master tracking waybill number to view real-time shipping status, routing coordinates, and customs clearance events.'}
                </p>

                <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    placeholder="Enter Tracking Number (e.g. AWB-...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)' }}
                    required
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '14px 28px', borderRadius: '12px' }}>
                    Track
                  </button>
                </form>

                {error && (
                  <button onClick={() => { setError(''); setSearchQuery(''); router.push('/track/search'); }} className="btn-ghost" style={{ marginTop: '24px' }}>
                    Clear Search
                  </button>
                )}
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '50vh', gap: '16px' }}>
              <div style={{
                width: '40px', height: '40px',
                border: '3px solid rgba(239, 68, 68, 0.1)',
                borderTopColor: '#ef4444',
                borderRadius: '50%',
                animation: 'spin-slow 1s linear infinite',
              }} />
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: '500', letterSpacing: '0.05em' }}>
                RETRIEVING SECURE LOGISTICS DATA...
              </p>
            </div>
          )}

          {/* SHIPMENT DATA MODE */}
          {!loading && !error && shipment && (
            <div className="animate-fade-in" style={{ marginTop: '40px' }}>
              
              {/* Header Waybill Summary Card */}
              <div className="glass-card-static" style={{ padding: '32px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <span className="label" style={{ marginBottom: '8px', display: 'block' }}>Master Tracking Number</span>
                    <h1 className="text-gradient" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '900', letterSpacing: '-0.02em' }}>
                      {shipment.trackingNumber}
                    </h1>
                  </div>

                  {/* Barcode Display */}
                  <div className="barcode-display" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', padding: '10px 20px', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <span style={{ fontFamily: "'Libre Barcode 39', cursive", fontSize: '3.2rem', color: '#f1f5f9', display: 'block', lineHeight: 1.1 }}>
                      {`*${shipment.trackingNumber}*`}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '0.15em', fontWeight: '600' }}>
                      {shipment.trackingNumber}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span className={`badge ${getStatusBadgeClass(shipment.status)}`} style={{ fontSize: '1rem', padding: '10px 24px' }}>
                      {shipment.status}
                    </span>
                    
                    <a
                      href={getShareLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        padding: '10px 20px',
                        fontSize: '0.85rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'linear-gradient(135deg, #25D366, #128C7E)',
                        border: 'none',
                        color: '#ffffff',
                        fontWeight: '600',
                        borderRadius: '9999px',
                        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
                        textDecoration: 'none',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.53 1.98 14.06 1.98 11.43 1.98c-5.43 0-9.85 4.37-9.854 9.8 0 1.637.43 3.23 1.248 4.65l-.97 3.54 3.63-.952zm11.758-7.5c-.328-.164-1.94-.959-2.24-1.07-.3-.109-.52-.164-.74.164-.22.329-.85 1.07-1.04 1.29-.19.22-.38.24-.71.077-.33-.164-1.39-.512-2.65-1.637-.98-.876-1.64-1.958-1.83-2.288-.19-.329-.02-.507.145-.672.15-.148.33-.385.49-.578.16-.192.22-.329.33-.548.11-.22.05-.411-.02-.575-.07-.164-.74-1.78-.74-1.78-.29-.696-.58-.6-.8-.604H7.93c-.22 0-.58.083-.88.411-.3.33-1.15 1.123-1.15 2.74s1.18 3.178 1.34 3.397c.16.22 2.33 3.558 5.64 4.99.79.34 1.4.544 1.88.702.79.25 1.51.215 2.08.13.63-.094 1.94-.794 2.22-1.547.27-.753.27-1.397.19-1.533-.08-.137-.3-.22-.62-.383z"/>
                      </svg>
                      WhatsApp Share
                    </a>

                    <button onClick={() => window.print()} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.85rem' }}>
                      Print Waybill
                    </button>
                  </div>
                </div>
              </div>

              {/* Sender & Receiver Address Grid */}
              <div className="grid-2" style={{ marginBottom: '24px' }}>
                <div className="glass-card-static" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px', color: '#f1f5f9' }}>
                    Consignor (Sender)
                  </h3>
                  <p style={{ fontWeight: '600', color: '#f1f5f9' }}>{shipment.senderName}</p>
                  {shipment.senderCompany && <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px' }}>{shipment.senderCompany}</p>}
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginTop: '12px' }}>
                    <p>{shipment.senderAddress}</p>
                    <p>{shipment.senderCity}, {shipment.senderState} {shipment.senderZip}</p>
                    <p style={{ fontWeight: '700', color: '#ef4444', marginTop: '4px' }}>{shipment.senderCountry}</p>
                  </div>
                </div>

                <div className="glass-card-static" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '8px', color: '#f1f5f9' }}>
                    Consignee (Receiver)
                  </h3>
                  <p style={{ fontWeight: '600', color: '#f1f5f9' }}>{shipment.receiverName}</p>
                  {shipment.receiverCompany && <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '8px' }}>{shipment.receiverCompany}</p>}
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginTop: '12px' }}>
                    <p>{shipment.receiverAddress}</p>
                    <p>{shipment.receiverCity}, {shipment.receiverState} {shipment.receiverZip}</p>
                    <p style={{ fontWeight: '700', color: '#ef4444', marginTop: '4px' }}>{shipment.receiverCountry}</p>
                  </div>
                </div>
              </div>

              {/* Waybill / Air Waybill Specifications Panel */}
              <div className="glass-card-static" style={{ padding: '32px', marginBottom: '24px', position: 'relative' }}>
                
                {/* Stamp Duty overlay */}
                {shipment.stampDuty && shipment.stampDuty !== 'Exempt' && (
                  <div style={{
                    position: 'absolute',
                    top: '24px',
                    right: '32px',
                    border: '4px double #ef4444',
                    color: '#ef4444',
                    fontFamily: 'monospace',
                    fontSize: '1rem',
                    fontWeight: '900',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    transform: 'rotate(-12deg)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    boxShadow: '0 0 8px rgba(239, 68, 68, 0.15)',
                    zIndex: 2,
                    background: 'rgba(8,12,26,0.9)',
                  }}>
                    STAMP DUTY ({shipment.stampDuty})
                  </div>
                )}

                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', color: '#f1f5f9' }}>
                  Waybill Specifications & Security Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '32px' }} className="grid-3">
                  
                  {/* Services Checklist */}
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>Shipment Details / Services</span>
                    <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: shipment.servicePackaging ? '#ef4444' : '#64748b' }}>
                        <span>{shipment.servicePackaging ? '☑' : '☒'}</span>
                        <span style={{ textDecoration: shipment.servicePackaging ? 'none' : 'line-through' }}>PACKAGING AND STORAGE</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: shipment.serviceCargo ? '#ef4444' : '#64748b' }}>
                        <span>{shipment.serviceCargo ? '☑' : '☒'}</span>
                        <span style={{ textDecoration: shipment.serviceCargo ? 'none' : 'line-through' }}>CARGO</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: shipment.serviceWorldwide ? '#ef4444' : '#64748b' }}>
                        <span>{shipment.serviceWorldwide ? '☑' : '☒'}</span>
                        <span style={{ textDecoration: shipment.serviceWorldwide ? 'none' : 'line-through' }}>WORLDWIDE TRANSPORT</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: shipment.serviceDoorToDoor ? '#ef4444' : '#64748b' }}>
                        <span>{shipment.serviceDoorToDoor ? '☑' : '☒'}</span>
                        <span style={{ textDecoration: shipment.serviceDoorToDoor ? 'none' : 'line-through' }}>DOOR TO DOOR DELIVERY</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: shipment.serviceOther ? '#ef4444' : '#64748b' }}>
                        <span>{shipment.serviceOther ? '☑' : '☒'}</span>
                        <span style={{ textDecoration: shipment.serviceOther ? 'none' : 'line-through' }}>OTHER SERVICES</span>
                      </div>
                    </div>
                  </div>

                  {/* Security Checker */}
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>Security Checker & VAT</span>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginTop: '12px' }}>
                      <tbody>
                        <tr>
                          <td style={{ padding: '6px 0', color: '#64748b' }}>COMMUNITY CODE:</td>
                          <td style={{ padding: '6px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.harmonizedCode || 'No'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 0', color: '#64748b' }}>SENDER VAT/GST:</td>
                          <td style={{ padding: '6px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.senderVat || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 0', color: '#64748b' }}>RECEIVER VAT:</td>
                          <td style={{ padding: '6px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.receiverVat || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 0', color: '#64748b' }}>EXPORT TYPE:</td>
                          <td style={{ padding: '6px 0', fontWeight: '700', color: '#f97316', textAlign: 'right' }}>{shipment.typeOfExport || 'Permanent'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 0', color: '#64748b' }}>TAX PAYER:</td>
                          <td style={{ padding: '6px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.dutiesPaymentTerms || 'Receiver'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Size & Weight Checker */}
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>Waybill Parameters</span>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginTop: '12px' }}>
                      <tbody>
                        <tr>
                          <td style={{ padding: '6px 0', color: '#64748b' }}>VOLUMETRIC WT:</td>
                          <td style={{ padding: '6px 0', fontWeight: '700', color: '#ef4444', textAlign: 'right' }}>{shipment.volumetricWeight ? `${shipment.volumetricWeight} KG` : 'N/A'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 0', color: '#64748b' }}>X-RAY RESULT:</td>
                          <td style={{ padding: '6px 0', fontWeight: '700', color: '#10b981', textAlign: 'right' }}>{shipment.xrayScanResult || 'Negative'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 0', color: '#64748b' }}>SERVICE CHARGE:</td>
                          <td style={{ padding: '6px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.serviceCharge || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 0', color: '#64748b' }}>PAYMENT STATUS:</td>
                          <td style={{ padding: '6px 0', fontWeight: '700', color: shipment.paymentStatus === 'Paid' ? '#10b981' : '#f59e0b', textAlign: 'right' }}>
                            {shipment.paymentStatus || 'Pending'}
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: '6px 0', color: '#64748b' }}>PICKED UP BY:</td>
                          <td style={{ padding: '6px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.toBePickedUpBy || 'Consignee'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* Authorized Signature */}
                {shipment.authorizedSignature && (
                  <div style={{
                    marginTop: '24px',
                    paddingTop: '20px',
                    borderTop: '1px solid var(--glass-border)',
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <span style={{
                        fontFamily: "'Dancing Script', cursive",
                        fontSize: '2.2rem',
                        fontWeight: '700',
                        color: '#f1f5f9',
                        display: 'block',
                        lineHeight: 1,
                      }}>
                        {shipment.authorizedSignature}
                      </span>
                      <div style={{ borderTop: '1px solid #64748b', marginTop: '8px', paddingTop: '6px', minWidth: '220px' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#64748b' }}>
                          Authorized Signature
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Customs Warning Note */}
                {shipment.paymentStatus !== 'Paid' && (
                  <div style={{
                    marginTop: '24px',
                    padding: '16px',
                    background: 'rgba(239, 68, 68, 0.05)',
                    border: '1px dashed rgba(239, 68, 68, 0.2)',
                    borderRadius: '8px',
                    color: '#ef4444',
                    fontSize: '0.85rem',
                    fontWeight: '700',
                    textAlign: 'center',
                    letterSpacing: '0.05em',
                  }}>
                    ⚠️ CUSTOM DUTIES AND CLEARANCE FEES MUST BE PAID BEFORE DELIVERY
                  </div>
                )}
              </div>

              {/* Logistics Routing Matrix */}
              <div className="glass-card-static" style={{ padding: '32px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', color: '#f1f5f9' }}>
                  Freight forwarding Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '32px' }} className="grid-3">
                  
                  {/* Route Visualizer */}
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>Routing Matrix</span>
                    <div style={{ marginTop: '16px', paddingLeft: '16px', borderLeft: '2px solid #ef4444' }}>
                      <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{shipment.originPort || shipment.senderCity}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '10px 0', color: '#f97316', fontWeight: '700', fontSize: '0.85rem' }}>
                        <span>↓ {shipment.shippingMethod}</span>
                        {shipment.carrierName && <span style={{ color: '#64748b', fontWeight: '400' }}>({shipment.carrierName})</span>}
                      </div>
                      <p style={{ fontWeight: '600', fontSize: '0.95rem' }}>{shipment.destinationPort || shipment.receiverCity}</p>
                    </div>
                  </div>

                  {/* Matrix Block 1 */}
                  <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <tbody>
                        <tr>
                          <td style={{ padding: '8px 0', color: '#64748b', fontWeight: '500' }}>INCOTERMS:</td>
                          <td style={{ padding: '8px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.incoterms || 'N/A'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 0', color: '#64748b', fontWeight: '500' }}>TOTAL WEIGHT:</td>
                          <td style={{ padding: '8px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.totalWeight ? `${shipment.totalWeight} KG` : 'N/A'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 0', color: '#64748b', fontWeight: '500' }}>TOTAL VOLUME:</td>
                          <td style={{ padding: '8px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.totalVolume ? `${shipment.totalVolume} CBM` : 'N/A'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 0', color: '#64748b', fontWeight: '500' }}>VESSEL/FLIGHT:</td>
                          <td style={{ padding: '8px 0', fontWeight: '700', color: '#ef4444', textAlign: 'right' }}>{shipment.vesselFlightNumber || 'N/A'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Matrix Block 2 */}
                  <div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                      <tbody>
                        <tr>
                          <td style={{ padding: '8px 0', color: '#64748b', fontWeight: '500' }}>DEPARTURE DATE:</td>
                          <td style={{ padding: '8px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.estimatedDeparture ? new Date(shipment.estimatedDeparture).toLocaleDateString() : 'TBD'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 0', color: '#64748b', fontWeight: '500' }}>ESTIMATED ARRIVAL:</td>
                          <td style={{ padding: '8px 0', fontWeight: '700', color: '#10b981', textAlign: 'right' }}>{shipment.estimatedArrival ? new Date(shipment.estimatedArrival).toLocaleDateString() : 'TBD'}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 0', color: '#64748b', fontWeight: '500' }}>CUSTOMS STATUS:</td>
                          <td style={{ padding: '8px 0', fontWeight: '700', color: '#f97316', textAlign: 'right' }}>{shipment.customsStatus}</td>
                        </tr>
                        <tr>
                          <td style={{ padding: '8px 0', color: '#64748b', fontWeight: '500' }}>PACKAGE COUNT:</td>
                          <td style={{ padding: '8px 0', fontWeight: '700', color: '#f1f5f9', textAlign: 'right' }}>{shipment.packageCount} PLT</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>

              {/* Package Manifest Items */}
              {shipment.items && shipment.items.length > 0 && (
                <div className="glass-card-static" style={{ padding: '32px', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', color: '#f1f5f9' }}>Cargo Manifest</h3>
                  <div className="table-wrapper">
                    <table className="premium-table">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th style={{ textAlign: 'center' }}>Qty</th>
                          <th style={{ textAlign: 'center' }}>Weight (KG)</th>
                          <th style={{ textAlign: 'center' }}>Dimensions (cm)</th>
                          <th style={{ textAlign: 'center' }}>HS Code</th>
                          <th style={{ textAlign: 'right' }}>Declared Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipment.items.map((item) => (
                          <tr key={item.id}>
                            <td style={{ fontWeight: '600', color: '#f1f5f9' }}>{item.description}</td>
                            <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                            <td style={{ textAlign: 'center' }}>{item.weight || '-'}</td>
                            <td style={{ textAlign: 'center' }}>{item.length && item.width && item.height ? `${item.length} x ${item.width} x ${item.height}` : '-'}</td>
                            <td style={{ textAlign: 'center' }}>{item.hsCode || '-'}</td>
                            <td style={{ textAlign: 'right', fontWeight: '600', color: '#ef4444' }}>{item.value ? `${item.value.toLocaleString()} ${shipment.currency}` : '-'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Cargo Visual Inspection Image */}
                  {shipment.packagePicture && (
                    <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--glass-border)' }}>
                      <span className="label" style={{ marginBottom: '16px', display: 'block' }}>Cargo Visual Inspection Record</span>
                      <div style={{ 
                        position: 'relative', 
                        width: '100%', 
                        maxWidth: '480px', 
                        borderRadius: '12px',
                        overflow: 'hidden', 
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--glass-shadow)' 
                      }}>
                        <img 
                          src={shipment.packagePicture} 
                          alt="Cargo Inspection Record" 
                          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Event Log / Progress Timeline */}
              <div className="glass-card-static" style={{ padding: '32px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '24px', color: '#f1f5f9' }}>Tracking Event Log</h3>

                <div style={{ paddingLeft: '8px' }}>
                  {shipment.updates && shipment.updates.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                      {shipment.updates.map((update, idx) => (
                        <div key={update.id} style={{ display: 'flex', gap: '24px', position: 'relative' }}>
                          
                          {/* Timeline vertical bar connector */}
                          {idx !== shipment.updates.length - 1 && (
                            <div style={{
                              position: 'absolute',
                              left: '9px',
                              top: '24px',
                              bottom: '-32px',
                              width: '2px',
                              background: 'linear-gradient(180deg, #ef4444, rgba(239, 68, 68, 0.05))',
                            }} />
                          )}

                          {/* Timeline Dot Indicator */}
                          <div className="timeline-dot" style={{
                            width: '20px', height: '20px', borderRadius: '50%',
                            background: idx === 0 ? '#ef4444' : '#0b1120',
                            border: '2px solid #ef4444',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 1, flexShrink: 0, marginTop: '2px',
                            boxShadow: idx === 0 ? '0 0 12px #ef4444' : 'none'
                          }}>
                            {idx === 0 && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff' }} />}
                          </div>

                          {/* Timeline details content */}
                          <div style={{ flex: 1 }}>
                            <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: '500', marginBottom: '4px' }}>
                              {new Date(update.timestamp).toLocaleString()}
                            </div>
                            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: idx === 0 ? '#f1f5f9' : '#cbd5e1', display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <span>{update.location}</span>
                              <span style={{ color: '#64748b', fontWeight: '300' }}>|</span>
                              <span style={{ color: idx === 0 ? '#ef4444' : '#f97316', fontSize: '0.9rem', fontWeight: '600' }}>{update.status}</span>
                            </h4>
                            {update.description && (
                              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginTop: '6px' }}>
                                {update.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No tracking events logged. Waiting for dispatch scan.</p>
                  )}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>

      <Footer />

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media print {
          /* Hide interactive/ambient elements */
          nav, footer, .btn-secondary, .btn-primary, .nav-desktop, .nav-mobile-toggle, .glow-orb, button, form, a {
            display: none !important;
          }
          
          /* Page structure reset */
          body, html, .page-wrapper, .page-content, .container {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            box-shadow: none !important;
            text-shadow: none !important;
          }

          /* Clear glass panel styling and make solid printer friendly boxes */
          .glass-panel, .glass-card-static {
            background: #ffffff !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 8px !important;
            box-shadow: none !important;
            color: #0f172a !important;
            padding: 20px !important;
            margin-bottom: 20px !important;
            page-break-inside: avoid !important;
          }

          /* Text styling overrides */
          h1, h2, h3, h4, p, span, td, th {
            color: #0f172a !important;
          }

          .text-gradient {
            background: none !important;
            color: #ef4444 !important;
            -webkit-text-fill-color: #ef4444 !important;
          }

          /* Force layout grids on printed paper */
          .grid-2 {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 20px !important;
          }

          .grid-3 {
            display: grid !important;
            grid-template-columns: 1fr 1fr 1fr !important;
            gap: 20px !important;
          }

          /* Barcode printer styling */
          .barcode-display {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
          }
          .barcode-display span {
            color: #000000 !important;
          }

          /* Table styling */
          .premium-table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          .premium-table th {
            background-color: #f1f5f9 !important;
            color: #0f172a !important;
            border-bottom: 2px solid #cbd5e1 !important;
            padding: 10px !important;
            font-weight: 700 !important;
          }
          .premium-table td {
            border-bottom: 1px solid #cbd5e1 !important;
            color: #334155 !important;
            padding: 10px !important;
          }

          /* Badge styling for printed status colors */
          .badge {
            border: 1px solid #cbd5e1 !important;
            color: #0f172a !important;
            background: #f1f5f9 !important;
            padding: 6px 12px !important;
            border-radius: 4px !important;
          }
          .badge-emerald { border-color: #10b981 !important; color: #047857 !important; background: #ecfdf5 !important; }
          .badge-cyan { border-color: #ef4444 !important; color: #b91c1c !important; background: #fef2f2 !important; }
          .badge-purple { border-color: #f97316 !important; color: #c2410c !important; background: #fff7ed !important; }
          .badge-rose { border-color: #f43f5e !important; color: #be123c !important; background: #fff1f2 !important; }
          .badge-amber { border-color: #f59e0b !important; color: #b45309 !important; background: #fffbeb !important; }

          /* Timeline adjustment */
          .timeline-dot {
            background: #ef4444 !important;
            border-color: #ef4444 !important;
            box-shadow: none !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Cargo visual inspection record image sizing */
          img {
            max-width: 100% !important;
            height: auto !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
