'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const toDateInput = (value) => (value ? new Date(value).toISOString().split('T')[0] : '');

export default function EditShipmentPage({ params }) {
  const { trackingId } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [formData, setFormData] = useState(null);
  const [items, setItems] = useState([{ description: '', quantity: '1', weight: '', value: '' }]);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    setError('');
    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, packagePicture: data.url }));
      } else {
        setError(data.error || 'Failed to upload image');
      }
    } catch (err) {
      setError('Failed to upload image. Server error.');
    } finally {
      setUploadingImage(false);
    }
  };

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
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!authenticated) return;

    const loadShipment = async () => {
      try {
        const res = await fetch(`/api/shipments?trackingNumber=${trackingId}`);
        const data = await res.json();
        if (!data.success || !data.shipment) {
          setError('Shipment not found.');
          return;
        }
        const s = data.shipment;
        setFormData({
          trackingNumber: s.trackingNumber,
          referenceNumber: s.referenceNumber || '',
          senderName: s.senderName || '', senderCompany: s.senderCompany || '', senderEmail: s.senderEmail || '', senderPhone: s.senderPhone || '',
          senderAddress: s.senderAddress || '', senderCity: s.senderCity || '', senderState: s.senderState || '', senderZip: s.senderZip || '', senderCountry: s.senderCountry || '',
          receiverName: s.receiverName || '', receiverCompany: s.receiverCompany || '', receiverEmail: s.receiverEmail || '', receiverPhone: s.receiverPhone || '',
          receiverAddress: s.receiverAddress || '', receiverCity: s.receiverCity || '', receiverState: s.receiverState || '', receiverZip: s.receiverZip || '', receiverCountry: s.receiverCountry || '',
          originPort: s.originPort || '', destinationPort: s.destinationPort || '', carrierName: s.carrierName || '', vesselFlightNumber: s.vesselFlightNumber || '',
          shippingMethod: s.shippingMethod || 'Air Freight', incoterms: s.incoterms || 'DAP',
          totalWeight: s.totalWeight ?? '', totalVolume: s.totalVolume ?? '', packageCount: s.packageCount ?? '1',
          customsValue: s.customsValue ?? '', currency: s.currency || 'USD', customsStatus: s.customsStatus || 'Pending',
          dispatchDate: toDateInput(s.dispatchDate), estimatedDeparture: toDateInput(s.estimatedDeparture), estimatedArrival: toDateInput(s.estimatedArrival),
          packagePicture: s.packagePicture || '',

          paymentStatus: s.paymentStatus || 'Pending',
          stampDuty: s.stampDuty || 'Required',
          volumetricWeight: s.volumetricWeight ?? '',
          xrayScanResult: s.xrayScanResult || 'Negative',
          serviceCharge: s.serviceCharge || '',
          harmonizedCode: s.harmonizedCode || 'No',
          senderVat: s.senderVat || '',
          receiverVat: s.receiverVat || '',
          typeOfExport: s.typeOfExport || 'Permanent',
          dutiesPaymentTerms: s.dutiesPaymentTerms || 'Receiver',
          toBePickedUpBy: s.toBePickedUpBy || '',
          authorizedSignature: s.authorizedSignature || '',

          servicePackaging: !!s.servicePackaging,
          serviceCargo: !!s.serviceCargo,
          serviceWorldwide: !!s.serviceWorldwide,
          serviceDoorToDoor: !!s.serviceDoorToDoor,
          serviceOther: !!s.serviceOther,
        });

        setItems(
          s.items && s.items.length > 0
            ? s.items.map(item => ({
                description: item.description || '',
                quantity: item.quantity ?? '1',
                weight: item.weight ?? '',
                length: item.length ?? '',
                width: item.width ?? '',
                height: item.height ?? '',
                hsCode: item.hsCode || '',
                value: item.value ?? '',
              }))
            : [{ description: '', quantity: '1', weight: '' }]
        );
      } catch {
        setError('Failed to load shipment.');
      } finally {
        setFetching(false);
      }
    };
    loadShipment();
  }, [authenticated, trackingId]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleItemChange = (idx, e) => {
    const updated = [...items];
    updated[idx][e.target.name] = e.target.value;
    setItems(updated);
  };

  const addItem = () => setItems([...items, { description: '', quantity: '1', weight: '' }]);
  const removeItem = (idx) => setItems(items.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/shipments/${trackingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, items }),
      });
      const data = await res.json();
      if (data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Failed to save changes');
      }
    } catch {
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth || !authenticated || fetching) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deepest)' }}>
        <div style={{ textAlign: 'center' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" style={{ animation: 'spin-slow 1s linear infinite', margin: '0 auto 16px' }}>
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          <p style={{ color: '#64748b' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error && !formData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-deepest)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f43f5e', marginBottom: '16px' }}>{error}</p>
          <Link href="/admin" className="btn-secondary btn-sm">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const SectionTitle = ({ children }) => (
    <div style={{
      fontSize: '0.8rem',
      fontWeight: '600',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#ef4444',
      marginBottom: '20px',
      marginTop: '32px',
      paddingBottom: '12px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      {children}
    </div>
  );

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
          maxWidth: '960px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{ fontSize: '1.1rem', fontWeight: '700' }}>
            <span className="text-gradient">Edit Shipment</span>
          </h1>
          <Link href="/admin" className="btn-secondary btn-sm">← Back to Dashboard</Link>
        </div>
      </header>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '32px 24px 80px' }}>
        <div className="glass-panel" style={{ padding: '40px' }}>
          {error && (
            <div style={{
              background: 'rgba(244,63,94,0.08)',
              border: '1px solid rgba(244,63,94,0.2)',
              borderRadius: '10px',
              padding: '14px 16px',
              marginBottom: '24px',
              color: '#f43f5e',
              fontSize: '0.85rem',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Tracking */}
            <SectionTitle>Tracking Information</SectionTitle>
            <div className="grid-2">
              <div className="input-group">
                <label>Tracking Number</label>
                <input className="input-field" value={formData.trackingNumber} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
              </div>
              <div className="input-group">
                <label>Reference Number</label>
                <input name="referenceNumber" className="input-field" value={formData.referenceNumber} onChange={handleChange} placeholder="PO-12345" />
              </div>
            </div>

            {/* Sender */}
            <SectionTitle>Sender Details</SectionTitle>
            <div className="grid-2">
              <div className="input-group"><label>Name *</label><input name="senderName" className="input-field" required value={formData.senderName} onChange={handleChange} /></div>
              <div className="input-group"><label>Company</label><input name="senderCompany" className="input-field" value={formData.senderCompany} onChange={handleChange} /></div>
              <div className="input-group"><label>Email</label><input name="senderEmail" type="email" className="input-field" value={formData.senderEmail} onChange={handleChange} /></div>
              <div className="input-group"><label>Phone</label><input name="senderPhone" className="input-field" value={formData.senderPhone} onChange={handleChange} /></div>
            </div>
            <div className="input-group"><label>Address *</label><input name="senderAddress" className="input-field" required value={formData.senderAddress} onChange={handleChange} /></div>
            <div className="grid-4">
              <div className="input-group"><label>City *</label><input name="senderCity" className="input-field" required value={formData.senderCity} onChange={handleChange} /></div>
              <div className="input-group"><label>State</label><input name="senderState" className="input-field" value={formData.senderState} onChange={handleChange} /></div>
              <div className="input-group"><label>ZIP</label><input name="senderZip" className="input-field" value={formData.senderZip} onChange={handleChange} /></div>
              <div className="input-group"><label>Country *</label><input name="senderCountry" className="input-field" required value={formData.senderCountry} onChange={handleChange} /></div>
            </div>

            {/* Receiver */}
            <SectionTitle>Receiver Details</SectionTitle>
            <div className="grid-2">
              <div className="input-group"><label>Name *</label><input name="receiverName" className="input-field" required value={formData.receiverName} onChange={handleChange} /></div>
              <div className="input-group"><label>Company</label><input name="receiverCompany" className="input-field" value={formData.receiverCompany} onChange={handleChange} /></div>
              <div className="input-group"><label>Email *</label><input name="receiverEmail" type="email" className="input-field" required value={formData.receiverEmail} onChange={handleChange} /></div>
              <div className="input-group"><label>Phone</label><input name="receiverPhone" className="input-field" value={formData.receiverPhone} onChange={handleChange} /></div>
            </div>
            <div className="input-group"><label>Address *</label><input name="receiverAddress" className="input-field" required value={formData.receiverAddress} onChange={handleChange} /></div>
            <div className="grid-4">
              <div className="input-group"><label>City *</label><input name="receiverCity" className="input-field" required value={formData.receiverCity} onChange={handleChange} /></div>
              <div className="input-group"><label>State</label><input name="receiverState" className="input-field" value={formData.receiverState} onChange={handleChange} /></div>
              <div className="input-group"><label>ZIP</label><input name="receiverZip" className="input-field" value={formData.receiverZip} onChange={handleChange} /></div>
              <div className="input-group"><label>Country *</label><input name="receiverCountry" className="input-field" required value={formData.receiverCountry} onChange={handleChange} /></div>
            </div>

            {/* Logistics */}
            <SectionTitle>Logistics & Routing</SectionTitle>
            <div className="grid-2">
              <div className="input-group"><label>Origin Port</label><input name="originPort" className="input-field" value={formData.originPort} onChange={handleChange} /></div>
              <div className="input-group"><label>Destination Port</label><input name="destinationPort" className="input-field" value={formData.destinationPort} onChange={handleChange} /></div>
              <div className="input-group"><label>Carrier Name</label><input name="carrierName" className="input-field" value={formData.carrierName} onChange={handleChange} /></div>
              <div className="input-group"><label>Vessel/Flight #</label><input name="vesselFlightNumber" className="input-field" value={formData.vesselFlightNumber} onChange={handleChange} /></div>
              <div className="input-group">
                <label>Shipping Method *</label>
                <select name="shippingMethod" className="input-field" value={formData.shippingMethod} onChange={handleChange} required>
                  <option value="Air Freight">Air Freight</option>
                  <option value="Ocean Freight">Ocean Freight</option>
                  <option value="Road Freight">Road Freight</option>
                  <option value="Rail Freight">Rail Freight</option>
                  <option value="Multimodal">Multimodal</option>
                </select>
              </div>
              <div className="input-group">
                <label>Incoterms</label>
                <select name="incoterms" className="input-field" value={formData.incoterms} onChange={handleChange}>
                  <option value="EXW">EXW</option><option value="FCA">FCA</option><option value="FOB">FOB</option>
                  <option value="CIF">CIF</option><option value="DAP">DAP</option><option value="DDP">DDP</option>
                </select>
              </div>
              <div className="input-group">
                <label>Harmonized Community Code Applies</label>
                <select name="harmonizedCode" className="input-field" value={formData.harmonizedCode} onChange={handleChange}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="input-group">
                <label>Sender VTA/VGS No. (VAT)</label>
                <input name="senderVat" className="input-field" value={formData.senderVat} onChange={handleChange} placeholder="VAT-12345" />
              </div>
              <div className="input-group">
                <label>Receiver VAT/GST No. Or ENSSN</label>
                <input name="receiverVat" className="input-field" value={formData.receiverVat} onChange={handleChange} placeholder="VAT-67890" />
              </div>
              <div className="input-group">
                <label>Type of Export</label>
                <select name="typeOfExport" className="input-field" value={formData.typeOfExport} onChange={handleChange}>
                  <option value="Permanent">Permanent</option>
                  <option value="Repair Return">Repair Return</option>
                  <option value="Temporary">Temporary</option>
                </select>
              </div>
              <div className="input-group">
                <label>Duties/Tax Payment Terms</label>
                <select name="dutiesPaymentTerms" className="input-field" value={formData.dutiesPaymentTerms} onChange={handleChange}>
                  <option value="Sender">Sender Pays Duties Tax</option>
                  <option value="Receiver">Receiver Pays Duties Tax</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="input-group">
                <label>To Be Picked Up By</label>
                <input name="toBePickedUpBy" className="input-field" value={formData.toBePickedUpBy} onChange={handleChange} placeholder="Sophia binti Anuar" />
              </div>
              <div className="input-group">
                <label>Authorized Signature (name)</label>
                <input name="authorizedSignature" className="input-field" value={formData.authorizedSignature} onChange={handleChange} placeholder="James Carter" />
              </div>
            </div>

            {/* Freight */}
            <SectionTitle>Freight Details</SectionTitle>
            <div className="grid-4">
              <div className="input-group"><label>Total Weight (kg)</label><input name="totalWeight" type="number" step="0.01" className="input-field" value={formData.totalWeight} onChange={handleChange} /></div>
              <div className="input-group"><label>Volume (CBM)</label><input name="totalVolume" type="number" step="0.01" className="input-field" value={formData.totalVolume} onChange={handleChange} /></div>
              <div className="input-group"><label>Package Count</label><input name="packageCount" type="number" className="input-field" value={formData.packageCount} onChange={handleChange} /></div>
              <div className="input-group"><label>Customs Value</label><input name="customsValue" type="number" step="0.01" className="input-field" value={formData.customsValue} onChange={handleChange} /></div>
            </div>
            <div className="grid-3">
              <div className="input-group">
                <label>Volumetric Charge Weight</label>
                <input name="volumetricWeight" type="number" step="0.01" className="input-field" value={formData.volumetricWeight} onChange={handleChange} placeholder="e.g. 45" />
              </div>
              <div className="input-group">
                <label>X-Ray Scan Result</label>
                <select name="xrayScanResult" className="input-field" value={formData.xrayScanResult} onChange={handleChange}>
                  <option value="Non-Harmful Content (Negative)">Non-Harmful Content (Negative)</option>
                  <option value="Harmful Content (Positive)">Harmful Content (Positive)</option>
                  <option value="Suspicious - Under Investigation">Suspicious - Under Investigation</option>
                </select>
              </div>
              <div className="input-group">
                <label>Service Charge Description</label>
                <input name="serviceCharge" className="input-field" value={formData.serviceCharge} onChange={handleChange} placeholder="e.g. 5,000 USD equivalent to..." />
              </div>
            </div>
            <div className="grid-3">
              <div className="input-group">
                <label>Currency</label>
                <select name="currency" className="input-field" value={formData.currency} onChange={handleChange}>
                  <option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="JPY">JPY</option><option value="CNY">CNY</option>
                </select>
              </div>
              <div className="input-group">
                <label>Customs Status</label>
                <select name="customsStatus" className="input-field" value={formData.customsStatus} onChange={handleChange}>
                  <option value="Pending">Pending</option><option value="Cleared">Cleared</option><option value="Held">Held</option>
                </select>
              </div>
              <div className="input-group">
                <label>Payment Status</label>
                <select name="paymentStatus" className="input-field" value={formData.paymentStatus} onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>
            <div className="grid-2">
              <div className="input-group">
                <label>Stamp Duty Status</label>
                <select name="stampDuty" className="input-field" value={formData.stampDuty} onChange={handleChange}>
                  <option value="Required">Required</option>
                  <option value="Paid">Paid</option>
                  <option value="Exempt">Exempt</option>
                </select>
              </div>
            </div>

            {/* Shipment Services Checkboxes */}
            <SectionTitle>Shipment Details / Services (Checkboxes)</SectionTitle>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              background: 'rgba(255,255,255,0.02)',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '24px',
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#f1f5f9' }}>
                <input type="checkbox" name="servicePackaging" checked={formData.servicePackaging} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <span>PACKAGING AND STORAGE</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#f1f5f9' }}>
                <input type="checkbox" name="serviceCargo" checked={formData.serviceCargo} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <span>CARGO</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#f1f5f9' }}>
                <input type="checkbox" name="serviceWorldwide" checked={formData.serviceWorldwide} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <span>WORLDWIDE TRANSPORT</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#f1f5f9' }}>
                <input type="checkbox" name="serviceDoorToDoor" checked={formData.serviceDoorToDoor} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <span>DOOR TO DOOR DELIVERY</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#f1f5f9' }}>
                <input type="checkbox" name="serviceOther" checked={formData.serviceOther} onChange={handleChange} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <span>OTHER SERVICES</span>
              </label>
            </div>

            {/* Package Picture (Optional) */}
            <SectionTitle>Package Picture (Optional)</SectionTitle>
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', color: '#94a3b8', marginBottom: '8px' }}>
                Upload Package Photo
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                  id="package-image-upload"
                />
                <label htmlFor="package-image-upload" className="btn-secondary" style={{ padding: '12px 24px', cursor: 'pointer', display: 'inline-block', fontSize: '0.85rem' }}>
                  {uploadingImage ? 'Uploading...' : 'Choose Image'}
                </label>
                {formData.packagePicture && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={formData.packagePicture}
                      alt="Preview"
                      style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, packagePicture: '' })}
                      style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600' }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            <SectionTitle>Dates</SectionTitle>
            <div className="grid-3">
              <div className="input-group"><label>Dispatch Date</label><input name="dispatchDate" type="date" className="input-field" value={formData.dispatchDate} onChange={handleChange} /></div>
              <div className="input-group"><label>Est. Departure</label><input name="estimatedDeparture" type="date" className="input-field" value={formData.estimatedDeparture} onChange={handleChange} /></div>
              <div className="input-group"><label>Est. Arrival</label><input name="estimatedArrival" type="date" className="input-field" value={formData.estimatedArrival} onChange={handleChange} /></div>
            </div>

            {/* Items */}
            <SectionTitle>Package Items</SectionTitle>
            {items.map((item, idx) => (
              <div key={idx} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '12px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#64748b' }}>Item {idx + 1}</span>
                  {items.length > 1 && (
                    <button type="button" onClick={() => removeItem(idx)} style={{
                      background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600',
                    }}>Remove</button>
                  )}
                </div>
                <div className="grid-4">
                  <div className="input-group" style={{ gridColumn: 'span 2' }}><label>Description</label><input name="description" className="input-field" value={item.description} onChange={(e) => handleItemChange(idx, e)} /></div>
                  <div className="input-group"><label>Qty</label><input name="quantity" type="number" className="input-field" value={item.quantity} onChange={(e) => handleItemChange(idx, e)} /></div>
                  <div className="input-group"><label>Weight (kg)</label><input name="weight" type="number" step="0.01" className="input-field" value={item.weight} onChange={(e) => handleItemChange(idx, e)} /></div>
                </div>
              </div>
            ))}
            <button type="button" onClick={addItem} className="btn-ghost" style={{ marginBottom: '32px' }}>+ Add Item</button>

            {/* Submit */}
            <button type="submit" className="btn-primary w-full" disabled={loading} style={{ padding: '16px' }}>
              {loading ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
