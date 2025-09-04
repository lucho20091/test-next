import Post from "@/models/Post";
import connectDB from "@/libs/database";

export default async function Posts() {
  async function getPosts() {
    try {
      await connectDB();
      const res = await Post.find();
      const posts = JSON.parse(JSON.stringify(res));
      return posts;
    } catch (e) {
      console.log(e);
    }
  }
  const posts = await getPosts();
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <p>{post.userId} said</p>
            <p>{post.content}</p>
          </div>
        ))}
    </div>
  );
}
