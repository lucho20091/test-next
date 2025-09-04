import { NextResponse } from "next/server";
import connectDB from "@/libs/database";
import Post from "@/models/Post";

export async function POST(request) {
  try {
    const { userId, content } = await request.json();
    await connectDB();
    const newPost = new Post({ userId, content });
    await newPost.save();
    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const posts = await Post.find()
      .populate("userId", "username image")
      .sort({ createdAt: -1 });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
