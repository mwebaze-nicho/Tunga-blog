import { getUser, registerUser } from "@/controllers/userController";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const response = await registerUser(req);
    return NextResponse.json({
      status: 201,
      message: response,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error registering user",
    });
  }
}

export async function GET() {
  try {
    const response = await getUser();
    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error registering user",
    });
  }
}
