'use client';

import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UpdateShipment({ params }) {
  const unwrappedParams = use(params);
  const trackingId = unwrappedParams.trackingId;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    status: 'In Transit',
    location: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/shipments/${trackingId}/updates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      
      if (data.success) {
        router.push('/admin');
      } else {
        setError(data.error || 'Failed to add update');
      }
    } catch (err) {
      setError('An error occurred during submission.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container animate-fade-in">
      <header className="header">
        <div className="logo">
          <span className="text-gradient">Add Shipment Update</span>
        </div>
        <Link href="/admin" className="btn-secondary">Back to Dashboard</Link>
      </header>

      <main style={{ padding: '40px 0', maxWidth: '600px', margin: '0 auto' }}>
        <div className="glass-panel" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px' }}>Updating Tracking #: <span className="text-gradient">{trackingId}</span></h3>
          
          {error && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Current Status</label>
              <select name="status" className="input-field" value={formData.status} onChange={handleChange} required>
                <option value="Created">Created</option>
                <option value="In Transit">In Transit</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Delayed">Delayed</option>
                <option value="Exception">Exception</option>
              </select>
            </div>

            <div className="input-group">
              <label>Current Location (e.g. London, UK)</label>
              <input type="text" name="location" className="input-field" value={formData.location} onChange={handleChange} required />
            </div>

            <div className="input-group" style={{ marginBottom: '32px' }}>
              <label>Additional Details (Optional)</label>
              <textarea 
                name="description" 
                className="input-field" 
                rows="3" 
                value={formData.description} 
                onChange={handleChange}
                placeholder="e.g. Package arrived at sort facility"
              ></textarea>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Submitting...' : 'Add Update'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
