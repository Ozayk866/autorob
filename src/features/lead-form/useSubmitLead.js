import { useMutation } from "@tanstack/react-query";
import { api, ApiError } from "@/shared/api";
import { track } from "@/shared/lib";

/** Ariza backend orqali Telegram botga ketadi. Frontendda saqlanmaydi va log qilinmaydi. */
export const submitLead = (lead) => api("/api/public/leads", { method: "POST", body: lead });

export function useSubmitLead() {
  return useMutation({
    mutationFn: submitLead,
    onSuccess: () => track("lead_submitted"),
  });
}

/** 429 → «juda ko'p urinish», qolgani (502, tarmoq) → «yuborilmadi, qo'ng'iroq qiling» */
export const leadErrorKey = (error) =>
  error instanceof ApiError && error.status === 429 ? "lead.errors.tooMany" : "lead.errors.failed";
