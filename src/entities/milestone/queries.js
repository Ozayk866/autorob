import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMilestones,
  getMilestonesAdmin,
  getMilestoneAdmin,
  createMilestone,
  updateMilestone,
  deleteMilestone,
} from "./api";

export const milestoneKeys = {
  all: ["milestones"],
  list: (lang, filters = {}) => [...milestoneKeys.all, "list", lang, filters],
  adminList: () => [...milestoneKeys.all, "admin", "list"],
  adminDetail: (id) => [...milestoneKeys.all, "admin", "detail", id],
};

// Query options — route loader'larda ham ishlatiladi: queryClient.ensureQueryData(milestonesQuery(lang))
export const milestonesQuery = (lang, filters) => ({
  queryKey: milestoneKeys.list(lang, filters),
  queryFn: () => getMilestones(lang, filters),
});

export const useMilestones = (lang, filters) => useQuery(milestonesQuery(lang, filters));

export const useMilestonesAdmin = () =>
  useQuery({ queryKey: milestoneKeys.adminList(), queryFn: getMilestonesAdmin });
export const useMilestoneAdmin = (id) =>
  useQuery({
    queryKey: milestoneKeys.adminDetail(id),
    queryFn: () => getMilestoneAdmin(id),
    enabled: Boolean(id),
  });

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: milestoneKeys.all });
}

export function useCreateMilestone() {
  return useMutation({ mutationFn: createMilestone, onSuccess: useInvalidate() });
}

export function useUpdateMilestone() {
  return useMutation({
    mutationFn: ({ id, ...body }) => updateMilestone(id, body),
    onSuccess: useInvalidate(),
  });
}

export function useDeleteMilestone() {
  return useMutation({ mutationFn: deleteMilestone, onSuccess: useInvalidate() });
}
