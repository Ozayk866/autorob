import { useCallback, useMemo, useState } from "react";
import { LeadModalContext } from "./LeadModalContext";
import { LeadModal } from "./LeadModal";

/**
 * SiteLayout ichida turadi. Istalgan joydan:
 *   const { open } = useLeadModal();
 *   open()                                  // oddiy ariza
 *   open(solution.id)                       // «Narxini so'rash» — yechim tanlangan
 *   open(solution.id, { message: "Demo" })  // «Demo ko'rish»
 */
export function LeadModalProvider({ children }) {
  const [state, setState] = useState({ isOpen: false, solutionId: undefined, message: undefined, key: 0 });

  const open = useCallback((solutionId, { message } = {}) => {
    // key — har ochilganda forma toza holatdan boshlanadi
    setState((s) => ({ isOpen: true, solutionId, message, key: s.key + 1 }));
  }, []);
  const close = useCallback(() => setState((s) => ({ ...s, isOpen: false })), []);
  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LeadModalContext value={value}>
      {children}
      <LeadModal
        key={state.key}
        isOpen={state.isOpen}
        solutionId={state.solutionId}
        message={state.message}
        onClose={close}
      />
    </LeadModalContext>
  );
}
