import { fetcher } from "@/controllers/fetchers/postsFetcher";
import Link from "next/link";

async function FeaturedPosts() {
  const res = await fetcher("/posts/featured");

  if (!res || res.data.length === 0) {
    return <p className=" mt-20 ">No featured posts at the moment.</p>;
  }

  const posts = await res.data;

  return (
    <div className="bg-white py-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-2 border-t border-gray-200 pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {Array.isArray(posts) &&
            posts.map((post, index) => {
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
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
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
                </article>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default FeaturedPosts;
