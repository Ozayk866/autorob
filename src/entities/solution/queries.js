import { useQuery } from "@tanstack/react-query";
import { createAdminHooks } from "@/shared/api";
import { getSolution, getSolutions, solutionsAdminApi } from "./api";

export const solutionKeys = {
  all: ["solutions"],
  list: (lang, filters = {}) => [...solutionKeys.all, "list", lang, filters],
  detail: (slug, lang) => [...solutionKeys.all, "detail", slug, lang],
};

// Query options — route loader'larda ham ishlatiladi: queryClient.ensureQueryData(solutionsQuery(lang))
export const solutionsQuery = (lang, filters) => ({
  queryKey: solutionKeys.list(lang, filters),
  queryFn: () => getSolutions(lang, filters),
});
export const solutionQuery = (slug, lang) => ({
  queryKey: solutionKeys.detail(slug, lang),
  queryFn: () => getSolution(slug, lang),
});

/** @param {{ category?: import("./api").SolutionCategory }} [filters] */
export const useSolutions = (lang, filters) => useQuery(solutionsQuery(lang, filters));
export const useSolution = (slug, lang) => useQuery(solutionQuery(slug, lang));

/** Admin: solutionAdmin.useList(), .useOne(id), .useCreate(), .useUpdate(), .useRemove() */
export const solutionAdmin = createAdminHooks(solutionsAdminApi, solutionKeys.all);
