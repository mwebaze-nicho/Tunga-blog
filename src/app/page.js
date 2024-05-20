import BlogPosts from "@/components/BlogPosts";
import FeaturedPosts from "@/components/FeaturedPosts";

export default async function Home() {
  return (
    <div>
      <h1>Featured Posts</h1>
      <FeaturedPosts />

      <BlogPosts />
    </div>
  );
}
