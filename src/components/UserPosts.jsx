"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useUserPosts } from "@/services/queries";

function UserPosts() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated" || !session) {
      setTimeout(() => {
        router.push("/users/login");
      }, 1000);
    }
  }, [status, router]);

  const { data, error, isLoading } = useUserPosts(session?.user?._id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error);
    return <p>Failed to load posts</p>;
  }

  if (!data || data.data?.length === 0) {
    return <p>No previous posts</p>;
  }

  const posts = data.data;

  if (!posts || posts?.length === 0) {
    return <p>No previous posts</p>;
  }

  return (
    <div className="bg-white py-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-2 border-t border-gray-200 pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post, index) => {
            const postDescription = post.description.slice(0, 150);
            return (
              <article
                key={index}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <Link href={`/post/${post._id}`}>
                  <span className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <span className="absolute inset-0" />
                      {post.postName}
                    </h3>
                  </span>

                  <p className="mt-5 text-sm leading-6 text-gray-600">
                    {`${postDescription} ...`}
                  </p>
                  <div className="flex items-center gap-x-4 text-xs">
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      {post.category}
                    </span>
                  </div>
                </Link>
                <div className="relative mt-4 mb-6 flex items-center gap-x-4"></div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserPosts;
