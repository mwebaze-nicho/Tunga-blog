"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

function EditButton({ postId, owner }) {
  const { data: session, status } = useSession();

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
    <Link
      href={`/post/${postId}/edit`}
      className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-blue-100"
    >
      Edit
    </Link>
  );
}

export default EditButton;
