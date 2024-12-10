import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/BookingManagement.css';

const AddBooking = ({ onAdd }) => {
  const [customerName, setName] = useState("");
  const [checkInDate, setCheckin] = useState("");
  const [checkOutDate, setCheckout] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  
  const navigate = useNavigate();  // Hook for navigation
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !checkInDate || !checkOutDate || !roomNumber) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    
    const newBooking = { 
      customerName, 
      checkInDate, 
      checkOutDate, 
      roomNumber,
      status: 'confirmed'  // Default status as 'confirmed'
    };

    // Call the onAdd function passed from the parent component to update the state in BookingManagement
    onAdd(newBooking);

    // Redirect to BookingManagement page after the booking is added
    navigate('/booking');  // Điều hướng đến trang BookingManagement
  };

  const handleCancel = () => {
    // Redirect back to BookingManagement page without adding a booking
    navigate('/booking');  // Điều hướng đến trang BookingManagement
  };

  return (
    <div className="add-booking-page">
      <h2>Add Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter họ tên"
          />
        </div>
        
        <div>
          <label>Room Number:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder="Enter Room Number"
          />
        </div>
        <div>
          <button type="submit">Add</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;
