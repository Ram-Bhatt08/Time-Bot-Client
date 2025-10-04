import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../Nav/Nav';
import axios from 'axios';
import './Client.css';

function Client() {
  const navigate = useNavigate();
  const [selectedVIP, setSelectedVIP] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAdminId, setShowAdminId] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [vips, setVips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVIPs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/public/all');
        console.log('Fetched admins:', res.data.admins);
        setVips(res.data.admins); // Use actual data from backend
      } catch (err) {
        console.error('Error fetching admins:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVIPs();
  }, []);

  const handleVIPSelect = (vip) => {
    setSelectedVIP(vip);
    setShowAdminId(false);
  };

  const handlePayment = async () => {
    setPaymentProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate payment delay
      setShowAdminId(true);
      setShowModal(true);
    } finally {
      setPaymentProcessing(false);
    }
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount || 0);

  if (loading) return <p>Loading admins...</p>;
  if (!vips.length) return <p>No admins found</p>;

  return (
    <>
      <Nav />
      <div className="vip-booking-container">
        {!selectedVIP ? (
          <div className="vip-selection-page">
            <h1>Book Appointment with Admins</h1>
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

            <div className="vip-grid">
              {vips
                .filter(
                  (vip) =>
                    vip.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    vip.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((vip) => (
                  <div key={vip.adminId} className="vip-card" onClick={() => handleVIPSelect(vip)}>
                    <h3>{vip.name}</h3>
                    <p>Specialty: {vip.specialty}</p>
                    <p>{vip.description}</p>
                    <div>Fee: {formatCurrency(vip.fee)}</div>
                    <div>Experience: {vip.experience}</div>
                    <div>Famous For: {vip.famousFor}</div>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="vip-detail-page">
            <button onClick={() => setSelectedVIP(null)}>← Back</button>
            <h2>{selectedVIP.name}</h2>
            <p>Specialty: {selectedVIP.specialty}</p>
            <p>Description: {selectedVIP.description}</p>
            <p>Fee: {formatCurrency(selectedVIP.fee)}</p>
            <p>Experience: {selectedVIP.experience}</p>
            <p>Famous For: {selectedVIP.famousFor}</p>
            {showAdminId && <p>Admin ID: {selectedVIP.adminId}</p>}
            <button onClick={handlePayment} disabled={paymentProcessing || showAdminId}>
              {paymentProcessing ? 'Processing...' : showAdminId ? 'Paid' : 'Pay'}
            </button>
          </div>
        )}

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Payment Successful!</h2>
              {showAdminId && <p>Admin ID: {selectedVIP.adminId}</p>}
              <button
                onClick={() =>
                  navigate(`/bot?adminId=${selectedVIP.adminId}`)
                }
              >
                Chat with AI Assistant
              </button>
              <button onClick={() => setShowModal(false)}>Back</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Client;
