export const generateVerificationCodeOtpEmailTemplate = (otp) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      
      <h2 style="color: #333; text-align: center;">
        Verify Your Email Address
      </h2>

      <p style="font-size: 16px; color: #555; text-align: center;">
        Thank you for registering. Please use the following OTP to verify your account:
      </p>

      <div style="text-align: center; margin: 20px 0;">
        <span style="
          display: inline-block;
          font-size: 28px;
          font-weight: bold;
          color: #000;
          background: #f2f2f2;
          padding: 15px 25px;
          border-radius: 8px;
          letter-spacing: 5px;
        ">
          ${otp}
        </span>
      </div>

      <p style="font-size: 14px; color: #777; text-align: center;">
        This code is valid for 15 minutes. Please do not share this code with anyone.
      </p>

      <hr style="margin: 20px 0;" />

      <p style="font-size: 12px; color: #aaa; text-align: center;">
        This is an automated message. Please do not reply.
      </p>

      <p style="font-size: 14px; text-align: center;">
        Thank you ❤️ <br/>
        <b>Bookworm Team</b>
      </p>

    </div>
  `;
};

export const generateForgotPasswordEmailTemplate = (resetUrl) => {
  return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #000; color: #fff; border-radius: 8px;">

    <h2 style="text-align: center;">Reset Your Password</h2>

    <p>Dear User,</p>

    <p>
      You requested to reset your password. Click the button below to proceed.
    </p>

    <div style="text-align: center; margin: 25px 0;">
      <a href="${resetUrl}" 
         style="background-color: #fff; color: #000; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
        Reset Password
      </a>
    </div>

    <p>If you did not request this, please ignore this email.</p>

    <p>
      The link will expire in <b>15 minutes</b>.
    </p>

    <footer style="margin-top: 20px; text-align: center; font-size: 14px; color: #aaa;">
      <p>Thank you,<br/>Bookworm Team</p>
      <p style="font-size: 12px;">
        This is an automated message. Please do not reply.
      </p>
    </footer>
    <p>If button not working, copy this link:</p>
<p>${resetUrl}</p>
  </div>
  
  `;
};