import connectDB from "@/config/mongodb";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

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
