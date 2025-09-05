import { NextResponse } from "next/server";
import connectDB from "@/libs/database";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { postId } = await params;
    await connectDB();

    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const userId = session.user._id;

    // Check if user has already liked the post
    const likeIndex = post.likes.indexOf(userId);

    if (likeIndex === -1) {
      // User hasn't liked the post yet, so add the like
      post.likes.push(userId);
    } else {
      // User has already liked the post, so remove the like
      post.likes.splice(likeIndex, 1);
    }

    await post.save();

    return NextResponse.json({
      message: likeIndex === -1 ? "liked" : "unliked",
      likes: post.likes.length,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
