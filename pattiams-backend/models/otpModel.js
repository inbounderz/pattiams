import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
  {
    email: { type: String },
    otp: { type: String },
    expiresIn: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Otp = mongoose.model('Otp', otpSchema);

export default Otp;
