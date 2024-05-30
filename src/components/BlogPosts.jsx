"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LoadingFrame from "./Loading";
import { usePosts1 } from "@/services/queries";

function BlogPosts({ pageIndex }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data, error, isLoading, mutate } = usePosts1(pageIndex);

  useEffect(() => {
    mutate();
  }, [data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredData = data?.data?.filter((post) => {
    const matchesSearch = post.postName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div
        className="bg-white py-4 mt-4 min-w-full min-h-full md:mt-8"
        id="blogs"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <hr />
          <div className="flex justify-between items-center flex-col md:flex-row my-4 gap-4 ">
            <div className="w-full">
              <p className="text-lg text-gray-900 font-bold ">All Blog Posts</p>
            </div>
            <div className="w-full">
              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearch}
                className="border border-gray-300 p-2 rounded w-full focus:outline-none"
              />
            </div>
            <div className="w-full">
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border border-gray-300 p-2 rounded w-full focus:outline-none"
              >
                <option value="">All Categories</option>
                <option value="AI">AI</option>
                <option value="Backend">Backend</option>
                <option value="Frontend">Frontend</option>
                <option value="FullStack">FullStack</option>
              </select>
            </div>
          </div>

          <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-8 border-t border-gray-200 pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3 items-center">
            {isLoading ? (
              <LoadingFrame />
            ) : error ? (
              <p>Error fetching blogs</p>
            ) : !filteredData || filteredData?.length === 0 ? (
              <p className="text-gray-500">No matching blog posts found</p>
            ) : (
              filteredData.map((post, index) => {
                const localDate = new Date(post.date).toLocaleString();
                const postDescription = post.description.slice(0, 150);
                return (
                  <article
                    key={index}
                    className="flex max-w-xl flex-col items-start justify-between shadow-lg px-4"
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
                    <div className="flex items-center gap-x-4 text-xs mt-4">
                      <time className="text-gray-500">{localDate}</time>
                      <span className="relative z-10  rounded-full  px-3 py-1.5 font-medium text-gray-600 bg-blue-50/50">
                        {post.category}
                      </span>
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
