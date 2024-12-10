import React, { useState } from "react";
import Navbarmanager from "../components/Navbarmanger";
import RoomStatus from "../components/RoomStatus";
import "../styles/RoomManagement.css";

function RoomManagement() {
  const [rooms, setRooms] = useState([
    { id: 1, roomNumber: "101", roomType: "Deluxe", pricePerNight: 100, status: "available", cleanliness: "clean" },
    { id: 2, roomNumber: "102", roomType: "Suite", pricePerNight: 150, status: "occupied", cleanliness: "clean" },
    { id: 3, roomNumber: "201", roomType: "Standard", pricePerNight: 80, status: "booked", cleanliness: "cleaning" },
    { id: 4, roomNumber: "202", roomType: "Deluxe", pricePerNight: 120, status: "available", cleanliness: "clean" },
  ]);

  const [showAddRoom, setShowAddRoom] = useState(false);
  const [dataCreateRoom, setDataCreateRoom] = useState({
    id: 0,
    roomNumber: "",
    roomType: "",
    pricePerNight: 0,
    status: "available",
    cleanliness: "clean",
    desc: "",
    img: "",
  });

  const handleUpdateRoomStatus = (roomId, newStatus) => {
    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, status: newStatus } : room
    );
    setRooms(updatedRooms);
  };

  const handleShowFormAddRoom = () => {
    setShowAddRoom(true);
  };

  const handleAddRoom = () => {
    const newRoomNumber = (rooms.length + 1).toString();
    const newRoom = {
      ...dataCreateRoom,
      id: rooms.length + 1,
      roomNumber: newRoomNumber,
    };
    setRooms((prevRooms) => [...prevRooms, newRoom]);
    setShowAddRoom(false);
  };

  const handleCancelForm = () => {
    setShowAddRoom(false);
  };

  return (
    <div className="room-management-page">
      <Navbarmanager />
      <h1>Room Management</h1>

      <button className="add-room-btn" onClick={handleShowFormAddRoom}>
        Add New Room
      </button>

      <RoomStatus rooms={rooms} onUpdateRoomStatus={handleUpdateRoomStatus} />

      {showAddRoom && (
        <div className="add-room-modal">
          <div className="modal-content">
            <h2>New Room</h2>
            <input
              type="text"
              placeholder="Room Type"
              value={dataCreateRoom.roomType}
              onChange={(e) => setDataCreateRoom({ ...dataCreateRoom, roomType: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price per Night"
              value={dataCreateRoom.pricePerNight}
              onChange={(e) => setDataCreateRoom({ ...dataCreateRoom, pricePerNight: e.target.value })}
            />
            <button onClick={handleAddRoom}>Add Room</button>
            <button onClick={handleCancelForm}>Cancel</button>
          </div>
        </div>
      )}

    
    </div>
  );
}

export default RoomManagement;
