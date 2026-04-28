import React, { useState, useEffect } from "react";
import placeHolder from "../assets/placeholder.jpg";
import closeIcon from "../assets/close-square.png";
import keyIcon from "../assets/key.png";
import { useDispatch } from "react-redux";
import { toggleAddNewAdminPopup } from "../store/slices/popUpSlice";
import { addNewAdmin } from "../store/slices/userSlice";

const AddNewAdmin = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const [preview, setPreview] = useState(placeHolder);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });

      if (file) {
        const url = URL.createObjectURL(file);
        setPreview(url);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("image", formData.image);

    dispatch(addNewAdmin(data)); // 🔥 API call

    dispatch(toggleAddNewAdminPopup()); // close popup
  };

  useEffect(() => {
    return () => {
      if (preview && preview !== placeHolder) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-lg font-semibold">Add New Admin</h2>

          <img
            src={closeIcon}
            alt="close"
            className="w-5 cursor-pointer"
            onClick={() => dispatch(toggleAddNewAdminPopup())}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 rounded-full object-cover border"
            />
          </div>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />

          {/* NAME */}
          <input
            type="text"
            name="name"
            placeholder="Admin Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md pr-10"
            />
            <img src={keyIcon} className="w-4 absolute right-3 top-3" />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => dispatch(toggleAddNewAdminPopup())}
              className="px-4 py-2 border rounded-md"
            >
              Close
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewAdmin;