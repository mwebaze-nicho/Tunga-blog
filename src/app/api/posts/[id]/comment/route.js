import { createComment } from "@/controllers/commentController";
import { verifyToken } from "@/controllers/tokenAuth";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const user = await verifyToken();

  if (!user)
    return NextResponse.json({
      message: "No user",
    });

  try {
    const { username } = user;
    const { id } = params;

    const response = await createComment(req, id, username);
    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error creating a comment",
    });
  }
}
