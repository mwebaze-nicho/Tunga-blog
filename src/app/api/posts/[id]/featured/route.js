import { featurePost } from "@/controllers/postController";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  const { id } = params;

  //getting the query parameters
  const searchParams = req.nextUrl.searchParams;
  const feature = searchParams.get("feature");
  try {
    const response = await featurePost(id, feature);
    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error getting a post",
    });
  }
}
