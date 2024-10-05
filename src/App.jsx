
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
import BookingManagement from './pages/BookingManagement';
import RoomManagement from './pages/RoomManagement';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<div>Welcome to Hotel Booking</div>} />
          <Route path="/signup" element={<div className="custom-background"><SignUp/></div>} /> 
          <Route path="/signin" element={<div className="custom-background"><SignIn/></div>} /> 
          <Route path="/booking" element={<BookingManagement />} />
          <Route path="/rooms" element={<RoomManagement />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
