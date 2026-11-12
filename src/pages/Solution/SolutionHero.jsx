import { useLeadModal } from "@/components";
import picture from '../../../public/heropic.svg'
import { HERO_STATS } from "./data";

// Hero (qorong'i fon): nom, tavsif, «Narxini so'rash», «Demo ko'rish», 3 ta raqam, o'ngda rasm
// solution.title, solution.shortDescription, solution.categories, solution.coverImage, solution.id
// ← shuni map qilasiz: HERO_STATS.map((stat) => …) — stat.value ("2–4 hafta"), stat.label (key={stat.label})
export function SolutionHero({ solution }) {
  const { open } = useLeadModal(); // «Narxini so'rash»: open(solution.id), «Demo ko'rish»: open(solution.id, { message: "Demo" })

  return (
    <section className="solution-hero">
      <div className="container">
        <div className="hero-wrapper">
          <div className="hero-right">
        <div className="hero-cover">
        <span className="hero-spn">Bosh sahifa ></span>
        <span className="hero-spn">Yechimlar ></span>
        <span className="hero-sp  ">CRM tizimi</span>
        </div>
        <div className="hero-tags">
          <button className="hero-btns">Servis</button>
          <button className="hero-btns">Ta'lim</button>
        </div>
        <h1 className="hero-subtitle">CRM tizimi</h1>
        <p className="hero-subtext">Arizalar, mijozlar va sotuv jarayonini bitta tizimda boshqaring.
          <br />
Hech bir qo'ng'iroq va Telegram xabari yo'qolmaydi.</p>
       <div className="buttons">
        <button className="hero-first">Narxini so'rash</button>
        <button className="hero-second">Demo ko'rish</button>
       </div>
       <ul className="hero-list">
        <li className="hero-item">
          <h4 className="hero-title">2–4 hafta</h4>
          <p className="hero-text">joriy etish muddati</p>
        </li>
        <li className="hero-item">
          <h4 className="hero-title">50+</h4>
          <p className="hero-text">CRM loyihalar</p>
        </li>
        <li className="hero-itme">
          <h4 className="hero-title">24/7</h4>
          <p className="hero-text">qo'llab-quvvatlash</p>
        </li>
       </ul>
        </div>
        <div className="hero-left">
          <img className="hero-pic" src={picture} alt="" />
        </div>
       </div>
      </div>
    </section>
  );
}
