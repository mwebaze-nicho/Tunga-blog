import useSWR from "swr";

//posts
export function usePosts() {
  return useSWR("/api/posts");
}

export function usePosts1(pageIndex) {
  return useSWR(`/api/posts?page=${pageIndex}&limit=6`);
}

export function useFeaturedPosts() {
  return useSWR("/api/posts/featured");
}

export function useOnePost(id) {
  return useSWR(`/api/posts/${id}`);
}

export function useUserPosts(userId) {
  return useSWR(`/api/posts/userposts?userId=${userId}`);
}
