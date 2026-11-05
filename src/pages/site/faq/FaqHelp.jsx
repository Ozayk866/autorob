import { useLeadModal } from "@/features/lead-form";

// «Savolingiz qoldimi?» kartasi: ikonka, sarlavha, matn, «Ma'lumot qoldirish →» tugmasi
export function FaqHelp() {
  const { open } = useLeadModal(); // tugma bosilganda: open()

  return <div className="faq-help"></div>;
}
