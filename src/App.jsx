import React, { useState } from 'react';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={<div className="custom-background"><SignUp /></div>} />
          <Route path="/booking" element={<BookingManagement />} />
           <Route path="/rooms" element={<RoomManagement />} />
          <Route 
            path="/signin" 
            element={isAuthenticated ? <Navigate to="/booking" /> : <div className="custom-background"><SignIn onLoginSuccess={handleLoginSuccess} /></div>} 
          />

          <Route 
            path="/booking" 
            element={isAuthenticated ? <BookingManagement /> : <Navigate to="/signin" />}
          />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
