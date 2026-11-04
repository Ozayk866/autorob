import { useQuery } from "@tanstack/react-query";
import { getRecentChanges } from "./api";

export const auditKeys = { all: ["audit"], recent: (limit) => ["audit", "recent", limit] };

export const useRecentChanges = (limit) =>
  useQuery({ queryKey: auditKeys.recent(limit), queryFn: () => getRecentChanges(limit) });
