import { usePostCategories } from "@/entities/post-category";
import { useLocale } from "@/shared/i18n";

// Filtr: chapda «Hammasi · CRM · ERP · …» tugmalari, o'ngda qidiruv input'i
// Tugma bosilganda: setCategory(c.slug) («Hammasi» — setCategory("")); input: value={search}, onChange → setSearch
export function BlogFilter({ category, setCategory, search, setSearch }) {
  const lang = useLocale();
  const { data: categories = [] } = usePostCategories(lang); // ← shuni map qilasiz: c.slug, c.name

  return <div className="blog-filter"></div>;
}
