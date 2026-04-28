import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // ✅ best for now
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD, // app password


      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html: message,
    });

    console.log("USER:", process.env.SMTP_MAIL);
    console.log("PASS:", process.env.SMTP_PASSWORD);

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};