import EachPost from "@/components/EachPosts";

export default function Blogs({ params }) {
  const { id } = params;
  return (
    <div>
      <EachPost id={id} />
    </div>
  );
}
