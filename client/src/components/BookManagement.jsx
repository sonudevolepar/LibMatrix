import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchBooks,
  deleteBook,
  addBook,
} from "../store/slices/bookSlice";

import "./BookManagement.css";

const BookManagement = () => {

  const dispatch = useDispatch();

  const { books, loading } = useSelector(
    (state) => state.book
  );

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // FORM STATE
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    quantity: "",
    price: "",
    bookImage: null,
  });

  // IMAGE PREVIEW
  const [preview, setPreview] = useState("");

  // FETCH BOOKS
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // SEARCH FILTER
  const filteredBooks = books?.filter((book) =>
    (book.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {

    // IMAGE
    if (e.target.name === "bookImage") {

      const file = e.target.files[0];

      setFormData({
        ...formData,
        bookImage: file,
      });

      // IMAGE PREVIEW
      if (file) {
        setPreview(
          URL.createObjectURL(file)
        );
      }

    } else {

      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });

    }
  };

  // SUBMIT FORM
  const handleSubmit = async (e) => {

    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("description", formData.description);
    data.append("quantity", formData.quantity);
    data.append("price", formData.price);

    // IMPORTANT
    data.append(
      "image",
      formData.bookImage
    );

    await dispatch(addBook(data));

    // REFRESH
    dispatch(fetchBooks());

    // RESET
    setFormData({
      title: "",
      author: "",
      description: "",
      quantity: "",
      price: "",
      bookImage: null,
    });

    // console.log(bookImage);

    setPreview("");

    setShowModal(false);
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <div className="sidebar">

        <div className="logo">
          <img
            src="/logo.png"
            alt="logo"
          />
        </div>

        <ul>
          <li>📊 Dashboard</li>
          <li className="active">
            📚 Books
          </li>
          <li>🏷 Catalog</li>
          <li>👥 Users</li>
          <li>👤 Add New Admin</li>
          <li>⚙ User Credentials</li>
        </ul>

        <div className="logout">
          🚪 Log Out
        </div>

      </div>

      {/* MAIN */}

      <div className="main">

        {/* TOPBAR */}

        <div className="topbar">

          <h2>Book Management</h2>

          <div className="top-actions">

            <button
              className="add-btn"
              onClick={() =>
                setShowModal(true)
              }
            >
              + Add Book
            </button>

            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>
        </div>

        {/* TABLE */}

        <div className="content">

          {loading ? (

            <p className="loading">
              Loading...
            </p>

          ) : (

            <table>

              <thead>
                <tr>
                  <th>#</th>
                  <th>BOOK</th>
                  <th>AUTHOR</th>
                  <th>QTY</th>
                  <th>PRICE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>

              <tbody>

                {filteredBooks?.length > 0 ? (

                  filteredBooks.map(
                    (book, index) => (

                      <tr key={book._id}>

                        <td>
                          {index + 1}
                        </td>

                        {/* BOOK INFO */}

                        <td>

                          <div className="book-info">

                            <img
                              src={
                                book.bookImage
                                  ?.url ||
                                "https://dummyimage.com/200x300/000/fff&text=Book"
                              }
                              alt={book.title}
                              className="book-img"
                            />

                            <div>

                              <h4 className="book-name">
                                {book.title}
                              </h4>

                              <p className="book-desc">
                                {
                                  book.description
                                }
                              </p>

                            </div>

                          </div>

                        </td>

                        <td>
                          {book.author}
                        </td>

                        <td>
                          {book.quantity}
                        </td>

                        <td>
                          ₹{book.price}
                        </td>

                        {/* STATUS */}

                        <td>

                          <span
                            className={
                              book.quantity > 0
                                ? "status available"
                                : "status out"
                            }
                          >
                            {book.quantity > 0
                              ? "Available"
                              : "Out Of Stock"}
                          </span>

                        </td>

                        {/* DELETE */}

                        <td>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              dispatch(
                                deleteBook(
                                  book._id
                                )
                              )
                            }
                          >
                            🗑
                          </button>

                        </td>

                      </tr>
                    )
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="no-data"
                    >
                      No Books Found
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          )}

        </div>
      </div>

      {/* MODAL */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal">

            <h3>Add New Book</h3>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="title"
                placeholder="Book Title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="author"
                placeholder="Author Name"
                value={formData.author}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Book Description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
              />

              {/* IMAGE */}

              <input
                type="file"
                name="bookImage"
                accept="image/*"
                onChange={handleChange}
                required
              />

              {/* PREVIEW */}

              {preview && (

                <img
                  src={preview}
                  alt="preview"
                  className="preview-img"
                />

              )}

              <div className="modal-buttons">

                <button
                  type="submit"
                  className="add-btn"
                >
                  Add Book
                </button>

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </div>
  );
};

export default BookManagement;