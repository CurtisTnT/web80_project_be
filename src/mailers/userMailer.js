import { sendMail } from "./mailer.js";

export const sendOtpEmail = async (values) => {
  const { email, otp } = values;
  const mailOptions = {
    from: "tintnfx15667@funix.edu.vn",
    to: email,
    subject: "OTP for reset password",
    text: "Please use this OTP to reset your password: " + otp,
    html: `<p>Please use this OTP to reset your password: <h2><strong>${otp}</strong></h2></p>`,
  };

  await sendMail(mailOptions);
};
