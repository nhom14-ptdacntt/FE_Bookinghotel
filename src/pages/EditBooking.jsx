import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/EditBooking.css";

const EditBooking = ({handleCancel}) => {
  const { state } = useLocation();
  const booking = state?.booking;

  const [customerName, setCustomerName] = useState(booking?.customerName || "");
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
    navigate("/booking");
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Booking</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleCancel}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSave}>
              <div className="mb-3">
                <label htmlFor="customerName" className="form-label">
                  Customer Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
      
              <div className="mb-3">
                <label htmlFor="roomNumber" className="form-label">
                  RoomNumber
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roomNumber"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBooking;
