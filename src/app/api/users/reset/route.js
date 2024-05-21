import { resetUserPassword, sendPasswordResetEmail } from "@/controllers/userController";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const response = await sendPasswordResetEmail(req);
    return response;
  } catch (error) {
    return NextResponse.json({
      message: "Couldn't send password reset email",
      ErrorInfo: error,
    });
  }
}

export async function PATCH(req, res) {
  try {
    const response = await resetUserPassword(req);
    return response;
  } catch (error) {
    return NextResponse.json({
      message: "Couldn't reset token",
      ErrorInfo: error,
    });
  }
}
