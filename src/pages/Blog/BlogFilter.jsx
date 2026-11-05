import { postCategories as categories } from "@/data/posts";

// Filtr: chapda «Hammasi · CRM · ERP · …» tugmalari, o'ngda qidiruv input'i
// Tugma bosilganda: setCategory(c.slug) («Hammasi» — setCategory("")); input: value={search}, onChange → setSearch
export function BlogFilter({ category, setCategory, search, setSearch }) {
  // ← shuni map qilasiz: categories.map((c) => …) — c.id, c.slug, c.name

  return <div className="blog-filter"></div>;
}
