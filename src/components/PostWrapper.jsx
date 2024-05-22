"use client";
import { useState } from "react";
import BlogPosts from "./BlogPosts";

function PostWrapper() {
  const [pageIndex, setPageIndex] = useState(1);
  return (
    <div>
      <BlogPosts />
      <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
      <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
    </div>
  );
}
export default PostWrapper;
