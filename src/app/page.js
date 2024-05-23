import FeaturedPosts from "@/components/FeaturedPosts";
import LandingPage from "@/components/LandingPage";
import PostWrapper from "@/components/PostWrapper";

export default async function Home() {
  return (
    <div className="min-h-full flex flex-col gap-10">
      <LandingPage />
      <span>
        <FeaturedPosts />
        <PostWrapper/>
      </span>
    </div>
  );
}
