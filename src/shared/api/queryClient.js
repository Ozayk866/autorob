import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "./errors";

// 4xx xatolarda qayta urinish foydasiz
const retry = (count, error) =>
  !(error instanceof ApiError && error.status >= 400 && error.status < 500) && count < 2;

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60_000, retry, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  });
