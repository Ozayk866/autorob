import { api } from "@/shared/api";
import { toQuery } from "@/shared/lib";

/** Dashboard'dagi «so'nggi o'zgarishlar»: { id, adminName, action, entity, entityTitle, createdAt }[] */
export const getRecentChanges = (limit = 10) => api("/api/admin/audit" + toQuery({ limit }));
