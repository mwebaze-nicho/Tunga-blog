import { getFeaturedPosts } from "@/controllers/postController";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getFeaturedPosts();
    return NextResponse.json({
      response,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error feating featured posts",
    });
  }
}
