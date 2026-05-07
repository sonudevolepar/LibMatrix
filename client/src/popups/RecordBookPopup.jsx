import React, { useState } from "react";
import "./RecordBookPopup.css";

const RecordBookPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter email");
      return;
    }

    console.log("Book issued to:", email);

    // 👉 backend call yaha karega
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="record-popup">

        {/* Header */}
        <h3>Record Book</h3>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label>User Email</label>

          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Buttons */}
          <div className="popup-actions">
            <button
              type="button"
              className="close-btn"
              onClick={onClose}
            >
              Close
            </button>

            <button type="submit" className="record-btn">
              Record
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default RecordBookPopup;