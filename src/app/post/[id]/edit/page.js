"use client";
import EditPost from "@/components/EditPost";
import { useOnePost } from "@/services/queries";

function PostUpdate({ params }) {
  const { id } = params;

  //get post information to be updated
  const { data, error, isLoading } = useOnePost(id);
  isLoading && <p>Loading...</p>;
  error && <p>An error occured in fetching the post.</p>;

  return (
    <div className="w-full flex justify-center items-center min-h-full">
      {data && (
        <EditPost
          title={data.data.postName}
          category={data.data.category}
          id={data.data._id}
          description={data.data.description}
        />
      )}
    </div>
  );
}
export default PostUpdate;
``;
