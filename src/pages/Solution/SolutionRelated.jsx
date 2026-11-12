import { SectionHeading } from "@/components";

// «Boshqa yechimlar» — 3 ta karta (katalogdagi kabi)
// ← shuni map qilasiz: related.map((item) => …) — item.title, item.shortDescription, item.coverImage, item.slug
export function SolutionRelated({ related }) {
  return (
    <section className="solution-related">
      <div className="container">
        <SectionHeading className="related-subtitle" eyebrow="Yana" title="Boshqa yechimlar" />
        <ul className="related-list">
        <li className="related-item">
          {/* <img src="" alt="" /> */}
          <button className="related-btn">Ishlab chiqarish</button>
          <button className="related-bt">Servis</button>
          <h4 className="related-title">ERP tizimi</h4>
          <p className="related-text">Ombor, xarid, moliya va ishlab chiqarishni yagona
hisobga bog'lang.</p>
          <button className="related-all">Batafsil</button>
          <button className="related-price">Narxini so'rash</button>
        </li>
        <li className="related-item">
          <button className="related-btn">Ishlab chiqarish</button>
          <h4 className="related-title">Sanoat robotlari</h4>
          <p className="related-text">Takroriy va og'ir operatsiyalarni robotlar bajaradi:
yuklash, saralash, qadoqlash.</p>
          <button className="related-all">Batafsil</button>
          <button className="related-price">Narxini so'rash</button>
        </li>
        <li className="related-item">
          <button className="related-btn">Ishlab chiqarish</button>
          <h4 className="related-title">Stanok liniyalari (CNC)</h4>
          <p className="related-text">To'liq avtomatlashtirilgan ishlab chiqarish liniyasini
loyihalash, o'rnatish va ishga tushirish.</p>
          <button className="related-all">Batafsil</button>
          <button className="related-price">Narxini so'rash</button>
        </li>
        </ul>
      </div>
    </section>
  );
}
