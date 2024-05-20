"use client";

import { api } from "@/config/axiosConfig";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function FeatureButton({ postId, feature, owner }) {
  const [newFeature, setNewFeature] = useState(feature);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      setNewFeature((prevFeature) => !prevFeature);
      await api.patch(`/posts/${postId}/featured?feature=${!newFeature}`);
      router.refresh();
    } catch (error) {
      setError("Failed to update feature status");
      console.log("Failed to feature post", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return null;
  }

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
        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        disabled={loading}
      >
        {newFeature ? "Unfeature Post" : "Feature Post"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default FeatureButton;
