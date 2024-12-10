import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/EditBooking.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const EditBooking = ({handleCancel, callApiGetAllBooking, bookingId}) => {
  const [selectedStatusId, setSelectedStatusId] = useState("");
  const { state } = useLocation();
  const booking = state?.booking;

  

  const [customerName, setCustomerName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');

  const [bookingStatus, setBookingStatus] = useState([])
  const [statusName, setStatusName] = useState('')

  const [accessToken,  setAccessToken] = useState("")


  
  useEffect(() => {
    setAccessToken(localStorage.getItem("token"))
  },[])
  useEffect(() => {
    callApiGetAllStatusBooking()
  },[accessToken])

  

  const handleChangeFullName = (e) => {
    setCustomerName(e.target.value)
  }
  const handleChangeRoomNumber = (e) => {
    setRoomNumber(e.target.value)
  }
  const handleChangePhoneNumber = (e) => {
    setphoneNumber(e.target.value)
  }
  
  const handleSaveBookingEdit = () => {
    const editBooking = {
      roomNumber: roomNumber,
      customerName: customerName,
      customerPhoneNumber: phoneNumber,
      status: statusName
    }
    callApiEditBooking(editBooking, bookingId)
    


  }
  
  const callApiGetAllStatusBooking = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gắn token vào header
        },
      };
      const res = await axios.get("http://localhost:8080/api/bookingstatus", config)
      const data = res.data;
      setBookingStatus(data.result)
    } catch (error) {
      console.log(error)
    }
  }
  const handleChangeStatus = (e) => {
    const selectedId = e.target.value;
    const selectedStatus = bookingStatus.find((type) => type.id === parseInt(selectedId, 10));
    if (selectedStatus) {
      setSelectedStatusId(selectedId); // Lưu id
      setStatusName(selectedStatus.name); // Lưu type.name
    }
  }

  const navigate = useNavigate();

  const callApiEditBooking = async (booking,id) => {
    try {
      console.log(accessToken)
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gắn token vào header
        },
      };
      const res = await axios.post(`http://localhost:8080/api/booking/edit/${id}`,booking, config)
      toast.success("Booking updated successfully!", {
        position: "top-right",
        autoClose: 3000, // Đóng sau 3 giây
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });
      handleCancel();

    } catch (error) {
      console.log(error);

      // Hiển thị toast message với lỗi trả về
      const errorMessage = error.response?.data?.message || "Something went wrong!";
      toast.error(`Error: ${errorMessage}`, {
          position: "top-right",
          autoClose: 5000, // Đóng sau 5 giây
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
    }
  }

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
            <form >
              <div className="mb-3">
                <label htmlFor="customerName" className="form-label">
                  Customer Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="customerName"
                  value={customerName}
                  onChange={handleChangeFullName}
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
                  onChange={handleChangeRoomNumber}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="roomNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="roomNumber"
                  value={phoneNumber}
                  onChange={handleChangePhoneNumber}
                />
              </div>
              <div className="mb-3">
                    <label htmlFor="roomType" className="form-label">
                      Status
                    </label>
                    <select
                      className="form-select"
                      id="roomType"
                      value={selectedStatusId}
                      onChange={handleChangeStatus}
                    >
                      <option value="" disabled>
                        Select a status
                      </option>
                      {bookingStatus.map((type, index) => (
                        <option key={index} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>
              <div className="modal-footer">
                <button onClick={handleSaveBookingEdit} type="button" className="btn btn-primary">
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
