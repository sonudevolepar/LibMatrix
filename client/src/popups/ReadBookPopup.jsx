import React from "react";
import "./ReadBookPopup.css";

const ReadBookPopup = ({ book, onClose }) => {
  if (!book) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">

        {/* Header */}
        <div className="popup-header">
          <h2>📖 Book Details</h2>
          <button onClick={onClose} className="close-btn">✖</button>
        </div>

        {/* Body */}
        <div className="popup-body">
          <p><strong>Title:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>Price:</strong> ₹{book.price}</p>
          <p><strong>Quantity:</strong> {book.quantity}</p>
          <p>
            <strong>Status:</strong>{" "}
            {book.quantity > 0 ? "Available" : "Out of Stock"}
          </p>
        </div>

        {/* Footer */}
        <div className="popup-footer">
          <button onClick={onClose} className="close-btn2">
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReadBookPopup;