import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "@/entities/admin";
import { routes } from "@/shared/config";

export function useLogout() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      qc.clear();
      navigate(routes.admin.login, { replace: true });
    },
  });
}
