import { createPost, getPosts } from "@/controllers/postController";
import { verifyToken } from "@/controllers/tokenAuth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await verifyToken();

  if (!user)
    return NextResponse.json({
      message: "No user",
    });

  try {
    const { userId } = user;
    const response = await createPost(req, userId);
    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error creating a post",
    });
  }
}

export async function GET() {
  try {
    const response = await getPosts();
    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error creating a post",
    });
  }
}
