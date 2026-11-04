import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

// Dashboard'dagi «so'nggi o'zgarishlar».
// ⚠️ Backend audit jurnalini yozadi, lekin frontend uchun API HALI YO'Q (kontrakt §10). Qo'shilgach tekshiring.

export const getRecentChanges = (limit = 10) => api("/api/admin/audit" + toQuery({ limit }));

export const auditKeys = { all: ["audit"], recent: (limit) => ["audit", "recent", limit] };

export const useRecentChanges = (limit) =>
  useQuery({ queryKey: auditKeys.recent(limit), queryFn: () => getRecentChanges(limit) });
