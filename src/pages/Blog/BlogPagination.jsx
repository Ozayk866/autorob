// Sahifalash: 1 2 3 … tugmalari, joriy sahifa (page) qora
// Tugmalar ro'yxati: Array.from({ length: pages }, (_, i) => i + 1) — ← shuni map qilasiz, bosilganda setPage(n)
export function BlogPagination({ page, pages, setPage }) {
  return <nav className="blog-pagination">
    <div className="center">
      <div className="button">
        <button className="b1">1</button>
        <button className="b2">2</button>
        <button className="b3">3</button>
        <button className="b4">...</button>
        <button className="b5">8</button>
        <button className="b6">></button>
      </div>
    </div>
    </nav>;
}
