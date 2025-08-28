import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Payment.css';

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [eventData, setEventData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    upiId: '',
    netBankingBank: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Get event data from navigation state or sessionStorage
    const data = location.state?.eventData || JSON.parse(sessionStorage.getItem('eventFormData') || '{}');
    
    if (!data || Object.keys(data).length === 0) {
      // If no event data, redirect back to create event
      navigate('/create-event');
      return;
    }
    
    setEventData(data);
  }, [location, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.substring(0, 2) + '/' + digits.substring(2, 4);
    }
    return digits;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setPaymentData(prev => ({
        ...prev,
        cardNumber: formatted
      }));
    }
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setPaymentData(prev => ({
      ...prev,
      expiryDate: formatted
    }));
  };

  const validatePayment = () => {
    if (paymentMethod === 'card') {
      const { cardNumber, expiryDate, cvv, cardholderName } = paymentData;
      if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
        alert('Please fill in all card details');
        return false;
      }
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        alert('Please enter a valid 16-digit card number');
        return false;
      }
      if (cvv.length !== 3) {
        alert('Please enter a valid 3-digit CVV');
        return false;
      }
    } else if (paymentMethod === 'upi') {
      if (!paymentData.upiId) {
        alert('Please enter your UPI ID');
        return false;
      }
    } else if (paymentMethod === 'netbanking') {
      if (!paymentData.netBankingBank) {
        alert('Please select your bank');
        return false;
      }
    }
    return true;
  };

  const handleCancel = () => {
    // Clear stored data when canceling
    sessionStorage.removeItem('eventFormData');
    // Navigate to events page
    navigate('/events');
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!validatePayment()) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create event after successful payment
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventData,
          paymentMethod,
          paymentData: paymentMethod === 'card' ? {
            last4: paymentData.cardNumber.slice(-4),
            cardholderName: paymentData.cardholderName
          } : paymentMethod === 'upi' ? {
            upiId: paymentData.upiId
          } : {
            bank: paymentData.netBankingBank
          }
        })
      });
      
      if (response.ok) {
        // Clear stored data
        sessionStorage.removeItem('eventFormData');
        
        // Navigate to success page or events list
        navigate('/events', { 
          state: { 
            message: 'Event created successfully!',
            type: 'success'
          }
        });
      } else {
        throw new Error('Failed to create event');
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    const basePrice = 999; // Base event creation fee
    const additionalFeatures = 0; // Can add logic for premium features
    return basePrice + additionalFeatures;
  };

  if (!eventData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        <div className="payment-header">
          <h1>Complete Your Payment</h1>
          <p>Secure payment for event creation</p>
        </div>

        <div className="payment-content">
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="event-details">
              <h4>{eventData.eventName}</h4>
              <p>Category: {eventData.category}</p>
              <p>Date: {new Date(eventData.eventStart).toLocaleDateString()}</p>
              <p>Mode: {eventData.mode}</p>
            </div>
            
            <div className="pricing">
              <div className="price-row">
                <span>Event Creation Fee</span>
                <span>₹999</span>
              </div>
              <div className="price-row">
                <span>Platform Fee</span>
                <span>₹0</span>
              </div>
              <div className="price-row total">
                <span>Total Amount</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
          </div>

          <div className="payment-form">
            <div className="payment-methods">
              <h3>Select Payment Method</h3>
              <div className="method-tabs">
                <button 
                  className={`method-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('card')}
                >
                  Credit/Debit Card
                </button>
                <button 
                  className={`method-tab ${paymentMethod === 'upi' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('upi')}
                >
                  UPI
                </button>
                <button 
                  className={`method-tab ${paymentMethod === 'netbanking' ? 'active' : ''}`}
                  onClick={() => setPaymentMethod('netbanking')}
                >
                  Net Banking
                </button>
              </div>
            </div>

            <form onSubmit={handlePayment} className="payment-details">
              {paymentMethod === 'card' && (
                <div className="card-form">
                  <div className="form-group">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={paymentData.cardholderName}
                      onChange={handleInputChange}
                      placeholder="Enter cardholder name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={paymentData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="upi-form">
                  <div className="form-group">
                    <label>UPI ID</label>
                    <input
                      type="text"
                      name="upiId"
                      value={paymentData.upiId}
                      onChange={handleInputChange}
                      placeholder="yourname@upi"
                      required
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="netbanking-form">
                  <div className="form-group">
                    <label>Select Your Bank</label>
                    <select
                      name="netBankingBank"
                      value={paymentData.netBankingBank}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose your bank</option>
                      <option value="sbi">State Bank of India</option>
                      <option value="hdfc">HDFC Bank</option>
                      <option value="icici">ICICI Bank</option>
                      <option value="axis">Axis Bank</option>
                      <option value="kotak">Kotak Mahindra Bank</option>
                      <option value="pnb">Punjab National Bank</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="payment-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing Payment...' : `Pay ₹${calculateTotal()}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;