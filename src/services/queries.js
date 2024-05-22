import useSWR from "swr";

//posts
export function usePosts() {
  return useSWR("/api/posts");
}


export function useFeaturedPosts() {
  return useSWR("/api/posts/featured");
}

export function useOnePost(id) {
  return useSWR(`/api/posts/${id}`);
}
