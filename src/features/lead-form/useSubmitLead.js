import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { api, ApiError } from "@/shared/api";
import { useLocale } from "@/shared/i18n";
import { getUtm, track } from "@/shared/lib";
import { buildLeadPayload } from "./schema";

/**
 * Ariza backend orqali Telegram guruhga ketadi (bazaga yozilmaydi). Frontendda saqlanmaydi va log qilinmaydi.
 * 201 → { received: true }. Xatolar: 400 VALIDATION_ERROR (details[].path: "name" | "phone"), 429 TOO_MANY_REQUESTS.
 */
export const submitLead = (payload) => api("/api/public/leads", { method: "POST", body: payload });

/**
 * Forma komponentida chaqiriladi — formStartedAt shu hook birinchi marta render bo'lgan vaqt.
 *   const submit = useSubmitLead();
 *   submit.mutate(values)   // values — leadSchema natijasi
 */
export function useSubmitLead() {
  const [formStartedAt] = useState(() => Date.now());
  const { pathname } = useLocation();
  const locale = useLocale();

  return useMutation({
    mutationFn: (values) =>
      submitLead(buildLeadPayload(values, { formStartedAt, pagePath: pathname, locale, utm: getUtm() })),
    onSuccess: () => track("lead_submitted"),
  });
}

/** Maydonga bog'lanmagan xato uchun matn kaliti: 429 → «juda ko'p urinish», qolgani → «yuborilmadi, qo'ng'iroq qiling» */
export const leadErrorKey = (error) =>
  error instanceof ApiError && error.status === 429 ? "lead.errors.tooMany" : "lead.errors.failed";
