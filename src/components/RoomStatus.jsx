import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RoomStatus({
  rooms,
  onUpdateRoomStatus,
  handleShowEditRoom,
  handleDeleteRoom,
}) {
  const handleCheckIn = (roomId) => {
    onUpdateRoomStatus(roomId, "occupied");
    navigate("/")
  };

  const handleCheckOut = (roomId) => {
    onUpdateRoomStatus(roomId, "available");
  };
  const navigate = useNavigate();

  return (
    <table className="room-status-list">
      <thead>
        <tr>
          <th>Room Number</th>
          <th>Room Type</th>
          <th>Price per Night</th>
          <th>Status</th>

          <th style={{ width: 500 }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room) => (
          <tr key={room.id}>
            <td>{room.number}</td>
            <td>{room.roomType.name}</td>
            <td>${room.price}</td>

            <td style={{ color: getStatusColor(room.roomStatus.name) }}>
              {room.roomStatus.name}
            </td>

            <td>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "500px",
                }}
              >
                {room.status === "available" ? (
                  <button
                    onClick={() => {
                      handleCheckIn(room.id);
                      
                    }}
                  >
                    Check In
                  </button>
                ) : (
                  <button onClick={() => handleCheckOut(room.id)}>
                    Check Out
                  </button>
                )}
                <button
                  style={{ margin: "0 16px" }}
                  onClick={() => handleShowEditRoom(room.id)}
                >
                  Edit
                </button>
                <div
                  style={{
                    margin: "0 16px",
                    padding: "4px 8px",
                    cursor: "pointer",
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
    case "AVAIABLE":
      return "green";
    case "BOOKED":
      return "orange";
    case "OCCUPIED":
      return "red";
    default:
      return "black";
  }
};

export default RoomStatus;
