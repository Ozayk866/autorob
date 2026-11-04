import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPageTexts, getPageTextsAdmin, updatePageTexts } from "./api";

export const pageContentKeys = {
  all: ["page-texts"],
  page: (page, lang) => [...pageContentKeys.all, page, lang],
  admin: (page) => [...pageContentKeys.all, "admin", page],
};

export const pageTextsQuery = (page, lang) => ({
  queryKey: pageContentKeys.page(page, lang),
  queryFn: () => getPageTexts(page, lang),
  staleTime: 10 * 60_000,
});

export const usePageTextsAdmin = (page) =>
  useQuery({ queryKey: pageContentKeys.admin(page), queryFn: () => getPageTextsAdmin(page) });

export function useUpdatePageTexts() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ page, ...body }) => updatePageTexts(page, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: pageContentKeys.all }),
  });
}
