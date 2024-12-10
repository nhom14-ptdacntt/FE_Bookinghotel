import React, { useState } from 'react';
import BookingList from '../components/BookingList';
import { useNavigate } from 'react-router-dom';
import '../styles/BookingManagement.css';
import Navbarmanager from '../components/Navbarmanger';
import EditBooking from './EditBooking';

function BookingManagement() {
  const [bookings, setBookings] = useState([
    { id: 1, customerName: 'Nguyen Hung Cuong', roomType: 'Deluxe', status: 'confirmed' },
    { id: 2, customerName: 'Nguyen Van A', roomType: 'Suite', status: 'pending' },
  ]);
  const [showEditBooking, setShowEditBooking] = useState(false)

  const navigate = useNavigate();

  const handleEditBooking = () => {
   setShowEditBooking(true)
  };

  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    );
    setBookings(updatedBookings);
  };

  const handleCancel = () => {
    setShowEditBooking(false)
  }

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
    <div>
    <div className="booking-page">
      <Navbarmanager />
      <h1>Booking Management</h1>
      <button className="add-booking-btn" onClick={handleAddBooking}>
        Add
      </button>
      <BookingList
        bookings={bookings}
        onEditBooking={handleEditBooking}
        onCancelBooking={handleCancelBooking}
      />
      
    </div>
    {showEditBooking && <EditBooking handleCancel = {handleCancel}/>}
    </div>
  );
}

export default BookingManagement;
