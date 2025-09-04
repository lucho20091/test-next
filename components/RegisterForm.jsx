"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function SignupForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Please provide both username and password");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }
      toast.success(data.message || "Registration successful!");
      setFormData({ username: "", password: "" });
      router.push("/login");
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grow grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-6 md:p-12 rounded-lg shadow-2xl w-[90%] max-w-md border-2 border-gray-300"
      >
        <h1 className="text-2xl font-bold text-center hover:text-violet-400 transition-colors select-none">
          Sign Up
        </h1>
        <div className="flex flex-col">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700 hover:text-violet-400 transition-colors select-none"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="rounded-md p-2 bg-violet-100 focus:outline-violet-400"
            autoComplete="username"
            required
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 hover:text-violet-400 transition-colors select-none"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-md p-2 bg-violet-100 focus:outline-violet-400"
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          className="rounded-md p-2 bg-violet-950 text-white cursor-pointer hover:bg-violet-950/80 transition-colors"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
        <div className="flex justify-center items-center gap-2">
          <p className="text-gray-500">Already have an account?</p>
          <Link href="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
