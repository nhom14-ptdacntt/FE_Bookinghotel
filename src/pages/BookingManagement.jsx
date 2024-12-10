import React, { useState } from 'react';
import BookingList from '../components/BookingList';
import { useNavigate } from 'react-router-dom';
import '../styles/BookingManagement.css';
import Navbarmanager from '../components/Navbarmanger';
import AddBooking from './AddBooking';

function BookingManagement() {
  const [bookings, setBookings] = useState([
    { id: 1, customerName: 'Nguyen Hung Cuong', roomType: 'Deluxe', status: 'confirmed' },
    { id: 2, customerName: 'Nguyen Van A', roomType: 'Suite', status: 'pending' },
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

  const handleAddBooking = () => {
    navigate('/add-booking');
  };

  const handleNewBooking = (newBooking) => {
    setBookings((prevBookings) => [
      ...prevBookings,
      { ...newBooking, id: prevBookings.length + 1 },
    ]);
  };

  return (
    <div className="booking-page">
      <Navbarmanager />
      <h1>Booking Management</h1>
      <button className="add-booking-btn" onClick={handleAddBooking}>
        Thêm
      </button>
      <BookingList
        bookings={bookings}
        onViewDetails={handleViewDetails}
        onEditBooking={handleEditBooking}
        onCancelBooking={handleCancelBooking}
      />
      {/* <AddBooking onNewBooking={handleNewBooking} /> */}
    </div>
  );
}

export default BookingManagement;
