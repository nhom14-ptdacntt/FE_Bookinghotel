import React from 'react';

function BookingList({ bookings, onViewDetails, onEditBooking, onCancelBooking }) {
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
          <th>Booking ID</th>
          <th>Customer Name</th>
          <th>Check-in Date</th>
          <th>Check-out Date</th>
          <th>Room Type</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>{booking.customerName}</td>
            <td>{booking.checkInDate}</td>
            <td>{booking.checkOutDate}</td>
            <td>{booking.roomType}</td>
            <td>{booking.status}</td>
            <td>
              <button className="view" onClick={() => onViewDetails(booking)}>View</button>
              <button className="edit" onClick={() => onEditBooking(booking)}>Edit</button>
              <button className="cancel" onClick={() => handleCancelClick(booking.id)}>Cancel</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookingList;