"use client";
import { useState } from "react";
import { useAppContext } from "@/context";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated, currentUser, users, setUsers, setCurrentUser } =
    useAppContext();
  const [postContent, setPostContent] = useState("");

  const anotherUsers = currentUser
    ? users.filter((user) => user.id !== currentUser.id)
    : [];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (postContent.trim() && currentUser) {
      const newPost = { id: Date.now(), content: postContent };
      const updatedUser = {
        ...currentUser,
        posts: [...currentUser.posts, newPost],
      };

      const updatedUsers = users.map((user) =>
        user.id === currentUser.id ? updatedUser : user
      );

      setUsers(updatedUsers);
      setCurrentUser(updatedUser);
      setPostContent("");
    }
  };

  return (
    <div className="flex items-start justify-between min-h-screen bg-gray-900 p-4 text-white">
      {isAuthenticated ? (
        <div className="flex-1">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {currentUser?.firstName} {currentUser?.lastName}
            </h1>
            <h2 className="mt-4 text-xl font-semibold">Your Posts:</h2>
            {currentUser?.posts.length === 0 ? (
              <p className="mt-2">No Posts Yet</p>
            ) : (
              <ul className="list-none mt-2">
                {currentUser?.posts.map((post) => (
                  <li className="list-disc ml-5 mt-1" key={post.id}>
                    {post.content}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="text"
              name="add-post"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="Enter your post"
              className="w-full px-3 py-2 border rounded-md bg-gray-800 border-gray-700 text-white"
            />
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Add Post
            </button>
          </form>
          <div className="flex-1 ml-4">
            {anotherUsers.map((user) => (
              <div
                key={user.id}
                className="bg-gray-800 p-4 shadow-md rounded-md mb-4"
              >
                <h2 className="text-lg font-bold">
                  {user.firstName} {user.lastName}
                </h2>
                <ul>
                  {user.posts.length === 0 ? (
                    <li className="list-none">No posts yet</li>
                  ) : (
                    user.posts.map((post) => (
                      <li key={post.id} className="list-disc ml-5 mt-1">
                        {post.content}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">New Heading Text</h1>
            <hr className="my-4 border-gray-700" />
            <p className="text-lg">
              If you want to use my App please{" "}
              <Link href="/signIn">
                <span className="text-blue-500 underline hover:text-blue-700">
                  Sign In
                </span>
              </Link>{" "}
              or if you haven't account please{" "}
              <Link href="/signUp">
                <span className="text-red-500 underline hover:text-red-700">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
