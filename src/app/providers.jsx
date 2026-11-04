import { QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "@/shared/ui";

/**
 * Router'dan tashqaridagi global providerlar (client va prerender umumiy).
 * LocaleProvider va LeadModalProvider router ichida turadi (SiteLayout), chunki til URL'dan olinadi.
 */
export function Providers({ queryClient, children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  );
}
