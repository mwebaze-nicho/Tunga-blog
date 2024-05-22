"use client";

import { api } from "@/config/axiosConfig";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DeleteButton({ postId, owner }) {
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/api/posts/${postId}`);
      router.push("/");
    } catch (error) {
      setError("Failed to delete the post");
      console.log("Failed to delete the post", error);
    }
  };

  if (
    status === "unauthenticated" ||
    !session ||
    session.user.userName !== owner
  ) {
    return null;
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-blue-100"
        disabled={loading}
      >
        Delete
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default DeleteButton;
