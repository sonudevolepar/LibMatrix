import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../store/slices/userSlice";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);

    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();

    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${d}-${m}-${y} ${h}:${min}`;
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white flex flex-col justify-between p-6">
        <div>
          <h1 className="text-2xl font-bold mb-10">BookWorm</h1>

          <nav className="space-y-4 text-gray-300">
            <p className="hover:text-white cursor-pointer">Dashboard</p>
            <p className="hover:text-white cursor-pointer">Books</p>
            <p className="hover:text-white cursor-pointer">Catalog</p>
            <p className="text-white font-semibold">Users</p>
            <p className="hover:text-white cursor-pointer">Add Admin</p>
            <p className="hover:text-white cursor-pointer">User Credentials</p>
          </nav>
        </div>

        <button className="text-left text-gray-400 hover:text-white">
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Users</h2>
          <p className="text-gray-600">Welcome, Admin 👋</p>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-xl shadow">

          {loading ? (
            <p className="p-6">Loading...</p>
          ) : (
            <table className="w-full text-sm">
              
              {/* HEADER */}
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Role</th>
                  <th className="px-6 py-3 text-left">Created At</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.email}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === "Admin"
                              ? "bg-green-100 text-green-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {formatDate(user.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-6">
                      No Users Found
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;