"use client";
import React, { useState } from "react";
import Input from "@/components/Input";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignIn = () => {
  const { users, setIsAuthenticated, setCurrentUser } = useAppContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const signInHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      router.push("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="container bg-gray-800 p-8 rounded shadow-md w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white">Sign In</h1>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={signInHandler} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
          />
          <p className="text-center text-gray-400">
            If you have NOT an account:{" "}
            <Link href="/signUp">
              <span className="text-blue-500 hover:underline">Sign Up</span>
            </Link>
          </p>
          <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
