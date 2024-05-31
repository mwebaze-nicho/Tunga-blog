import connectDB from "@/config/mongodb";
import { NextResponse } from "next/server";
import Post from "@/models/postModel";
import User from "@/models/userModel";

//Retrieving all saved blog posts
export const getPosts = async (page, limit) => {
  const pageIndex = parseInt(page);
  const limitIndex = parseInt(limit);
  const skip = (pageIndex - 1) * limitIndex;
  try {
    await connectDB();

    const posts = await Post.find()
      .select("-comments")
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitIndex)
      .exec();

    //total posts in the database
    const totalPosts = await Post.countDocuments().exec();

    const postsList = [];
    for (const post of posts) {
      const user = await User.findById(post.postCreator);

      if (user) {
        const updatedPost = {
          ...post.toObject(),
          postCreator: user.userName,
        };
        postsList.push(updatedPost);
      }
    }

    if (postsList.length === 0)
      return NextResponse.json({
        status: 404,
        message: "No posts found.",
      });

    return NextResponse.json({
      status: 200,
      data: postsList,
      totalPages: Math.ceil(totalPosts / limitIndex),
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
};

//targetting user specific posts

export const createPost = async (req, userId) => {
  const { postName, category, description, postImage } = await req.json();

  try {
    await connectDB();

    //create a new post
    await Post.create({
      postCreator: userId,
      postName,
      category,
      description,
      postImage,
    });

    //send response back after creating a post
    return NextResponse.json({
      status: 201,
      message: "Post successfully created",
    });
  } catch (error) {
    // return new Error("Error creating post");
    return NextResponse.json({
      status: 500,
      message: error.errmsg || error.message,
    });
  }
};
export const getPost = async (id) => {
  try {
    await connectDB();

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json({
        status: 404,
        message: "No matching post found.",
      });
    }

    const user = await User.findById(post.postCreator);

    let postObject = post.toObject();
    if (user) {
      //return username and formated post date
      postObject.postCreator = user.userName;
      postObject.date = new Date(postObject.date).toLocaleString();

      //format comments date
      postObject.comments = postObject.comments.map((comment) => ({
        ...comment,
        date: new Date(comment.date).toLocaleString(),
      }));
    }

    return NextResponse.json({
      status: 200,
      data: postObject,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
};

export const updatePost = async (id, updatedPost) => {
  try {
    await connectDB();

    if (!updatedPost)
      return NextResponse.json({
        status: 400,
        message: "No update information provided.",
      });

    const post = await Post.findByIdAndUpdate(id, updatedPost);

    if (!post)
      return NextResponse.json({
        status: 404,
        message: "No matching post found.",
      });
    //send response back after creating a post
    return NextResponse.json({
      status: 200,
      message: "Post successfully updated.",
    });
  } catch (error) {
    // return new Error("Error creating post");
    return NextResponse.json({
      status: 500,
      message: error.errmsg || error.message,
    });
  }
};

export const deletePost = async (id) => {
  try {
    await connectDB();

    const post = await Post.findByIdAndDelete(id);

    if (!post)
      return NextResponse.json({
        status: 404,
        message: "No matching post found.",
      });
    //send response back after creating a post
    return NextResponse.json({
      status: 200,
      message: "Post successfully deleted",
    });
  } catch (error) {
    // return new Error("Error creating post");
    return NextResponse.json({
      status: 500,
      message: error.errmsg || error.message,
    });
  }
};

//dealing with featured posts
export const featurePost = async (id, feature) => {
  try {
    if (!feature)
      return NextResponse.json({
        status: 400,
        message: "Nothing to feature here.",
      });
    await connectDB();

    const post = await Post.findByIdAndUpdate(id, { featured: feature });

    if (!post)
      return NextResponse.json({
        status: 404,
        message: "No matching post found.",
      });

    return NextResponse.json({
      status: 200,
      message: "Successfully featured.",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.errmsg || error.message,
    });
  }
};

export const getFeaturedPosts = async () => {
  try {
    await connectDB();

    const posts = await Post.find({ featured: true }).select([
      "-comments",
      "-featured",
    ]);

    if (!posts)
      return NextResponse.json({
        status: 404,
        message: "No matching post found.",
      });

    const postsList = [];
    for (const post of posts) {
      const user = await User.findById(post.postCreator);

      if (user) {
        const updatedPost = {
          ...post.toObject(),
          postCreator: user.userName,
        };
        postsList.push(updatedPost);
      }
    }

    if (postsList.length === 0)
      return NextResponse.json({
        status: 404,
        message: "No posts found",
      });

    return NextResponse.json({
      data: postsList,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.errmsg || error.message,
    });
  }
};

// Posts that match a specific user

export const getUserPosts = async (userId) => {
  try {
    await connectDB();

    const posts = await Post.find({ postCreator: userId }).select([
      "-comments",
      "-date",
      "-postCreator",
    ]);

    if (!posts) {
      return NextResponse.json({
        status: 404,
        message: "No matching post found.",
      });
    }

    return NextResponse.json({
      data: posts,
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }
};
