import EditPost from "@/components/EditPost";
import { fetcher } from "@/controllers/fetchers/postsFetcher";

async function PostUpdate({ params }) {
  const { id } = params;

  //get post information to be updated
  const res = await fetcher(`/posts/${id}`);
  if (!res) {
    return null;
  }
  const post = await res.data;

  const { _id, postName, category, description } = post;

  return (
    <div>
      <EditPost
        title={postName}
        category={category}
        id={_id}
        description={description}
      />
    </div>
  );
}
export default PostUpdate;
``;
