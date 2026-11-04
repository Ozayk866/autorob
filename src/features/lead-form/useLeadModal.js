import { useContext } from "react";
import { LeadModalContext } from "./LeadModalContext";

/** const { open } = useLeadModal(); <Button onClick={() => open(solution.id)} /> */
export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal: LeadModalProvider topilmadi (SiteLayout ichida ishlating)");
  return ctx;
}
