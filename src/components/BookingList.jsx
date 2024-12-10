
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';

function BookingList({ bookings, onEditBooking, onCancelBooking }) {
  const [accessToken,  setAccessToken] = useState("")
  useEffect(() => {
    setAccessToken(localStorage.getItem("token"))
  },[])

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


  const handleCancelClick = (booking) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmed) {
      const newBooking  = {
        customerName: booking.customerName,
        customerPhoneNumber: booking.customerPhoneNumber,
        roomNumber: booking.room.number,
        status: "CANCELLED"
      }
      callApiEditBooking(newBooking, booking.id);
    }
  };

  return (
    <table className="booking-list">
      <thead>
        <tr>
          <th>Room Number</th>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking,index) => (
          <tr key={index}>
            <td>{booking.room.number}</td>
            <td>{booking.customerName}</td>
            <td>{booking.customerPhoneNumber}</td>
            <td>{booking.status.name}</td>
            <td>
              {booking.status.name === "FINISHED" || booking.status.name === "CANCELLED" ? (<div></div>) : (<button className="edit" onClick={() => onEditBooking(booking.id)}>Edit</button>)}
              <button className="cancel" onClick={() => handleCancelClick(booking)}>Cancel</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookingList;
