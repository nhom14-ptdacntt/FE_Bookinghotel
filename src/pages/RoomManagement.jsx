import React, { useEffect, useState } from "react";
import Navbarmanager from "../components/Navbarmanger";
import RoomStatus from "../components/RoomStatus";
import "../styles/RoomManagement.css";
import EditRoom from "../components/EditRoom";
import axios from "axios";

function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [roomType, setRoomType] = useState([]);
  const [roomTypeName, setRoomTypeName] = useState("");
  const [loading, setLoading] = useState(false)

  const [roomid, setRoomId] = useState(null)

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

  const [roomNumber, setRoomNumber] = useState("");
  const [roomTypeID, setRoomTypeID] = useState("");
  const [roomTypeIdEdit, setRoomTypeIdEdit] = useState("");
  const [price, setPrice] = useState(null);
  useEffect(() => {
   callApiGetAllRoom();
   
  }, [accessToken])
  useEffect(() => {
    setAccessToken(localStorage.getItem("token"));
  }, []);

  const callApiGetAllRoom = async () => {
    try {
 
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gắn token vào header
        },
      };
  
      const res = await axios.get("http://localhost:8080/api/room",config)
      const data = res.data
      console.log(data);
      
      setRooms(data.result)
   
    } catch (error) {
      console.log(error)
    }
  }
  const callApiDeleteRoom = async (roomId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gắn token vào header
        },
      };
      const res = await axios.delete(`http://localhost:8080/api/room/delete/${roomId}`,config)
      console.log("OK")
    } catch (error) {
      console.log(error)
    }
  }
  const handleDeleteRoom = (roomId) => {
    callApiDeleteRoom(roomId)
    .then(() => {
      // Gọi API để lấy lại danh sách phòng mới
      callApiGetAllRoom(); // Bạn cần phải định nghĩa hàm callApiGetRooms để lấy lại danh sách phòng
    })
    .catch((error) => {
      console.error('Lỗi khi xóa phòng:', error);
    });
  }
  const handleRoomTypeIdChange = (newRoomTypeId) => {
    setRoomTypeIdEdit(newRoomTypeId);
    console.log(roomTypeIdEdit)
  }

  const callApiEditRoom = async (room) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gắn token vào header
        },
      };
      const res = await axios.post(`http://localhost:8080/api/room/edit/${roomid}`,room,config)
      toast.success('Sửa thành công', {
        position: 'top-right',
        autoClose: 3000
      });
    } catch (error) {
      
    }
  }
  const handleClickSave = () => {
    const updateRoom = {
      roomNumber: roomNumber,
      roomTypeId: roomTypeID,
      price: price
    }
    callApiEditRoom(updateRoom)
    .then(() => {
      // Gọi API để lấy lại danh sách phòng mới
      callApiGetAllRoom(); // Bạn cần phải định nghĩa hàm callApiGetRooms để lấy lại danh sách phòng
    })
    .catch((error) => {
      console.error('Lỗi khi sửa phòng:', error);
    });
    setShowEditRoom(false)
  }

  

  const handleChangeRoomNumber = (e) => {
    setRoomNumber(e.target.value);
  };
  const handleChangeRoomTypeName = (e) => {
    setRoomTypeName(e.target.value);
    setRoomTypeID(e.target.value)
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleAddNewRoom = () => {
    const newRoom = {
      roomNumber: roomNumber,
      roomTypeId: roomTypeID,
      price: price
    }
    callApiAddRoom(newRoom)
    .then(() => {
      // Gọi API để lấy lại danh sách phòng mới
      callApiGetAllRoom(); // Bạn cần phải định nghĩa hàm callApiGetRooms để lấy lại danh sách phòng
    })
    .catch((error) => {
      console.error('Lỗi khi thêm phòng:', error);
    });
    setShowAddRoom(false)
  }



  const handleUpdateRoomStatus = (roomId, newStatus) => {
    const updatedRooms = rooms.map((room) =>
      room.id === roomId ? { ...room, status: newStatus } : room
    );
    setRooms(updatedRooms);
  };

  const handleShowFormAddRoom = () => {
    setPrice("")
    setRoomNumber("");
    setShowAddRoom(true);
    callApiGetRoomtype();
    console.log("roomg");
  };
  const handleShowEditRoom = (id) => {
    setShowEditRoom(true);
    setRoomId(id)
    console.log(roomid)
  };
  const handleCancelEditRoom = () => {
    setShowEditRoom(false);
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
  const callApiAddRoom = async (room) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gắn token vào header
        },
      };
      const res = await axios.post("http://localhost:8080/api/room/create",room,config)
      const data = res.data;
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="room-management-page">
      <Navbarmanager />
      <h1>Room Management</h1>

      <button className="add-room-btn" onClick={handleShowFormAddRoom}>
        Add New Room
      </button>

      <RoomStatus
        rooms={rooms}
        handleDeleteRoom={handleDeleteRoom}
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
                      value={roomNumber}
                      onChange={handleChangeRoomNumber}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="roomType" className="form-label">
                      Room Type
                    </label>
                    <select
                      className="form-select"
                      id="roomType"
                      value={roomTypeName}
                      onChange={handleChangeRoomTypeName}
                    >
                      <option value="" disabled>
                        Select a room type
                      </option>
                      {roomType.map((type, index) => (
                        <option key={index} value={type.id}>
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
                      value={price}
                      onChange={handleChangePrice}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddNewRoom}
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
      {showEditRoom && <EditRoom handleCancelEditRoom={handleCancelEditRoom} setShowEditRoom ={setShowEditRoom } callApiGetAllRoom={callApiGetAllRoom} roomid = {roomid}/>}
      
    </div>
  );
}

export default RoomManagement;
