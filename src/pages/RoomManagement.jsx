import { useState } from "react";
import Navbarmanager from "../components/Navbarmanger";
import RoomStatus from "../components/RoomStatus";
import "../styles/RoomManagement.css";

function RoomManagement() {
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
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [showUpdateRoom, setShowUpdateRoom] = useState(false);
  const [rooms, setRooms] = useState([
    {
      id: 1,
      roomNumber: "101",
      roomType: "Deluxe",
      pricePerNight: 100,
      status: "available",
      cleanliness: "clean",
    },
    {
      id: 2,
      roomNumber: "102",
      roomType: "Suite",
      pricePerNight: 150,
      status: "occupied",
      cleanliness: "clean",
    },
    {
      id: 3,
      roomNumber: "201",
      roomType: "Standard",
      pricePerNight: 80,
      status: "booked",
      cleanliness: "cleaning",
    },
    {
      id: 4,
      roomNumber: "202",
      roomType: "Deluxe",
      pricePerNight: 120,
      status: "available",
      cleanliness: "clean",
    },
  ]);

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
    if (!showUpdateRoom) {
      const tempArr = [...rooms];

      // Tìm roomNumber lớn nhất trong mảng
      const maxId = tempArr.reduce((max, room) => {
        return room.id > max ? room.id : max;
      }, 0);

      // Tìm roomNumber lớn nhất
      const maxRoomNumber = tempArr.reduce((max, room) => {
        const roomNumber = parseInt(room.roomNumber); // Chuyển roomNumber thành số
        return roomNumber > max ? roomNumber : max;
      }, 0);

      // Tạo roomNumber mới
      const newRoomNumber = (maxRoomNumber + 1).toString();
      const newRoomID = (maxId + 1).toString();

      // Thêm room mới vào mảng
      const dataCreateRoom2 = {
        ...dataCreateRoom,
        roomNumber: newRoomNumber, // Gán roomNumber mới
        id: newRoomID, // Gán roomNumber mới
      };
      console.log("dataCreateRoom: ", dataCreateRoom2);

      const newTempArr = [...tempArr, dataCreateRoom2];

      // Cập nhật lại state
      setRooms(newTempArr);
      setShowAddRoom(false);
      setDataCreateRoom({
        id: 0,
        roomNumber: "",
        roomType: "",
        pricePerNight: 0,
        status: "available",
        cleanliness: "clean",
        desc: "",
        img: "",
      });
    } else {
      const isRoomNumberExists = rooms.some(
        (room) =>
          room.id !== dataCreateRoom.id &&
          room.roomNumber === dataCreateRoom.roomNumber
      );
      if (isRoomNumberExists) {
        alert(`Room number ${dataCreateRoom.roomNumber} exists!`);
      } else {
        setRooms((prevRooms) =>
          prevRooms.map((room) =>
            room.id === dataCreateRoom.id ? dataCreateRoom : room
          )
        );
        setShowAddRoom(false);
        setShowUpdateRoom(false);
      }
    }
  };

  const handleShowFormUpdateRoom = (data) => {
    setShowAddRoom(true);
    setShowUpdateRoom(true);
    setDataCreateRoom(data);
    console.log(data);
  };

  const handleCancelForm = () => {
    setShowAddRoom(false);
    setShowUpdateRoom(false);
    setDataCreateRoom({
      id: 0,
      roomNumber: "",
      roomType: "",
      pricePerNight: 0,
      status: "available",
      cleanliness: "clean",
      desc: "",
      img: "",
    });
  };

  const handleDeleteRoom = (id) => {
    const updatedRooms = rooms.filter((room) => room.id !== id);
    setRooms(updatedRooms);
  };

  const handleSelectImage = (e) => {
    const file = e.target.files[0]; // Lấy file đầu tiên trong danh sách file được chọn
    if (file) {
      const url = URL.createObjectURL(file); // Tạo URL từ file
      setDataCreateRoom((prev) => ({ ...prev, img: url })); // Lưu URL vào state
    }
  };

  return (
    <div className="room-management-page">
      {showAddRoom && (
        <div
          style={{
            position: "fixed",
            backgroundColor: "rgba(0,0,0,0.3)",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 600,
              padding: "16px 20px",
              borderRadius: 8,
              backgroundColor: "#fff",
            }}
          >
            <div>
              <h2 style={{ textAlign: "center", paddingTop: 16, fontSize: 22 }}>
                {showUpdateRoom ? "Update Room" : "New Room"}
              </h2>
            </div>
            <div style={{ paddingTop: 20 }}>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <label style={{ width: 160 }}>Room Number</label>
                <input
                  type="number"
                  onChange={(e) =>
                    setDataCreateRoom((prev) => ({
                      ...prev,
                      roomNumber: e.target.value,
                    }))
                  }
                  placeholder="Room Number"
                  value={dataCreateRoom.roomNumber}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    borderRadius: 4,
                    border: "1px solid #eee",
                  }}
                />
              </div> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: 24,
                }}
              >
                <label style={{ width: 160 }}>Type</label>
                <input
                  type="text"
                  onChange={(e) =>
                    setDataCreateRoom((prev) => ({
                      ...prev,
                      roomType: e.target.value,
                    }))
                  }
                  placeholder="Type"
                  value={dataCreateRoom.roomType}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    borderRadius: 4,
                    border: "1px solid #eee",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: 24,
                }}
              >
                <label style={{ width: 160 }}>Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  onChange={(e) =>
                    setDataCreateRoom((prev) => ({
                      ...prev,
                      pricePerNight: e.target.value,
                    }))
                  }
                  value={dataCreateRoom.pricePerNight}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    borderRadius: 4,
                    border: "1px solid #eee",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: 24,
                }}
              >
                <label style={{ width: 160 }}>Image</label>
                {dataCreateRoom.img && dataCreateRoom.img !== "" && (
                  <img
                    src={dataCreateRoom.img}
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                )}
                <input
                  type="file"
                  placeholder="Price"
                  onChange={(e) => handleSelectImage(e)}
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    borderRadius: 4,
                    border: "1px solid #eee",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: 24,
                }}
              >
                <label style={{ width: 160 }}>Desc</label>
                <textarea
                  placeholder="Desc"
                  value={dataCreateRoom.desc}
                  onChange={(e) =>
                    setDataCreateRoom((prev) => ({
                      ...prev,
                      desc: e.target.value,
                    }))
                  }
                  style={{
                    flex: 1,
                    padding: "8px 16px",
                    borderRadius: 4,
                    border: "1px solid #eee",
                  }}
                ></textarea>
              </div>
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingTop: 24,
                }}
              >
                <label style={{ width: 160 }}>Status</label>
                <select
                  style={{ flex: 1, padding: "8px 16px" }}
                  onChange={(e) =>
                    setDataCreateRoom((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                >
                  <option
                    selected={dataCreateRoom.status === "available" && "true"}
                    value="available"
                  >
                    available
                  </option>
                  <option
                    selected={dataCreateRoom.status === "occupied" && "true"}
                    value="occupied"
                  >
                    occupied
                  </option>
                  <option
                    selected={dataCreateRoom.status === "booked" && "true"}
                    value="booked"
                  >
                    booked
                  </option>
                </select>
              </div> */}
              <div
                style={{
                  paddingTop: 40,
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <button
                  onClick={handleCancelForm}
                  style={{ margin: "0 16px", backgroundColor: "#D9543D" }}
                >
                  Delete
                </button>
                {showUpdateRoom ? (
                  <button onClick={handleAddRoom}>Update Room</button>
                ) : (
                  <button onClick={handleAddRoom}>Accect</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Navbarmanager />
      <h1>Room Management</h1>

      <RoomStatus
        rooms={rooms}
        onUpdateRoomStatus={handleUpdateRoomStatus}
        handleShowFormUpdateRoom={handleShowFormUpdateRoom}
        handleDeleteRoom={handleDeleteRoom}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          paddingRight: 16,
          width: "100%",
        }}
      >
        <button onClick={handleShowFormAddRoom}>Add new room</button>
      </div>
    </div>
  );
}

export default RoomManagement;
