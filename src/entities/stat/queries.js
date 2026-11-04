import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStats, getStatsAdmin, getStatAdmin, createStat, updateStat, deleteStat } from "./api";

export const statKeys = {
  all: ["stats"],
  list: (lang, filters = {}) => [...statKeys.all, "list", lang, filters],
  adminList: () => [...statKeys.all, "admin", "list"],
  adminDetail: (id) => [...statKeys.all, "admin", "detail", id],
};

// Query options — route loader'larda ham ishlatiladi: queryClient.ensureQueryData(statsQuery(lang))
export const statsQuery = (lang, filters) => ({
  queryKey: statKeys.list(lang, filters),
  queryFn: () => getStats(lang, filters),
});

export const useStats = (lang, filters) => useQuery(statsQuery(lang, filters));

export const useStatsAdmin = () => useQuery({ queryKey: statKeys.adminList(), queryFn: getStatsAdmin });
export const useStatAdmin = (id) =>
  useQuery({ queryKey: statKeys.adminDetail(id), queryFn: () => getStatAdmin(id), enabled: Boolean(id) });

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: statKeys.all });
}

export function useCreateStat() {
  return useMutation({ mutationFn: createStat, onSuccess: useInvalidate() });
}

export function useUpdateStat() {
  return useMutation({ mutationFn: ({ id, ...body }) => updateStat(id, body), onSuccess: useInvalidate() });
}

export function useDeleteStat() {
  return useMutation({ mutationFn: deleteStat, onSuccess: useInvalidate() });
}
