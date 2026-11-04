import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, getSettingsAdmin, getTelegramStatus, sendTelegramTest, updateSettings } from "./api";

export const settingsKeys = {
  all: ["settings"],
  public: (lang) => [...settingsKeys.all, "public", lang],
  admin: () => [...settingsKeys.all, "admin"],
  telegram: () => [...settingsKeys.all, "telegram"],
};

export const settingsQuery = (lang) => ({
  queryKey: settingsKeys.public(lang),
  queryFn: () => getSettings(lang),
  staleTime: 10 * 60_000,
});

export const useSettings = (lang) => useQuery(settingsQuery(lang));
export const useSettingsAdmin = () => useQuery({ queryKey: settingsKeys.admin(), queryFn: getSettingsAdmin });
export const useTelegramStatus = () =>
  useQuery({ queryKey: settingsKeys.telegram(), queryFn: getTelegramStatus });

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: () => qc.invalidateQueries({ queryKey: settingsKeys.all }),
  });
}

export const useSendTelegramTest = () => useMutation({ mutationFn: sendTelegramTest });
