import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTeamMembers,
  getTeamMembersAdmin,
  getTeamMemberAdmin,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "./api";

export const teamMemberKeys = {
  all: ["team"],
  list: (lang, filters = {}) => [...teamMemberKeys.all, "list", lang, filters],
  adminList: () => [...teamMemberKeys.all, "admin", "list"],
  adminDetail: (id) => [...teamMemberKeys.all, "admin", "detail", id],
};

// Query options — route loader'larda ham ishlatiladi: queryClient.ensureQueryData(teamMembersQuery(lang))
export const teamMembersQuery = (lang, filters) => ({
  queryKey: teamMemberKeys.list(lang, filters),
  queryFn: () => getTeamMembers(lang, filters),
});

export const useTeamMembers = (lang, filters) => useQuery(teamMembersQuery(lang, filters));

export const useTeamMembersAdmin = () =>
  useQuery({ queryKey: teamMemberKeys.adminList(), queryFn: getTeamMembersAdmin });
export const useTeamMemberAdmin = (id) =>
  useQuery({
    queryKey: teamMemberKeys.adminDetail(id),
    queryFn: () => getTeamMemberAdmin(id),
    enabled: Boolean(id),
  });

function useInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: teamMemberKeys.all });
}

export function useCreateTeamMember() {
  return useMutation({ mutationFn: createTeamMember, onSuccess: useInvalidate() });
}

export function useUpdateTeamMember() {
  return useMutation({
    mutationFn: ({ id, ...body }) => updateTeamMember(id, body),
    onSuccess: useInvalidate(),
  });
}

export function useDeleteTeamMember() {
  return useMutation({ mutationFn: deleteTeamMember, onSuccess: useInvalidate() });
}
