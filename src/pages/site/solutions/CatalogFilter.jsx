import { useSearchParams } from "react-router";

// Filtr qatori: chapda «Hammasi · Servis · Ta'lim · Ishlab chiqarish» tugmalari, o'ngda «N ta yechim»
export function CatalogFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const soha = searchParams.get("soha") ?? ""; // ← tanlangan soha: "", "service", "education", "manufacturing"
  // Tugma bosilganda: setSearchParams({ soha: "service" }), «Hammasi» uchun: setSearchParams({})

  return <div className="catalog-filter"></div>;
}
