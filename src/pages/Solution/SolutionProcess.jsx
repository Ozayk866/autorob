import { SectionHeading } from "@/components";
import { PROCESS } from "./data";

// «Qanday joriy qilamiz» — 4 bosqich: raqamli doira, nom, muddat, matn
// ← shuni map qilasiz: PROCESS.map((item, i) => …) — raqam: i + 1, item.title, item.time, item.text
export function SolutionProcess() {
  return (
    <section className="solution-process">
      <div className="container">
        <SectionHeading className="process-subtitle" eyebrow="Jarayon" title="Qanday joriy qilamiz" />
        <div className="process-cover">
        <span className="process-sp">01</span>
        <span className="process-line"></span>
        <span className="process-spn">02</span>
        <span className="process-line"></span>
        <span className="process-spn">03</span>
        <span className="process-line"></span>
        <span className="process-spn">04</span>
        </div>
        <ol className="process-list">
       {
        PROCESS.map((item)=>{
          return <li className="process-item" key={item.title}>
            <h4 className="process-title">{item.title}</h4>
            <button className="process-time">{item.time}</button>
            <p className="process-text">{item.text}</p>
          </li>
        })
       }

        </ol>
      </div>
    </section>
  );
}
