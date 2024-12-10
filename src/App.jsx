import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import Header from './components/Header';
// import Footer from './components/Footer';
import BookingManagement from "./pages/BookingManagement";
import RoomManagement from "./pages/RoomManagement";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/app.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<div>Welcome to Hotel Booking</div>} />
          <Route
            path="/home"
            element={
              <div>
                <Home />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="custom-background">
                <SignUp />
              </div>
            }
          />
          <Route
            path="/signin"
            element={
              <div className="custom-background">
                <SignIn />
              </div>
            }
          />
          <Route path="/booking" element={<BookingManagement />} />
          <Route path="/dashboard" element={<RoomManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
