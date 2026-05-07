import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../store/slices/bookSlice";
import { borrowBook } from "../store/slices/borrowSlice";
import "./Catalog.css";

const Catalog = () => {
  const dispatch = useDispatch();

  const { books, loading } = useSelector((state) => state.book);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // 🔍 filter
  const filteredBooks = books.filter((book) =>
    (book.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleBorrow = (id) => {
    dispatch(borrowBook(id));
  };

  return (
    <div className="catalog">
      <h2>📚 Book Catalog</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search book..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      {/* Books */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div className="card" key={book._id}>
                <h3>{book.title}</h3>
                <p>✍️ {book.author}</p>
                <p>₹{book.price}</p>

                <span
                  className={
                    book.quantity > 0 ? "available" : "out"
                  }
                >
                  {book.quantity > 0
                    ? "Available"
                    : "Out of Stock"}
                </span>

                <button
                  disabled={book.quantity === 0}
                  onClick={() => handleBorrow(book._id)}
                >
                  Borrow
                </button>
              </div>
            ))
          ) : (
            <p>No Books Found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Catalog;