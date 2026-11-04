import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts, getPost, getPostsAdmin, getPostAdmin, createPost, updatePost, deletePost } from "./api";

export const postKeys = {
  all: ["posts"],
  list: (lang, filters = {}) => [...postKeys.all, "list", lang, filters],
  detail: (slug, lang) => [...postKeys.all, "detail", slug, lang],
  adminList: () => [...postKeys.all, "admin", "list"],
  adminDetail: (id) => [...postKeys.all, "admin", "detail", id],
};

// Query options — route loader'larda ham ishlatiladi: queryClient.ensureQueryData(postsQuery(lang))
export const postsQuery = (lang, filters) => ({
  queryKey: postKeys.list(lang, filters),
  queryFn: () => getPosts(lang, filters),
});
export const postQuery = (slug, lang) => ({
  queryKey: postKeys.detail(slug, lang),
  queryFn: () => getPost(slug, lang),
});

export const usePosts = (lang, filters) => useQuery(postsQuery(lang, filters));
export const usePost = (slug, lang) => useQuery(postQuery(slug, lang));

export const usePostsAdmin = () => useQuery({ queryKey: postKeys.adminList(), queryFn: getPostsAdmin });
export const usePostAdmin = (id) =>
  useQuery({ queryKey: postKeys.adminDetail(id), queryFn: () => getPostAdmin(id), enabled: Boolean(id) });

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: postKeys.all });
}

export function useCreatePost() {
  return useMutation({ mutationFn: createPost, onSuccess: useInvalidate() });
}

export function useUpdatePost() {
  return useMutation({ mutationFn: ({ id, ...body }) => updatePost(id, body), onSuccess: useInvalidate() });
}

export function useDeletePost() {
  return useMutation({ mutationFn: deletePost, onSuccess: useInvalidate() });
}
