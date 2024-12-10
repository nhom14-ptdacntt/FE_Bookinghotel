import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/EditBooking.css';

const EditBooking = () => {
  const { state } = useLocation(); 
  const booking = state?.booking; 

  const [customerName, setCustomerName] = useState(booking?.customerName || "");
  const [checkInDate, setCheckInDate] = useState(booking?.checkInDate || "");
  const [checkOutDate, setCheckOutDate] = useState(booking?.checkOutDate || "");
  const [roomNumber, setRoomNumber] = useState(booking?.roomNumber || "");

  const navigate = useNavigate();

  const handleSave = (e) => {
    e.preventDefault();
    if (!customerName || !checkInDate || !checkOutDate || !roomNumber) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const updatedBooking = {
      ...booking,
      customerName,
      checkInDate,
      checkOutDate,
      roomNumber,
    };

    // Lưu thông tin chỉnh sửa (Ở đây chúng ta giả lập lưu lại thông tin)
    // Ở thực tế, bạn có thể gửi thông tin này lên server hoặc update trạng thái của BookingManagement
    alert("Booking đã được chỉnh sửa thành công!");

    // Quay lại trang BookingManagement sau khi lưu
    navigate('/booking');
  };

  return (
    <div className="edit-booking-page">
      <h2>Chỉnh sửa Booking</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>Họ tên:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div>
          <label>Ngày check-in:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div>
          <label>Ngày check-out:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <div>
          <label>Mã phòng:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Lưu</button>
        </div>
      </form>
    </div>
  );
};

export default EditBooking;
