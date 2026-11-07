import { CoverArt, SectionHeading } from "@/components";
import { stats } from "@/data/company";


// «Missiyamiz»: chapda rasm, o'ngda sarlavha (tayyor) va 2×2 raqamlar
export function AboutMission() {
  // ← shuni map qilasiz: stats.map((stat) => …) — stat.id, stat.value ("120+"), stat.label

  return (
    <section className="about-mission">
      <div className="container"> 
        <div className="wrapper">
           <CoverArt tone="blue" icon="user" className="userphoto"/>
           <div className="item">
       <SectionHeading eyebrow="MISSIYAMIZ" title="Bizneslarni raqamli va avtomatlashgan" subtitle="Biz kichik qadamdan boshlaymiz: avval CRM bilan mijozlar bilan ishlashni tartiblaymiz, so'ng ERP, robotlar va to'liq stanok liniyalari bilan ishlab chiqarishni avtomatlashtiramiz."/>
       {
        <ul className="about-stats">
          {stats.map((stat) => (
          <li className="item1" key={stat.id}>
          <strong className="item2">{stat.value}</strong>
          <span className="item3">{stat.label}</span>
        </li>
          ))}
         </ul>

       }
        </div>
        </div>
      </div>
    </section>
  );
}
