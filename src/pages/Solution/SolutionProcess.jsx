import { SectionHeading } from "@/components";
import { PROCESS } from "./data";

// «Qanday joriy qilamiz» — 4 bosqich: raqamli doira, nom, muddat, matn
// ← shuni map qilasiz: PROCESS.map((item, i) => …) — raqam: i + 1, item.title, item.time, item.text
export function SolutionProcess() {
  return (
    <section className="solution-process">
      <div className="container">
        {/* <SectionHeading eyebrow="Jarayon" title="Qanday joriy qilamiz" /> */}
        {/* 4 bosqich */}
      </div>
    </section>
  );
}
