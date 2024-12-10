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
          <th>Booking ID</th>
          <th>Customer Name</th>
          <th>Room Number</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.id}</td>
            <td>{booking.customerName}</td>
            <td>{booking.roomNumber}</td>
            <td>{booking.status}</td>
            <td>
              <button className="edit" onClick={() => onEditBooking()}>Edit</button>
              <button className="cancel" onClick={() => handleCancelClick(booking.id)}>Cancel</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BookingList;
