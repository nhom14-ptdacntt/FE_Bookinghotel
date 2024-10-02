
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<div>Welcome to Hotel Booking</div>} />
          <Route path="/login" element={<div className="custom-background"><Login /></div>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
