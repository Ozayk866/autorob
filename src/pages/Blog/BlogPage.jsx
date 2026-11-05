import { useState } from "react";
import { posts as allPosts } from "@/data/posts";
import { useLocale } from "@/i18n";
import { CtaBand, PageHero } from "@/components";
import { BlogFilter } from "./BlogFilter";
import { BlogFeatured } from "./BlogFeatured";
import { BlogGrid } from "./BlogGrid";
import { BlogPagination } from "./BlogPagination";
import "./BlogPage.css";

// Blog — topshiriq: docs/tz/word/05_Blog_SkiLLzaR.docx
// Har bo'lim — alohida fayl (shu papkada). Stillar — BlogPage.css, klasslar «blog-»

const PER_PAGE = 7; // 1 ta katta + 6 ta kichik

export function BlogPage() {
  const lang = useLocale();
  const [category, setCategory] = useState(""); // "" — hammasi
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const posts = category ? allPosts.filter((post) => post.category.slug === category) : allPosts;

  // Qidiruv va sahifalash (tayyor)
  const found = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
  const pages = Math.ceil(found.length / PER_PAGE);
  const [featured, ...rest] = found.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <>
      <PageHero />
      <BlogFilter category={category} setCategory={setCategory} search={search} setSearch={setSearch} />
      <BlogFeatured post={featured} />
      <BlogGrid posts={rest} />
      <BlogPagination page={page} pages={pages} setPage={setPage} />
      <CtaBand />
    </>
  );
}
