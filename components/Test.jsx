"use client";
import { useSession } from "next-auth/react";
export default function Test({ user }) {
  const { data: session } = useSession();
  console.log(user);
  return (
    <div>{session?.user?.username === user ? "hey there" : "bye there"}</div>
  );
}
