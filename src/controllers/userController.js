import connectDB from "@/config/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { passwordResetToken, verifyResetToken } from "./tokenAuth";
import { headers } from "next/headers";
import { sendEmail } from "@/services/email";

export const registerUser = async (req) => {
  const { username, email, password } = await req.json();

  try {
    await connectDB();

    await User.init();

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //create a new user
    await User.create({
      userName: username,
      userEmail: email,
      userPassword: hashedPassword,
    });
    //send response back after creating user
    return NextResponse.json({
      status: 201,
      message: "Successfully created",
    });
  } catch (error) {
    // return new Error("Error creating user");
    return NextResponse.json({
      status: 500,
      message: error.errmsg || error.message,
    });
  }
};

export const getUser = async () => {
  try {
    await connectDB();
    await User.init();

    const users = await User.find().select("-userPassword");
    //send response back after creating user
    return NextResponse.json({
      status: 200,
      users,
    });
  } catch (error) {
    // return new Error("Error creating user");
    return NextResponse.json({
      status: 500,
      message: error.errmsg || error.message,
    });
  }
};

export const sendPasswordResetEmail = async (req) => {
  const { userName } = await req.json();
  const baseUrl = headers().get("host");
  try {
    await connectDB();

    const user = await User.findOne({ userName });

    if (!user)
      return NextResponse.json({
        status: 404,
        message: "User not found",
      });

    //create token
    const userInfo = {
      userName: user.userName,
      id: user._id,
    };

    const token = await passwordResetToken(userInfo);
    if (!token)
      return NextResponse.json({
        status: 401,
        message: "Not authorized",
      });

    //to be improved later
    const info = await sendEmail(user.userEmail, token, baseUrl);

    if (info)
      return NextResponse.json({
        status: 200,
        message: "Email sent successfully",
      });
    return null;
  } catch (error) {
    // return new Error("Error creating user");
    return NextResponse.json({
      status: 500,
      message: error.errmsg || error.message,
    });
  }
};

export const resetUserPassword = async (req) => {
  const { newPassword } = await req.json();

  if (!newPassword) return null;

  //check token
  const token = await verifyResetToken();
  if (!token)
    return NextResponse.json({
      status: 401,
      message: "Not authorized",
    });

  try {
    await connectDB();

    await User.init();
    const { user } = token;
    const userInfo = await User.findOne({ userName: user.userName }).select(
      "+userPassword"
    );

    //hash the newpassword
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    //change the old password
    userInfo.userPassword = hashedPassword;

    await userInfo.save();
    //send response back after creating user

    return NextResponse.json({
      status: 200,
      message: "Password changed successfully",
      newPassword,
    });
  } catch (error) {
    // return new Error("Error creating user");
    return NextResponse.json({
      status: 500,
      message: error.errmsg || error.message,
    });
  }
};
