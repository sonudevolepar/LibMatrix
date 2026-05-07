import React, { useEffect, useState } from "react";
import { PiKeyReturnBold } from "react-icons/pi";
import { FaSquareCheck } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, borrowBook } from "../store/slices/bookSlice";

const Catalog = () => {
  const dispatch = useDispatch();
  const { books = [], loading } = useSelector((state) => state.book);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // 🔍 safer filter
  const filteredBooks = books.filter((book) =>
    book?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleBorrow = (id) => {
    dispatch(borrowBook(id));
  };

  return (
    <div className="ml-64 p-10 bg-[#f5f7fb] min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded"></div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Book Catalog
          </h1>
        </div>

        {/* Search */}
        <div className="relative w-[320px] mb-10">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search books by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-black outline-none bg-white"
          />
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 mt-10">
            Loading books...
          </p>
        )}

        {/* Books */}
        {!loading && filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => {
              // ✅ FIX: availability from quantity
              const isAvailable = book.quantity > 0;

              return (
                <div
                  key={book._id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                >
                  <img
                    src={book.image || "https://via.placeholder.com/200"}
                    alt={book.title}
                    className="w-full h-44 object-cover rounded mb-3"
                  />

                  <h2 className="text-lg font-semibold">
                    {book.title}
                  </h2>

                  <p className="text-sm text-gray-500 mb-2">
                    By {book.author || "Unknown"}
                  </p>

                  {/* Availability */}
                  <div className="flex items-center gap-2 mb-3">
                    {isAvailable ? (
                      <>
                        <FaSquareCheck className="text-green-500" />
                        <span className="text-green-600 text-sm">
                          Available
                        </span>
                      </>
                    ) : (
                      <>
                        <PiKeyReturnBold className="text-red-500" />
                        <span className="text-red-600 text-sm">
                          Out of Stock
                        </span>
                      </>
                    )}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => handleBorrow(book._id)}
                    disabled={!isAvailable}
                    className={`w-full py-2 rounded text-white ${
                      isAvailable
                        ? "bg-black hover:bg-gray-800"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isAvailable ? "Borrow Book" : "Not Available"}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          !loading && (
            <div className="flex flex-col items-center justify-center mt-24 text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg mb-4 text-xl">
                📚
              </div>

              <h2 className="text-lg font-semibold text-gray-700">
                No books found
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Try a different search or add books
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Catalog;