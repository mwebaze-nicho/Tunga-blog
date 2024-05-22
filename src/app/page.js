import BlogPosts from "@/components/BlogPosts";
import FeaturedPosts from "@/components/FeaturedPosts";
import LandingPage from "@/components/LandingPage";
// import SwrCompo from "@/components/BlogPosts";

export default async function Home() {
  return (
    <div className="min-h-full flex flex-col gap-10">
      <LandingPage />
      <span>
        <FeaturedPosts />
        <BlogPosts />
      </span>
    </div>
  );
}
