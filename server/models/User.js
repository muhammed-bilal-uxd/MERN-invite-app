import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    organizationName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, trim: true },
    workEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    country: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export default mongoose.model("User", UserSchema);
