"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function PostClient({ post }) {
  const { data: session } = useSession();
  const [isRed, setIsRed] = useState(null);
  const [changed, setChanged] = useState(false);

  console.log(post);
  console.log("isRed", isRed);
  useEffect(() => {
    if (post.likes.some((like) => like._id === session?.user?._id)) {
      setIsRed(true);
      setChanged(false);
    }
  }, [post.likes, session?.user?._id]);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/posts/like/${post._id}`, {
        method: "PUT",
      });
      const data = await response.json();
      if (data.message == "liked") {
        setIsRed(true);
        setChanged(true);
      } else {
        setIsRed(false);
        setChanged(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <article
      key={post._id}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-3">
        <Link href={`/profile/${post.userId?.username}`}>
          <img
            src={post.userId?.image || "/default-avatar.png"}
            alt="Sarah Wilson"
            className="w-12 h-12 rounded-full object-cover"
          />
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Link
              href={`/profile/${post.userId?.username}`}
              className="flex items-center space-x-2"
            >
              <h3 className="font-semibold text-gray-900">
                {post.userId.username}
              </h3>
            </Link>
            <span className="text-gray-400 text-sm">·</span>
            <time className="text-gray-400 text-sm">{post.createdAt}</time>
          </div>
          <p className="mt-2 text-gray-800 text-base leading-relaxed">
            {post.content}
          </p>
          <div className="mt-4 flex items-center justify-between max-w-md">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
              <div className="p-2 rounded-full group-hover:bg-blue-50">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <span className="text-sm">{post.comments.length}</span>
            </button>

            <button
              onClick={handleLike}
              className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors group disabled:opacity-50"
            >
              <div className="p-2 rounded-full group-hover:bg-red-50">
                <svg
                  className="w-5 h-5 transition-colors duration-150"
                  fill={isRed ? "red" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <span className="text-sm">
                {isRed || (!isRed && !changed)
                  ? post.likes.length
                  : post.likes.length - 1}
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// si red no es true y el array esta vacio = -1 // este es el problema, si red no es true y no ha sido cambiado entonces que sea length
// si red no es true y el array no esta vacio = -1
// si red es true y el array esta vacio = 0 // no puede ser xq si red es true significa que yo estoy en el array
// si red es true y el array no esta vacio = length
