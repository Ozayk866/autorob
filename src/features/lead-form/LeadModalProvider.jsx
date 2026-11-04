import { useCallback, useMemo, useState } from "react";
import { track } from "@/shared/lib";
import { LeadModalContext } from "./LeadModalContext";
import { LeadModal } from "./LeadModal";

/** SiteLayout ichida turadi: istalgan joydan useLeadModal().open(solutionId) bilan ochiladi */
export function LeadModalProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, solutionId: undefined });

  const open = useCallback((solutionId) => {
    setState({ isOpen: true, solutionId });
    track("lead_modal_opened");
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LeadModalContext value={value}>
      {children}
      <LeadModal isOpen={state.isOpen} solutionId={state.solutionId} onClose={close} />
    </LeadModalContext>
  );
}
