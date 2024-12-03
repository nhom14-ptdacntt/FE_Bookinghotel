import React from 'react';
import Navbar from "../components/Navbar";
import Layout from '../components/Layout';

function Home() {
  return (
    <div>

      <Navbar />
      <div className="home-content">
        <h1>Welcome to the Hotel Booking System</h1>
        <p>
          This is the home page. You can navigate to Booking Management or Room
          Management using the links above.
        </p>
        <Layout/>
      </div>
    </div>
  );
}

export default Home;
