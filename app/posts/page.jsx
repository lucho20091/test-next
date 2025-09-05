import Post from "@/models/Post";
import connectDB from "@/libs/database";
import Addpost from "@/components/Addpost";
import PostClient from "@/components/PostClient";


export default async function Posts() {
  async function getPosts() {
    try {
      await connectDB();
      const res = await Post.find()
        .populate("userId", "username image")
        .populate("likes", "username")
        .populate("comments.userId", "username image content")
        .sort({ createdAt: -1 });
      const posts = JSON.parse(JSON.stringify(res));
      return posts;
    } catch (e) {
      console.log(e);
    }
  }
  const posts = await getPosts();
  console.log(posts);
  return (
    <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* <!-- New Post Form (only visible when signed in) --> */}
      <Addpost />

      {/* <!-- Posts Feed --> */}
      <div className="space-y-6">
        {/* <!-- Post 1 --> */}
        {posts &&
          posts.map((post) => <PostClient key={post._id} post={post} />)}
      </div>
    </main>
  );
}

// <div>
//   {posts &&
//     posts.map((post) => (
//       <div key={post._id}>
//         <p>{post.userId} said</p>
//         <p>{post.content}</p>
//       </div>
//     ))}
// </div>
