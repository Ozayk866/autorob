import { SectionHeading } from "@/components";  
import { PROBLEMS } from "./data";

// «Qaysi muammolarni hal qiladi» — 3 ta karta
// ← shuni map qilasiz: PROBLEMS.map((item) => …) — item.icon, item.title, item.text (key={item.title})
export function SolutionProblems() {
  return (
    <section className="solution-problems">
      <div className="container">
        <SectionHeading className="problems-subtitle" eyebrow="Muammo" title="Qaysi muammolarni hal qiladi" />
      <ul className="problems-list">
        {
          PROBLEMS.map((item)=>{
            return <li className="problems-item" key={item.title}>
              <img src={item.icon} alt="" />
              <h4 className="problems-title">{item.title}</h4>
              <p className="problems-text">{item.text}</p>
            </li>
          })
        }
      </ul>
      </div>
    </section>
  );
}
