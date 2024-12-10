import React, { useState , useEffect} from 'react';
import BookingList from '../components/BookingList';
import { useNavigate } from 'react-router-dom';
import '../styles/BookingManagement.css';
import Navbarmanager from '../components/Navbarmanger';
import EditBooking from './EditBooking';
import axios from 'axios';

function BookingManagement() {
  const [bookings, setBookings] = useState([
  ]);

  const [accessToken,  setAccessToken] = useState("")
  const [bookingId, setBookingId] = useState(null)


  useEffect(() => {
    setAccessToken(localStorage.getItem("token"))
  },[])

  useEffect(() => {
    callApiGetAllBooking();
  }, [accessToken])

  

  const callApiGetAllBooking = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gắn token vào header
        },
      };
      const res = await axios.get("http://localhost:8080/api/booking", config)
      const data = res.data;
      setBookings(data.result)
      console.log(data);
    } catch (error) {
      console.log(error);
      
    }
  }
  const [showEditBooking, setShowEditBooking] = useState(false)

  const navigate = useNavigate();

  const handleEditBooking = (id) => {
   setShowEditBooking(true)
   setBookingId(id)
   console.log(bookingId)
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
        callApiGetAllBooking = {callApiGetAllBooking}
      />
      
    </div>
    {showEditBooking && <EditBooking handleCancel = {handleCancel} bookingId = {bookingId}/>}
    </div>
  );
}

export default BookingManagement;
