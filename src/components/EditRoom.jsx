function EditRoom({handleCancelEditRoom}) {
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
              <form >
                <div className="mb-3">
                  <label htmlFor="roomNumber" className="form-label">
                    Room Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roomNumber"
                    // value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="roomType" className="form-label">
                    Room Type:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="roomType"
                    // value={roomType}
                    onChange={(e) => setRoomType(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pricePerNight" className="form-label">
                    Price Per Night:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="pricePerNight"
                    // value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
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
