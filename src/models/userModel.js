import mongoose, { Schema, models } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required."],
      trim: true,
      lowercase: true,
      unique: [true, "User name already exists"],
      index: true,
      minLength: [6, "User name must be at least 6 characters"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      lowercase: true,
      unique: [true, "User email already exists"],
      index: true,
      validate: [validator.isEmail, "Provide a valid email"],
    },
    userPassword: {
      type: String,
      required: [true, "User password is required."],
      trim: true,
      select: false,
    },
  },
  { versionKey: false }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;
