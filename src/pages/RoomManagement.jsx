import React, { useEffect, useState } from "react";
import Navbarmanager from "../components/Navbarmanger";
import RoomStatus from "../components/RoomStatus";
import "../styles/RoomManagement.css";
import EditRoom from "../components/EditRoom";
import axios from "axios";

function RoomManagement() {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: "101",
      roomType: "Deluxe",
      pricePerNight: 100,
      checkInDate: "2024-11-01",
      checkOutDate: "2024-11-05",
      status: "available",
      cleanliness: "clean",
    },
    {
      id: 2,
      roomNumber: "102",
      roomType: "Suite",
      pricePerNight: 150,
      checkInDate: "2024-11-01",
      checkOutDate: "2024-11-05",
      status: "occupied",
      cleanliness: "clean",
    },
    {
      id: 3,
      roomNumber: "201",
      roomType: "Standard",
      pricePerNight: 80,
      checkInDate: "2024-11-01",
      checkOutDate: "2024-11-05",
      status: "booked",
      cleanliness: "cleaning",
    },
    {
      id: 4,
      roomNumber: "202",
      roomType: "Deluxe",
      pricePerNight: 120,
      checkInDate: "2024-11-01",
      checkOutDate: "2024-11-05",
      status: "available",
      cleanliness: "clean",
    },
  ]);
  const [accessToken, setAccessToken] = useState("");
  const [roomType, setRoomType] = useState([]);

  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showEditRoom, setShowEditRoom] = useState(false);
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
  useEffect(() => {
    setAccessToken(localStorage.getItem("token"));
  }, []);

  const handleUpdateRoomStatus = (roomId, newStatus) => {
    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, status: newStatus } : room
    );
    setRooms(updatedRooms);
  };

  const handleShowFormAddRoom = () => {
    setShowAddRoom(true);
    callApiGetRoomtype();
    console.log("roomg");
  };
  const handleShowEditRoom = () => {
    setShowEditRoom(true);
    console.log(showEditRoom);
  };
  const handleCancelEditRoom = () => {
    setShowEditRoom(false);
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

  const callApiGetRoomtype = async () => {
    try {
      // Cấu hình headers với Authorization token
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gắn token vào header
        },
      };
      const res = await axios.get("http://localhost:8080/api/roomtype", config);
      const data = res.data;
      setRoomType(data.result);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  return (
    <div className="room-management-page">
      <Navbarmanager />
      <h1>Room Management</h1>

      <button className="add-room-btn" onClick={handleShowFormAddRoom}>
        Add New Room
      </button>

      <RoomStatus
        rooms={rooms}
        onUpdateRoomStatus={handleUpdateRoomStatus}
        handleShowEditRoom={handleShowEditRoom}
      />

      {showAddRoom && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Room</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancelForm}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="roomNumber" className="form-label">
                      Room Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="roomNumber"
                      placeholder="Enter room number"
                      value={dataCreateRoom.roomNumber}
                      onChange={(e) =>
                        setDataCreateRoom({
                          ...dataCreateRoom,
                          roomNumber: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="roomType" className="form-label">
                      Room Type
                    </label>
                    <select
                      className="form-select"
                      id="roomType"
                      // value={dataCreateRoom.roomType}
                      // onChange={(e) =>
                      //   setDataCreateRoom({
                      //     ...dataCreateRoom,
                      //     roomType: e.target.value,
                      //   })
                      // }
                    >
                      <option value="" disabled>
                        Select a room type
                      </option>
                      {roomType.map((type, index) => (
                        <option key={index} value={type}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      placeholder="Enter price"
                      value={dataCreateRoom.price}
                      onChange={(e) =>
                        setDataCreateRoom({
                          ...dataCreateRoom,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddRoom}
                >
                  Add Room
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelForm}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditRoom && <EditRoom handleCancelEditRoom={handleCancelEditRoom} />}
    </div>
  );
}

export default RoomManagement;
