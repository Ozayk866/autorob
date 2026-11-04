import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminKeys, login } from "@/entities/admin";

/** Muvaffaqiyatli kirishdan keyin GuestOnly o'zi /admin (yoki change-password) ga yo'naltiradi */
export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (me) => qc.setQueryData(adminKeys.me, me),
  });
}
