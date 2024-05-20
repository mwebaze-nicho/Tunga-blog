import connectDB from "@/config/mongodb";
import { NextResponse } from "next/server";
import Post from "@/models/postModel";

//creating a new comment
export const createComment = async (req, id, username) => {
  const { comment } = await req.json();

  try {
    await connectDB();

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({
        status: 404,
        message: "Post not found",
      });
    }

    const newComment = {
      commentor: username,
      comment: comment,
    };

    post.comments.push(newComment);

    // Save the updated post
    await post.save();

    return NextResponse.json({
      status: 201,
      message: "Comment successfully added",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.errmsg || error.message,
    });
  }
};
