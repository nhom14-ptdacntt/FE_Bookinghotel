import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BookingManagement from './pages/BookingManagement';
import RoomManagement from './pages/RoomManagement';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/app.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddBooking from './pages/AddBooking';
import EditBooking from './pages/EditBooking';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect to /home by default */}
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<div className="custom-background"><SignUp /></div>} />
          <Route path="/signin" element={<div className="custom-background"><SignIn /></div>} />
          <Route path="/booking" element={<BookingManagement />} /> {/* Changed from /booking to /booking-management */}
          <Route path="/rooms" element={<RoomManagement />} />
          <Route path="/dashboard" element={<RoomManagement />} />
          <Route path="/add-booking" element={<AddBooking />} />
          <Route path="/edit-booking" element={<EditBooking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
