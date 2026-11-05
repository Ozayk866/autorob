import { PostCard } from "@/components";

// Maqolalar to'ri (3 ustun). Karta tayyor — PostCard (bosh sahifadagi blog kartasi bilan bir xil)
// Sizning ishingiz: .blog-grid ni 3 ustunli to'r qilish (BlogPage.css)
export function BlogGrid({ posts }) {
  return (
    <section className="blog-grid-section">
      <div className="container">
        <ul className="blog-grid">
          {posts.map((post) => (
            <li key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
