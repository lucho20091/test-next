"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AddPostPage() {
  const { data: session } = useSession();
  const userAuthenticated = session?.user;
  const [formData, setFormData] = useState({
    userId: "",
    content: "",
  });

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
  useEffect(() => {
    if (userAuthenticated) {
      setFormData((prev) => ({
        ...prev,
        userId: userAuthenticated._id,
      }));
    }
  }, [userAuthenticated?.username, userAuthenticated?.image]);
  return (
    <div>
      Add Post Page
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          name="content"
          id="content"
          value={formData.content}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
