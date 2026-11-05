import { SectionHeading } from "@/shared/ui";

// «Boshqa yechimlar» — 3 ta karta (katalogdagi kabi)
// ← shuni map qilasiz: related.map((item) => …) — item.title, item.shortDescription, item.coverImage, item.slug
export function SolutionRelated({ related }) {
  return (
    <section className="solution-related">
      <div className="container">
        <SectionHeading eyebrow="Yana" title="Boshqa yechimlar" />
        {/* 3 ta karta */}
      </div>
    </section>
  );
}
