import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAdmin, deleteAdmin, getAdmins, getMeOrNull } from "./api";

export const adminKeys = {
  all: ["admins"],
  me: ["admins", "me"],
  list: () => [...adminKeys.all, "list"],
};

// retry: false — server javob bermasa, login sahifasi darhol ko'rinsin
export const meQuery = () => ({
  queryKey: adminKeys.me,
  queryFn: getMeOrNull,
  staleTime: 5 * 60_000,
  retry: false,
});

export const useAdmins = () => useQuery({ queryKey: adminKeys.list(), queryFn: getAdmins });

export function useCreateAdminMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createAdmin,
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.list() }),
  });
}

export function useDeleteAdmin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.list() }),
  });
}
