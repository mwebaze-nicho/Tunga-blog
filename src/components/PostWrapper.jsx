"use client";
import { useState, useEffect } from "react";
import BlogPosts from "./BlogPosts";
import { usePosts1 } from "@/services/queries";

function PostWrapper() {
  const [pageIndex, setPageIndex] = useState(1);
  const [pages, setPages] = useState(1);

  //fecth posts
  const { data, error, isLoading, mutate } = usePosts1(pageIndex);

  //update state on data change
  useEffect(() => {
    if (data) {
      setPages(data.totalPages);
    }
    mutate();
  }, [data]);

  //return results
  return (
    <div className="posts">
      {/* Returned blogs */}
      <BlogPosts data={data && data.data} isLoading={isLoading} error={error} />
      <div className="inline-flex items-center justify-center gap-8">
        {/* Pagination buttons */}
        <button
          onClick={() => setPageIndex(pageIndex - 1)}
          disabled={pageIndex === 1}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-blue-100 hover:bg-blue-50 text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <p className="text-xs text-gray-900">
          {pageIndex}
          <span className="mx-0.25">/</span>
          {pages}
        </p>

        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          disabled={pageIndex === pages}
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-blue-100 hover:bg-blue-50 text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default PostWrapper;
