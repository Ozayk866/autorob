// Sahifalash: 1 2 3 … tugmalari, joriy sahifa (page) qora
// Tugmalar ro'yxati: Array.from({ length: pages }, (_, i) => i + 1) — ← shuni map qilasiz, bosilganda setPage(n)
export function BlogPagination({ page, pages, setPage }) {
  return <nav className="blog-pagination"></nav>;
}
