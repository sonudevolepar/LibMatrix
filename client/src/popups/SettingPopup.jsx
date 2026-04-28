import React, { useState } from "react";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch } from "react-redux";
import { toggleSettingPopup } from "../store/slices/popUpSlice";

const SettingPopup = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match ❌");
      return;
    }

    console.log("UPDATE DATA:", formData);

    // 👉 dispatch(updatePassword(formData))

    dispatch(toggleSettingPopup()); // close popup
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      {/* MODAL */}
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-lg font-semibold">Update Credentials</h2>

          <img
            src={closeIcon}
            alt="close"
            className="w-5 cursor-pointer"
            onClick={() => dispatch(toggleSettingPopup())}
          />
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* CURRENT PASSWORD */}
          <div className="relative">
            <label className="text-sm">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md mt-1 pr-10"
            />
            <img
              src={keyIcon}
              alt="key"
              className="w-4 absolute right-3 top-9 opacity-60"
            />
          </div>

          {/* NEW PASSWORD */}
          <div className="relative">
            <label className="text-sm">New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md mt-1 pr-10"
            />
            <img
              src={keyIcon}
              alt="key"
              className="w-4 absolute right-3 top-9 opacity-60"
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <label className="text-sm">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md mt-1 pr-10"
            />
            <img
              src={keyIcon}
              alt="key"
              className="w-4 absolute right-3 top-9 opacity-60"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => dispatch(toggleSettingPopup())}
              className="px-4 py-2 border rounded-md hover:bg-gray-100"
            >
              Close
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default SettingPopup;