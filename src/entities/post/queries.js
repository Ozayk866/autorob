import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createAdminHooks } from "@/shared/api";
import { getPost, getPosts, postsAdminApi } from "./api";

export const postKeys = {
  all: ["posts"],
  list: (lang, filters = {}) => [...postKeys.all, "list", lang, filters],
  detail: (slug, lang) => [...postKeys.all, "detail", slug, lang],
};

export const postsQuery = (lang, filters) => ({
  queryKey: postKeys.list(lang, filters),
  queryFn: () => getPosts(lang, filters),
  placeholderData: keepPreviousData, // sahifa almashganda eski ro'yxat ko'rinib turadi
});
export const postQuery = (slug, lang) => ({
  queryKey: postKeys.detail(slug, lang),
  queryFn: () => getPost(slug, lang),
});

/** data: { data: PostListItem[], meta: { page, pageSize, total } } */
export const usePosts = (lang, filters) => useQuery(postsQuery(lang, filters));
export const usePost = (slug, lang) => useQuery(postQuery(slug, lang));

export const postAdmin = createAdminHooks(postsAdminApi, postKeys.all);
