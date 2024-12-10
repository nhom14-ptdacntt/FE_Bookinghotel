import React from 'react';

function RoomStatus({
  rooms,
  onUpdateRoomStatus,
  handleShowFormUpdateRoom,
  handleDeleteRoom,
}) {
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
          <th style={{ width: 500 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr key={room.id}>
            <td>{room.roomNumber}</td>
            <td>{room.roomType}</td>
            <td>${room.pricePerNight}</td>
            <td style={{ color: getStatusColor(room.status) }}>{room.status}</td>
            <td>{room.cleanliness || 'N/A'}</td>
            <td>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '500px',
                }}
              >
                {room.status === 'available' ? (
                  <button onClick={() => handleCheckIn(room.id)}>Check In</button>
                ) : (
                  <button onClick={() => handleCheckOut(room.id)}>Check Out</button>
                )}
                <button
                  style={{ margin: '0 16px' }}
                  onClick={() => handleShowFormUpdateRoom && handleShowFormUpdateRoom(room)}
                >
                  Edit
                </button>
                <div
                  style={{
                    margin: '0 16px',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleDeleteRoom && handleDeleteRoom(room.id)}
                >
                  <i>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      id="delete"
                    >
                      <path
                        fill="#000"
                        d="M15 3a1 1 0 0 1 1 1h2a1 1 0 1 1 0 2H6a1 1 0 0 1 0-2h2a1 1 0 0 1 1-1h6Z"
                      />
                      <path
                        fill="#000"
                        fillRule="evenodd"
                        d="M6 7h12v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7Zm3.5 2a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Zm5 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9a.5.5 0 0 0-.5-.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </i>
                </div>
              </div>
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
