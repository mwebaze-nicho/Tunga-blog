import { getUserPosts } from "@/controllers/postController";
import { verifyToken } from "@/controllers/tokenAuth";
import { NextResponse } from "next/server";

export async function GET(req) {
  //getting the userid from the query
  
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("userId");

  if (!query)
    return NextResponse.json({
      message: "No matching userId found",
    });

  try {
    const response = await getUserPosts(query);
    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error occured while getting user posts",
    });
  }
}
