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
      <h2>Thêm Booking</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Họ tên:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập họ tên"
          />
        </div>
        <div>
          <label>Ngày check-in:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckin(e.target.value)}
          />
        </div>
        <div>
          <label>Ngày check-out:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckout(e.target.value)}
          />
        </div>
        <div>
          <label>Mã phòng:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            placeholder="Nhập mã phòng"
          />
        </div>
        <div>
          <button type="submit">Thêm</button>
          <button type="button" onClick={handleCancel}>Huỷ</button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;
