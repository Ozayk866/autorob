import { useLeadModal } from "@/components";

// «Savolingiz qoldimi?» kartasi: ikonka, sarlavha, matn, «Ma'lumot qoldirish →» tugmasi
export function FaqHelp() {
  const { open } = useLeadModal(); // tugma bosilganda: open()

 return (
  <div className="container">

  <div className="faq-help">
    <div className="faq-help-icon">♧</div>

    <div className="faq-help-content">
      <h2>Savolingiz qoldimi?</h2>
      <p>
        Ma'lumot qoldiring — mutaxassis 1 ish kuni ichida javob beradi.
      </p>
    </div>

    <button onClick={open}>
      Ma'lumot qoldirish →
    </button>
  </div>
  </div>
);
}
