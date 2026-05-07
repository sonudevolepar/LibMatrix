import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./AddBookPopup.css";

const AddBookPopup = ({ onClose }) => {
  const dispatch = useDispatch();

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!book.title || !book.author) {
      alert("Please fill required fields");
      return;
    }

    console.log("Book Added:", book);

    // 👉 yaha backend dispatch karega
    // dispatch(addBook(book));

    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="add-popup">

        {/* Header */}
        <h3>Add Book</h3>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <label>Book Title</label>
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={book.title}
            onChange={handleChange}
          />

          <label>Book Author</label>
          <input
            type="text"
            name="author"
            placeholder="Book Author"
            value={book.author}
            onChange={handleChange}
          />

          <label>Book Price</label>
          <input
            type="number"
            name="price"
            placeholder="Book Price"
            value={book.price}
            onChange={handleChange}
          />

          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Book Quantity"
            value={book.quantity}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            placeholder="Book Description"
            value={book.description}
            onChange={handleChange}
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

            <button type="submit" className="add-btn">
              Add
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddBookPopup;