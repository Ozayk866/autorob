import { useId } from "react";
import { useT } from "@/i18n";
import { Modal } from "@/components/Modal/Modal";
import { LeadForm } from "./LeadForm";

/**
 * «Ma'lumot qoldirish» modali (dizayn: AUTOROB_10 — bo'sh, xato, yuborilmoqda, muvaffaqiyatli).
 * @param {{ isOpen: boolean, solutionId?: string, message?: string, onClose: () => void }} props
 */
export function LeadModal({ isOpen, solutionId, message, onClose }) {
  const t = useT();
  const titleId = useId();

  return (
    <Modal isOpen={isOpen} onClose={onClose} labelledBy={titleId} closeLabel={t("common.close")}>
      <LeadForm
        variant="modal"
        titleId={titleId}
        title={t("lead.title")}
        subtitle={t("lead.subtitle")}
        solutionId={solutionId}
        defaultMessage={message}
        onClose={onClose}
      />
    </Modal>
  );
}
