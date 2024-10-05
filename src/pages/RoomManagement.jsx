
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import RoomStatus from '../components/RoomStatus';
import '../styles/RoomManagement.css';

function RoomManagement() {
  const [rooms, setRooms] = useState([
    { id: 1, roomNumber: '101', roomType: 'Deluxe', pricePerNight: 100, status: 'available', cleanliness: 'clean' },
    { id: 2, roomNumber: '102', roomType: 'Suite', pricePerNight: 150, status: 'occupied', cleanliness: 'clean' },
    { id: 3, roomNumber: '201', roomType: 'Standard', pricePerNight: 80, status: 'booked', cleanliness: 'cleaning' },
    { id: 4, roomNumber: '202', roomType: 'Deluxe', pricePerNight: 120, status: 'available', cleanliness: 'clean' },
  ]);

  const handleUpdateRoomStatus = (roomId, newStatus) => {
    const updatedRooms = rooms.map(room => 
      room.id === roomId ? { ...room, status: newStatus } : room
    );
    setRooms(updatedRooms);
  };

  return (
    <div className="room-management-page">
        <NavBar />
      <h1>Room Management</h1>
      <RoomStatus rooms={rooms} onUpdateRoomStatus={handleUpdateRoomStatus} />
    </div>
  );
}

export default RoomManagement;
