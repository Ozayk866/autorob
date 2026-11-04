import { Seo } from "@/shared/seo";
import { ContactsBlock } from "@/widgets/site/contacts-block";
import { CtaBand } from "@/widgets/site/cta-band";

/** TODO: kontaktlar */
export function ContactsPage() {
  return (
    <>
      <Seo />
      <ContactsBlock />
      <CtaBand />
    </>
  );
}
