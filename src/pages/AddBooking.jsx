import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/BookingManagement.css';
import axios from "axios";
import { toast } from 'react-toastify';

const AddBooking = ({ onAdd }) => {
  const [customerName, setName] = useState("");
  const [checkInDate, setCheckin] = useState("");
  const [checkOutDate, setCheckout] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [fullName, setFullName] = useState("")
  const [phoneNumber,setPhoneNumber] = useState("")
  const [accessToken,  setAccessToken] = useState("")


  const navigate = useNavigate();
  useEffect(() => {
    setAccessToken(localStorage.getItem("token"))
  },[])
  const handleChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value)
  }
  const handleChangeFullName = (e) => {
    setFullName(e.target.value)
  }
  const handleChangeRoomNumber = (e) => {
    setRoomNumber(e.target.value)
  }
  const handleClickAdd = () => {
    const booking = {
      roomNumber: roomNumber,
      customerName: fullName,
      customerPhoneNumber: phoneNumber
    }
    callApiAddBooking(booking)
    
  }
  const callApiAddBooking = async (booking) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gắn token vào header
        },
      };
      const res = await axios.post("http://localhost:8080/api/booking/create",booking,config)
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
    navigate("/booking")
    } catch (error) {
      console.log(error);
      toast.error(`Error: ${error}`, {
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
  
    // Hook for navigation
  
  
  return (
    <div className="add-booking-page">
      <h2>Add Booking</h2>
      <form>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={handleChangeFullName}
            placeholder="Enter họ tên"
          />
        </div>
        
        <div>
          <label>Room Number:</label>
          <input
            type="text"
            value={roomNumber}
            onChange={handleChangeRoomNumber}
            placeholder="Enter Room Number"
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={handleChangePhoneNumber}
            placeholder="Enter Phone Number"
          />
        </div>
        <div>
          <button type="button" onClick={handleClickAdd}>Add</button>
          <button type="button" onClick={() => navigate("/booking")} >Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddBooking;
