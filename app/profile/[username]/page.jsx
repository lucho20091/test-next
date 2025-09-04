import connectDB from "@/libs/database";
import User from "@/models/User";
import Image from "next/image";
import Test from "@/components/Test";

export default async function Profile({ params }) {
  const { username } = await params;

  async function fetchUser() {
    try {
      await connectDB();
      const user = await User.findOne({ username }).select("username image");
      return JSON.parse(JSON.stringify(user));
    } catch (error) {
      console.log("Error fetching user:", error);
      return null;
    }
  }

  const user = await fetchUser();

  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <div>
      <h1>Profile Page of {username}</h1>
      <Image src={user.image} width="200" height="200" alt="profile picture" />
      {user && <Test user={user.username} />}
    </div>
  );
}
