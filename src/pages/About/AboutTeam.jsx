import { SectionHeading } from "@/components";
import { team } from "@/data/company";

// «Loyihangiz ustida ishlaydiganlar» — 4 karta: rasm, ism, lavozim
export function AboutTeam() {
  // ← shuni map qilasiz: team.map((member) => …) — member.id, member.name, member.role, member.photo

  return (
    <section className="about-team">
      <div className="container">
        {/* <SectionHeading eyebrow="Jamoa" title="Loyihangiz ustida ishlaydiganlar" /> */}
        {/* 4 ta karta */}
      </div>
    </section>
  );
}
