import { fetcher } from "@/controllers/fetchers/postsFetcher";
import Comments from "./Comments";
import Image from "next/image";
import CreateComment from "./CreateComment";
import Link from "next/link";
import FeatureButton from "./buttons/FeatureButton";
import EditButton from "./buttons/EditButton";

async function EachPost(props) {
  const res = await fetcher(`/posts/${props.id}`);

  const post = await res.data;

  return (
    <div className="bg-white py-4">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row md:gap-40 md:justify-center">
        <div className="mx-auto mt-2 max-w-2xl  gap-x-8 gap-y-2 border-t border-gray-200 pt-4 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article className="flex max-w-xl flex-col items-start justify-between">
            <div className="group relative">
              <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <span>
                  <span className="absolute inset-0" />
                  {post.postName}
                </span>
              </h3>
              <p className="mt-5 text-sm leading-6 text-gray-600">
                {post.description}
              </p>
            </div>
            <div className="flex items-center gap-x-4 text-xs">
              <time className="text-gray-500">{post.date}</time>
              <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                {post.category}
              </span>
              <EditButton postId={props.id} owner={post.postCreator} />
              <FeatureButton
                owner={post.postCreator}
                feature={post.featured}
                postId={props.id}
              />
              {/* <Link
                href={"#"}
                onClick={handleClick}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
              >
                Feature Post
              </Link> */}
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
                  <span>
                    <span className="absolute inset-0" />
                    {post.postCreator}
                  </span>
                </p>
              </div>
            </div>
          </article>
        </div>
        <span>
          <CreateComment postId={props.id} />
          <Comments comments={post.comments} />
        </span>
      </div>
    </div>
  );
}
export default EachPost;
