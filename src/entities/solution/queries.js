import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSolutions,
  getSolution,
  getSolutionsAdmin,
  getSolutionAdmin,
  createSolution,
  updateSolution,
  deleteSolution,
} from "./api";

export const solutionKeys = {
  all: ["solutions"],
  list: (lang, filters = {}) => [...solutionKeys.all, "list", lang, filters],
  detail: (slug, lang) => [...solutionKeys.all, "detail", slug, lang],
  adminList: () => [...solutionKeys.all, "admin", "list"],
  adminDetail: (id) => [...solutionKeys.all, "admin", "detail", id],
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

export const useSolutions = (lang, filters) => useQuery(solutionsQuery(lang, filters));
export const useSolution = (slug, lang) => useQuery(solutionQuery(slug, lang));

export const useSolutionsAdmin = () =>
  useQuery({ queryKey: solutionKeys.adminList(), queryFn: getSolutionsAdmin });
export const useSolutionAdmin = (id) =>
  useQuery({
    queryKey: solutionKeys.adminDetail(id),
    queryFn: () => getSolutionAdmin(id),
    enabled: Boolean(id),
  });

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: solutionKeys.all });
}

export function useCreateSolution() {
  return useMutation({ mutationFn: createSolution, onSuccess: useInvalidate() });
}

export function useUpdateSolution() {
  return useMutation({
    mutationFn: ({ id, ...body }) => updateSolution(id, body),
    onSuccess: useInvalidate(),
  });
}

export function useDeleteSolution() {
  return useMutation({ mutationFn: deleteSolution, onSuccess: useInvalidate() });
}
