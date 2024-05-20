import { deletePost, getPost, updatePost } from "@/controllers/postController";
import { NextResponse } from "next/server";

//dealing with a specific project
export async function GET(req, { params }) {
  const { id } = params;
  try {
    const response = await getPost(id);

    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error getting a post",
    });
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  const updatedPost = await req.json();
  try {
    const response = await updatePost(id, updatedPost);

    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error deleting a post",
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const response = await deletePost(id);

    return response;
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Error deleting a post",
    });
  }
}
