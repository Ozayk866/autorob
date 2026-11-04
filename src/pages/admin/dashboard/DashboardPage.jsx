import {
  ContentCounters,
  TranslationProgress,
  RecentChanges,
  TelegramStatus,
  QuickActions,
} from "@/widgets/admin/dashboard-overview";

/** TODO: dashboard */
export function DashboardPage() {
  return (
    <>
      <ContentCounters />
      <TranslationProgress />
      <RecentChanges />
      <TelegramStatus />
      <QuickActions />
    </>
  );
}
