import React from 'react';

function BookingList({ bookings, onEditBooking, onCancelBooking }) {
  const handleCancelClick = (bookingId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (confirmed) {
      onCancelBooking(bookingId);
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
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookingList;
