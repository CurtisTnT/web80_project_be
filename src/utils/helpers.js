import crypto from "crypto";

export const generateSecureOTP = (length = 6) => {
  return crypto
    .randomInt(0, Math.pow(10, length))
    .toString()
    .padStart(length, "0");
};
