import React, { useState } from "react";
import Header from "../layout/Header";
import "./MyBorrowedBooks.css";

const MyBorrowedBooks = () => {
  const [activeTab, setActiveTab] = useState("returned");

  const books = [
    {
      _id: 1,
      title: "Learn DSA in 60 days",
      date: "10-02-2025 21:09:25",
      dueDate: "17-02-2025 21:09:25",
      returned: true,
    },
  ];

  // ✅ SAFE FILTER (error fix)
  const filteredBooks = books.filter((book) =>
    activeTab === "returned" ? book?.returned : !book?.returned
  );

  return (
    <div className="borrow-dashboard">

      {/* Sidebar */}
      <div className="sidebar">
        <h2 className="logo">BookWorm</h2>

        <ul>
          <li>Dashboard</li>
          <li>Books</li>
          <li className="active">My Borrowed Books</li>
          <li>Update Credentials</li>
        </ul>

        <div className="logout">Log Out</div>
      </div>

      {/* Main */}
      <div className="main">
        <Header />

        <div className="content">
          <h2>Borrowed Books</h2>

          {/* Tabs */}
          <div className="tabs">
            <button
              className={activeTab === "returned" ? "active" : ""}
              onClick={() => setActiveTab("returned")}
            >
              Returned Books
            </button>

            <button
              className={activeTab === "notReturned" ? "active" : ""}
              onClick={() => setActiveTab("notReturned")}
            >
              Non-Returned Books
            </button>
          </div>

          {/* Table */}
          <div className="table-box">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Book Title</th>
                  <th>Date & Time</th>
                  <th>Due Date</th>
                  <th>Returned</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, i) => (
                    <tr key={book._id}>
                      <td>{i + 1}</td>
                      <td>{book.title}</td>
                      <td>{book.date}</td>
                      <td>{book.dueDate}</td>
                      <td>
                        {book.returned ? (
                          <span className="yes">Yes</span>
                        ) : (
                          <span className="no">No</span>
                        )}
                      </td>
                      <td>
                        <button className="view-btn">📄</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      {activeTab === "returned"
                        ? "No returned books found"
                        : "No non-returned books found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyBorrowedBooks;