// Chapda bo'limlar ro'yxati: tanlangani och ko'k fonda
// ← shuni map qilasiz: categories.map((c, i) => …) — c.id, c.name; bosilganda setActive(i), tanlangani: i === active
export function FaqCategories({ categories, active, setActive }) {
  return <nav className="faq-categories">
    {categories.map((c, i) => (
  <button
    key={c.id}
    className={`faq-category ${i === active ? "active" : ""}`}
    onClick={() => setActive(i)}
  >
    {c.name}
  </button>
))}
  </nav>;
}
