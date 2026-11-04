import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { adminKeys, meQuery } from "@/entities/admin";

/** Joriy admin (yoki null). API 401 qaytarsa (`auth:unauthorized`), sessiya darhol tozalanadi. */
export function useMe() {
  const qc = useQueryClient();

  useEffect(() => {
    const onUnauthorized = () => qc.setQueryData(adminKeys.me, null);
    window.addEventListener("auth:unauthorized", onUnauthorized);
    return () => window.removeEventListener("auth:unauthorized", onUnauthorized);
  }, [qc]);

  return useQuery(meQuery());
}
