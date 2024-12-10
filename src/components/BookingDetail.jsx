
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/BookingDetail.css';

function BookingDetail() {
  const location = useLocation();
  const { booking, editable } = location.state || {};
  const [isEditable, setIsEditable] = useState(editable || false);
  const [updatedBooking, setUpdatedBooking] = useState(booking);
  const navigate = useNavigate();

  const handleEditClick = () => {
    setIsEditable(true);
  };

  const handleSaveClick = () => {
    setIsEditable(false);
    alert('Booking updated successfully!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBooking({ ...updatedBooking, [name]: value });
  };

  return (
    <div className="booking-detail">
      <h2>Booking Details</h2>
      <div className="detail-section">
        <label>Customer Name:</label>
        {isEditable ? (
          <input
            type="text"
            name="customerName"
            value={updatedBooking.customerName}
            onChange={handleChange}
          />
        ) : (
          <span>{updatedBooking.customerName}</span>
        )}
      </div>

      <button onClick={isEditable ? handleSaveClick : handleEditClick}>
        {isEditable ? 'Save Changes' : 'Edit'}
      </button>

      <button onClick={() => navigate(-1)}>Back to Bookings</button>
    </div>
  );
}

export default BookingDetail;
