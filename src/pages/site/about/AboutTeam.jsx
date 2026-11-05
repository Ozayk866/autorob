import { SectionHeading } from "@/shared/ui";
import { useTeam } from "@/entities/team-member";
import { useLocale } from "@/shared/i18n";

// «Loyihangiz ustida ishlaydiganlar» — 4 karta: rasm, ism, lavozim
export function AboutTeam() {
  const lang = useLocale();
  const { data: team = [] } = useTeam(lang); // ← shuni map qilasiz: member.name, member.role, member.photo

  return (
    <section className="about-team">
      <div className="container">
        <SectionHeading eyebrow="Jamoa" title="Loyihangiz ustida ishlaydiganlar" />
        {/* 4 ta karta */}
      </div>
    </section>
  );
}
