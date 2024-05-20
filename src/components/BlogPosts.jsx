"use client";
import { usePosts } from "@/services/queries";
import Link from "next/link";
import Image from "next/image";
function BlogPosts() {
  const { data, error, isLoading } = usePosts();

  return (
    <>
      <div className="bg-white py-4">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-2 border-t border-gray-200 pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error fetching blogs</p>
            ) : (
              data &&
              data.data.map((post, index) => {
                const localDate = new Date(post.date).toLocaleString();
                const postDescription = post.description.slice(0, 150);
                return (
                  <article
                    key={index}
                    className="flex max-w-xl flex-col items-start justify-between"
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
                    <div className="flex items-center gap-x-4 text-xs">
                      <time className="text-gray-500">{localDate}</time>
                      <a
                        href="#"
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {post.category}
                      </a>
                    </div>
                    <div className="relative mt-4 mb-6 flex items-center gap-x-4">
                      <Image
                        src="/person.jpeg"
                        alt="author"
                        width={96}
                        height={96}
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6">
                        <p className=" text-gray-500">
                          <a href="#">
                            <span className="absolute inset-0" />
                            {post.postCreator}
                          </a>
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default BlogPosts;
