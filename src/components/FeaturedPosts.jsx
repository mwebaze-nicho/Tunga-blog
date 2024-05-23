"use client";
import { useFeaturedPosts } from "@/services/queries";
import Link from "next/link";
import { useEffect } from "react";

function FeaturedPosts() {
  const { data, mutate } = useFeaturedPosts();
  useEffect(() => {
    mutate();
  }, [data]);
  return (
    <>
      {data && Array.isArray(data.data) && (
        <div className="bg-white py-4">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <hr />
            <p className="text-lg text-gray-900 font-bold">Featured Posts</p>
            <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-2 border-t border-gray-200 pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {data.data.map((post, index) => {
                const postDescription = post.description.slice(0, 150);
                return (
                  <article
                    key={index}
                    className="flex max-w-xl flex-col items-start justify-between shadow-lg p-4"
                  >
                    <Link href={`post/${post._id}`}>
                      <div className="group relative">
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                          <a href="#">
                            <span className="absolute inset-0" />
                            {post.postName}
                          </a>
                        </h3>
                        <p className="mt-5 text-sm leading-6 text-gray-600">
                          {`${postDescription} ...`}
                        </p>
                      </div>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FeaturedPosts;
