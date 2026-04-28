import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyOTP } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerify = async (e) => {
  e.preventDefault();

  try {
    const response = await dispatch(verifyOTP({ email, otp }));

    // 🔥 IMPORTANT
    const data = response; // kyunki tum direct res.data return kar rahe ho

    toast.success("OTP Verified");

    navigate(`/password/reset/${data.token}`);
  } catch (error) {
    toast.error(error);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Verify OTP
        </h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default OTP;