import { useEffect, useState } from "react";
import axios from "axios";

function EditRoom({ handleCancelEditRoom, callApiGetAllRoom,setShowEditRoom ,roomid }) {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState(null);
  const [roomTypeName, setRoomTypeName] = useState("");
  const [price, setPrice] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [roomTypeID, setRoomTypeID] = useState("");

  useEffect(() => {
    setAccessToken(localStorage.getItem("token"));
  }, []);
  useEffect(() => {
    callApiGetRoomtype();
  }, [accessToken]);

  const handleChangeRoomNumber = (e) => {
    setRoomNumber(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  
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
  
  const handleChangeRoomTypeName = (e) => {
    setRoomTypeName(e.target.value);
    setRoomTypeID(e.target.value);
  };
  return (
    <div>
      <div
        className="modal fade show d-block"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Room</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => handleCancelEditRoom()}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="roomNumber" className="form-label">
                    Room Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roomNumber"
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
                    {(roomType || []).map((type, index) => (
                      <option key={index} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="pricePerNight" className="form-label">
                    Price Per Night:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="pricePerNight"
                    value={price}
                    onChange={handleChangePrice}
                  />
                </div>
                <div className="modal-footer">
                  <div onClick={handleClickSave} className="btn btn-primary">
                    Save
                  </div>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleCancelEditRoom()}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRoom;
