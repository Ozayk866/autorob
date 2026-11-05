import { SectionHeading } from "@/components";
import { stats } from "@/data/company";

// «Missiyamiz»: chapda rasm, o'ngda sarlavha (tayyor) va 2×2 raqamlar
export function AboutMission() {
  // ← shuni map qilasiz: stats.map((stat) => …) — stat.id, stat.value ("120+"), stat.label

  return (
    <section className="about-mission">
      <div className="container">
        {/* chapda rasm: <CoverArt tone="blue" icon="user" /> */}
        <SectionHeading
          eyebrow="Missiyamiz"
          title="Bizneslarni raqamli va avtomatlashgan qilamiz"
          subtitle="Biz kichik qadamdan boshlaymiz: avval CRM bilan mijozlar bilan ishlashni tartiblaymiz, so'ng ERP, robotlar va to'liq stanok liniyalari bilan ishlab chiqarishni avtomatlashtiramiz."
        />
        {/* 2×2 raqamlar */}
      </div>
    </section>
  );
}
