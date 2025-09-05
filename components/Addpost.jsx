"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function Addpost() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    userId: "",
    content: "",
  });
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        userId: session?.user?._id,
      }));
    }
  }, [session?.user?._id]);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.status === 400) {
        toast.error("error");
        return;
      }
      if (response.status === 500) {
        toast.error("error");
        return;
      }
      setFormData((prev) => ({ ...prev, content: "" }));
      console.log(response);
      toast.success("post created successfully");
    } catch (error) {
      toast.error("Error creating post");
    }
  }
  if (!session?.user) {
    return null;
  }
  return (
    <div
      id="new-post-form"
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
    >
      <form className="flex items-start space-x-3" onSubmit={handleSubmit}>
        <img
          src={session?.user?.image}
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            placeholder="What's happening?"
            className="w-full p-3 text-lg placeholder-gray-500 border-none resize-none focus:outline-none focus:ring-0"
            rows="3"
            name="content"
            id="content"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            {/* <div className="flex items-center space-x-4 text-primary">
              <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button className="hover:bg-blue-50 p-2 rounded-full transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div> */}
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
