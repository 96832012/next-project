"use client";
import { useAppContext } from "@/context";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const EditUser = () => {
  const { currentUser, setUsers, users, setCurrentUser } = useAppContext();
  const router = useRouter();

  const [firstName, setFirstName] = useState(currentUser?.firstName || "");
  const [lastName, setLastName] = useState(currentUser?.lastName || "");
  const [password, setPassword] = useState(currentUser?.password || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) return;

    const updatedUser = {
      ...currentUser,
      firstName,
      lastName,
      password,
    };

    const updatedUsers = users.map((user) =>
      user.id === currentUser.id ? updatedUser : user
    );

    setUsers(updatedUsers);
    setCurrentUser(updatedUser);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          Edit User
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Submit Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
