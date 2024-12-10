
import React from 'react';

function RoomStatus({ rooms, onUpdateRoomStatus }) {
  const handleCheckIn = (roomId) => {
    onUpdateRoomStatus(roomId, 'occupied');
  };

  const handleCheckOut = (roomId) => {
    onUpdateRoomStatus(roomId, 'available');
  };

  return (
    <table className="room-status-list">
      <thead>
        <tr>
          <th>Room Number</th>
          <th>Room Type</th>
          <th>Price per Night</th>
          <th>Status</th>
          <th>Cleanliness</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map(room => (
          <tr key={room.id}>
            <td>{room.roomNumber}</td>
            <td>{room.roomType}</td>
            <td>${room.pricePerNight}</td>
            <td style={{ color: getStatusColor(room.status) }}>{room.status}</td>
            <td>{room.cleanliness}</td>
            <td>
              {room.status === 'available' ? (
                <button onClick={() => handleCheckIn(room.id)}>Check In</button>
              ) : (
                <button onClick={() => handleCheckOut(room.id)}>Check Out</button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'available':
      return 'green';
    case 'booked':
      return 'orange';
    case 'occupied':
      return 'red';
    default:
      return 'black';
  }
};

export default RoomStatus;
