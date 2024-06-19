"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const { users, setUsers } = useAppContext();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const getNextId = () => {
    const maxId = users.reduce(
      (max, user) => (user.id > max ? user.id : max),
      0
    );
    return maxId + 1;
  };

  const [id, setId] = useState(getNextId);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const { firstName, lastName, email, password } = formData;
    const newUser = { firstName, lastName, email, password, id, posts: [] };
    setUsers([...users, newUser]);
    setId(getNextId);
    router.push("/signIn");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="container bg-gray-800 p-8 rounded shadow-md w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Sign Up</h1>
          <p className="text-gray-400">It's free and takes a minute</p>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <p className="text-center text-gray-400">
            If you have an account:{" "}
            <Link href="/signIn">
              <span className="text-blue-500 hover:underline">Sign In</span>
            </Link>
          </p>
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
