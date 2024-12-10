
import React, { useState } from 'react';
import BookingList from '../components/BookingList';
import { useNavigate } from 'react-router-dom';
import '../styles/BookingManagement.css';
import Navbarmanager from '../components/Navbarmanger';

function BookingManagement() {
  const [bookings, setBookings] = useState([
    { id: 1, customerName: 'Nguyen Hung Cuong', checkInDate: '2024-10-10', checkOutDate: '2024-10-12', roomType: 'Deluxe', status: 'confirmed' },
    { id: 2, customerName: 'Nguyen Van A', checkInDate: '2024-11-01', checkOutDate: '2024-11-05', roomType: 'Suite', status: 'pending' },
  ]);

  const navigate = useNavigate();

  const handleViewDetails = (booking) => {
    navigate(`/booking-detail/${booking.id}`, { state: { booking } });
  };

  const handleEditBooking = (booking) => {
    navigate(`/booking-detail/${booking.id}`, { state: { booking, editable: true } });
  };

  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    );
    setBookings(updatedBookings);
  };

  return (
    <div className="booking-page">
      <Navbarmanager/>
      <h1>Booking Management</h1>
      <BookingList
        bookings={bookings}
        onViewDetails={handleViewDetails}
        onEditBooking={handleEditBooking}
        onCancelBooking={handleCancelBooking}
      />
    </div>
  );
}

export default BookingManagement;
