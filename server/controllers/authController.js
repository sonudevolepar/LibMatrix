import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { sendVerificationCode } from "./utils/sendVerificationCode.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { sendToken } from "./utils/sendToken.js";
import { sendEmail } from "./utils/sendEmail.js";
import { generateForgotPasswordEmailTemplate } from "./utils/emailTemplates.js";

// ================= REGISTER =================
export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("Please enter all fields.", 400));
    }

    const isRegistered = await User.findOne({
      email,
      accountVerified: true,
    });

    if (isRegistered) {
      return next(new ErrorHandler("User already exists.", 400));
    }

    const registerationAttemptsByUser = await User.find({
      email,
      accountVerified: false,
    });

    if (registerationAttemptsByUser.length >= 5) {
      return next(
        new ErrorHandler(
          "You have exceeded registration attempts.",
          400
        )
      );
    }

    if (password.length < 8 || password.length > 16) {
      return next(
        new ErrorHandler(
          "Password must be between 8 and 16 characters.",
          400
        )
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const verificationCode = await user.generateVerificationCode();
    await user.save();

    sendVerificationCode(verificationCode, email, res);
  } catch (error) {
    next(error);
  }
});

// ================= VERIFY OTP =================
export const verifyOTP = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new ErrorHandler("Email or OTP is missing.", 400));
  }

  try {
    const userAllentries = await User.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });

    if (!userAllentries || userAllentries.length === 0) {
      return next(new ErrorHandler("User not found.", 404));
    }

    let user = userAllentries[0];

    if (userAllentries.length > 1) {
      await User.deleteMany({
        _id: { $ne: user._id },
        email,
        accountVerified: false,
      });
    }

    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler("Invalid OTP.", 400));
    }

    const currentTime = Date.now();

    const verificationCodeExpire = new Date(
      user.verificationCodeExpire
    ).getTime();

    if (currentTime > verificationCodeExpire) {
      return next(new ErrorHandler("OTP expired.", 400));
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;

    await user.save({ validateModifiedOnly: true });

    sendToken(user, 200, "Account verified.", res);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal server error.", 500));
  }
});

// ================= LOGIN =================
export const login = catchAsyncErrors(async (req, res, next) => {
  const email = req.body.email?.trim();
  const password = req.body.password;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields.", 400));
  }

 const user = await User.findOne({
  email,
  accountVerified: true,
}).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  sendToken(user, 200, "User login successfully.", res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res.status(200).cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});


export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Email is required", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // 🔥 OTP generate
  const otp = Math.floor(100000 + Math.random() * 900000);

  user.verificationCode = otp;
  user.verificationCodeExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  // 📧 send OTP email
  await sendEmail({
    email: user.email,
    subject: "OTP for Password Reset",
    message: `Your OTP is ${otp}`,
  });

  res.status(200).json({
    success: true,
    message: "OTP sent to your email",
  });
};

export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset password token is invalid or has been expired.", 400

      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("password $ confirm password do not match.", 400)
    );
  }
  if (
    req.body.password.length < 8 ||
    req.body.password.length > 16 ||
    req.body.password.length < 8 ||
    req.body.confirmPassword.length > 16
  ) {
    return next(
      new ErrorHandler("password must be between 8 and 16 characters.", 400)
    );
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, "password reset successfully.", res);
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const { currentpassword, newpassword, confirmPassword } = req.body;

  if (!currentpassword || !newpassword || !confirmPassword) {
    return next(new ErrorHandler("Please enter all fields.", 400));
  }

  const isPasswordMatched = await bcrypt.compare(
    currentpassword,
    user.password
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Current password is incorrect.", 400));
  }

  if (
    newpassword.length < 8 ||
    newpassword.length > 16 ||
    confirmPassword.length < 8 ||
    confirmPassword.length > 16
  ) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters.", 400)
    );
  }

  if (newpassword !== confirmPassword) {
    return next(
      new ErrorHandler("New password and confirm password do not match.", 400)
    );
  }

  const hashedPassword = await bcrypt.hash(newpassword, 10);
  user.password = hashedPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully.",
  });
});