import { SectionHeading } from "@/components";
import { team } from "@/data/company";
import  card from "./Image placeholder (mock).svg"

// «Loyihangiz ustida ishlaydiganlar» — 4 karta: rasm, ism, lavozim
export function AboutTeam() {
  // ← shuni map qilasiz: team.map((member) => …) — member.id, member.name, member.role, member.photo

  return (
    <section className="about-team">
      <div className="container">
        <div className="hero1">
           <SectionHeading eyebrow="Jamoa" title="Loyihangiz ustida ishlaydiganlar" />
        </div>
        {/* <SectionHeading eyebrow="Jamoa" title="Loyihangiz ustida ishlaydiganlar" /> */}
        {/* <CoverArt image={member.photo} tone="slate" icon="user" />  */}
        <div className="about-container">
         <img className="about-card" src={card} alt="Card 1" />
        <img className="about-card" src={card} alt="Card 2" />
        <img className="about-card" src={card} alt="Card 3" />
        <img className="about-card" src={card} alt="Card 4" />
        </div>
       <ul className="about">
        {team.map((member) => (
        <li className="item7" key={member.id}>
        <h3 className="item9">{member.name}</h3>
        <p className="item8">{member.role}</p>
        </li>
       ))}
       </ul>
      </div>
    </section>
  );
}
