"use client";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function navbar() {
  const { data: session } = useSession();
  const userAuthenticated = session?.user ? true : false;
  console.log(session);
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      {userAuthenticated && <button onClick={() => signOut()}>Sign Out</button>}
    </nav>
  );
}
